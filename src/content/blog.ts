/**
 * =====================================================================
 * INSIGHTS / BLOG — Add or edit articles here.
 * =====================================================================
 * Each article carries content in all three languages (fr/en/ar).
 * `body` is an array of blocks rendered in order. Supported block types:
 *   { type: 'p', text }        -> paragraph
 *   { type: 'h2', text }       -> section heading
 *   { type: 'ul', items: [] }  -> bulleted list
 *
 * Categories map to labels in messages/{locale}.json -> insights.categories.
 * Only articles with `published: true` are shown.
 */

import type { LocalizedText } from './case-studies';

export type BlogCategory =
  | 'growth-strategy'
  | 'client-acquisition'
  | 'sales-systems'
  | 'digital-transformation'
  | 'real-estate'
  | 'hospitality'
  | 'business-operations';

export type ContentBlock =
  | { type: 'p'; text: LocalizedText }
  | { type: 'h2'; text: LocalizedText }
  | { type: 'ul'; items: LocalizedText[] };

export type Article = {
  slug: string;
  published: boolean;
  category: BlogCategory;
  date: string; // ISO date
  readingMinutes: number;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: ContentBlock[];
};

export const blogCategories: BlogCategory[] = [
  'growth-strategy',
  'client-acquisition',
  'sales-systems',
  'digital-transformation',
  'real-estate',
  'hospitality',
  'business-operations',
];

