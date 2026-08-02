import { Link } from '@/i18n/routing';

/**
 * HighSysteme brand mark — geometric "H" monogram.
 * The H = two vertical bars (system / structure) + an upward crossbar
 * (growth / elevation), with chamfered outer-top corners.
 * Uses currentColor so it inherits the surrounding text color.
 * To replace with a supplied asset, swap the <svg> below for an <img>.
 */
export function HMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="HighSysteme"
    >
      {/* left bar, top-left chamfer */}
      <path d="M8 56 V18 L18 8 H22 V56 Z" />
      {/* right bar, top-right chamfer */}
      <path d="M56 56 V18 L46 8 H42 V56 Z" />
      {/* crossbar, rising to the right (growth) */}
      <path d="M22 44 V34 L42 26 V36 Z" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="HighSysteme — home"
    >
      <HMark className="h-8 w-8 text-ink-white transition-transform group-hover:scale-105" />
      <span className="text-lg tracking-[0.02em] text-ink-white">
        <span className="font-bold">HIGH</span>
        <span className="font-light text-ink-muted">SYSTEME</span>
      </span>
    </Link>
  );
}
