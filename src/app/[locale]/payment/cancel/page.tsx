import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';

export const metadata = { robots: { index: false, follow: false } };

export default async function PaymentCancelPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('payment.cancel');

  return (
    <section className="section">
      <div className="container-hs flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-line bg-navy-800/60 p-8 text-center sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-navy-700 text-ink-muted">
            <Icon name="close" size={28} />
          </span>
          <h1 className="heading-md mt-6">{t('title')}</h1>
          <p className="lead mt-4">{t('subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {token && (
              <Link href={`/payment?token=${encodeURIComponent(token)}`} className="btn-primary">
                {t('retry')}
              </Link>
            )}
            <Link href="/" className="btn-secondary">
              {t('back')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
