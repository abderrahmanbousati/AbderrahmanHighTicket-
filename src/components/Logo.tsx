import { Link } from '@/i18n/routing';

/**
 * Temporary text-based logo + "HS" monogram.
 * Replace with an SVG file later by swapping the markup below.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="HighSystem — home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-black text-sm font-extrabold tracking-tight text-white transition-transform group-hover:scale-105">
        HS
      </span>
      <span className="text-lg font-bold tracking-tight text-ink-white">
        High<span className="text-ink-muted">System</span>
      </span>
    </Link>
  );
}
