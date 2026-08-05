import { useTranslations } from 'next-intl';
import { stats } from '@/config/stats';
import { MotionReveal } from './MotionReveal';

/** Results / social-proof strip: owner-provided performance metrics. */
export function ResultsStrip() {
  const t = useTranslations('home.results');

  return (
    <section className="border-y border-line/60 bg-navy-800/40">
      <div className="container-hs py-16 sm:py-20">
        <MotionReveal className="text-center">
          <span className="eyebrow">
            <span className="rule-gold w-6" />
            {t('eyebrow')}
          </span>
          <h2 className="heading-md mt-4">{t('title')}</h2>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 sm:gap-y-12 md:grid-cols-5 md:gap-y-0">
          {stats.map((stat, i) => (
            <MotionReveal
              key={stat.labelKey}
              delay={i * 0.07}
              className={`px-4 text-center ${
                i > 0 ? 'md:border-s md:border-line' : ''
              }`}
            >
              <div className="text-4xl font-bold tracking-tight text-ink-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm leading-snug text-ink-muted">
                {t(`stats.${stat.labelKey}`)}
              </div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ink-light">
            {t('note')}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
