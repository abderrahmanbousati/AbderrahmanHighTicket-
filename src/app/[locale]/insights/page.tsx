import type { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { MotionReveal } from '@/components/MotionReveal';
import { getPublishedArticles } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.insights' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/insights',
  });
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <InsightsHero />
      <ArticleList />
    </>
  );
}

function InsightsHero() {
  const t = useTranslations('insights.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />;
}

function ArticleList() {
  const locale = useLocale() as Locale;
  const t = useTranslations('insights');
  const tc = useTranslations('common');
  const articles = getPublishedArticles();

  return (
    <section className="section">
      <div className="container-hs">
        {articles.length === 0 ? (
          <p className="text-center text-ink-muted">{t('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <MotionReveal
                as="article"
                key={article.slug}
                delay={(i % 3) * 0.06}
                className="card card-hover group flex flex-col"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-line bg-navy-800 px-3 py-1 text-xs font-medium text-accent-cyan">
                    {t(`categories.${article.category}`)}
                  </span>
                  <span className="text-xs text-ink-muted">
                    {article.readingMinutes} {tc('minutesRead')}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug text-ink-white">
                  {article.title[locale]}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {article.excerpt[locale]}
                </p>
                <Link
                  href={`/insights/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:gap-2.5"
                >
                  {tc('readMore')}
                  <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
                </Link>
              </MotionReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
