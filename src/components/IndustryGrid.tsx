import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { industries } from '@/content/industries';
import { Icon, type IconName } from './Icon';
import { MotionReveal } from './MotionReveal';

/** Grid of industry cards. Used on the home page and the industries page. */
export function IndustryGrid() {
  const t = useTranslations('industries.items');
  const tc = useTranslations('common');

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry, i) => (
        <MotionReveal
          as="article"
          key={industry.slug}
          delay={(i % 3) * 0.06}
          className="card card-hover group flex flex-col"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-navy-800 text-accent-cyan">
            <Icon name={industry.icon as IconName} size={22} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-ink-white">
            {t(`${industry.slug}.name`)}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
            {t(`${industry.slug}.short`)}
          </p>
          <Link
            href={`/industries#${industry.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:gap-2.5"
          >
            {tc('learnMoreAbout')} {t(`${industry.slug}.name`)}
            <Icon name="arrow" size={14} className="rtl:-scale-x-100" />
          </Link>
        </MotionReveal>
      ))}
    </div>
  );
}
