/**
 * =====================================================================
 * SOLUTIONS — organised by business OUTCOME, not technical service.
 * =====================================================================
 * Structural data only. Copy (titles, descriptions, item labels) lives
 * in messages/{locale}.json under `solutions.categories.<key>`.
 */

export type SolutionCategoryKey =
  | 'acquire'
  | 'convert'
  | 'authority'
  | 'measure'
  | 'scale';

export type SolutionCategory = {
  key: SolutionCategoryKey;
  icon: string;
  itemCount: number; // number of items translated in messages under items.0..n
};

export const solutionCategories: SolutionCategory[] = [
  { key: 'acquire', icon: 'target', itemCount: 4 },
  { key: 'convert', icon: 'funnel', itemCount: 5 },
  { key: 'authority', icon: 'megaphone', itemCount: 4 },
  { key: 'measure', icon: 'chart', itemCount: 4 },
  { key: 'scale', icon: 'trending', itemCount: 4 },
];
