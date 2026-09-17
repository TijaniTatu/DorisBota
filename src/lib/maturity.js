/**
 * Maturity-scale styling.
 *
 * Class names are written out in full rather than composed at runtime, because
 * Tailwind resolves utilities by scanning source text — `bg-m${value}` would
 * never be generated.
 *
 * Foreground colours are chosen for contrast, not consistency: the two warm
 * steps are too light to carry white text, the two cool steps are too dark to
 * carry navy.
 */
export const MATURITY = {
  1: { bg: 'bg-m1', chip: 'bg-m1 text-deep', text: 'text-m1', border: 'border-m1' },
  2: { bg: 'bg-m2', chip: 'bg-m2 text-deep', text: 'text-m2', border: 'border-m2' },
  3: { bg: 'bg-m3', chip: 'bg-m3 text-white', text: 'text-m3', border: 'border-m3' },
  4: { bg: 'bg-m4', chip: 'bg-m4 text-white', text: 'text-m4', border: 'border-m4' },
};

export function maturity(value) {
  return MATURITY[value] ?? MATURITY[1];
}
