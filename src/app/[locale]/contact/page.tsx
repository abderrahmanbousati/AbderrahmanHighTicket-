import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/contact',
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ContactHero />
      <FormSection />
    </>
  );
}

function ContactHero() {
  const t = useTranslations('contact.hero');
  return (
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent-blue/30 bg-accent-blue/[0.06] px-4 py-3">
        <Icon name="shield" size={18} className="mt-0.5 flex-none text-accent-cyan" />
        <p className="text-sm text-ink-light">{t('limitedNote')}</p>
      </div>
    </PageHero>
  );
}

function FormSection() {
  return (
    <section className="section">
      <div className="container-hs max-w-3xl">
        <ContactForm />
      </div>
    </section>
  );
}
