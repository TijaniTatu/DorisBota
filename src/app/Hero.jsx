import Image from 'next/image';

import { LabeledSeam } from '@/components/Seam';
import { Container, ButtonLink, Tm } from '@/components/ui';
import { PROFILE, PRACTICE_STRANDS } from '@/data/site';
import portrait from '@/../public/doris-portrait.jpg';

export default function Hero() {
  return (
    <section className="bg-deep text-white">
      <Container className="pb-16 pt-16 md:pb-20 md:pt-24 lg:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14 lg:gap-20">
          <div className="md:col-span-7">
            <p className="rise eyebrow text-gold">
              Health Systems Strengthening · WASH-IPC Integration · Laboratory Systems. Global Health Security · Policy Influence
            </p>

            <h1 className="rise rise-1 mt-7 font-display text-display font-normal text-white">
              {PROFILE.name}
            </h1>

            <p className="rise rise-2 mt-5 max-w-xl font-display text-xl italic leading-snug text-gold md:text-2xl">
              Founder, The Integrated Health Systems Transformation Framework
              <Tm />
            </p>

            <p className="rise rise-3 mt-9 max-w-xl text-lg leading-relaxed text-white/75">
              {PROFILE.positioning}
            </p>

            <div className="rise rise-4 mt-11 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="gold">
                Start a scoping conversation
              </ButtonLink>
              <ButtonLink href="/diagnostic" variant="outlineLight">
                Take the diagnostic
              </ButtonLink>
            </div>
          </div>

          {/* The portrait is a disc: the one curve on a page built entirely
              from rules and right angles, so it reads as the person rather
              than as another panel. The gold ring is offset rather than
              flush so the circle keeps its edge against the navy.

              The crop is done by hand, not by object-fit. A square
              object-cover crop of a 1170x1347 source can only ever show the
              image's full width, which leaves her face sitting right of the
              centre and cuts the crown of her head on the curve. Scaling to
              116% and pulling left by 16% frames the 1010px square — source
              x 160-1170, y 0-1010 — that holds the whole head, hair included,
              with margin above it. */}
          <div className="rise rise-2 md:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-full ring-1 ring-gold/45 ring-offset-4 ring-offset-deep md:max-w-none">
              <Image
                src={portrait}
                alt="Doris Bota"
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 93vw, 47vw"
                className="absolute top-0 left-[-16%] h-auto w-[116.2%] max-w-none"
              />
            </div>
          </div>
        </div>

        {/* The signature. Six strands of practice, arriving apart and knitting
            into one rule — the argument of the whole site, stated before a
            word of it is read. */}
        <LabeledSeam labels={PRACTICE_STRANDS} className="mt-16 md:mt-20" />
      </Container>
    </section>
  );
}
