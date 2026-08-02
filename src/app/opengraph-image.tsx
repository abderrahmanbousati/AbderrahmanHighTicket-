import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = 'HighSysteme — We build growth systems for ambitious businesses.';
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
            }}
          >
            <img
              width={38}
              height={38}
              src={
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='white'><path d='M8 56 V18 L18 8 H22 V56 Z'/><path d='M56 56 V18 L46 8 H42 V56 Z'/><path d='M22 44 V34 L42 26 V36 Z'/></svg>"
                )
              }
              alt=""
            />
          </div>
          <div style={{ display: 'flex', color: '#0A0A0A', fontSize: 34 }}>
            <span style={{ fontWeight: 700 }}>HIGH</span>
            <span style={{ fontWeight: 400, color: '#4B4B4B' }}>SYSTEME</span>
          </div>
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
          <div style={{ color: '#0A0A0A', fontSize: 24, fontWeight: 600 }}>Build. Scale. Dominate.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
