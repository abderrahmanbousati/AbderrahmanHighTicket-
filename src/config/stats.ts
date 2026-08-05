/**
 * =====================================================================
 * RESULTS / STATS — Edit these numbers freely.
 * =====================================================================
 * Values shown in the "Results" strip on the home page. Labels are
 * translated in messages/{fr,en,ar}.json under `home.results.stats`.
 * Use real, owner-provided figures only.
 */

export type Stat = {
  value: string; // display value, e.g. "12.2M+", "95%", "50+"
  labelKey: 'views' | 'clients' | 'growth' | 'satisfaction' | 'projects';
};

export const stats: Stat[] = [
  { value: '12.2M+', labelKey: 'views' },
  { value: '50+', labelKey: 'clients' },
  { value: '+20%', labelKey: 'growth' },
  { value: '95%', labelKey: 'satisfaction' },
  { value: '120+', labelKey: 'projects' },
];
