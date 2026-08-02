'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * Premium abstract "interconnected systems" visual for the hero.
 * Pure SVG + light motion — no stock photos, no heavy assets.
 */
export function HeroVisual() {
  const t = useTranslations('home.hero.diagram');
  const reduce = useReducedMotion();

  const nodes = [
    { key: 'acquisition', x: 50, y: 18 },
    { key: 'conversion', x: 82, y: 38 },
    { key: 'crm', x: 74, y: 74 },
    { key: 'content', x: 26, y: 74 },
    { key: 'data', x: 18, y: 38 },
    { key: 'scaling', x: 50, y: 50 },
  ] as const;

  const center = nodes[5];
  const outer = nodes.slice(0, 5);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(10,10,10,0.06), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <svg viewBox="0 0 100 100" className="relative h-full w-full" role="img" aria-label="HighSystem — interconnected growth system">
        {/* connecting lines */}
        {outer.map((n, i) => (
          <motion.line
            key={`l-${n.key}`}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="#A1A1AA"
            strokeWidth={0.4}
            strokeOpacity={0.8}
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
          />
        ))}

        {/* animated pulse along a ring */}
        {!reduce && (
          <motion.circle
            r={0.9}
            fill="#0A0A0A"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            cx={center.x}
            cy={center.y}
          />
        )}

        {/* nodes */}
        {nodes.map((n, i) => {
          const isCenter = n.key === 'scaling';
          return (
            <motion.g
              key={n.key}
              initial={reduce ? undefined : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: 'backOut' }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={isCenter ? 6 : 4.4}
                fill={isCenter ? '#0A0A0A' : '#FFFFFF'}
                stroke={isCenter ? '#0A0A0A' : '#D4D4D8'}
                strokeWidth={0.6}
              />
              <circle cx={n.x} cy={n.y} r={isCenter ? 2 : 1.3} fill={isCenter ? '#FFFFFF' : '#0A0A0A'} fillOpacity={0.9} />
            </motion.g>
          );
        })}
      </svg>

      {/* labels overlaid with absolute positioning for crisp text */}
      {nodes.map((n) => (
        <span
          key={`label-${n.key}`}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-white/95 px-2 py-0.5 text-[10px] font-medium text-ink-light shadow-sm"
          style={{ left: `${n.x}%`, top: `${n.y + (n.key === 'scaling' ? 0 : 11)}%` }}
        >
          {t(n.key)}
        </span>
      ))}
    </div>
  );
}
