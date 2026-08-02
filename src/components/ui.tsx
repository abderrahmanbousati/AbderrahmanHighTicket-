import type { ReactNode } from 'react';
import { Icon } from './Icon';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="rule-gold w-6" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'start',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'start' | 'center';
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="heading-lg mt-5">{title}</h2>
      <div className={`rule-gold mt-6 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle ? <p className="lead mt-6">{subtitle}</p> : null}
    </div>
  );
}

/** Bulleted list with check marks. */
export function CheckList({
  items,
  className = '',
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-blue/15 text-accent-cyan">
            <Icon name="check" size={13} />
          </span>
          <span className="text-ink-light">{item}</span>
        </li>
      ))}
    </ul>
  );
}
