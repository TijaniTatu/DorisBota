import { IBM_Plex_Mono, IBM_Plex_Sans, Spectral } from 'next/font/google';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SITE_URL, PROFILE } from '@/data/site';
import { OG_IMAGE } from '@/lib/metadata';
import './globals.css';

/* Self-hosted by Next, so there is no render-blocking request to Google and no
   third-party origin in the request waterfall. */
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral-src',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans-src',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono-src',
  display: 'swap',
});

/**
 * `metadataBase` is what turns the relative OG image path into the absolute URL
 * that LinkedIn, Slack and X require. Per-page metadata inherits from here.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Doris Bota — Health Systems Strengthening, WASH–IPC and Laboratory Systems',
    template: '%s — Doris Bota',
  },
  description: PROFILE.positioning,
  authors: [{ name: PROFILE.name }],
  openGraph: {
    type: 'website',
    siteName: PROFILE.name,
    locale: 'en_GB',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#072c42',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-deep"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
