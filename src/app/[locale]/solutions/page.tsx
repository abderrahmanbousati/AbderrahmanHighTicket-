import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Icon, type IconName } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { solutionCategories } from '@/content/solutions';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.solutions' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/solutions',
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SolutionsHero />
      <Categories />
      <SolutionsCta />
    </>
  );
}

function SolutionsHero() {
  const t = useTranslations('solutions.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />;
}

function Categories() {
  const t = useTranslations('solutions.categories');
  return (
    <section className="section">
      <div className="container-hs space-y-6">
        {solutionCategories.map((cat, i) => {
          const items: string[] = t.raw(`${cat.key}.items`);
          return (
            <MotionReveal
              key={cat.key}
              delay={(i % 2) * 0.05}
              className="card grid gap-6 md:grid-cols-[280px_1fr] md:items-center"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-navy-800 text-accent-cyan">
                  <Icon name={cat.icon as IconName} size={24} />
                </span>
                <h2 className="heading-md mt-4 text-2xl">{t(`${cat.key}.title`)}</h2>
                <p className="mt-2 text-sm text-ink-muted">{t(`${cat.key}.description`)}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-line bg-navy-800/50 px-4 py-3 text-sm text-ink-light"
                  >
                    <Icon name="check" size={15} className="flex-none text-accent-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}

function SolutionsCta() {
  const t = useTranslations('solutions.cta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
