import { NextResponse } from 'next/server';
import { verifyPaymentToken } from '@/lib/payment-link';
import { createStripeCheckout, createPayPalOrder } from '@/lib/providers';
import { getPayment, upsertPayment, recordAudit } from '@/lib/store';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { siteConfig } from '@/config/site';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`pay:${ip}`, { limit: 10, windowMs: 60_000 }).ok) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: { token?: string; method?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { token, method, locale = 'fr' } = body;
  if (!token || !method) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 });
  }

  // The amount/currency come ONLY from the signed token — never the client.
  const payload = verifyPaymentToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
  }

  // Duplicate-payment prevention.
  const existing = getPayment(payload.ref);
  if (existing && (existing.status === 'paid' || existing.status === 'refunded')) {
    return NextResponse.json({ error: 'already_paid' }, { status: 409 });
  }

  const origin = siteConfig.url;
  const successUrl = `${origin}/${locale}/payment/success?ref=${encodeURIComponent(payload.ref)}`;
  const cancelUrl = `${origin}/${locale}/payment/cancel?token=${encodeURIComponent(token)}`;

  try {
    let session: { url: string; id: string };
    if (method === 'stripe') {
      session = await createStripeCheckout(payload, { successUrl, cancelUrl });
    } else if (method === 'paypal') {
      session = await createPayPalOrder(payload, { successUrl, cancelUrl });
    } else {
      return NextResponse.json({ error: 'unsupported_method' }, { status: 400 });
    }

    upsertPayment({
      ref: payload.ref,
      client: payload.client,
      offer: payload.offer,
      amountMinor: payload.amountMinor,
      currency: payload.currency,
      type: payload.type,
      status: 'awaiting_payment',
      method: method as 'stripe' | 'paypal',
      providerRef: session.id,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    recordAudit({ action: 'payment_session_created', ref: payload.ref, detail: { method, providerRef: session.id } });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('[payment/session]', e);
    return NextResponse.json({ error: 'provider_error' }, { status: 502 });
  }
}
