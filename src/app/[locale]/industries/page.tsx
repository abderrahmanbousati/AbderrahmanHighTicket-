import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon, type IconName } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MotionReveal } from '@/components/MotionReveal';
import { industries } from '@/content/industries';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.industries' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/industries',
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <IndustriesHero />
      <IndustryDetails />
      <IndustriesCta />
    </>
  );
}

function IndustriesHero() {
  const t = useTranslations('industries.hero');
  return (
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Industries">
        <IndustryChips />
      </nav>
    </PageHero>
  );
}

function IndustryChips() {
  const t = useTranslations('industries.items');
  return (
    <>
      {industries.map((ind) => (
        <a
          key={ind.slug}
          href={`#${ind.slug}`}
          className="rounded-full border border-line bg-navy-800/60 px-3.5 py-1.5 text-xs font-medium text-ink-light transition-colors hover:border-accent-cyan/60 hover:text-ink-white"
        >
          {t(`${ind.slug}.name`)}
        </a>
      ))}
    </>
  );
}

function IndustryDetails() {
  const t = useTranslations('industries.items');
  const d = useTranslations('industries.detail');
  const tc = useTranslations('cta');

  return (
    <div>
      {industries.map((ind, idx) => {
        const challenges: string[] = t.raw(`${ind.slug}.challenges`);
        const opportunities: string[] = t.raw(`${ind.slug}.opportunities`);
        const channels: string[] = t.raw(`${ind.slug}.channels`);
        const kpis: string[] = t.raw(`${ind.slug}.kpis`);
        return (
          <section
            key={ind.slug}
            id={ind.slug}
            className={`scroll-mt-24 border-t border-line/60 py-16 sm:py-20 ${
              idx % 2 === 1 ? 'bg-navy-800/40' : ''
            }`}
          >
            <div className="container-hs">
              <MotionReveal className="flex items-center gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-line bg-navy-800 text-accent-cyan">
                  <Icon name={ind.icon as IconName} size={24} />
                </span>
                <div>
                  <h2 className="heading-md text-2xl">{t(`${ind.slug}.name`)}</h2>
                </div>
              </MotionReveal>
              <MotionReveal delay={0.05}>
                <p className="lead mt-4 max-w-3xl">{t(`${ind.slug}.short`)}</p>
              </MotionReveal>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <DetailCard title={d('challenges')} items={challenges} kind="list" />
                <DetailCard title={d('opportunities')} items={opportunities} kind="check" />
                <DetailCard title={d('channels')} items={channels} kind="check" />
                <DetailBlock title={d('system')} text={t(`${ind.slug}.system`)} />
                <DetailBlock title={d('conversion')} text={t(`${ind.slug}.conversion`)} />
                <DetailCard title={d('kpis')} items={kpis} kind="check" />
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  {tc('bookCall')}
                  <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function DetailCard({
  title,
  items,
  kind,
}: {
  title: string;
  items: string[];
  kind: 'list' | 'check';
}) {
  return (
    <MotionReveal className="card">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-light">
            {kind === 'check' ? (
              <Icon name="check" size={14} className="mt-0.5 flex-none text-accent-cyan" />
            ) : (
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-blue" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </MotionReveal>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <MotionReveal className="card border-accent-blue/30 bg-accent-blue/[0.05]">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-cyan">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-light">{text}</p>
    </MotionReveal>
  );
}

function IndustriesCta() {
  const t = useTranslations('industries.cta');
  return <CTASection title={t('title')} subtitle={t('subtitle')} />;
}
