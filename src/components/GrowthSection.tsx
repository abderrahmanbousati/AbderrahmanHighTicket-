import { useTranslations } from 'next-intl';
import { MotionReveal } from './MotionReveal';

/**
 * Compounding-growth illustration. Single-series, monochrome line/area chart
 * showing +20%/month compounding (index base 1.0). It illustrates the growth
 * model — not a specific client's data.
 */
function buildChart() {
  const values = [1, 1.2, 1.44, 1.728, 2.074, 2.488]; // 1.2^0..5
  const W = 420;
  const H = 260;
  const padL = 40;
  const padR = 30;
  const padT = 28;
  const padB = 36;
  const minV = 0.9;
  const maxV = 2.6;
  const x = (i: number) => padL + (i * (W - padL - padR)) / (values.length - 1);
  const y = (v: number) => H - padB - ((v - minV) / (maxV - minV)) * (H - padT - padB);

  const pts = values.map((v, i) => ({ x: x(i), y: y(v) }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)} ${H - padB} L${pts[0].x.toFixed(1)} ${H - padB} Z`;
  const gridYs = [1, 1.5, 2, 2.5].map((v) => ({ v, y: y(v) }));

  return { W, H, padB, pts, line, area, gridYs, x };
}

export function GrowthSection() {
  const t = useTranslations('home.growth');
  const c = buildChart();
  const months = [1, 2, 3, 4, 5, 6];

  return (
    <section className="section">
      <div className="container-hs">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <MotionReveal>
            <span className="eyebrow">
              <span className="rule-gold w-6" />
              {t('eyebrow')}
            </span>
            <h2 className="heading-lg mt-5">{t('title')}</h2>
            <div className="rule-gold mt-6" />
            <p className="lead mt-6">{t('text')}</p>
          </MotionReveal>

          <MotionReveal delay={0.1} className="panel-ring p-6 sm:p-8">
            <svg
              viewBox={`0 0 ${c.W} ${c.H}`}
              className="h-auto w-full"
              role="img"
              aria-label={t('caption')}
            >
              <defs>
                <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* recessive gridlines */}
              {c.gridYs.map((g) => (
                <line
                  key={g.v}
                  x1={40}
                  x2={c.W - 30}
                  y1={g.y}
                  y2={g.y}
                  stroke="#EAEAEA"
                  strokeWidth={1}
                />
              ))}

              {/* area + line */}
              <path d={c.area} fill="url(#growthArea)" />
              <path d={c.line} fill="none" stroke="#0A0A0A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

              {/* points */}
              {c.pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={i === c.pts.length - 1 ? 5 : 3} fill="#0A0A0A" />
              ))}

              {/* endpoint label */}
              <text
                x={c.pts[c.pts.length - 1].x}
                y={c.pts[c.pts.length - 1].y - 12}
                textAnchor="end"
                fontSize="15"
                fontWeight="700"
                fill="#0A0A0A"
              >
                ×2.5
              </text>

              {/* x-axis month labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={c.x(i)}
                  y={c.H - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#71717A"
                >
                  {t('month')} {m}
                </text>
              ))}
            </svg>
            <p className="mt-4 text-center text-xs text-ink-muted">{t('caption')}</p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
