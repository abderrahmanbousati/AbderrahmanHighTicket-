/**
 * =====================================================================
 * CASE STUDIES — Add real client results here after each engagement.
 * =====================================================================
 * The site renders whatever is in this array. It ships EMPTY on purpose:
 * do not invent results, numbers or testimonials.
 *
 * To add a case study, copy the `exampleTemplate` object shape below,
 * fill every language (fr/en/ar), set `published: true`, and add it to
 * the `caseStudies` array.
 *
 * Only entries with `published: true` are shown publicly.
 */

export type LocalizedText = {
  fr: string;
  en: string;
  ar: string;
};

export type CaseStudy = {
  slug: string;
  published: boolean;
  industryKey: string; // matches an industry slug (see src/content/industries.ts)
  clientName?: LocalizedText; // optional; leave undefined to show "Confidential client"
  challenge: LocalizedText;
  systemImplemented: LocalizedText;
  durationDays: number; // e.g. 90
  mainResult: LocalizedText; // describe the outcome in the client's words / factual terms
  testimonial?: LocalizedText;
  testimonialAuthor?: LocalizedText; // e.g. "General Manager, Real estate agency"
};

/**
 * Template — copy this shape when adding a real case study.
 * (Not rendered; kept here as documentation.)
 */
export const exampleTemplate: CaseStudy = {
  slug: 'example-slug',
  published: false,
  industryKey: 'real-estate-agencies',
  clientName: { fr: '', en: '', ar: '' },
  challenge: {
    fr: 'Décrivez le défi initial du client.',
    en: 'Describe the client’s initial challenge.',
    ar: 'صف التحدي الأولي للعميل.',
  },
  systemImplemented: {
    fr: 'Décrivez le système mis en place.',
    en: 'Describe the system implemented.',
    ar: 'صف النظام الذي تم تنفيذه.',
  },
  durationDays: 90,
  mainResult: {
    fr: 'Décrivez le résultat principal (factuel).',
    en: 'Describe the main result (factual).',
    ar: 'صف النتيجة الرئيسية (واقعية).',
  },
  testimonial: { fr: '', en: '', ar: '' },
  testimonialAuthor: { fr: '', en: '', ar: '' },
};

// Ships empty. Add real, verified case studies here.
export const caseStudies: CaseStudy[] = [];

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published);
}
