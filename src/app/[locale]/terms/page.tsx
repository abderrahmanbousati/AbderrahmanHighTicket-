import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.terms' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/terms',
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalContent />;
}

function LegalContent() {
  const t = useTranslations('legal.terms');
  const sections: { title: string; text: string }[] = t.raw('sections');
  return (
    <>
      <PageHero eyebrow={t('title')} title={t('title')} subtitle={t('intro')} />
      <section className="section">
        <div className="container-hs max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-ink-white">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-light">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
