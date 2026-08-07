import type { ReactNode } from 'react';
import { MotionReveal } from './MotionReveal';

/** Standard internal-page hero with eyebrow, title and subtitle. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip border-b border-line/60">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-[size:48px_48px] opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64"
        style={{
          background:
            'radial-gradient(700px circle at 50% -10%, rgba(10,10,10,0.05), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container-hs py-16 sm:py-24">
        <MotionReveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="rule-gold w-6" />
            {eyebrow}
          </span>
          <h1 className="heading-xl mt-6 text-gradient">{title}</h1>
          <div className="rule-gold mt-7" />
          {subtitle ? <p className="lead mt-7">{subtitle}</p> : null}
          {children}
        </MotionReveal>
      </div>
    </section>
  );
}
