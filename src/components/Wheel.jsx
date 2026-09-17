'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

import { WHEEL, WHEEL_DOMAINS } from '@/data/wheel';
import { Eyebrow, Tm } from './ui';

/* ------------------------------------------------------------------
   Geometry.

   One ring, eight equal wedges, no first and no last. The wheel turns
   to bring the selected domain to the top rather than the panel simply
   swapping underneath it: the motion is the argument that these eight
   are one mechanism, not eight headings that happen to be adjacent.
   ------------------------------------------------------------------ */

const SIZE = 680;
const C = SIZE / 2;
/* The numeral badges sit outside the ring, so the viewBox is padded rather
   than letting the SVG paint past its own box — overflow there becomes
   horizontal page scroll once the wheel goes full-bleed on a phone. */
const PAD = 16;
const R_IN = 126;
const R_OUT = 300;
const R_LABEL = (R_IN + R_OUT) / 2;
const R_BADGE = R_OUT + 22;
const R_HUB = 112;
const STEP = 360 / WHEEL_DOMAINS.length;
const GAP = 1.6; // degrees of daylight between wedges

/** Segment i sits at the top when the wheel is rotated by -STEP * i. */
const midAngle = (i) => -90 + STEP * i;

function pt(deg, r) {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

function wedgePath(i) {
  const start = midAngle(i) - STEP / 2 + GAP / 2;
  const end = midAngle(i) + STEP / 2 - GAP / 2;
  const [x1, y1] = pt(start, R_OUT);
  const [x2, y2] = pt(end, R_OUT);
  const [x3, y3] = pt(end, R_IN);
  const [x4, y4] = pt(start, R_IN);
  return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
}

/** Greedy wrap, so a wedge label never runs past the wedge that holds it. */
function wrap(text, max = 16) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= max) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DWELL = 7000;   // ms the wheel rests on a domain before turning on
const TURN = 1500;    // ms the turn itself takes — slow enough to watch
const RESUME = 20000; // ms of quiet after a deliberate pick, then it drifts on

/**
 * Below 640px the wheel is drawn at roughly half the width it gets on a
 * desktop, so everything inside it has to be specified twice: type set for
 * the large version renders at seven pixels on a phone. Server-render the
 * wide case and correct after hydration.
 */
function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return wide;
}

