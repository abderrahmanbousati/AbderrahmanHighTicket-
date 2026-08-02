'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { receiptUpload, isAcceptedReceiptMime } from '@/config/payments';
import { Icon } from '@/components/Icon';

export function ManualPaymentForm({ token }: { token: string }) {
  const t = useTranslations('payment.manual');
  const tterms = useTranslations('payment.terms');
  const tm = useTranslations('payment.methods');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorKey(null);
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('receipt') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      if (file.size > receiptUpload.maxBytes) {
        setErrorKey('fileTooLarge');
        return;
      }
      if (!isAcceptedReceiptMime(file.type)) {
        setErrorKey('fileType');
        return;
      }
    }

    const data = new FormData(form);
    data.set('acceptTerms', (form.elements.namedItem('acceptTerms') as HTMLInputElement).checked ? 'true' : 'false');
    if (token) data.set('token', token);

    setStatus('submitting');
    try {
      const res = await fetch('/api/payment/manual', { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6">
        <div className="flex items-center gap-3">
          <Icon name="check" size={20} className="text-amber-300" />
          <p className="text-sm text-amber-100">{t('success')}</p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">{t('fullName')}</label>
          <input name="fullName" required className="field-input" />
        </div>
        <div>
          <label className="field-label">{t('companyName')}</label>
          <input name="companyName" required className="field-input" />
        </div>
        <div>
          <label className="field-label">{t('invoiceRef')}</label>
          <input name="invoiceRef" required className="field-input" />
        </div>
        <div>
          <label className="field-label">{t('amountPaid')}</label>
          <input name="amountPaid" required className="field-input" inputMode="decimal" />
        </div>
        <div>
          <label className="field-label">{t('paymentDate')}</label>
          <input name="paymentDate" required type="date" className="field-input" />
        </div>
        <div>
          <label className="field-label">{t('method')}</label>
          <select name="method" required className="field-input" defaultValue="bank_transfer">
            <option value="bank_transfer">{tm('bank_transfer')}</option>
            <option value="cashplus">Cash Plus</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">{t('transactionRef')}</label>
          <input name="transactionRef" required className="field-input" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">{t('receipt')}</label>
          <input
            name="receipt"
            type="file"
            accept={receiptUpload.acceptedExtensions.join(',')}
            className="field-input file:mr-3 file:rounded-md file:border-0 file:bg-accent-blue/20 file:px-3 file:py-1 file:text-sm file:text-accent-cyan"
          />
          <p className="mt-1 text-xs text-ink-muted">{t('receiptHint')}</p>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">{t('message')}</label>
          <textarea name="message" rows={2} className="field-input" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-light">
        <input name="acceptTerms" type="checkbox" required className="mt-1 h-4 w-4 flex-none accent-[#2563EB]" />
        <span>{tterms('accept')}</span>
      </label>

      {errorKey && <p className="field-error">{t(errorKey)}</p>}
      {status === 'error' && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t('error')}
        </p>
      )}

      <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
