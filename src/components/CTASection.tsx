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
        <MotionReveal className="relative overflow-hidden rounded-3xl border border-line bg-navy-800 px-6 py-16 sm:px-14 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(600px circle at 20% 0%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(500px circle at 90% 100%, rgba(56,189,248,0.12), transparent 55%)',
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">{title}</h2>
            <p className="lead mt-5">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
