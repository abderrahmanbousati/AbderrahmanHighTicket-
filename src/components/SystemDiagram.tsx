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
              <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
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
                stroke={active === i ? '#0A0A0A' : '#D4D4D8'}
                strokeWidth={active === i ? 1.6 : 1}
                initial={reduce ? undefined : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                opacity={highlighted ? 1 : 0.4}
              />
            );
          })}
          <circle cx="200" cy="150" r="30" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="1.5" />
          <text x="200" y="147" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
            High
          </text>
          <text x="200" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
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
                  fill={isActive ? '#0A0A0A' : '#FFFFFF'}
                  stroke={isActive ? '#0A0A0A' : '#D4D4D8'}
                  strokeWidth="1.2"
                  className="transition-all"
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fill={isActive ? '#FFFFFF' : '#3F3F46'}
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
