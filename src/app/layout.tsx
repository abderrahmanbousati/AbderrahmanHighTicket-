import type { ReactNode } from 'react';

// The <html> and <body> tags live in app/[locale]/layout.tsx so that the
// `lang` and `dir` attributes can be set per locale. This root layout is a
// required passthrough for the Next.js App Router.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
