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
    <section className="relative overflow-hidden border-b border-line/60">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-[size:48px_48px] opacity-[0.05]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-50"
        style={{
          background:
            'radial-gradient(700px circle at 50% -10%, rgba(37,99,235,0.16), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container-hs py-16 sm:py-24">
        <MotionReveal className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            {eyebrow}
          </span>
          <h1 className="heading-xl mt-5">{title}</h1>
          {subtitle ? <p className="lead mt-6">{subtitle}</p> : null}
          {children}
        </MotionReveal>
      </div>
    </section>
  );
}
