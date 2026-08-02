import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { PaymentMethods } from '@/components/payment/PaymentMethods';
import { ManualPaymentForm } from '@/components/payment/ManualPaymentForm';
import { StatusBadge } from '@/components/payment/StatusBadge';
import { buildMetadata } from '@/lib/seo';
import { verifyPaymentToken, formatAmount } from '@/lib/payment-link';
import { getManualPaymentDetails, paymentProviders } from '@/config/payments';
import { getPayment } from '@/lib/store';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.payment' });
  return {
    ...buildMetadata({
      locale: locale as Locale,
      title: t('title'),
      description: t('description'),
      path: '/payment',
    }),
    robots: { index: false, follow: false },
  };
}

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);

  let payload = null;
  try {
    payload = token ? verifyPaymentToken(token) : null;
  } catch {
    payload = null;
  }

  if (!payload || !token) {
    return <PaymentGate />;
  }

  const t = await getTranslations({ locale, namespace: 'payment' });
  const record = getPayment(payload.ref);
  const manual = getManualPaymentDetails();
  const hasBank = Boolean(manual.bank.rib || manual.bank.iban);
  const hasCashplus = Boolean(manual.cashplus.recipientName);

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section">
        <div className="container-hs grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Summary */}
          <div className="card lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink-white">{payload.offer}</h2>
              {record && <StatusBadge status={record.status} />}
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label={t('summary.client')} value={payload.client} />
              <Row label={t('summary.type')} value={t(`types.${payload.type}`)} />
              <Row label={t('summary.invoiceRef')} value={payload.ref} />
              <div className="divider-gradient my-2" />
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">{t('summary.amount')}</dt>
                <dd className="text-xl font-bold text-ink-white">
                  {formatAmount(payload.amountMinor, payload.currency)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Methods + manual */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-lg font-semibold text-ink-white">{t('methods.title')}</h2>
              <div className="mt-5">
                <PaymentMethods
                  token={token}
                  stripeEnabled={paymentProviders.stripe.enabled}
                  paypalEnabled={paymentProviders.paypal.enabled}
                />
              </div>
            </div>

            {/* Bank transfer */}
            <div className="card">
              <h3 className="text-base font-semibold text-ink-white">{t('bank.title')}</h3>
              {hasBank ? (
                <dl className="mt-4 space-y-2.5 text-sm">
                  {manual.bank.accountHolder && <Row label={t('bank.beneficiary')} value={manual.bank.accountHolder} />}
                  {manual.bank.name && <Row label={t('bank.bankName')} value={manual.bank.name} />}
                  {manual.bank.rib && <Row label={t('bank.rib')} value={manual.bank.rib} mono />}
                  {manual.bank.iban && <Row label={t('bank.iban')} value={manual.bank.iban} mono />}
                  {manual.bank.swift && <Row label={t('bank.swift')} value={manual.bank.swift} mono />}
                  <Row label={t('bank.reference')} value={payload.ref} mono />
                </dl>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">{t('bank.notConfigured')}</p>
              )}
              <p className="mt-4 text-xs text-ink-muted">{t('bank.note')}</p>
            </div>

            {/* Cash Plus */}
            <div className="card">
              <h3 className="text-base font-semibold text-ink-white">{t('cashplus.title')}</h3>
              {hasCashplus ? (
                <dl className="mt-4 space-y-2.5 text-sm">
                  <Row label={t('cashplus.recipient')} value={manual.cashplus.recipientName} />
                  <Row label={t('bank.reference')} value={payload.ref} mono />
                </dl>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">{t('cashplus.notConfigured')}</p>
              )}
              <p className="mt-4 text-xs text-ink-muted">{t('cashplus.note')}</p>
            </div>

            {/* Manual confirmation form */}
            <div className="card">
              <h3 className="text-base font-semibold text-ink-white">{t('manual.title')}</h3>
              <p className="mt-2 text-sm text-ink-muted">{t('manual.subtitle')}</p>
              <div className="mt-6">
                <ManualPaymentForm token={token} />
              </div>
            </div>

            <p className="text-xs text-ink-muted">
              <Link href="/terms" className="text-accent-cyan underline">
                {t('terms.link')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={`text-ink-white ${mono ? 'font-mono text-xs' : ''}`}>{value}</dd>
    </div>
  );
}

async function PaymentGate() {
  const t = await getTranslations('payment');
  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="section">
        <div className="container-hs">
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-navy-800/60 p-8 text-center sm:p-12">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-blue/15 text-accent-cyan">
              <Icon name="shield" size={24} />
            </span>
            <h2 className="heading-md mt-6">{t('gate.title')}</h2>
            <p className="lead mt-4">{t('gate.text')}</p>
            <p className="mt-4 text-sm text-ink-muted">{t('gate.support')}</p>
            <Link href="/contact" className="btn-primary mt-8">
              {t('gate.cta')}
              <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
