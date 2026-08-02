import { NextResponse } from 'next/server';
import { verifyStripeWebhook } from '@/lib/providers';
import { getPayment, upsertPayment, recordAudit } from '@/lib/store';

export const runtime = 'nodejs';

/**
 * Stripe webhook — the SOURCE OF TRUTH for payment success.
 * Never mark a payment paid from the browser; only from a verified webhook.
 *
 * Configure the endpoint URL in Stripe: /api/payment/stripe/webhook
 * and set STRIPE_WEBHOOK_SECRET in the environment.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'webhook_not_configured' }, { status: 503 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');
  const event = verifyStripeWebhook(rawBody, signature, secret);
  if (!event) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  const type = event.type as string;
  const dataObject = (event.data as { object?: Record<string, unknown> })?.object ?? {};
  const ref =
    (dataObject.client_reference_id as string) ||
    ((dataObject.metadata as Record<string, string> | undefined)?.ref ?? '');

  if (type === 'checkout.session.completed' && ref) {
    const existing = getPayment(ref);
    if (existing && existing.status !== 'paid') {
      upsertPayment({ ...existing, status: 'paid', updatedAt: new Date().toISOString() });
      recordAudit({ action: 'payment_paid', ref, detail: { via: 'stripe_webhook' } });
    }
  } else if (
    (type === 'checkout.session.expired' || type === 'payment_intent.payment_failed') &&
    ref
  ) {
    const existing = getPayment(ref);
    if (existing && existing.status === 'awaiting_payment') {
      upsertPayment({ ...existing, status: 'failed', updatedAt: new Date().toISOString() });
      recordAudit({ action: 'payment_failed', ref, detail: { via: 'stripe_webhook', type } });
    }
  }

  return NextResponse.json({ received: true });
}
