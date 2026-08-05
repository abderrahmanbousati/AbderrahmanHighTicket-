import fs from 'fs';
import path from 'path';
import { useTranslations } from 'next-intl';
import { MotionReveal } from './MotionReveal';

// Detected once on the server: is a founder photo present in /public?
// Drop your photo at public/founder.jpg (or .png / .webp / .jpeg) to
// replace the "A" monogram — no code change needed.
const FOUNDER_IMAGE = (() => {
  try {
    const candidates = ['founder.jpg', 'founder.jpeg', 'founder.png', 'founder.webp'];
    for (const name of candidates) {
      if (fs.existsSync(path.join(process.cwd(), 'public', name))) return `/${name}`;
    }
  } catch {
    /* ignore */
  }
  return null;
})();
const founderPhotoExists = FOUNDER_IMAGE !== null;

/** Founder card — shows the founder photo if present, else an "A" monogram. */
export function FounderCard({ eyebrow }: { eyebrow: string }) {
  const t = useTranslations('home.founder');

  return (
    <MotionReveal className="panel-ring mx-auto grid max-w-4xl items-center gap-10 p-8 sm:p-14 md:grid-cols-[auto_1fr]">
      {founderPhotoExists ? (
        <img
          src={FOUNDER_IMAGE ?? ''}
          alt={t('name')}
          className="mx-auto h-48 w-40 rounded-2xl border border-line object-cover object-top shadow-[0_24px_50px_-24px_rgba(10,10,10,0.5)]"
        />
      ) : (
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-2xl border border-line bg-black font-display text-5xl text-white shadow-[0_24px_50px_-24px_rgba(10,10,10,0.5)]">
          A
        </div>
      )}
      <div>
        <span className="eyebrow">
          <span className="rule-gold w-6" />
          {eyebrow}
        </span>
        <h2 className="heading-md mt-3">{t('name')}</h2>
        <p className="text-sm font-medium text-accent-cyan">{t('role')}</p>
        <p className="mt-4 leading-relaxed text-ink-light">{t('bio')}</p>
        <p className="mt-3 text-xs italic text-ink-muted">{t('proofNote')}</p>
      </div>
    </MotionReveal>
  );
}
