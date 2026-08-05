'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Icon } from './Icon';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/highsystem-90', key: 'program' },
  { href: '/solutions', key: 'solutions' },
  { href: '/industries', key: 'industries' },
  { href: '/about', key: 'about' },
  { href: '/insights', key: 'insights' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('cta');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line bg-navy-900/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-hs flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-ink-white'
                  : 'text-ink-muted hover:text-ink-white'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="btn-primary hidden whitespace-nowrap px-5 py-2.5 text-[13px] sm:inline-flex"
          >
            {tc('bookCall')}
          </Link>
          <button
            type="button"
            className="btn-secondary px-2.5 py-2 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label={t('openMenu')}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-navy-800 shadow-2xl"
              initial={reduce ? undefined : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <Logo />
                <button
                  type="button"
                  className="btn-secondary px-2.5 py-2"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t('closeMenu')}
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-accent-blue/15 text-ink-white'
                        : 'text-ink-light hover:bg-navy-700'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link href="/contact" className="btn-primary mt-4">
                  {tc('bookCall')}
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
