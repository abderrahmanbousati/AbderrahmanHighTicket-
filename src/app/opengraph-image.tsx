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
          background: '#FFFFFF',
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
              background: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            HS
          </div>
          <div style={{ color: '#0A0A0A', fontSize: 34, fontWeight: 700 }}>HighSystem</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#0A0A0A', fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>
            We build growth systems
          </div>
          <div style={{ color: '#525252', fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>
            for ambitious businesses.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E4E4E7', paddingTop: 28 }}>
          <div style={{ color: '#71717A', fontSize: 26 }}>{siteConfig.domain}</div>
          <div style={{ color: '#0A0A0A', fontSize: 24, fontWeight: 600 }}>Scale Through Systems.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
