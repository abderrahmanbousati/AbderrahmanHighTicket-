/**
 * =====================================================================
 * PAYMENTS CONFIGURATION
 * =====================================================================
 * Reads sensitive values from environment variables ONLY.
 * Never hardcode bank details, secrets or keys in this file.
 * See .env.example for the full list of variables.
 *
 * Payment providers are OPT-IN: a provider is "enabled" only when its
 * keys are present in the environment. This keeps the site safe to deploy
 * before any real payment account exists.
 */

export const currencies = ['MAD', 'EUR', 'USD'] as const;
export type Currency = (typeof currencies)[number];

export const defaultCurrency: Currency =
  (process.env.PAYMENT_CURRENCY as Currency) || 'MAD';

export const paymentStatuses = [
  'draft',
  'awaiting_payment',
  'pending_verification',
  'partially_paid',
  'paid',
  'failed',
  'cancelled',
  'refunded',
  'overdue',
] as const;
export type PaymentStatus = (typeof paymentStatuses)[number];

export const paymentTypes = [
  'full',
  'deposit',
  'first_monthly',
  'three_month_subscription',
  'custom_installment',
] as const;
export type PaymentType = (typeof paymentTypes)[number];

export const paymentMethods = [
  'stripe',
  'paypal',
  'bank_transfer',
  'cashplus',
  'invoice',
] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

/** Server-only: which providers are configured. */
export const paymentProviders = {
  stripe: {
    get enabled() {
      return Boolean(process.env.STRIPE_SECRET_KEY);
    },
  },
  paypal: {
    get enabled() {
      return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
    },
    environment: process.env.PAYPAL_ENVIRONMENT ?? 'sandbox',
  },
};

/** Manual / local payment details, read from env (safe to surface to client via API). */
export function getManualPaymentDetails() {
  return {
    bank: {
      name: process.env.BANK_NAME ?? '',
      accountHolder: process.env.BANK_ACCOUNT_HOLDER ?? '',
      rib: process.env.BANK_RIB ?? '',
      iban: process.env.BANK_IBAN ?? '',
      swift: process.env.BANK_SWIFT ?? '',
    },
    cashplus: {
      recipientName: process.env.CASHPLUS_RECIPIENT_NAME ?? '',
    },
    support: {
      email: process.env.PAYMENT_SUPPORT_EMAIL ?? '',
      whatsapp: process.env.PAYMENT_SUPPORT_WHATSAPP ?? '',
    },
  };
}

/** Upload constraints for manual payment receipts. */
export const receiptUpload = {
  maxBytes: 5 * 1024 * 1024, // 5 MB
  acceptedMimeTypes: ['image/png', 'image/jpeg', 'application/pdf'] as string[],
  acceptedExtensions: ['.png', '.jpg', '.jpeg', '.pdf'] as string[],
} as const;

export function isAcceptedReceiptMime(type: string): boolean {
  return receiptUpload.acceptedMimeTypes.includes(type);
}

export function isAcceptedReceiptExt(ext: string): boolean {
  return receiptUpload.acceptedExtensions.includes(ext.toLowerCase());
}
