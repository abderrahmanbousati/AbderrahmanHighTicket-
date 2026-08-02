import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';

export const metadata = { robots: { index: false, follow: false } };

/**
 * Client payment portal — ARCHITECTURE / gated view.
 * A real deployment plugs authenticated access (or a tokenized private link)
 * and reads the client's payments from the store/DB. Ships gated so no client
 * or payment information is ever exposed publicly.
 */
export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('portal');
  const labels = t.raw('labels') as Record<string, string>;

  return (
    <>
      <PageHero eyebrow={t('title')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section">
        <div className="container-hs">
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-navy-800/60 p-8 text-center sm:p-12">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-blue/15 text-accent-cyan">
              <Icon name="shield" size={24} />
            </span>
            <p className="lead mt-6">{t('gate')}</p>
            <Link href="/contact" className="btn-primary mt-8">
              {t('subtitle')}
            </Link>
          </div>

          {/* Portal sections the authenticated view will render */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(labels).map(([key, label]) => (
              <div key={key} className="card opacity-70">
                <div className="flex items-center gap-2 text-sm font-medium text-ink-white">
                  <Icon name="chart" size={16} className="text-accent-cyan" />
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
