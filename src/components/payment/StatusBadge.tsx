import { useTranslations } from 'next-intl';
import type { PaymentStatus } from '@/config/payments';

const styles: Record<PaymentStatus, string> = {
  draft: 'border-line bg-neutral-100 text-ink-muted',
  awaiting_payment: 'border-amber-500/50 bg-amber-50 text-amber-700',
  pending_verification: 'border-amber-500/50 bg-amber-50 text-amber-700',
  partially_paid: 'border-black/20 bg-neutral-100 text-ink-white',
  paid: 'border-emerald-600/40 bg-emerald-50 text-emerald-700',
  failed: 'border-red-500/40 bg-red-50 text-red-700',
  cancelled: 'border-line bg-neutral-100 text-ink-muted',
  refunded: 'border-line bg-neutral-100 text-ink-light',
  overdue: 'border-red-500/40 bg-red-50 text-red-700',
};

export function StatusBadge({ status }: { status: PaymentStatus }) {
  const t = useTranslations('payment.statuses');
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(status)}
    </span>
  );
}
