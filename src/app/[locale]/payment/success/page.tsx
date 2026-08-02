import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';

export const metadata = { robots: { index: false, follow: false } };

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  const { ref } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('payment.success');

  return (
    <section className="section">
      <div className="container-hs flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-emerald-500/40 bg-emerald-500/[0.06] p-8 text-center sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
            <Icon name="check" size={28} />
          </span>
          <h1 className="heading-md mt-6">{t('title')}</h1>
          <p className="lead mt-4">{t('subtitle')}</p>
          {ref && (
            <p className="mt-4 text-sm text-ink-muted">
              {t('reference')}: <span className="font-mono text-ink-light">{ref}</span>
            </p>
          )}
          <Link href="/" className="btn-secondary mt-8">
            {t('back')}
          </Link>
        </div>
      </div>
    </section>
  );
}
