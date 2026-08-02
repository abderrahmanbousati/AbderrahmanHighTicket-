import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { manualPaymentSchema } from '@/lib/validation';
import { receiptUpload, isAcceptedReceiptMime, isAcceptedReceiptExt } from '@/config/payments';
import { getPayment, upsertPayment, recordAudit } from '@/lib/store';
import { verifyPaymentToken } from '@/lib/payment-link';
import { rateLimit, clientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`manual:${ip}`, { limit: 5, windowMs: 60_000 }).ok) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'invalid_form' }, { status: 400 });
  }

  const fields = {
    fullName: String(form.get('fullName') ?? ''),
    companyName: String(form.get('companyName') ?? ''),
    invoiceRef: String(form.get('invoiceRef') ?? ''),
    amountPaid: String(form.get('amountPaid') ?? ''),
    paymentDate: String(form.get('paymentDate') ?? ''),
    method: String(form.get('method') ?? ''),
    transactionRef: String(form.get('transactionRef') ?? ''),
    message: String(form.get('message') ?? ''),
    acceptTerms: form.get('acceptTerms') === 'true',
  };

  const parsed = manualPaymentSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // File validation.
  const file = form.get('receipt');
  let savedFileName: string | undefined;
  if (file && file instanceof File && file.size > 0) {
    if (file.size > receiptUpload.maxBytes) {
      return NextResponse.json({ error: 'file_too_large' }, { status: 413 });
    }
    if (!isAcceptedReceiptMime(file.type)) {
      return NextResponse.json({ error: 'file_type' }, { status: 415 });
    }
    const ext = path.extname(file.name).toLowerCase();
    if (!isAcceptedReceiptExt(ext)) {
      return NextResponse.json({ error: 'file_type' }, { status: 415 });
    }
    try {
      if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      const buf = Buffer.from(await file.arrayBuffer());
      savedFileName = `${parsed.data.invoiceRef.replace(/[^a-z0-9-_]/gi, '_')}-${crypto
        .randomBytes(6)
        .toString('hex')}${ext}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, savedFileName), buf);
    } catch (e) {
      // On read-only serverless FS, storing the file locally will fail.
      // In production, upload to object storage (S3/R2) here instead.
      console.error('[manual] receipt save failed (use object storage in prod):', e);
    }
  }

  // Optional token to bind to a known invoice/amount.
  const token = String(form.get('token') ?? '');
  const payload = token ? verifyPaymentToken(token) : null;
  const ref = payload?.ref ?? parsed.data.invoiceRef;

  const existing = getPayment(ref);
  upsertPayment({
    ref,
    client: parsed.data.companyName || parsed.data.fullName,
    offer: existing?.offer ?? payload?.offer ?? 'Manual payment',
    amountMinor: existing?.amountMinor ?? payload?.amountMinor ?? 0,
    currency: existing?.currency ?? payload?.currency ?? 'MAD',
    type: existing?.type ?? payload?.type ?? 'full',
    // Manual payments are NEVER auto-completed — admin must verify.
    status: 'pending_verification',
    method: parsed.data.method,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  recordAudit({
    action: 'manual_payment_submitted',
    ref,
    detail: {
      method: parsed.data.method,
      transactionRef: parsed.data.transactionRef,
      amountPaid: parsed.data.amountPaid,
      paymentDate: parsed.data.paymentDate,
      receipt: savedFileName ?? null,
    },
  });

  return NextResponse.json({ ok: true, status: 'pending_verification' });
}
