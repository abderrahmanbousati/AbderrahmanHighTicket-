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
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-navy-700 text-sm font-extrabold tracking-tight text-ink-white transition-colors group-hover:border-accent-blue/60">
        <span className="bg-gradient-to-br from-ink-white to-accent-cyan bg-clip-text text-transparent">
          HS
        </span>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink-white">
        High<span className="text-accent-cyan">System</span>
      </span>
    </Link>
  );
}
