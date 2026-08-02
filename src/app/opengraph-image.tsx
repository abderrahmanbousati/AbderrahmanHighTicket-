import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = 'HighSystem — We build growth systems for ambitious businesses.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Branded default Open Graph image, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #07111F 0%, #0B172A 60%, #111C2E 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              border: '1px solid #1E293B',
              background: '#0B172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            HS
          </div>
          <div style={{ color: '#F8FAFC', fontSize: 34, fontWeight: 700 }}>HighSystem</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#F8FAFC', fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>
            We build growth systems
          </div>
          <div style={{ color: '#38BDF8', fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>
            for ambitious businesses.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 26 }}>{siteConfig.domain}</div>
          <div style={{ color: '#CBD5E1', fontSize: 24, fontWeight: 600 }}>Scale Through Systems.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
