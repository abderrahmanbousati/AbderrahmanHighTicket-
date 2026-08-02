import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="section">
      <div className="container-hs flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-6xl font-extrabold text-accent-blue">404</p>
        <h1 className="heading-md mt-4">{t('title')}</h1>
        <p className="lead mt-3 max-w-md">{t('subtitle')}</p>
        <Link href="/" className="btn-primary mt-8">
          <Icon name="arrow" size={16} className="-scale-x-100 rtl:scale-x-100" />
          {t('back')}
        </Link>
      </div>
    </section>
  );
}
