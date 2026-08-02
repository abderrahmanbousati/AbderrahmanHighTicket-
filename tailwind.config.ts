import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editable brand palette — mirror in src/config/site.ts if changed.
        navy: {
          DEFAULT: '#07111F',
          900: '#07111F',
          800: '#0B172A',
          700: '#111C2E',
        },
        accent: {
          DEFAULT: '#2563EB',
          blue: '#2563EB',
          cyan: '#38BDF8',
        },
        ink: {
          white: '#F8FAFC',
          light: '#CBD5E1',
          muted: '#94A3B8',
        },
        line: '#1E293B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
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
          'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
