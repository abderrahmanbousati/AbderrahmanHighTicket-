'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import {
  contactSchema,
  type ContactFormValues,
  investmentRanges,
  teamSizes,
  contactMethods,
  preferredLanguages,
  formCurrencies,
} from '@/lib/validation';
import { Icon } from './Icon';
import { Link } from '@/i18n/routing';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tv = useTranslations('contact.validation');
  const tc = useTranslations('contact');
  const tf = useTranslations('footer');
  const locale = useLocale();

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredLanguage: locale as 'fr' | 'en' | 'ar',
      currency: 'MAD',
    },
  });

  // Revenue/investment ranges are labeled in the selected currency.
  const currency = (watch('currency') ?? 'MAD') as 'MAD' | 'EUR' | 'USD';

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  }

  const err = (key: keyof ContactFormValues) =>
    errors[key] ? <p className="field-error">{tv(errors[key]?.message as string)}</p> : null;

  if (status === 'success') {
    return <SuccessPanel />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register('company_website_hp')}
      />

      <Fieldset legend={t('sectionYou')}>
        <Field label={t('fullName')} error={err('fullName')}>
          <input className="field-input" {...register('fullName')} autoComplete="name" />
        </Field>
        <Field label={t('companyName')} error={err('companyName')}>
          <input className="field-input" {...register('companyName')} autoComplete="organization" />
        </Field>
        <Field label={t('jobTitle')} error={err('jobTitle')}>
          <input className="field-input" {...register('jobTitle')} autoComplete="organization-title" />
        </Field>
        <Field label={t('email')} error={err('email')}>
          <input className="field-input" type="email" {...register('email')} autoComplete="email" />
        </Field>
        <Field label={t('phone')} error={err('phone')}>
          <input className="field-input" type="tel" {...register('phone')} autoComplete="tel" />
        </Field>
        <Field label={`${t('website')} ${t('optional')}`} error={err('website')}>
          <input className="field-input" {...register('website')} placeholder="https://" />
        </Field>
        <Field label={t('country')} error={err('country')}>
          <input className="field-input" {...register('country')} autoComplete="country-name" />
        </Field>
        <Field label={t('industry')} error={err('industry')}>
          <input className="field-input" {...register('industry')} />
        </Field>
      </Fieldset>

      <Fieldset legend={t('sectionBusiness')}>
        <Field label={t('currency')} error={err('currency')}>
          <select className="field-input" {...register('currency')}>
            {formCurrencies.map((r) => (
              <option key={r} value={r}>{t(`currencyOptions.${r}`)}</option>
            ))}
          </select>
        </Field>
        <Field label={t('revenue')} error={err('revenue')}>
          <select className="field-input" {...register('revenue')} defaultValue="">
            <option value="" disabled>{t('select')}</option>
            {(['tier1', 'tier2', 'tier3', 'tier4'] as const).map((r) => (
              <option key={r} value={r}>{t(`revenueOptions.${currency}.${r}`)}</option>
            ))}
          </select>
        </Field>
        <Field label={t('investment')} error={err('investment')}>
          <select className="field-input" {...register('investment')} defaultValue="">
            <option value="" disabled>{t('select')}</option>
            {investmentRanges.map((r) => (
              <option key={r} value={r}>{t(`investmentOptions.${currency}.${r}`)}</option>
            ))}
          </select>
        </Field>
        <Field label={t('teamSize')} error={err('teamSize')}>
          <select className="field-input" {...register('teamSize')} defaultValue="">
            <option value="" disabled>{t('select')}</option>
            {teamSizes.map((r) => (
              <option key={r} value={r}>{t(`teamSizeOptions.${r}`)}</option>
            ))}
          </select>
        </Field>
        <Field label={t('marketingSituation')} error={err('marketingSituation')} full>
          <textarea className="field-input min-h-[90px]" rows={3} {...register('marketingSituation')} />
        </Field>
        <Field label={t('challenge')} error={err('challenge')} full>
          <textarea className="field-input min-h-[90px]" rows={3} {...register('challenge')} />
        </Field>
        <Field label={t('objective')} error={err('objective')} full>
          <textarea className="field-input min-h-[90px]" rows={3} {...register('objective')} />
        </Field>
      </Fieldset>

      <Fieldset legend={t('sectionPreferences')}>
        <Field label={t('preferredLanguage')} error={err('preferredLanguage')}>
          <select className="field-input" {...register('preferredLanguage')}>
            {preferredLanguages.map((r) => (
              <option key={r} value={r}>{t(`languageOptions.${r}`)}</option>
            ))}
          </select>
        </Field>
        <Field label={t('contactMethod')} error={err('contactMethod')}>
          <select className="field-input" {...register('contactMethod')} defaultValue="">
            <option value="" disabled>{t('select')}</option>
            {contactMethods.map((r) => (
              <option key={r} value={r}>{t(`contactMethodOptions.${r}`)}</option>
            ))}
          </select>
        </Field>
      </Fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-light">
          <input type="checkbox" className="mt-1 h-4 w-4 flex-none accent-black" {...register('consent')} />
          <span>
            {tc('consent')}{' '}
            <Link href="/privacy" className="text-accent-cyan underline">
              {tf('privacy')}
            </Link>
          </span>
        </label>
        {err('consent')}
      </div>

      {status === 'error' && (
        <p className="rounded-xl border border-red-500/40 bg-red-50 px-4 py-3 text-sm text-red-700">
          {tc('error')}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('submitting') : t('submit')}
        {status !== 'submitting' && <Icon name="arrow" size={16} className="rtl:-scale-x-100" />}
      </button>
    </form>
  );
}

function SuccessPanel() {
  const t = useTranslations('contact.success');
  const steps: string[] = t.raw('steps');
  return (
    <div className="rounded-3xl border border-accent-blue/40 bg-accent-blue/[0.06] p-8 sm:p-12">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-blue/20 text-accent-cyan">
        <Icon name="check" size={26} />
      </span>
      <h2 className="heading-md mt-6">{t('title')}</h2>
      <p className="lead mt-4">{t('subtitle')}</p>
      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">{t('next')}</h3>
        <ol className="mt-4 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-ink-light">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-full border border-line bg-navy-800 text-xs font-bold text-accent-cyan">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-cyan">
        {legend}
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string;
  error: React.ReactNode;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="field-label">{label}</label>
      {children}
      {error}
    </div>
  );
}
