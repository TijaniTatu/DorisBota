import { Container } from './ui';
import Seam from './Seam';

/**
 * Inner-page opener. The seam here is gapped: each page begins with the
 * problem in pieces, and the page's closing call to action carries the
 * closed seam.
 */
export default function PageHeader({ eyebrow, title, lead, intro, weights }) {
  return (
    <div className="bg-deep text-white">
      <Container className="pb-16 pt-16 md:pb-20 md:pt-24">
        <p className="rise eyebrow text-gold">{eyebrow}</p>

        <h1 className="rise rise-1 mt-6 max-w-4xl font-display text-title font-normal">
          {title}
        </h1>

        {lead && (
          <p className="rise rise-2 mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            {lead}
          </p>
        )}

        {/* A second, quieter paragraph under the lead, for a page that has to
            say who the thing is for before it says what it does. */}
        {intro && (
          <p className="rise rise-3 mt-6 max-w-2xl text-base leading-relaxed text-white/60">
            {intro}
          </p>
        )}

        <Seam
          weights={weights ?? [4, 2, 5, 1, 3]}
          tone="gold"
          gap={14}
          height={2}
          className="rise rise-4 mt-14"
        />
      </Container>
    </div>
  );
}
