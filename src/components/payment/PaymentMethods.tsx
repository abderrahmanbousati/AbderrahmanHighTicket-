'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from '@/components/Icon';

type Props = {
  token: string;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
};

export function PaymentMethods({ token, stripeEnabled, paypalEnabled }: Props) {
  const t = useTranslations('payment.methods');
  const tterms = useTranslations('payment.terms');
  const locale = useLocale();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  async function pay(method: 'stripe' | 'paypal') {
    if (!accepted) {
      setTermsError(true);
      return;
    }
    setError(false);
    setLoading(method);
    try {
      const res = await fetch('/api/payment/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, method, locale }),
      });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) throw new Error();
      window.location.href = data.url;
    } catch {
      setError(true);
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <OnlineButton
          label={t('stripe')}
          enabled={stripeEnabled}
          loading={loading === 'stripe'}
          disabledLabel={t('disabled')}
          onClick={() => pay('stripe')}
          icon="shield"
        />
        <OnlineButton
          label={t('paypal')}
          enabled={paypalEnabled}
          loading={loading === 'paypal'}
          disabledLabel={t('disabled')}
          onClick={() => pay('paypal')}
          icon="globe"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-light">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 flex-none accent-black"
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked);
            if (e.target.checked) setTermsError(false);
          }}
        />
        <span>{tterms('accept')}</span>
      </label>
      {termsError && <p className="field-error">{tterms('required')}</p>}
      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t('disabled')}
        </p>
      )}
    </div>
  );
}

function OnlineButton({
  label,
  enabled,
  loading,
  disabledLabel,
  onClick,
  icon,
}: {
  label: string;
  enabled: boolean;
  loading: boolean;
  disabledLabel: string;
  onClick: () => void;
  icon: 'shield' | 'globe';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled || loading}
      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-navy-800 px-4 py-3.5 text-start text-sm font-medium text-ink-white transition-colors hover:border-accent-blue/60 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="flex items-center gap-2.5">
        <Icon name={icon} size={18} className="text-accent-cyan" />
        {label}
      </span>
      {enabled ? (
        <Icon name="arrow" size={16} className="text-ink-muted rtl:-scale-x-100" />
      ) : (
        <span className="text-xs text-ink-muted">{disabledLabel}</span>
      )}
    </button>
  );
}
