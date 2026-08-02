'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Interactive 7-pillar system diagram.
 * Desktop: radial, hover/focus to highlight. Mobile: simplified vertical flow.
 */
export function SystemDiagram() {
  const t = useTranslations('home.systemDiagram');
  const reduce = useReducedMotion();
  const pillars: string[] = t.raw('pillars');
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* Desktop radial */}
      <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-2xl md:block">
        <svg viewBox="0 0 400 300" className="h-full w-full">
          <defs>
            <radialGradient id="core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="150" r="120" fill="url(#core)" />
          {pillars.map((_, i) => {
            const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 110;
            const y = 150 + Math.sin(angle) * 90;
            const highlighted = active === null || active === i;
            return (
              <motion.line
                key={`line-${i}`}
                x1="200"
                y1="150"
                x2={x}
                y2={y}
                stroke={active === i ? '#38BDF8' : '#1E293B'}
                strokeWidth={active === i ? 1.6 : 1}
                initial={reduce ? undefined : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                opacity={highlighted ? 1 : 0.4}
              />
            );
          })}
          <circle cx="200" cy="150" r="30" fill="#0B172A" stroke="#2563EB" strokeWidth="1.5" />
          <text x="200" y="147" textAnchor="middle" className="fill-ink-white" fontSize="11" fontWeight="700">
            High
          </text>
          <text x="200" y="160" textAnchor="middle" className="fill-accent-cyan" fontSize="11" fontWeight="700">
            System
          </text>
          {pillars.map((label, i) => {
            const angle = (i / pillars.length) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 110;
            const y = 150 + Math.sin(angle) * 90;
            const isActive = active === i;
            return (
              <g
                key={`node-${i}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={label}
                className="cursor-pointer focus:outline-none"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 26 : 24}
                  fill={isActive ? '#2563EB' : '#111C2E'}
                  stroke={isActive ? '#38BDF8' : '#1E293B'}
                  strokeWidth="1.2"
                  className="transition-all"
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  className={isActive ? 'fill-white' : 'fill-ink-light'}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile simplified vertical flow */}
      <div className="mx-auto flex max-w-sm flex-col md:hidden">
        {pillars.map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-full rounded-xl border border-line bg-navy-700 px-4 py-3 text-center text-sm font-semibold text-ink-white">
              {label}
            </div>
            {i < pillars.length - 1 && (
              <div className="my-1 h-5 w-px bg-gradient-to-b from-accent-blue to-line" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
