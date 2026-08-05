import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { FounderCard } from '@/components/FounderCard';
import { SectionHeading, CheckList } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.about' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/about',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <AboutHero />
      <VisionMission />
      <Philosophy />
      <Founder />
      <HowWeWork />
      <Values />
      <AboutCta />
    </>
  );
}

function AboutHero() {
  const t = useTranslations('about.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />;
}

function VisionMission() {
  const t = useTranslations('about');
  return (
    <section className="section">
      <div className="container-hs grid gap-5 md:grid-cols-2">
        <MotionReveal className="card">
          <h2 className="heading-md text-xl">{t('vision.title')}</h2>
          <p className="mt-3 leading-relaxed text-ink-light">{t('vision.text')}</p>
        </MotionReveal>
        <MotionReveal delay={0.08} className="card border-accent-blue/30 bg-accent-blue/[0.05]">
          <h2 className="heading-md text-xl">{t('mission.title')}</h2>
          <p className="mt-3 leading-relaxed text-ink-light">{t('mission.text')}</p>
        </MotionReveal>
      </div>
    </section>
  );
}

function Philosophy() {
  const t = useTranslations('about.philosophy');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="heading-lg">{t('title')}</h2>
          <p className="lead mt-6">{t('text')}</p>
        </MotionReveal>
      </div>
    </section>
  );
}

function Founder() {
  const at = useTranslations('about.founder');
  return (
    <section className="section">
      <div className="container-hs">
        <FounderCard eyebrow={at('title')} />
      </div>
    </section>
  );
}

function HowWeWork() {
  const t = useTranslations('about.howWeWork');
  const items: string[] = t.raw('items');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading title={t('title')} align="center" />
        <MotionReveal className="mx-auto mt-10 max-w-2xl">
          <CheckList items={items} />
        </MotionReveal>
      </div>
    </section>
  );
}

function Values() {
  const t = useTranslations('about.values');
  const items: { title: string; text: string }[] = t.raw('items');
  return (
    <section className="section">
      <div className="container-hs">
        <SectionHeading title={t('title')} align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item.title} delay={(i % 3) * 0.05} className="card">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-navy-800 text-accent-cyan">
                <Icon name="shield" size={18} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  const t = useTranslations('about.cta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
