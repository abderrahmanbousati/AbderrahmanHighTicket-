import { Space_Grotesk, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Brand typeface (French / English) — Space Grotesk (per brand guide).
// Used for both body and headings; heading weight is bumped via CSS.
export const fontSans = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

// Alias kept so existing `--font-display` references resolve to the brand font.
export const fontDisplay = fontSans;

// Arabic (Space Grotesk has no Arabic glyphs).
export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
});
