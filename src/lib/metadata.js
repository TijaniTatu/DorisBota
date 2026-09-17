import { PROFILE } from '@/data/site';

/**
 * The link-preview card. JPEG rather than PNG: the card is half photograph,
 * and WhatsApp quietly drops a preview image much over 300KB — the PNG was
 * 394KB, which is enough to lose the card on the one channel this practice
 * is most often shared through.
 */
export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: PROFILE.name,
};

/**
 * Build a page's `openGraph` block.
 *
 * Next does not deep-merge `openGraph` — a page that declares it *replaces*
 * the root layout's block outright. So `openGraph: { url: '/about' }` silently
 * dropped the images, type and siteName set in the layout, and every page went
 * out with og:title and og:description but no og:image at all. Facebook and
 * LinkedIn fall back to scraping the page for something usable; WhatsApp does
 * not, so the card arrived as text only.
 *
 * Routing every page through here means the url is the only thing a page has
 * to say, and the rest cannot go missing again.
 */
export function og(path) {
  return {
    type: 'website',
    siteName: PROFILE.name,
    locale: 'en_GB',
    url: path,
    images: [OG_IMAGE],
  };
}
