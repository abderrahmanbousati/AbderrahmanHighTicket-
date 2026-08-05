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

// Real, owner-provided clients. Sectors + implemented systems are set;
// replace each `mainResult` with the exact, verified figure for that client
// and add `testimonial` / `testimonialAuthor` as you collect them.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'groupe-aljazera',
    published: true,
    industryKey: 'real-estate-developers',
    clientName: { fr: 'Groupe Aljazera', en: 'Groupe Aljazera', ar: 'مجموعة الجزيرة' },
    challenge: {
      fr: 'Acquisition dépendante des recommandations, sans tunnel de génération de leads structuré.',
      en: 'Acquisition dependent on referrals, with no structured lead-generation funnel.',
      ar: 'اكتساب يعتمد على التوصيات، دون قمع منظّم لتوليد العملاء المحتملين.',
    },
    systemImplemented: {
      fr: 'Campagnes Meta & Google Ads, landing pages par programme, CRM et suivi WhatsApp structuré.',
      en: 'Meta & Google Ads campaigns, per-development landing pages, CRM and structured WhatsApp follow-up.',
      ar: 'حملات ميتا وجوجل، وصفحات هبوط لكل مشروع، ونظام إدارة عملاء ومتابعة منظّمة عبر واتساب.',
    },
    durationDays: 90,
    mainResult: {
      fr: 'Acquisition structurée et pipeline de prospects qualifiés et suivi.',
      en: 'Structured acquisition and a qualified, tracked prospect pipeline.',
      ar: 'اكتساب منظّم وخط أنابيب من العملاء المؤهلين مع متابعة.',
    },
  },
  {
    slug: 'hotel-aljazera',
    published: true,
    industryKey: 'hotels-riads',
    clientName: { fr: 'Hôtel Aljazera', en: 'Aljazera Hotel', ar: 'فندق الجزيرة' },
    challenge: {
      fr: 'Dépendance aux plateformes de réservation et faible flux de réservations directes.',
      en: 'Dependence on booking platforms and a low flow of direct bookings.',
      ar: 'الاعتماد على منصات الحجز وضعف تدفّق الحجوزات المباشرة.',
    },
    systemImplemented: {
      fr: 'Système de réservation directe, campagnes ciblées, contenu et suivi des demandes.',
      en: 'Direct-booking system, targeted campaigns, content, and inquiry follow-up.',
      ar: 'نظام حجز مباشر، وحملات مستهدفة، ومحتوى ومتابعة للطلبات.',
    },
    durationDays: 90,
    mainResult: {
      fr: 'Présence digitale renforcée et canal de réservations directes structuré.',
      en: 'Stronger digital presence and a structured direct-booking channel.',
      ar: 'حضور رقمي أقوى وقناة حجوزات مباشرة منظّمة.',
    },
  },
  {
    slug: 'le-collectionneur-des-montres',
    published: true,
    industryKey: 'service-businesses',
    clientName: {
      fr: 'Le Collectionneur des Montres',
      en: 'Le Collectionneur des Montres',
      ar: 'Le Collectionneur des Montres',
    },
    challenge: {
      fr: 'Offre premium à valoriser et acquisition à structurer autour de la marque.',
      en: 'A premium offer to elevate and acquisition to structure around the brand.',
      ar: 'عرض راقٍ يحتاج إلى إبراز واكتساب يحتاج إلى تنظيم حول العلامة.',
    },
    systemImplemented: {
      fr: 'Positionnement de marque, acquisition payante, contenu et processus de vente.',
      en: 'Brand positioning, paid acquisition, content, and a sales process.',
      ar: 'تموضع العلامة، واكتساب مدفوع، ومحتوى وعملية بيع.',
    },
    durationDays: 90,
    mainResult: {
      fr: 'Image de marque premium et acquisition structurée autour de l’offre.',
      en: 'A premium brand image and acquisition structured around the offer.',
      ar: 'صورة علامة راقية واكتساب منظّم حول العرض.',
    },
  },
];

export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.published);
}
