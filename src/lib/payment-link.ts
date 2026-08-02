import crypto from 'crypto';
import type { Currency, PaymentType } from '@/config/payments';

/**
 * Signed, tokenized private payment links.
 * The amount and currency live INSIDE the signed token, so a client cannot
 * tamper with them in the browser. The server always re-verifies the token
 * before creating a payment session.
 *
 * Token format: base64url(payloadJSON).base64url(hmacSHA256)
 */

export type PaymentLinkPayload = {
  /** invoice/proposal reference — used to prevent duplicate payments */
  ref: string;
  /** client or company name (display only) */
  client: string;
  /** offer label (display only) */
  offer: string;
  /** amount in MINOR units (e.g. cents / centimes) to avoid float issues */
  amountMinor: number;
  currency: Currency;
  type: PaymentType;
  /** unix seconds expiry (optional) */
  exp?: number;
};

function getSecret(): string {
  const secret = process.env.PAYMENT_LINK_SECRET;
  if (!secret) {
    throw new Error('PAYMENT_LINK_SECRET is not set. Cannot sign/verify payment links.');
  }
  return secret;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64urlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
}

export function signPaymentToken(payload: PaymentLinkPayload): string {
  const json = JSON.stringify(payload);
  const encoded = b64url(json);
  const hmac = crypto.createHmac('sha256', getSecret()).update(encoded).digest();
  return `${encoded}.${b64url(hmac)}`;
}

export function verifyPaymentToken(token: string): PaymentLinkPayload | null {
  if (!token || !token.includes('.')) return null;
  const [encoded, sig] = token.split('.');
  if (!encoded || !sig) return null;

  const expected = crypto.createHmac('sha256', getSecret()).update(encoded).digest();
  const provided = b64urlDecode(sig);
  if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
    return null;
  }

  try {
    const payload = JSON.parse(b64urlDecode(encoded).toString('utf8')) as PaymentLinkPayload;
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Format minor units into a human amount string. */
export function formatAmount(amountMinor: number, currency: Currency): string {
  const value = amountMinor / 100;
  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString()} ${currency}`;
  }
}
