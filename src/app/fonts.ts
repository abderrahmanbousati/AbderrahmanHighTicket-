import { Plus_Jakarta_Sans, Fraunces, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Body / UI (French / English)
export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

// Display serif for large headings (Latin) — adds an editorial, luxury feel.
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  style: ['normal', 'italic'],
});

// Arabic
export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
});
