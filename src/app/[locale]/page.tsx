import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getPublishedCaseStudies } from '@/content/case-studies';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { HeroVisual } from '@/components/HeroVisual';
import { SystemDiagram } from '@/components/SystemDiagram';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { IndustryGrid } from '@/components/IndustryGrid';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { ResultsStrip } from '@/components/ResultsStrip';
import { GrowthSection } from '@/components/GrowthSection';
import { FounderCard } from '@/components/FounderCard';
import { SectionHeading, CheckList } from '@/components/ui';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ResultsStrip />
      <Problem />
      <Transformation />
      <GrowthSection />
      <ProgramPreview />
      <SystemSection />
      <IndustriesSection />
      <WhySection />
      <FounderSection />
      <CaseStudiesSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  const t = useTranslations('home.hero');
  const tc = useTranslations('cta');
  const tag = useTranslations('meta')('tagline');
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-[size:48px_48px] opacity-60"
        aria-hidden="true"
      />
      <div className="container-hs grid items-center gap-12 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div>
          <MotionReveal>
            <span className="eyebrow">
              <span className="rule-gold w-6" />
              {t('eyebrow')}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.05}>
            <h1 className="heading-xl mt-6 text-gradient">{t('title')}</h1>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <p className="lead mt-7 max-w-xl">{t('subtitle')}</p>
          </MotionReveal>
          <MotionReveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                {tc('bookCall')}
                <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
              </Link>
              <Link href="/highsystem-90" className="btn-secondary">
                {tc('exploreProgram')}
              </Link>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p dir="ltr" className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted rtl:text-right">
              {tag}
            </p>
          </MotionReveal>
        </div>
        <MotionReveal delay={0.2} className="order-first lg:order-last">
          <HeroVisual />
        </MotionReveal>
      </div>
    </section>
  );
}

function Problem() {
  const t = useTranslations('home.problem');
  const items: string[] = t.raw('items');
  return (
    <section className="section border-t border-line/60">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item} delay={(i % 3) * 0.05} className="card flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent-blue" />
              <p className="text-ink-light">{item}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  const t = useTranslations('home.transformation');
  const tc = useTranslations('common');
  const before: string[] = t.raw('beforeItems');
  const after: string[] = t.raw('afterItems');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <MotionReveal className="rounded-2xl border border-line bg-navy-900/60 p-7">
            <h3 className="text-lg font-semibold text-ink-muted">{tc('before')}</h3>
            <ul className="mt-5 space-y-3">
              {before.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink-light">
                  <Icon name="close" size={16} className="flex-none text-ink-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.08} className="rounded-2xl border border-accent-blue/40 bg-accent-blue/[0.06] p-7">
            <h3 className="text-lg font-semibold text-ink-white">{tc('after')}</h3>
            <CheckList items={after} className="mt-5" />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

function ProgramPreview() {
  const t = useTranslations('home.program');
  const tc = useTranslations('cta');
  return (
    <section className="section">
      <div className="container-hs">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
          <Link href="/highsystem-90" className="btn-secondary flex-none">
            {tc('viewProgram')}
            <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-12">
          <ProcessTimeline namespace="home.program" />
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  const t = useTranslations('home.systemDiagram');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="center" />
        <div className="mt-14">
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const t = useTranslations('home.industries');
  return (
    <section className="section">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12">
          <IndustryGrid />
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const t = useTranslations('home.why');
  const items: { title: string; text: string }[] = t.raw('items');
  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MotionReveal key={item.title} delay={(i % 3) * 0.05} className="card">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-navy-800 text-accent-cyan">
                <Icon name="spark" size={18} />
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

function FounderSection() {
  const t = useTranslations('home.founder');
  return (
    <section className="section">
      <div className="container-hs">
        <FounderCard eyebrow={t('eyebrow')} />
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const t = useTranslations('home.caseStudies');
  const ti = useTranslations('industries.items');
  const locale = useLocale() as Locale;
  const cases = getPublishedCaseStudies();

  return (
    <section className="section bg-navy-800/40">
      <div className="container-hs">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="center" />

        {cases.length === 0 ? (
          <MotionReveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-line bg-navy-900/40 p-8 text-center">
            <p className="text-ink-muted">{t('emptyState')}</p>
          </MotionReveal>
        ) : (
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <MotionReveal
                as="article"
                key={c.slug}
                delay={(i % 3) * 0.08}
                className="card card-hover flex flex-col"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-white">
                    {ti(`${c.industryKey}.name`)}
                  </span>
                  <span className="text-xs text-ink-muted">
                    {c.durationDays} {t('labels.days')}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-ink-white">
                  {c.clientName?.[locale] ?? t('labels.confidential')}
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      {t('labels.before')}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-light">{c.challenge[locale]}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      {t('labels.system')}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-light">
                      {c.systemImplemented[locale]}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-black/15 bg-neutral-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-white">
                    {t('labels.after')}
                  </p>
                  <p className="mt-1 font-semibold text-ink-white">{c.mainResult[locale]}</p>
                </div>

                {c.testimonial?.[locale] ? (
                  <blockquote className="mt-5 border-s-2 border-black/20 ps-4 text-sm italic text-ink-light">
                    “{c.testimonial[locale]}”
                    {c.testimonialAuthor?.[locale] ? (
                      <footer className="mt-1 not-italic text-xs text-ink-muted">
                        — {c.testimonialAuthor[locale]}
                      </footer>
                    ) : null}
                  </blockquote>
                ) : null}
              </MotionReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FinalCta() {
  const t = useTranslations('home.finalCta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
