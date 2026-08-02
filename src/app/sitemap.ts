import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { locales } from '@/i18n/routing';
import { getPublishedArticles } from '@/content/blog';

const staticPaths = [
  '',
  '/highsystem-90',
  '/solutions',
  '/method',
  '/industries',
  '/about',
  '/insights',
  '/contact',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const articles = getPublishedArticles();

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])
          ),
        },
      });
    }
    for (const article of articles) {
      entries.push({
        url: `${siteConfig.url}/${locale}/insights/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'yearly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
