import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { routing, isRtl, isKnownLocale, type Locale } from '@/i18n/routing';
import { fontSans, fontDisplay, fontArabic } from '../fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { buildMetadata, professionalServiceJsonLd } from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isKnownLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://highsysteme.com'),
    ...buildMetadata({
      locale: locale as Locale,
      title: t('title'),
      description: t('description'),
      path: '',
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isKnownLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const rtl = isRtl(locale);
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  const messages = await getMessages();
  const jsonLd = professionalServiceJsonLd(locale as Locale, t('description'));

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-navy-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
