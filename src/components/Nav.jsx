'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { NAV, PROFILE } from '@/data/site';
import { Container } from './ui';

/**
 * The active route is marked by a single seam segment beneath the label — the
 * same device the rest of the site uses, at its smallest scale. It is drawn in
 * brass rather than gold: on a white bar the mid-tone gold clears less than
 * 2:1 and the marker all but disappears, where brass holds 3.4:1.
 */
function itemClass(isActive) {
  return [
    'relative py-1 text-sm transition-colors duration-200',
    isActive ? 'text-deep' : 'text-slate hover:text-deep',
    'after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-brass',
    'after:origin-left after:transition-transform after:duration-300',
    isActive ? 'after:scale-x-100' : 'after:scale-x-0',
  ].join(' ');
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-white">
      <Container>
        <nav aria-label="Primary" className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-normal tracking-tight text-deep">
              {PROFILE.name}
            </span>
            {/* The standfirst needs 441px and the desktop bar only frees up
                ~390px for it between 1024 and 1150, where it wraps to two
                lines and pushes the bar out of square. Below lg the menu is
                a hamburger and there is room; from xl there is room again. */}
            <span className="eyebrow mt-1 block text-[0.625rem] text-deep/70 lg:hidden xl:block">
              Independent consultant · {PROFILE.base} · Working globally
            </span>
          </Link>

          <ul className="hidden list-none items-center gap-8 lg:flex">
            {NAV.map((link) => (
              <li key={link.to}>
                <Link
                  href={link.to}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                  className={itemClass(isActive(link.to))}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="hidden bg-gold px-5 py-3 text-sm font-medium text-deep transition-colors duration-300 hover:bg-deep hover:text-white lg:inline-flex"
          >
            Start a scoping conversation
          </Link>

          <button
            type="button"
            className="-mr-2 p-2 text-deep lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
          </button>
        </nav>
      </Container>

      {open && (
        <div className="border-t border-ink/10 bg-white lg:hidden">
          <Container className="py-8">
            <ul className="list-none space-y-5 p-0">
              {NAV.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                    className={`block font-display text-2xl ${isActive(link.to) ? 'text-deep' : 'text-slate'
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex bg-gold px-6 py-4 text-sm font-medium text-deep transition-colors duration-300 hover:bg-deep hover:text-white"
            >
              Start a scoping conversation
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
