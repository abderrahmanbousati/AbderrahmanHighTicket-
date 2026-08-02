import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Icon } from './Icon';
import { MotionReveal } from './MotionReveal';

/** Reusable final call-to-action band used across pages. */
export function CTASection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const t = useTranslations('cta');

  return (
    <section className="section">
      <div className="container-hs">
        <MotionReveal className="panel-ring relative overflow-hidden px-6 py-20 sm:px-14 sm:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-100 bg-grid-faint bg-[size:44px_44px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="rule-gold mx-auto mb-8" />
            <h2 className="heading-lg text-gradient">{title}</h2>
            <p className="lead mt-6">{subtitle}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                {t('bookCall')}
                <Icon name="arrow" size={16} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
