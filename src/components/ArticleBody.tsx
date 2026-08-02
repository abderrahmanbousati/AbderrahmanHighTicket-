import type { ContentBlock } from '@/content/blog';
import type { Locale } from '@/i18n/routing';

/** Renders localized article content blocks. */
export function ArticleBody({ blocks, locale }: { blocks: ContentBlock[]; locale: Locale }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="heading-md pt-2 text-2xl">
              {block.text[locale]}
            </h2>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-ink-light">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-cyan" />
                  {item[locale]}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-ink-light">
            {block.text[locale]}
          </p>
        );
      })}
    </div>
  );
}
