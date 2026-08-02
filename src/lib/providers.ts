import crypto from 'crypto';
import type { PaymentLinkPayload } from './payment-link';

/**
 * =====================================================================
 * PAYMENT PROVIDERS (Stripe + PayPal via REST)
 * =====================================================================
 * Implemented with direct REST calls (no SDK dependency) so the project
 * builds and deploys even before any payment account exists. Sessions are
 * ALWAYS created server-side from a verified signed token, so amounts can
 * never be tampered with in the browser.
 */

type SessionUrls = { successUrl: string; cancelUrl: string };

/** Create a Stripe Checkout Session. Returns the hosted checkout URL. */
export async function createStripeCheckout(
  payload: PaymentLinkPayload,
  { successUrl, cancelUrl }: SessionUrls
): Promise<{ url: string; id: string }> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe is not configured');

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('success_url', successUrl);
  form.set('cancel_url', cancelUrl);
  form.set('client_reference_id', payload.ref);
  form.set('line_items[0][quantity]', '1');
  form.set('line_items[0][price_data][currency]', payload.currency.toLowerCase());
  form.set('line_items[0][price_data][unit_amount]', String(payload.amountMinor));
  form.set('line_items[0][price_data][product_data][name]', payload.offer);
  form.set('metadata[ref]', payload.ref);
  form.set('metadata[type]', payload.type);
  form.set('metadata[client]', payload.client);

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  const data = (await res.json()) as { id?: string; url?: string; error?: { message: string } };
  if (!res.ok || !data.url || !data.id) {
    throw new Error(data.error?.message ?? 'Stripe session creation failed');
  }
  return { url: data.url, id: data.id };
}

/**
 * Verify a Stripe webhook signature (v1 scheme) without the SDK.
 * Returns the parsed event if valid, otherwise null.
 */
export function verifyStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  toleranceSec = 300
): Record<string, unknown> | null {
  if (!signatureHeader) return null;
  const parts = Object.fromEntries(
    signatureHeader.split(',').map((kv) => kv.split('=') as [string, string])
  );
  const timestamp = parts['t'];
  const v1 = parts['v1'];
  if (!timestamp || !v1) return null;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > toleranceSec) return null;

  try {
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Create a PayPal order and return the approval URL. */
export async function createPayPalOrder(
  payload: PaymentLinkPayload,
  { successUrl, cancelUrl }: SessionUrls
): Promise<{ url: string; id: string }> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('PayPal is not configured');

  const base =
    (process.env.PAYPAL_ENVIRONMENT ?? 'sandbox') === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) throw new Error('PayPal auth failed');

  const orderRes = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: payload.ref,
          description: payload.offer,
          amount: {
            currency_code: payload.currency,
            value: (payload.amountMinor / 100).toFixed(2),
          },
        },
      ],
      application_context: { return_url: successUrl, cancel_url: cancelUrl },
    }),
  });

  const order = (await orderRes.json()) as {
    id?: string;
    links?: { rel: string; href: string }[];
  };
  const approve = order.links?.find((l) => l.rel === 'approve');
  if (!order.id || !approve) throw new Error('PayPal order creation failed');
  return { url: approve.href, id: order.id };
}
