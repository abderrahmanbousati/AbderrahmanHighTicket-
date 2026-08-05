import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Logo } from './Logo';
import { siteConfig, whatsappLink } from '@/config/site';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();
  const wa = whatsappLink();

  const exploreLinks = [
    { href: '/highsystem-90', key: 'program' },
    { href: '/solutions', key: 'solutions' },
    { href: '/industries', key: 'industries' },
  ] as const;

  const companyLinks = [
    { href: '/about', key: 'about' },
    { href: '/insights', key: 'insights' },
    { href: '/contact', key: 'contact' },
  ] as const;

  return (
    <footer className="border-t border-line bg-navy-900">
      <div className="container-hs py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {t('tagline')}
            </p>
            <p dir="ltr" className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan rtl:text-right">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-white">{t('explore')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {exploreLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="link-muted">
                    {nav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-white">{t('company')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="link-muted">
                    {nav(l.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="link-muted">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-muted">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-white">{t('contactTitle')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.contact.email && (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-muted">
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.phone && (
                <li>
                  <a href={`tel:${siteConfig.contact.phone}`} className="link-muted">
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="link-muted">
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="text-ink-muted">{siteConfig.contact.location}</li>
            </ul>
            <div className="mt-4 flex gap-3 text-sm">
              {Object.entries(siteConfig.social)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <a
                    key={k}
                    href={v as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted capitalize"
                  >
                    {k}
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-12 divider-gradient" />

        <div className="mt-6 flex flex-col gap-4 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t('rights')}
          </p>
          <p className="max-w-xl sm:text-end">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
