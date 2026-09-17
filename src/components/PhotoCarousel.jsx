'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

import { Eyebrow } from './ui';

const DWELL = 7000;
const RESUME = 20000; // ms of quiet after a deliberate pick, then it resumes
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Field work, one frame at a time.
 *
 * The caption is the point here as much as the photograph — each one names a
 * facility, a county, a programme — so the two are given equal weight rather
 * than the text being dropped underneath as an afterthought.
 *
 * Sources are the full-size originals, so the frame takes the whole column
 * and delivery goes through the image pipeline as normal.
 */
export default function PhotoCarousel({ photos, eyebrow = 'From the field' }) {
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const railRef = useRef(null);
  const quietUntil = useRef(0);

  const count = photos.length;
  /* Same contract as the wheel: a pointer over it holds it, a deliberate
     pick buys quiet, and the control stops it outright. Hovering used to end
     autoplay for good, which meant one stray mouse crossing killed it. */
  const rolling = !stopped && !hovering && !reduce;

  const go = useCallback(
    (next, manual = true) => {
      setIndex(((next % count) + count) % count);
      if (manual) quietUntil.current = Date.now() + RESUME;
    },
    [count],
  );

  useEffect(() => {
    if (!rolling) return undefined;
    const id = setInterval(() => {
      if (Date.now() < quietUntil.current) return;
      setIndex((i) => (i + 1) % count);
    }, DWELL);
    return () => clearInterval(id);
  }, [rolling, count]);

  // Keep the active thumbnail in view as the rail advances.
  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.children[index];
    if (!rail || !active) return;
    const left = active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2;
    rail.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  }, [index, reduce]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  };

  const photo = photos[index];

  return (
    <div
      className="grid gap-10 lg:grid-cols-12 lg:gap-14"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={onKeyDown}
      role="group"
      aria-roledescription="carousel"
      aria-label={eyebrow}
    >
      <div className="lg:col-span-7">
        <div className="relative w-full max-w-[640px] overflow-hidden bg-navy ring-1 ring-gold/30">
          {/* One track carrying every frame, slid by transform. A mounted
              slide never has to finish an exit animation before the next one
              can appear, which is what a presence-based swap made fragile. */}
          <div className="aspect-3/2 w-full">
            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: reduce ? 'none' : `transform 600ms ${EASE}`,
              }}
            >
              {photos.map((p, i) => (
                <div key={p.src} className="relative h-full w-full shrink-0">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="h-full w-full object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The rail is the indicator: it says how many there are and where
            you are, which a row of dots cannot do for thirteen photographs. */}
        <div
          ref={railRef}
          className="mt-4 flex max-w-[640px] gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'thin' }}
        >
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Photograph ${i + 1} of ${count}. ${p.place}.`}
              aria-current={i === index ? 'true' : undefined}
              className={`relative h-12 w-16 shrink-0 overflow-hidden transition-opacity duration-300 ${
                i === index ? 'opacity-100 ring-2 ring-gold' : 'opacity-45 hover:opacity-80'
              }`}
            >
              <Image
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes="64px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="border-t-2 border-gold pt-8">
          <Eyebrow>{eyebrow}</Eyebrow>

          <div aria-live="polite" className="min-h-[11rem]">
            <p className="mt-4 font-display text-xl leading-snug text-deep md:text-2xl">
              {photo.place}
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate">{photo.caption}</p>
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-ink/12 pt-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous photograph"
              className="inline-flex h-11 w-11 items-center justify-center border border-deep/25 text-deep transition-colors hover:border-deep hover:bg-deep hover:text-white"
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next photograph"
              className="inline-flex h-11 w-11 items-center justify-center border border-deep/25 text-deep transition-colors hover:border-deep hover:bg-deep hover:text-white"
            >
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setStopped((v) => !v)}
              className="ml-2 inline-flex items-center gap-2.5 text-sm text-slate transition-colors hover:text-deep"
            >
              {stopped ? (
                <Play size={15} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Pause size={15} strokeWidth={1.5} aria-hidden="true" />
              )}
              {stopped ? 'Play' : 'Pause'}
            </button>

            <p className="tnum ml-auto font-mono text-xs text-slate">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
