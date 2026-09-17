/**
 * The seam.
 *
 * A rule drawn as separate segments with gaps between them, which can close
 * into one continuous line. It is the site's one recurring device, and it
 * carries the argument the practice is built on: a system arrives in pieces
 * and the work is to make it whole.
 *
 * Used with discipline — gapped where a section opens a problem, closed where
 * a section resolves one. Never as filler.
 *
 * Pure CSS and no client boundary, so it renders in the server HTML.
 */

const TONES = {
  gold: 'bg-gold',
  brass: 'bg-brass',
  teal: 'bg-teal',
  navy: 'bg-navy',
  light: 'bg-white/35',
  ink: 'bg-ink/25',
};

export default function Seam({
  weights = [3, 2, 4, 1, 3, 2],
  integrated = false,
  tone = 'gold',
  height = 2,
  gap = 10,
  className = '',
}) {
  return (
    <div
      className={`flex w-full ${className}`}
      style={{ gap: integrated ? 0 : gap }}
      aria-hidden="true"
    >
      {weights.map((w, i) => (
        <span
          key={i}
          className={`block ${TONES[tone]} ${integrated ? '' : 'opacity-75'}`}
          style={{ flex: w, height }}
        />
      ))}
    </div>
  );
}

/**
 * The hero variant: the same seam, but each segment is named. Six strands of
 * practice, gapped on arrival, knitting into a single rule. This is the one
 * place the device is allowed to be the loudest thing on the screen.
 *
 * A 1px join is kept after the seam closes, so the strands stay legible as
 * distinct-but-continuous rather than dissolving into an anonymous line.
 */
export function LabeledSeam({ labels, tone = 'gold', className = '' }) {
  return (
    <div className={className}>
      <div className="seam-knit flex w-full gap-px" aria-hidden="true">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`seam-strand block h-[3px] flex-1 ${TONES[tone]}`}
            style={{ animationDelay: `${0.15 + i * 0.07}s` }}
          />
        ))}
      </div>

      <ul className="mt-3 flex w-full list-none gap-0 p-0">
        {labels.map((label, i) => (
          <li
            key={label}
            className="rise eyebrow min-w-0 flex-1 pr-2 text-[0.5625rem] leading-tight text-white/70 sm:text-[0.625rem]"
            style={{ animationDelay: `${0.4 + i * 0.07}s` }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
