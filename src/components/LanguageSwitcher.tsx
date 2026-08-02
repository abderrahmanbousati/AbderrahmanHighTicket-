'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, type Locale } from '@/i18n/routing';
import { Icon } from './Icon';

const labels: Record<Locale, { short: string; full: string }> = {
  fr: { short: 'FR', full: 'Français' },
  en: { short: 'EN', full: 'English' },
  ar: { short: 'AR', full: 'العربية' },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    // Preserve the current path; only the locale changes.
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-secondary px-3 py-2 text-xs"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={labels[locale].full}
      >
        <Icon name="globe" size={15} />
        <span className="font-semibold">{labels[locale].short}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-line bg-navy-800 p-1 shadow-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  l === locale
                    ? 'bg-accent-blue/15 text-ink-white'
                    : 'text-ink-light hover:bg-navy-700'
                }`}
              >
                <span>{labels[l].full}</span>
                <span className="text-xs text-ink-muted">{labels[l].short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
