import { NextResponse } from 'next/server';
import { signPaymentToken, type PaymentLinkPayload } from '@/lib/payment-link';
import { listPayments, getPayment, upsertPayment, recordAudit, listAudit } from '@/lib/store';
import { paymentStatuses, type PaymentStatus } from '@/config/payments';
import { siteConfig } from '@/config/site';

export const runtime = 'nodejs';

/**
 * =====================================================================
 * ADMIN API — protected by the ADMIN_API_TOKEN bearer token.
 * =====================================================================
 * This is the integration surface for a future admin dashboard. It lets
 * the owner create invoices, generate private payment links, verify
 * manual payments, update statuses and export records.
 *
 * Example (create an invoice + link):
 *   curl -X POST /api/admin/payments \
 *     -H "Authorization: Bearer $ADMIN_API_TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"action":"create","ref":"INV-001","client":"Acme","offer":"HighSysteme 90 — Deposit","amountMinor":3000000,"currency":"MAD","type":"deposit"}'
 */

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return false;
  const header = req.headers.get('authorization') ?? '';
  return header === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ payments: listPayments(), audit: listAudit() });
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const action = String(body.action ?? '');

  if (action === 'create') {
    const payload: PaymentLinkPayload = {
      ref: String(body.ref ?? ''),
      client: String(body.client ?? ''),
      offer: String(body.offer ?? ''),
      amountMinor: Number(body.amountMinor ?? 0),
      currency: (String(body.currency ?? 'MAD') as PaymentLinkPayload['currency']),
      type: (String(body.type ?? 'full') as PaymentLinkPayload['type']),
      ...(body.exp ? { exp: Number(body.exp) } : {}),
    };
    if (!payload.ref || !payload.amountMinor) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    let token: string;
    try {
      token = signPaymentToken(payload);
    } catch {
      return NextResponse.json({ error: 'link_secret_missing' }, { status: 503 });
    }

    upsertPayment({
      ...payload,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    recordAudit({ action: 'invoice_created', ref: payload.ref });

    const links: Record<string, string> = {};
    for (const l of ['fr', 'en', 'ar']) {
      links[l] = `${siteConfig.url}/${l}/payment?token=${encodeURIComponent(token)}`;
    }
    return NextResponse.json({ ok: true, token, links });
  }

  if (action === 'update_status' || action === 'verify_manual') {
    const ref = String(body.ref ?? '');
    const status = String(body.status ?? (action === 'verify_manual' ? 'paid' : '')) as PaymentStatus;
    if (!ref || !paymentStatuses.includes(status)) {
      return NextResponse.json({ error: 'invalid_params' }, { status: 400 });
    }
    const existing = getPayment(ref);
    if (!existing) return NextResponse.json({ error: 'not_found' }, { status: 404 });

    upsertPayment({ ...existing, status, updatedAt: new Date().toISOString() });
    recordAudit({ action: action === 'verify_manual' ? 'manual_payment_verified' : 'status_updated', ref, detail: { status } });
    return NextResponse.json({ ok: true, ref, status });
  }

  return NextResponse.json({ error: 'unknown_action' }, { status: 400 });
}
