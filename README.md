# Doris Bota

The website for Doris Bota's global health systems consultancy — health systems
strengthening, WASH–IPC integration, laboratory systems and health security.

Next.js (App Router) on Vercel, with Neon Postgres and Resend.

## What is here

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Positioning, framework, practice, impact, diagnostic |
| `/about` | Static | Biography, scope, recognition |
| `/expertise` | Static | Four practice areas, the IHSTF framework, the three engagement tiers |
| `/impact` | Static | The impact ledger and accounts of systems change |
| `/insights` | Static | Positions, publications, recognition |
| `/contact` | Static | Scoping enquiry form |
| `/diagnostic` | Static | The ten-domain Health Systems Fragmentation Diagnostic |
| `/diagnostic/results/[token]` | Dynamic | A respondent's personal report, read from the database |
| `/privacy` | Static | Privacy notice |
| `/admin` | Dynamic | Private: submissions and enquiries |

Content pages are prerendered, so every route serves its own title, description
and Open Graph tags in the raw HTML. That matters because social crawlers
(LinkedIn, Slack, WhatsApp, X) do not run JavaScript — a link to `/impact`
shows the impact card, not the homepage one.

## Design

The site is built around one device, the **seam**: a rule drawn as separate
segments that close into a continuous line. It carries the argument the practice
is built on — a system arrives in pieces and the work is to make it whole. It
appears as the hero's six knitting strands of practice, as section dividers
(gapped where a section opens a problem, closed before a call to action), and as
the diagnostic's progress indicator.

- **Type** — Spectral (display and editorial), IBM Plex Sans (body and UI),
  IBM Plex Mono (eyebrows, data, scores). Serif for the policy voice, grotesk
  for the institutional voice, mono for the measurement voice. Self-hosted via
  `next/font`, so there is no third-party font request.
- **Colour** — navy grounds with a cool grey-teal paper, gold used sparingly.
  Tokens live in `src/app/globals.css`.
- **The maturity ramp** — `m1`–`m4` are the diagnostic's 1–4 scale, running
  amber (fragmented) through olive and teal to navy (fully integrated). Any
  place a score is shown uses this ramp. Class names are written out in
  `src/lib/maturity.js` because Tailwind resolves utilities by scanning source.
- **Numbering** appears only where order is real: the three engagement tiers,
  the ten diagnostic domains, the 90-day phases. The practice areas and
  framework pillars are sets, so they carry names and typed labels instead.

### Motion is CSS, never JavaScript

Entrance and reveal animations are pure CSS (`src/app/globals.css`). On a
server-rendered page a JavaScript-driven reveal has to ship the element as
`opacity: 0` in the HTML, so every visitor sees a blank page until hydration
and anyone with reduced motion can be left staring at it. A stylesheet is
render-blocking, so CSS animates content that is already present and visible.

Scroll reveals use a view timeline (`animation-timeline: view()`); browsers
without scroll-driven animation simply show the content, which is the right
fallback rather than a degraded one. `prefers-reduced-motion` disables all of
it.

The consequence is that the static content pages ship no animation library at
all — `framer-motion` loads only on `/contact` and `/diagnostic`, where the
transitions are genuinely interactive.

Every page passes axe at WCAG 2.1 AA.

## Local development

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev
```

`next dev` serves the pages and the route handlers together, so the contact
form, the diagnostic and the admin area all work locally once `DATABASE_URL`
and the rest are set.

## Deploying

1. **Push to GitHub**, then import the repository at
   [vercel.com/new](https://vercel.com/new). Next.js is detected automatically.
2. **Add Postgres.** In the project, open Storage → Marketplace → Neon and
   create a database. `DATABASE_URL` is injected automatically. The schema
   creates itself on the first request — no migration step.
3. **Add Resend.** Create an API key at
   [resend.com/api-keys](https://resend.com/api-keys) and verify the sending
   domain (Resend gives you the DNS records to add). Until the domain is
   verified, mail only delivers to your own address.
4. **Set the environment variables** listed in `.env.example` for Production,
   Preview and Development.
5. **Point the domain** at Vercel under Settings → Domains.
6. **Update the canonical origin.** Set `SITE_URL` in the environment and
   `SITE_URL` in `src/data/site.js`. Everything else — canonical URLs, Open
   Graph image URLs, `robots.txt`, `sitemap.xml` — derives from those.

## Content

All copy lives in `src/data/` so it can be edited without touching components:

- `site.js` — name, contact details, navigation, positioning statement, `SITE_URL`
- `about.js` — biography, affiliations, availability
- `expertise.js` — practice areas and geographic scope
- `framework.js` — IHSTF pillars and the engagement tiers
- `impact.js` — the impact ledger and systems-change accounts
- `insights.js` — publications, recognition, written positions
- `privacy.js` — the privacy notice

The diagnostic instrument — domains, scale, scoring, the 90-day plan — lives in
`shared/diagnostic.js`, imported by both the pages and the route handler so a
respondent's score can never differ from the stored one.

## Structure

```
src/
  app/            routes, route handlers, root layout, global CSS
  components/     Seam, FadeIn, Nav, Footer, Ledger, PageHeader, ui, Field
  data/           all site copy
  lib/            maturity ramp classes, canonical origin
  server/         database, queries, mail, admin auth (server-only)
shared/           the diagnostic instrument and its scoring
```

## Admin

`/admin` is a server component. It reads the session cookie, and on a valid one
queries the database directly and renders the console. Signing in posts the
single `ADMIN_PASSWORD` to `/api/admin/login`, which issues a signed, 12-hour
cookie. The console lists diagnostic submissions (expandable to per-domain
scores and the respondent's report link) and scoping enquiries.

## Things still to settle

- **Publications and insights are thin.** Only items with a verifiable
  reference are listed. Doris's CV would fill out `insights.js` and let the
  affiliations in `about.js` become a dated career timeline.
- **The privacy notice needs Doris's review.** Sections 9 and 11 were rewritten
  to describe the current infrastructure; section 8 still states no actual
  retention period.
- **One photograph.** The site is carried by typography and layout because
  there is a single portrait. Field, speaking and facility photographs would
  give the About and Impact pages a second register.
