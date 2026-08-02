import Link from 'next/link';

// Global fallback for unmatched routes outside a locale segment.
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          background: '#07111F',
          color: '#F8FAFC',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '3.5rem', fontWeight: 800, color: '#2563EB', margin: 0 }}>404</p>
          <h1 style={{ marginTop: '0.5rem' }}>Page not found</h1>
          <p style={{ color: '#94A3B8' }}>The page you are looking for does not exist.</p>
          <Link href="/fr" style={{ color: '#38BDF8' }}>
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
