import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editable brand palette — monochrome white & black luxury theme.
        // Token names are kept (navy/accent/ink/line) so component classes
        // stay stable; the VALUES define the theme.
        navy: {
          DEFAULT: '#FFFFFF', // page background (white)
          900: '#FFFFFF', // page background
          800: '#F5F5F4', // alternating sections (soft off-white)
          700: '#FFFFFF', // cards (white; rely on border + shadow)
        },
        accent: {
          DEFAULT: '#0A0A0A', // primary (black)
          blue: '#0A0A0A', // primary fills / buttons
          cyan: '#171717', // fine highlights (near-black)
        },
        gold: '#0A0A0A', // repurposed to black for accent rules/monogram
        ink: {
          white: '#0A0A0A', // headings (near-black)
          light: '#3F3F46', // body text (dark gray)
          muted: '#71717A', // muted text (gray)
        },
        line: '#E4E4E7', // hairline borders (light gray)
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-line': 'pulse-line 3s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, #E4E4E7 1px, transparent 1px), linear-gradient(to bottom, #E4E4E7 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
