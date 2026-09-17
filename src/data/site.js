/**
 * The canonical origin, baked in at build time.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment so canonical links, Open Graph
 * URLs, robots.txt and sitemap.xml all follow the deployment. The fallback is
 * the intended production domain, used when nothing is configured.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dorisbota.com'
).replace(/\/$/, '');

export const PROFILE = {
  name: 'Doris Bota',
  role: 'Founder, The Integrated Health Systems Transformation Framework™',
  frameworkShort: 'IHSTF',
  tagline: 'From policy to practice. From projects to institutions.',
  email: 'dbota@integratedhealthsystemstransformation.com',
  linkedin:
    'https://www.linkedin.com/in/doris-bota-wash-infectionpreventionandcontrol-biosafetyandbiosecurity',
  base: 'Nairobi, Kenya',
  positioning:
    'I help governments, UN agencies, donors, and NGOs move infection prevention and control, WASH in health, laboratory diagnostic networks, and health security out of fragmented, donor-driven projects and into integrated, government-led health systems that sustain quality of care, public health, and long-term country ownership.',
};

/**
 * The five strands of practice. These are the labelled segments of the hero
 * seam, so the order here is the order they knit together in. The same list
 * is set as the standing positioning line in the footer, which is the only
 * place every page can carry it in full.
 */
export const PRACTICE_STRANDS = [
  'Health Systems Strengthening',
  'WASH–IPC Integration',
  'Laboratory Systems',
  'Global Health Security',
  'Policy Influence',
];

/**
 * The diagnostic carries a long formal name and a short one. The full name is
 * used wherever the instrument is being introduced — page titles, metadata,
 * calls to action. The short name is for the nav bar, where the full string
 * cannot sit beside four other items and the contact button.
 */
export const DIAGNOSTIC = {
  name: 'The IPC/WASH Health Systems Fragmentation Diagnostics',
  nameNoArticle: 'IPC/WASH Health Systems Fragmentation Diagnostics',
  short: 'Fragmentation Diagnostics',
  to: '/diagnostic',
};

export const NAV = [
  { label: 'About', to: '/about' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Impact', to: '/impact' },
  { label: 'Insights', to: '/insights' },
  { label: DIAGNOSTIC.short, to: DIAGNOSTIC.to },
];

export const CLIENT_TYPES = [
  'Governments',
  'UN agencies',
  'Embassies',
  'Development partners',
  'Consultancy firms',
  'Multilateral development banks',
  'Development finance institutions',
  'Academia and research institutions',
  'Foundations',
  'Faith-based organizations',
  'Implementing organizations',
];
