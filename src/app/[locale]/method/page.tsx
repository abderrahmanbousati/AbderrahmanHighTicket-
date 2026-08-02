import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.method' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/method',
  });
}

export default async function MethodPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <MethodHero />
      <Steps />
      <MethodCta />
    </>
  );
}

function MethodHero() {
  const t = useTranslations('method.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />;
}

function Steps() {
  const t = useTranslations('method');
  const steps: { letter: string; title: string; text: string }[] = t.raw('steps');
  return (
    <section className="section">
      <div className="container-hs">
        <div className="relative space-y-4">
          {steps.map((step, i) => (
            <MotionReveal
              key={i}
              delay={(i % 3) * 0.05}
              className="card card-hover grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 flex-none place-items-center rounded-2xl border border-accent-blue/40 bg-accent-blue/10 text-3xl font-extrabold text-accent-cyan">
                  {step.letter}
                </span>
                <span className="text-sm font-semibold text-ink-muted sm:hidden">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink-white">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-light">{step.text}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCta() {
  const t = useTranslations('method.cta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
