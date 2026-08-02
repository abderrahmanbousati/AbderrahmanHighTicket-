import { useTranslations } from 'next-intl';
import type { PaymentStatus } from '@/config/payments';

const styles: Record<PaymentStatus, string> = {
  draft: 'border-line bg-navy-800 text-ink-muted',
  awaiting_payment: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  pending_verification: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  partially_paid: 'border-accent-blue/40 bg-accent-blue/10 text-accent-cyan',
  paid: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  failed: 'border-red-500/40 bg-red-500/10 text-red-300',
  cancelled: 'border-line bg-navy-800 text-ink-muted',
  refunded: 'border-line bg-navy-800 text-ink-light',
  overdue: 'border-red-500/40 bg-red-500/10 text-red-300',
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
