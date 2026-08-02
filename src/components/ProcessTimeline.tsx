import { useTranslations } from 'next-intl';
import { Icon } from './Icon';
import { MotionReveal } from './MotionReveal';

type Phase = { name: string; items: string[] };

/** Four-phase timeline (Diagnose / Build / Launch / Optimize). Reused on home + program pages. */
export function ProcessTimeline({ namespace }: { namespace: 'home.program' }) {
  const t = useTranslations(namespace);
  const tc = useTranslations('common');
  const phases: Phase[] = t.raw('phases');

  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {phases.map((phase, i) => (
        <MotionReveal as="li" key={phase.name} delay={i * 0.08} className="card card-hover relative flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              {tc('phase')} {i + 1}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-navy-800 text-sm font-bold text-accent-cyan">
              {i + 1}
            </span>
          </div>
          <h3 className="heading-md mt-3 text-xl">{phase.name}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {phase.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink-light">
                <Icon name="check" size={14} className="mt-0.5 flex-none text-accent-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </MotionReveal>
      ))}
    </ol>
  );
}
