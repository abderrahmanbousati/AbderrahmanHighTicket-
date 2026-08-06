import { z } from 'zod';

// Currency-neutral revenue tiers (labels are shown per selected currency).
export const revenueRanges = [
  'pre_revenue',
  'tier1',
  'tier2',
  'tier3',
  'tier4',
] as const;

// Currency-neutral monthly-investment tiers.
export const investmentRanges = ['inv1', 'inv2', 'inv3', 'inv4'] as const;

// Supported currencies for the qualification form.
export const formCurrencies = ['MAD', 'EUR', 'USD'] as const;

export const teamSizes = ['1', '2_5', '6_20', '21_50', '50_plus'] as const;
export const contactMethods = ['email', 'phone', 'whatsapp'] as const;
export const preferredLanguages = ['fr', 'en', 'ar'] as const;

/**
 * Contact / qualification schema.
 * Uses generic error keys so the UI can translate them (fr/en/ar).
 */
export const contactSchema = z.object({
  fullName: z.string().min(2, 'required'),
  companyName: z.string().min(2, 'required'),
  jobTitle: z.string().min(2, 'required'),
  email: z.string().email('email'),
  phone: z.string().min(6, 'required'),
  website: z.string().optional().or(z.literal('')),
  country: z.string().min(2, 'required'),
  industry: z.string().min(2, 'required'),
  currency: z.enum(formCurrencies, { message: 'required' }),
  revenue: z.enum(revenueRanges, { message: 'required' }),
  marketingSituation: z.string().min(10, 'minLength'),
  challenge: z.string().min(10, 'minLength'),
  objective: z.string().min(10, 'minLength'),
  teamSize: z.enum(teamSizes, { message: 'required' }),
  investment: z.enum(investmentRanges, { message: 'required' }),
  preferredLanguage: z.enum(preferredLanguages, { message: 'required' }),
  contactMethod: z.enum(contactMethods, { message: 'required' }),
  consent: z.literal(true, { message: 'consent' }),
  // Honeypot — must stay empty (anti-spam).
  company_website_hp: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Manual payment confirmation (server validates file separately). */
export const manualPaymentSchema = z.object({
  fullName: z.string().min(2, 'required'),
  companyName: z.string().min(2, 'required'),
  invoiceRef: z.string().min(1, 'required'),
  amountPaid: z.string().min(1, 'required'),
  paymentDate: z.string().min(1, 'required'),
  method: z.enum(['bank_transfer', 'cashplus'], { message: 'required' }),
  transactionRef: z.string().min(1, 'required'),
  message: z.string().optional().or(z.literal('')),
  acceptTerms: z.literal(true, { message: 'required' }),
});

export type ManualPaymentValues = z.infer<typeof manualPaymentSchema>;
