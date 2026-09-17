import { SITE_URL } from '@/data/site';

const ROUTES = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.9 },
  { path: '/expertise', priority: 0.9 },
  { path: '/impact', priority: 0.8 },
  { path: '/insights', priority: 0.8 },
  { path: '/diagnostic', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/privacy', priority: 0.3 },
];

export default function sitemap() {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
