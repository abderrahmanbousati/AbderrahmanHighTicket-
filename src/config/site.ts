/**
 * =====================================================================
 * SITE CONFIGURATION — Edit this file to change business-wide values.
 * =====================================================================
 * This is the single source of truth for contact details, social links,
 * brand identity and SEO defaults. Text that changes per language lives
 * in /messages/{fr,en,ar}.json instead.
 *
 * NOTE: Do not put private banking or payment secrets here — those belong
 * in environment variables (.env.local). See src/config/payments.ts.
 */

export const siteConfig = {
  name: 'HighSysteme',
  legalName: 'HighSysteme', // TODO: replace with registered legal entity name before launch
  tagline: 'Build. Scale. Dominate.',
  domain: 'highsysteme.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://highsysteme.com',

  founder: 'Abderahman',

  // Contact — shown across the site. Safe to edit.
  contact: {
    email: 'contact@highsysteme.com',
    // Use full international format for WhatsApp links, digits only.
    whatsapp: '', // e.g. '212600000000' — leave empty to hide WhatsApp buttons
    phone: '', // e.g. '+212 600 000 000'
    // Editable location string. Do NOT invent a full postal address.
    location: 'Morocco',
  },

  // Social links — leave empty to hide the icon/link.
  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
    youtube: '',
    x: '',
  },

  // Default Open Graph / Twitter image.
  // Generated automatically by src/app/opengraph-image.tsx.
  // To use a custom static image instead, put it in /public and set e.g. '/og-image.png'.
  ogImage: '/opengraph-image',

  // Twitter/X handle for cards (with @). Leave empty to omit.
  twitterHandle: '',
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappLink(text?: string): string | null {
  const num = siteConfig.contact.whatsapp.replace(/\D/g, '');
  if (!num) return null;
  const base = `https://wa.me/${num}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
