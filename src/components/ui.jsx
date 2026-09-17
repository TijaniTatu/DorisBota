import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

/**
 * Trademark mark, set as a true superscript so it never competes with the
 * display type it sits on.
 */
export function Tm({ className = '' }) {
  return (
    <sup
      className={`text-[0.45em] tracking-normal ${className}`}
      aria-label="trademark"
    >
      ™
    </sup>
  );
}

/** The single horizontal measure used by every section on the site. */
export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

const GROUNDS = {
  white: 'bg-white text-ink',
  paper: 'bg-paper text-ink',
  bone: 'bg-bone text-ink',
  deep: 'bg-deep text-white',
  navy: 'bg-navy text-white',
};

export function Section({ ground = 'paper', className = '', children, ...rest }) {
  return (
    <section className={`${GROUNDS[ground]} py-20 md:py-28 lg:py-32 ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = 'teal', className = '' }) {
  const color =
    tone === 'gold' ? 'text-gold' : tone === 'light' ? 'text-white/70' : 'text-teal-deep';
  return <p className={`eyebrow ${color} ${className}`}>{children}</p>;
}

/**
 * Section opener. The rule beneath the heading is a short seam segment
 * rather than a full-width divider, so the device stays quiet here.
 */
export function SectionHead({ eyebrow, title, lead, tone = 'dark', className = '' }) {
  const dark = tone === 'light';
  return (
    <FadeIn className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={dark ? 'gold' : 'teal'}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-5 font-display text-title font-normal ${dark ? 'text-white' : 'text-deep'}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-slate'}`}>
          {lead}
        </p>
      )}
    </FadeIn>
  );
}

const BUTTON_BASE =
  'inline-flex items-center gap-3 font-sans text-sm font-medium tracking-wide transition-colors duration-300 px-7 py-4 disabled:opacity-40 disabled:cursor-not-allowed';

const BUTTON_VARIANTS = {
  gold: 'bg-gold text-deep hover:bg-white',
  deep: 'bg-deep text-white hover:bg-navy',
  outlineLight: 'border border-white/45 text-white hover:border-gold hover:bg-gold hover:text-deep',
  outlineDark: 'border border-deep/30 text-deep hover:border-deep hover:bg-deep hover:text-white',
};

function buttonClass(variant, className) {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`;
}

export function ButtonLink({ href, external = false, variant = 'gold', arrow = true, className = '', children }) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(variant, className)}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {content}
    </Link>
  );
}

export function Button({ variant = 'deep', arrow = true, className = '', children, ...rest }) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />}
    </button>
  );
}

/** Inline text link with the wiping underline. */
export function TextLink({ href, className = '', children, external = false }) {
  const cls = `link-wipe font-medium text-teal-deep hover:text-deep ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
