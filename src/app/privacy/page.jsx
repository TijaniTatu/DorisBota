import PageHeader from '@/components/PageHeader';
import FadeIn from '@/components/FadeIn';
import { Container, Eyebrow } from '@/components/ui';
import { SECTIONS, INTRO, VERSION, ISSUED, NEXT_REVIEW } from '@/data/privacy';
import { og } from '@/lib/metadata';

export const metadata = {
  alternates: { canonical: '/privacy' },
  openGraph: og('/privacy'),
  title: "Privacy Notice",
  description: "How information provided through the Health Systems Fragmentation Diagnostic and the contact form is collected, used, stored and protected.",
};

export default function Privacy() {
  return (
    <>

      <PageHeader
        eyebrow="The IPC/WASH Health Systems Fragmentation Diagnostics"
        title="Privacy notice"
        lead="How your information is collected, used, and protected."
      />

      <Container className="pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <p className="border-l-2 border-gold pl-6 text-lg leading-relaxed text-slate">
              {INTRO}
            </p>
          </FadeIn>

          <div className="mt-16 space-y-14">
            {SECTIONS.map((section) => (
              <FadeIn key={section.n}>
                <section>
                  <div className="flex items-baseline gap-4">
                    <span className="tnum font-mono text-sm text-brass-deep">
                      {String(section.n).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-2xl font-normal leading-snug text-deep">
                      {section.title}
                    </h2>
                  </div>

                  {section.body && (
                    <div className="mt-5 space-y-4 pl-0 sm:pl-10">
                      {section.body.map((para, i) => (
                        <p key={i} className="text-base leading-relaxed text-slate">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.sub && (
                    <div className="mt-6 space-y-8 pl-0 sm:pl-10">
                      {section.sub.map((group) => (
                        <div key={group.heading}>
                          <Eyebrow>{group.heading}</Eyebrow>
                          <ul className="mt-4 list-none space-y-2 p-0">
                            {group.items.map((item, j) => (
                              <li
                                key={j}
                                className="flex gap-3 text-base leading-relaxed text-slate"
                              >
                                <span
                                  className="mt-[0.7em] h-[2px] w-3 shrink-0 bg-gold"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="mt-16 border-t border-ink/15 pt-8 font-mono text-xs text-slate">
              {VERSION} · {ISSUED} · {NEXT_REVIEW}
            </p>
          </FadeIn>
        </div>
      </Container>
    </>
  );
}
