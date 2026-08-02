/**
 * =====================================================================
 * INDUSTRIES — priority markets HighSystem serves.
 * =====================================================================
 * Structural data only (slug + icon key + WhatsApp/CTA anchors).
 * All human-readable copy lives in messages/{locale}.json under
 * `industries.items.<slug>` so it stays fully translated (fr/en/ar).
 *
 * To add an industry:
 *  1. Add a slug here with an icon key.
 *  2. Add matching copy in all three message files.
 */

export type IndustrySlug =
  | 'real-estate-developers'
  | 'real-estate-agencies'
  | 'hotels-riads'
  | 'automotive'
  | 'car-rental'
  | 'private-clinics'
  | 'service-businesses';

export type Industry = {
  slug: IndustrySlug;
  icon: string; // key mapped to an icon component in src/components/Icon.tsx
};

export const industries: Industry[] = [
  { slug: 'real-estate-developers', icon: 'building' },
  { slug: 'real-estate-agencies', icon: 'key' },
  { slug: 'hotels-riads', icon: 'bed' },
  { slug: 'automotive', icon: 'car' },
  { slug: 'car-rental', icon: 'steering' },
  { slug: 'private-clinics', icon: 'stethoscope' },
  { slug: 'service-businesses', icon: 'briefcase' },
];