export default function Wheel() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const wide = useWide();
  const tabRefs = useRef([]);
  /* Held in a ref, not state, so deferring the next turn never tears down
     and restarts the interval underneath it. */
  const quietUntil = useRef(0);

  /* A wheel that never turns does not read as a wheel, so it keeps drifting
     on its own. What it must not do is move while someone is reading: a
     pointer over it holds it still, a deliberate pick buys twenty seconds of
     quiet before it resumes, and the pause control stops it for good. */
  const spinning = !stopped && !hovering && !reduce;

  useEffect(() => {
    if (!spinning) return undefined;
    const id = setInterval(() => {
      if (Date.now() < quietUntil.current) return;
      setActive((i) => (i + 1) % WHEEL_DOMAINS.length);
    }, DWELL);
    return () => clearInterval(id);
  }, [spinning]);

  const choose = useCallback((i) => {
    setActive(i);
    quietUntil.current = Date.now() + RESUME;
  }, []);

  const onKeyDown = useCallback(
    (event) => {
      const last = WHEEL_DOMAINS.length - 1;
      const moves = {
        ArrowRight: (i) => (i + 1) % WHEEL_DOMAINS.length,
        ArrowDown: (i) => (i + 1) % WHEEL_DOMAINS.length,
        ArrowLeft: (i) => (i + last) % WHEEL_DOMAINS.length,
        ArrowUp: (i) => (i + last) % WHEEL_DOMAINS.length,
        Home: () => 0,
        End: () => last,
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      const next = move(active);
      choose(next);
      tabRefs.current[next]?.focus();
    },
    [active, choose],
  );

  const rotation = reduce ? 0 : -STEP * active;
  const spin = { transition: reduce ? 'none' : `transform ${TURN}ms ${EASE}` };
  const domain = WHEEL_DOMAINS[active];
  const Icon = domain.icon;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
      {/* ---------------------------------------------------------- the wheel */}
      <div className="lg:col-span-7">
        <div
          className="relative -mx-6 w-auto sm:mx-auto sm:w-full sm:max-w-[560px]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
        >
          <svg
            viewBox={`${-PAD} ${-PAD} ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
            className="h-auto w-full"
            role="tablist"
            aria-label={`${WHEEL.name} — eight domains`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
          >
            {/* The outer ring keeps turning whatever the wheel is doing —
                the one piece of ornament here, and it stops for reduced
                motion like everything else. */}
            <g className="wheel-drift" style={{ transformOrigin: `${C}px ${C}px` }}>
              <circle
                cx={C}
                cy={C}
                r={R_OUT + 14}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="2"
                strokeDasharray="3 13"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>

            <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${C}px ${C}px`, ...spin }}>
              {WHEEL_DOMAINS.map((d, i) => {
                const isActive = i === active;
                return (
                  <path
                    key={d.slug}
                    d={wedgePath(i)}
                    fill={isActive ? 'var(--color-deep)' : '#ffffff'}
                    stroke={isActive ? 'var(--color-gold)' : 'var(--color-paper)'}
                    strokeWidth={isActive ? 2 : 1.5}
                    className="cursor-pointer transition-[fill] duration-500"
                    onClick={() => choose(i)}
                  />
                );
              })}

              {/* Labels ride the ring but stay upright: the group rotates with
                  the wheel, each label unwinds the same angle about its own
                  anchor. Identical transitions keep the two locked together. */}
              {WHEEL_DOMAINS.map((d, i) => {
                const isActive = i === active;
                const [lx, ly] = pt(midAngle(i), R_LABEL);
                const [bx, by] = pt(midAngle(i), R_BADGE);
                const lines = wrap(d.title, wide ? 16 : 11);
                return (
                  <g
                    key={d.slug}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls="wheel-panel"
                    aria-label={`Domain ${d.n}. ${d.title}`}
                    className="cursor-pointer focus:outline-none [&:focus-visible>text]:underline"
                    onClick={() => choose(i)}
                  >
                    <g
                      style={{
                        transform: `rotate(${-rotation}deg)`,
                        transformOrigin: `${lx}px ${ly}px`,
                        ...spin,
                      }}
                    >
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        className="pointer-events-none select-none font-sans transition-[fill] duration-500"
                        fontSize={wide ? 15 : 21}
                        fontWeight="500"
                        fill={isActive ? '#ffffff' : 'var(--color-deep)'}
                      >
                        {lines.map((line, k) => (
                          <tspan
                            key={line}
                            x={lx}
                            dy={k === 0 ? `${-(lines.length - 1) * 0.58}em` : '1.16em'}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>

                    {/* The numeral badge, upright for the same reason. */}
                    <g
                      style={{
                        transform: `rotate(${-rotation}deg)`,
                        transformOrigin: `${bx}px ${by}px`,
                        ...spin,
                      }}
                    >
                      <circle
                        cx={bx}
                        cy={by}
                        r={wide ? 19 : 25}
                        className="transition-[fill] duration-500"
                        fill={isActive ? 'var(--color-gold)' : 'var(--color-deep)'}
                      />
                      <text
                        x={bx}
                        y={by}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="tnum pointer-events-none select-none font-mono transition-[fill] duration-500"
                        fontSize={wide ? 16 : 21}
                        fill={isActive ? 'var(--color-deep)' : '#ffffff'}
                      >
                        {d.n}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* ------------------------------------------------ the hub */}
            <circle cx={C} cy={C} r={R_HUB + 9} fill="var(--color-gold)" opacity="0.9" />
            <circle cx={C} cy={C} r={R_HUB} fill="var(--color-deep)" />
            <text
              x={C}
              y={C}
              textAnchor="middle"
              className="pointer-events-none select-none font-display"
              fontSize={wide ? 25 : 31}
              fill="#ffffff"
            >
              <tspan x={C} dy={wide ? '-2.3em' : '-1.1em'}>Integrated</tspan>
              <tspan x={C} dy="1.1em">WASH &amp; IPC</tspan>
              <tspan x={C} dy="1.1em">systems</tspan>
            </text>

            {wide && (
              <>
                <line
                  x1={C - 30}
                  y1={C + 11}
                  x2={C + 30}
                  y2={C + 11}
                  stroke="var(--color-gold)"
                  strokeWidth="1.5"
                />
                <text
                  x={C}
                  y={C}
                  textAnchor="middle"
                  className="pointer-events-none select-none font-mono"
                  fontSize="10"
                  letterSpacing="0.1em"
                  fill="var(--color-gold)"
                >
                  <tspan x={C} dy="2.9em">QUALITY OF CARE</tspan>
                  <tspan x={C} dy="1.6em">PATIENT SAFETY</tspan>
                  <tspan x={C} dy="1.6em">HEALTH SECURITY · AMR</tspan>
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="mx-auto mt-6 flex max-w-[560px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            className="inline-flex items-center gap-2.5 text-sm text-slate transition-colors hover:text-deep"
          >
            {stopped ? (
              <Play size={15} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Pause size={15} strokeWidth={1.5} aria-hidden="true" />
            )}
            {stopped ? 'Turn the wheel' : 'Pause the wheel'}
          </button>
          <p className="tnum font-mono text-xs text-slate">
            {String(domain.n).padStart(2, '0')} / {String(WHEEL_DOMAINS.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* --------------------------------------------------- the read-out */}
      <div className="lg:col-span-5">
        <div
          id="wheel-panel"
          role="tabpanel"
          aria-live="polite"
          className="border-t-2 border-gold pt-8"
        >
          <div className="flex items-start gap-5">
            <Icon size={32} strokeWidth={1} className="mt-1 shrink-0 text-teal-deep" aria-hidden="true" />
            <div>
              <Eyebrow>
                Domain {domain.n} of {WHEEL_DOMAINS.length}
              </Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-normal leading-snug text-deep md:text-3xl">
                {domain.title}
              </h3>
            </div>
          </div>

          <p className="mt-6 font-display text-lg italic leading-snug text-teal-deep">
            {domain.summary}
          </p>

          <ul className="mt-7 list-none p-0">
            {domain.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-t border-ink/10 py-3 text-base leading-relaxed text-slate last:border-b"
              >
                <span className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-sm text-slate">
            {WHEEL.name}
            <Tm className="text-gold" /> · {WHEEL.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
