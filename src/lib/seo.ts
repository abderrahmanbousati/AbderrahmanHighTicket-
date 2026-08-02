import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { locales, type Locale } from '@/i18n/routing';

const ogLocaleMap: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  ar: 'ar_MA',
};

type BuildMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  /** Path WITHOUT the locale prefix, e.g. '/solutions' or '' for home. */
  path?: string;
};

/** Builds per-page metadata with canonical + hreflang alternates. */
export function buildMetadata({
  locale,
  title,
  description,
  path = '',
}: BuildMetadataArgs): Metadata {
  const cleanPath = path.replace(/^\/+/, '');
  const canonical = `${siteConfig.url}/${locale}${cleanPath ? `/${cleanPath}` : ''}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${siteConfig.url}/${l}${cleanPath ? `/${cleanPath}` : ''}`;
  }
  languages['x-default'] = `${siteConfig.url}/fr${cleanPath ? `/${cleanPath}` : ''}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocaleMap[locale],
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
  };
}

/** ProfessionalService structured data (JSON-LD). No fake address/data. */
export function professionalServiceJsonLd(locale: Locale, description: string) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    description,
    slogan: siteConfig.tagline,
    founder: {
      '@type': 'Person',
      name: siteConfig.founder,
    },
    areaServed: siteConfig.contact.location,
  };

  if (siteConfig.contact.email) data.email = siteConfig.contact.email;
  if (siteConfig.contact.phone) data.telephone = siteConfig.contact.phone;

  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  return data;
}
