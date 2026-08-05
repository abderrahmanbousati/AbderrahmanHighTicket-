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

// Real, owner-provided results — anonymized by sector. Edit / add named
// clients and testimonials as you collect them.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'acquisition-leads',
    published: true,
    industryKey: 'real-estate-agencies',
    challenge: {
      fr: 'Acquisition irrégulière et dépendante des recommandations, sans système de génération de leads.',
      en: 'Irregular acquisition dependent on referrals, with no lead-generation system.',
      ar: 'اكتساب غير منتظم يعتمد على التوصيات، دون نظام لتوليد العملاء المحتملين.',
    },
    systemImplemented: {
      fr: 'Campagnes Meta Ads ciblées, landing page de capture et qualification, suivi WhatsApp structuré.',
      en: 'Targeted Meta Ads campaigns, a capture-and-qualify landing page, and structured WhatsApp follow-up.',
      ar: 'حملات ميتا مستهدفة، وصفحة هبوط للالتقاط والتأهيل، ومتابعة منظّمة عبر واتساب.',
    },
    durationDays: 90,
    mainResult: {
      fr: '54 leads qualifiés générés à 0,38 $ par lead (208 clics, CPC 0,03 $).',
      en: '54 qualified leads generated at $0.38 per lead (208 clicks, $0.03 CPC).',
      ar: 'توليد 54 عميلاً محتملاً مؤهلاً بتكلفة 0.38 دولار لكل عميل (208 نقرة، تكلفة النقرة 0.03 دولار).',
    },
  },
  {
    slug: 'croissance-mensuelle',
    published: true,
    industryKey: 'service-businesses',
    challenge: {
      fr: 'Présence digitale faible et croissance ni structurée ni mesurée.',
      en: 'Weak digital presence and growth that was neither structured nor measured.',
      ar: 'حضور رقمي ضعيف ونمو غير منظّم وغير مقاس.',
    },
    systemImplemented: {
      fr: 'Système d’acquisition, stratégie de contenu et tableau de bord de suivi des performances.',
      en: 'Acquisition system, content strategy, and a performance-tracking dashboard.',
      ar: 'نظام اكتساب واستراتيجية محتوى ولوحة تتبّع للأداء.',
    },
    durationDays: 90,
    mainResult: {
      fr: '+20% de croissance mensuelle moyenne et une acquisition devenue prévisible.',
      en: '+20% average monthly growth and acquisition that became predictable.',
      ar: '+20% متوسط نمو شهري واكتساب أصبح قابلاً للتنبؤ.',
    },
  },
];

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published);
}
