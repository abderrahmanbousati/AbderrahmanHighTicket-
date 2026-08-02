import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { ArticleBody } from '@/components/ArticleBody';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { articles, getArticleBySlug, getPublishedArticles } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.filter((a) => a.published).map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const l = locale as Locale;
  return buildMetadata({
    locale: l,
    title: `${article.title[l]} | ${siteConfig.name}`,
    description: article.excerpt[l],
    path: `/insights/${slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'common' });
  const ti = await getTranslations({ locale, namespace: 'insights' });
  const tcta = await getTranslations({ locale, namespace: 'home.finalCta' });
  const related = getPublishedArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[l],
    description: article.excerpt[l],
    datePublished: article.date,
    author: { '@type': 'Person', name: siteConfig.founder },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    inLanguage: l,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="border-b border-line/60">
        <div className="container-hs max-w-3xl py-16 sm:py-20">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink-white"
          >
            <Icon name="arrow" size={14} className="-scale-x-100 rtl:scale-x-100" />
            {t('backToInsights')}
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="rounded-full border border-line bg-navy-800 px-3 py-1 font-medium text-accent-cyan">
              {ti(`categories.${article.category}`)}
            </span>
            <span className="text-ink-muted">
              {article.readingMinutes} {t('minutesRead')}
            </span>
          </div>
          <h1 className="heading-lg mt-5">{article.title[l]}</h1>
          <p className="lead mt-5">{article.excerpt[l]}</p>
          <div className="mt-10 divider-gradient" />
          <div className="mt-10">
            <ArticleBody blocks={article.body} locale={l} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section">
          <div className="container-hs">
            <h2 className="heading-md">{ti('hero.title')}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <MotionReveal as="article" key={a.slug} className="card card-hover">
                  <span className="text-xs font-medium text-accent-cyan">
                    {ti(`categories.${a.category}`)}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink-white">{a.title[l]}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{a.excerpt[l]}</p>
                  <Link
                    href={`/insights/${a.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:gap-2.5"
                  >
                    {t('readMore')}
                    <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
                  </Link>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={tcta('title')} subtitle={tcta('subtitle')} />
    </>
  );
}