export const articles: Article[] = [
  {
    slug: 'why-systems-beat-campaigns',
    published: true,
    category: 'growth-strategy',
    date: '2026-01-15',
    readingMinutes: 6,
    title: {
      fr: 'Pourquoi les systèmes battent les campagnes',
      en: 'Why systems beat campaigns',
      ar: 'لماذا تتفوق الأنظمة على الحملات',
    },
    excerpt: {
      fr: 'Une campagne produit un pic. Un système produit une trajectoire. Voici la différence structurelle qui sépare les entreprises qui stagnent de celles qui composent leur croissance.',
      en: 'A campaign produces a spike. A system produces a trajectory. Here is the structural difference between businesses that plateau and those that compound.',
      ar: 'الحملة تنتج قفزة مؤقتة، أما النظام فينتج مساراً متصاعداً. هذا هو الفرق الجوهري بين الشركات التي تتوقف عن النمو وتلك التي تراكمه.',
    },
    body: [
      {
        type: 'p',
        text: {
          fr: 'La plupart des entreprises établies n’ont pas un problème d’effort. Elles lancent des campagnes, publient du contenu, testent des canaux. Le problème est ailleurs : ces actions ne sont pas reliées. Chaque effort repart de zéro au lieu de s’appuyer sur le précédent.',
          en: 'Most established businesses do not have an effort problem. They run campaigns, publish content, test channels. The problem is elsewhere: those actions are not connected. Each effort starts from zero instead of building on the last.',
          ar: 'معظم الشركات القائمة لا تعاني من نقص في الجهد. فهي تطلق الحملات وتنشر المحتوى وتجرّب القنوات. المشكلة في مكان آخر: هذه الأنشطة غير مترابطة، وكل جهد يبدأ من الصفر بدل أن يبني على ما سبقه.',
        },
      },
      {
        type: 'h2',
        text: {
          fr: 'Le coût caché des actions déconnectées',
          en: 'The hidden cost of disconnected actions',
          ar: 'التكلفة الخفية للأنشطة غير المترابطة',
        },
      },
      {
        type: 'p',
        text: {
          fr: 'Quand l’acquisition, la conversion et le suivi ne partagent pas les mêmes données, vous perdez trois choses : la visibilité sur ce qui fonctionne, la capacité à réinvestir intelligemment, et la mémoire commerciale de l’entreprise. Les meilleurs prospects se perdent entre deux outils.',
          en: 'When acquisition, conversion and follow-up do not share the same data, you lose three things: visibility into what works, the ability to reinvest intelligently, and the commercial memory of the business. Your best prospects fall between two tools.',
          ar: 'عندما لا تتشارك مراحل الاكتساب والتحويل والمتابعة نفس البيانات، تفقد ثلاثة أشياء: وضوح ما ينجح فعلاً، والقدرة على إعادة الاستثمار بذكاء، والذاكرة التجارية للشركة. وأفضل عملائك المحتملين يضيعون بين أداتين.',
        },
      },
      {
        type: 'h2',
        text: {
          fr: 'Ce qu’un système ajoute',
          en: 'What a system adds',
          ar: 'ما الذي يضيفه النظام',
        },
      },
      {
        type: 'ul',
        items: [
          {
            fr: 'Une trajectoire mesurable plutôt que des pics isolés.',
            en: 'A measurable trajectory instead of isolated spikes.',
            ar: 'مسار قابل للقياس بدلاً من قفزات معزولة.',
          },
          {
            fr: 'Des décisions basées sur des données partagées, pas sur des intuitions.',
            en: 'Decisions based on shared data, not intuition.',
            ar: 'قرارات مبنية على بيانات مشتركة لا على الحدس.',
          },
          {
            fr: 'Une croissance qui dépend moins du fondateur.',
            en: 'Growth that depends less on the founder.',
            ar: 'نمو أقل اعتماداً على المؤسس.',
          },
        ],
      },
      {
        type: 'p',
        text: {
          fr: 'Un système ne remplace pas les campagnes : il leur donne un cadre. La campagne devient une variable que vous optimisez, pas un pari que vous relancez chaque trimestre.',
          en: 'A system does not replace campaigns: it gives them a frame. The campaign becomes a variable you optimise, not a bet you re-place every quarter.',
          ar: 'النظام لا يلغي الحملات، بل يمنحها إطاراً. تتحول الحملة إلى متغير تقوم بتحسينه، لا إلى رهان تعيد إطلاقه كل ربع سنة.',
        },
      },
    ],
  },
  {
    slug: 'anatomy-of-a-client-acquisition-system',
    published: true,
    category: 'client-acquisition',
    date: '2026-01-22',
    readingMinutes: 7,
    title: {
      fr: 'L’anatomie d’un système d’acquisition client',
      en: 'The anatomy of a client acquisition system',
      ar: 'تشريح نظام اكتساب العملاء',
    },
    excerpt: {
      fr: 'Un système d’acquisition n’est pas une source de trafic. C’est une chaîne complète, de l’attention à la décision, où chaque maillon est mesuré et améliorable.',
      en: 'An acquisition system is not a traffic source. It is a complete chain, from attention to decision, where every link is measured and improvable.',
      ar: 'نظام الاكتساب ليس مصدراً للزيارات، بل سلسلة متكاملة من جذب الانتباه إلى اتخاذ القرار، حيث تُقاس كل حلقة ويمكن تحسينها.',
    },
    body: [
      {
        type: 'p',
        text: {
          fr: 'On confond souvent « acquisition » et « publicité ». La publicité n’est qu’un maillon. Un système d’acquisition relie quatre composants : le message, le canal, la capture et la qualification.',
          en: 'People often confuse “acquisition” with “advertising.” Advertising is only one link. An acquisition system connects four components: the message, the channel, the capture and the qualification.',
          ar: 'كثيراً ما يُخلط بين «الاكتساب» و«الإعلان». الإعلان مجرد حلقة واحدة. نظام الاكتساب يربط أربعة مكونات: الرسالة، والقناة، والتقاط بيانات العميل، والتأهيل.',
        },
      },
      {
        type: 'h2',
        text: {
          fr: 'Message avant budget',
          en: 'Message before budget',
          ar: 'الرسالة قبل الميزانية',
        },
      },
      {
        type: 'p',
        text: {
          fr: 'Augmenter un budget publicitaire sur un message flou revient à amplifier un signal brouillé. Le positionnement de l’offre doit être clair avant d’acheter de l’attention. C’est la première chose qu’un audit sérieux corrige.',
          en: 'Increasing an ad budget on a vague message means amplifying a blurred signal. Offer positioning must be clear before you buy attention. It is the first thing a serious audit corrects.',
          ar: 'زيادة ميزانية الإعلان مع رسالة غير واضحة تعني تضخيم إشارة مشوّشة. يجب أن يكون تموضع العرض واضحاً قبل شراء الانتباه. وهذا أول ما يصححه أي تدقيق جاد.',
        },
      },
      {
        type: 'h2',
        text: {
          fr: 'La qualification protège votre temps',
          en: 'Qualification protects your time',
          ar: 'التأهيل يحمي وقتك',
        },
      },
      {
        type: 'p',
        text: {
          fr: 'Générer plus de leads sans les qualifier surcharge votre équipe commerciale et dilue son énergie. Un bon système filtre en amont : il attire le bon profil et écarte le mauvais avant qu’un commercial ne perde une heure.',
          en: 'Generating more leads without qualifying them overloads your sales team and dilutes its energy. A good system filters upstream: it attracts the right profile and screens out the wrong one before a salesperson loses an hour.',
          ar: 'توليد المزيد من العملاء المحتملين دون تأهيلهم يُثقل فريق المبيعات ويشتّت طاقته. النظام الجيد يُصفّي مبكراً: يجذب الملف المناسب ويستبعد غير المناسب قبل أن يضيّع مندوب المبيعات ساعة من وقته.',
        },
      },
      {
        type: 'p',
        text: {
          fr: 'Mesuré de bout en bout, ce système révèle où l’argent est réellement gagné ou perdu — et transforme l’acquisition d’un centre de coût en actif prévisible.',
          en: 'Measured end to end, this system reveals where money is actually won or lost — and turns acquisition from a cost centre into a predictable asset.',
          ar: 'وحين يُقاس النظام من بدايته إلى نهايته، يكشف أين يُربح المال أو يُفقد فعلاً، ويحوّل الاكتساب من مركز تكلفة إلى أصل قابل للتنبؤ.',
        },
      },
    ],
  },
  {
    slug: 'sales-follow-up-that-does-not-depend-on-memory',
    published: true,
    category: 'sales-systems',
    date: '2026-01-29',
    readingMinutes: 5,
    title: {
      fr: 'Un suivi commercial qui ne dépend pas de la mémoire',
      en: 'Sales follow-up that does not depend on memory',
      ar: 'متابعة مبيعات لا تعتمد على الذاكرة',
    },
    excerpt: {
      fr: 'La majorité des ventes se jouent dans le suivi. Pourtant, le suivi est souvent la partie la moins structurée de l’entreprise. Voici comment le systématiser.',
      en: 'Most sales are decided in the follow-up. Yet follow-up is often the least structured part of the business. Here is how to systematise it.',
      ar: 'تُحسم معظم الصفقات في مرحلة المتابعة، ومع ذلك تكون المتابعة غالباً أقل أجزاء الشركة تنظيماً. إليك كيف تجعلها نظاماً.',
    },
    body: [
      {
        type: 'p',
        text: {
          fr: 'Un prospect intéressé qui n’est pas relancé au bon moment n’est pas un prospect perdu par hasard : c’est un défaut de système. Compter sur la mémoire d’un commercial n’est pas une stratégie de suivi.',
          en: 'An interested prospect who is not followed up at the right moment is not lost by chance: it is a system failure. Relying on a salesperson’s memory is not a follow-up strategy.',
          ar: 'العميل المهتم الذي لا تتم متابعته في الوقت المناسب ليس خسارة بالصدفة، بل خلل في النظام. الاعتماد على ذاكرة مندوب المبيعات ليس استراتيجية متابعة.',
        },
      },
      {
        type: 'h2',
        text: {
          fr: 'Trois piliers d’un suivi fiable',
          en: 'Three pillars of reliable follow-up',
          ar: 'ثلاث ركائز لمتابعة موثوقة',
        },
      },
      {
        type: 'ul',
        items: [
          {
            fr: 'Un CRM où chaque lead a un statut clair et un prochain pas défini.',
            en: 'A CRM where every lead has a clear status and a defined next step.',
            ar: 'نظام إدارة علاقات عملاء (CRM) يحمل فيه كل عميل حالة واضحة وخطوة تالية محددة.',
          },
          {
            fr: 'Des séquences de relance déclenchées automatiquement, y compris sur WhatsApp.',
            en: 'Follow-up sequences triggered automatically, including on WhatsApp.',
            ar: 'سلاسل متابعة تُطلَق تلقائياً، بما في ذلك عبر واتساب.',
          },
          {
            fr: 'Des scripts commerciaux qui rendent chaque échange cohérent, quel que soit l’interlocuteur.',
            en: 'Sales scripts that keep every exchange consistent, whoever handles it.',
            ar: 'نصوص بيعية تجعل كل تواصل متسقاً بغض النظر عمن يتولاه.',
          },
        ],
      },
      {
        type: 'p',
        text: {
          fr: 'Structuré ainsi, le suivi cesse d’être une source de stress et devient un actif mesurable. Vous savez combien de rendez-vous sont pris, combien de propositions sont envoyées, et où le processus se bloque.',
          en: 'Structured this way, follow-up stops being a source of stress and becomes a measurable asset. You know how many meetings are booked, how many proposals are sent, and where the process stalls.',
          ar: 'بهذا التنظيم، تتوقف المتابعة عن كونها مصدر توتر وتتحول إلى أصل قابل للقياس. تعرف كم موعداً حُجز، وكم عرضاً أُرسل، وأين يتعثّر المسار.',
        },
      },
    ],
  },
];

export function getPublishedArticles(): Article[] {
  return [...articles]
    .filter((a) => a.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.published);
}
