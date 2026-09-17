import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { NAV, PROFILE, PRACTICE_STRANDS } from '@/data/site';
import { Container } from './ui';
import Seam from './Seam';

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <Container className="py-16 md:py-20">
        {/* Closed seam: the site ends integrated. */}
        <Seam integrated tone="gold" height={2} className="mb-14" />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-normal">{PROFILE.name}</p>
            <p className="mt-4 max-w-sm font-display text-lg italic leading-snug text-gold">
              {PROFILE.tagline}
            </p>
            <p className="eyebrow mt-6 text-white/70">{PROFILE.base}</p>

            {/* The five strands in full. The nav bar can only carry two of
                them beside the menu, so the standing positioning line lives
                here, where every page reaches it. */}
            <p className="eyebrow mt-3 leading-relaxed text-white/55">
              {PRACTICE_STRANDS.join(' · ')}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="eyebrow text-gold">Site</p>
            <ul className="mt-5 list-none space-y-3 p-0">
              {[...NAV, { label: 'Contact', to: '/contact' }].map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="link-wipe text-sm text-white/65 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Direct</p>
            <ul className="mt-5 list-none space-y-4 p-0">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-gold"
                >
                  <Mail
                    size={17}
                    strokeWidth={1.25}
                    aria-hidden="true"
                    className="mt-[0.2em] shrink-0"
                  />
                  <span className="break-all">{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-gold"
                >
                  <Linkedin size={17} strokeWidth={1.25} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="link-wipe text-xs text-white/70 hover:text-white/70">
            Privacy notice
          </Link>
        </div>
      </Container>
    </footer>
  );
}
