import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading, CheckList } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.program' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/highsystem-90',
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ProgramHero />
      <Audience />
      <Problems />
      <Methodology />
      <Deliverables />
      <Engagement />
      <Investment />
      <Faq />
      <ProgramCta />
    </>
  );
}

function ProgramHero() {
  const t = useTranslations('program.hero');
  return <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />;
}

function Audience() {
  const t = useTranslations('program');
  const forItems: string[] = t.raw('whoFor.items');
  const notForItems: string[] = t.raw('whoNotFor.items');
  return (
    <section className="section">
      <div className="container-hs grid gap-5 md:grid-cols-2">
        <MotionReveal className="rounded-2xl border border-accent-blue/40 bg-accent-blue/[0.06] p-8">
          <h2 className="heading-md text-xl">{t('whoFor.title')}</h2>
          <CheckList items={forItems} className="mt-6" />
        </MotionReveal>
        <MotionReveal delay={0.08} className="rounded-2xl border border-line bg-navy-800/50 p-8">
          <h2 className="heading-md text-xl">{t('whoNotFor.title')}</h2>
          <ul className="mt-6 space-y-3">
            {notForItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-light">
                <Icon name="close" size={16} className="mt-1 flex-none text-ink-muted" />
                {item}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}

function Problems() {
  const t = useTranslations('program.problems');
  const items: string[] = t.raw('items');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading title={t('title')} align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <MotionReveal key={item} delay={(i % 2) * 0.05} className="card flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent-blue" />
              <p className="text-ink-light">{item}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  const t = useTranslations('program.methodology');
  return (
    <section className="section">
      <div className="container-hs">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} align="center" />
        <div className="mt-12">
          <ProcessTimeline namespace="home.program" />
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  const t = useTranslations('program.deliverables');
  const items: string[] = t.raw('items');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading title={t('title')} align="center" />
        <MotionReveal className="mx-auto mt-10 max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-blue/15 text-accent-cyan">
                  <Icon name="check" size={13} />
                </span>
                <span className="text-ink-light">{item}</span>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

function Engagement() {
  const t = useTranslations('program');
  const blocks = [
    { title: t('responsibilities.title'), items: t.raw('responsibilities.items') as string[] },
    { title: t('communication.title'), items: t.raw('communication.items') as string[] },
    { title: t('reporting.title'), items: t.raw('reporting.items') as string[] },
    { title: t('qualification.title'), items: t.raw('qualification.items') as string[], intro: t('qualification.intro') },
  ];
  return (
    <section className="section">
      <div className="container-hs grid gap-5 md:grid-cols-2">
        {blocks.map((block, i) => (
          <MotionReveal key={block.title} delay={(i % 2) * 0.06} className="card">
            <h2 className="text-lg font-semibold text-ink-white">{block.title}</h2>
            {'intro' in block && block.intro ? (
              <p className="mt-2 text-sm text-ink-muted">{block.intro}</p>
            ) : null}
            <CheckList items={block.items} className="mt-4" />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

function Investment() {
  const t = useTranslations('program.investment');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <MotionReveal className="mx-auto max-w-2xl rounded-3xl border border-line bg-navy-900/60 p-8 text-center sm:p-12">
          <h2 className="heading-md">{t('title')}</h2>
          <p className="lead mt-5">{t('text')}</p>
          <p className="mt-4 text-sm text-ink-muted">{t('note')}</p>
        </MotionReveal>
      </div>
    </section>
  );
}

function Faq() {
  const t = useTranslations('program.faq');
  const items: { q: string; a: string }[] = t.raw('items');
  return (
    <section className="section">
      <div className="container-hs">
        <SectionHeading title={t('title')} align="center" />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {items.map((item, i) => (
            <MotionReveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-2xl border border-line bg-navy-800/50 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-ink-white">
                  {item.q}
                  <Icon
                    name="arrow"
                    size={16}
                    className="flex-none rotate-90 text-accent-cyan transition-transform group-open:-rotate-90"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-ink-light">{item.a}</p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCta() {
  const t = useTranslations('program.cta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
