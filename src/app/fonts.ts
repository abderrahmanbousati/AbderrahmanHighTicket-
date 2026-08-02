import localFont from 'next/font/local';

// Self-hosted fonts (no build-time network fetch → reliable on any host).
// Files live in src/app/fonts/files/. To swap a font, replace the woff2
// files and update the paths below.

// Brand typeface — Space Grotesk (variable, Latin). Body + headings.
export const fontSans = localFont({
  src: [{ path: './fonts/files/space-grotesk.woff2', weight: '300 700', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

// Alias so existing `--font-display` references resolve to the brand font.
export const fontDisplay = fontSans;

// Arabic — IBM Plex Sans Arabic (static weights).
export const fontArabic = localFont({
  src: [
    { path: './fonts/files/ibm-plex-arabic-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/files/ibm-plex-arabic-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/files/ibm-plex-arabic-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/files/ibm-plex-arabic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-arabic',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});
