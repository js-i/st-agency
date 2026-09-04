# CLAUDE.md

Guidance for Claude Code when working in this project.

## What this is

Island Horizons — international citizenship-by-investment / global mobility
consulting. Bilingual (EN default, RU) content per the brand book at
`../agency_IG/refer/ISLAND HORIZONS.docx`.

This was originally built as a Next.js/TypeScript app, then **rewritten from
scratch as a plain static site**: hand-authored HTML + one CSS file, no
JavaScript, no build step, no server. The site only ever needed to serve
fixed bilingual content, so the framework, client-side i18n routing, MDX
pipeline and Server Action were pure overhead — removed entirely rather than
statically exported, at the user's explicit request.

The old WordPress site at `citizenshipsaotome.com` keeps running
independently; this project doesn't touch its DNS/hosting.

## Stack

- **Plain HTML5 + one CSS file** (`assets/css/style.css`) — brand tokens
  (navy/mist/teal/gold) as CSS custom properties, ported 1:1 from the old
  Tailwind `@theme` block.
- **Zero JavaScript.** The mobile nav menu is a CSS checkbox-hack
  (`<input type="checkbox">` + sibling selectors); the "Insights" header
  dropdown is pure `:hover`/`:focus-within` CSS. No analytics, no cookie
  banner — both were dropped along with the JS.
- **Google Fonts via `<link>`** (Manrope for headings, Inter for body) —
  see the `<head>` of any page.
- **No build tool, no `package.json`.** To preview locally, serve the
  directory with any static file server, e.g. `python3 -m http.server` from
  the project root, then open `http://localhost:8000/`. Opening a file
  directly (`file://`) also mostly works except for root-relative asset
  paths (`/assets/...`, `/images/...`), so prefer a local server.
- **Contact**: no form — a `mailto:` link plus static WhatsApp/Telegram/email
  details (see `contact/index.html` and the footer on every page). There is
  no backend, so there's nothing to configure or break.

## Structure

```
index.html                                    # EN home (no locale prefix)
about/ solutions/ our-approach/ programmes/
programmes/sao-tome-and-principe/
insights/  insights/<article-slug>/  insights/category/<category-slug>/
faq/ contact/ privacy-policy/
ru/                                            # mirrors every path above
assets/css/style.css
images/                                        # logo, favicons, sao-tome/*.jpg
404.html  ru/404.html
sitemap.xml  robots.txt
```

Every route is a folder with `index.html`, giving clean extension-less URLs
on any static host (Vercel, Netlify, GitHub Pages, S3+CloudFront, nginx with
a default `index`). EN has no prefix; RU lives under `/ru/...` — this
matches the old site's `as-needed` locale-prefix scheme, so URLs are
unchanged from what was already indexed/shared, if anything was.

## Important: no templating, no includes

**There is no shared-header/footer mechanism.** The header and footer
markup is duplicated literally into all 46 pages (23 templates × 2
locales). This was a deliberate trade-off (see project history) in favor of
a genuinely dependency-free static site over reintroducing any build step.

**Consequence:** a change to the header/footer/nav (e.g. adding a nav item,
changing a phone number, editing the footer CTA copy) must be applied to
every page by hand, or with a scripted find-and-replace across all
`index.html` files — there is no single source of truth to edit once. Before
making that kind of sitewide change, consider whether a `grep -rl` +
scripted `sed`/small Node script across all `index.html` files is safer than
editing by hand.

Per-page *content* (hero copy, section text, FAQ items, article body) is
unique per file by design — that part *should* differ page to page.

## Design tokens & conventions

- Colors, fonts and the `fade-up` scroll-reveal keyframe are defined once in
  `assets/css/style.css` (`:root` custom properties) — reuse these rather
  than hardcoding hex values in new markup.
- `.reveal` on a section applies a CSS-only scroll-driven fade-up
  (`animation-timeline: view()`) where the browser supports it, and is
  simply invisible-as-an-effect (content stays fully visible, no animation)
  where it doesn't — wrapped in `@supports (animation-timeline: view())` so
  there's no possibility of content getting stuck at `opacity: 0`.
  **Gotcha:** Playwright/headless-Chromium `fullPage: true` screenshots do
  **not** fire the scroll events this animation depends on, so a full-page
  screenshot taken without an actual scroll can show later sections as
  blank. This is a screenshot-capture artifact, not a real bug — confirmed
  by scrolling a real page with `mouse.wheel`, where every section reaches
  `opacity: 1`. Don't mistake one for the other; verify with real scroll
  steps (or non-fullPage viewport screenshots after scrolling), not
  `fullPage: true`.
- Decorative SVG art (hero gradient, horizon line, compass motif, band art)
  is inlined via small generator-produced `<svg>` blocks directly in the
  HTML — there's no external `.svg` asset file to update; find and edit the
  inline markup on the relevant page(s).
- Icons (shield, globe, compass, etc.) are inline SVGs with `stroke:
  currentColor`, matching one consistent line-icon style across the site.

## SEO

Every page hand-writes its own `<title>`, meta description, canonical +
`hreflang` alternates (en/ru/x-default), OpenGraph/Twitter tags, and
JSON-LD (`Organization` globally, plus `Service`/`FAQPage`/
`BreadcrumbList`/`Article` where applicable) — no dynamic resolution, no
`generateMetadata`. `sitemap.xml` and `robots.txt` are static files at the
project root; update `sitemap.xml` by hand if a page is added, moved or
removed.

## Known gaps / next steps (carried over, still true)

- **Photography**: still using the abstract navy/gold horizon-line +
  compass-ring SVG system in place of real photography everywhere except
  the São Tomé programme page (which has real photos in `images/sao-tome/`).
  Real commissioned/licensed photography still needs sourcing.
- **Logo**: `images/logo-mark.png` / `logo-full.png` are raster PNGs only —
  no vector source. Ask for an SVG/AI file if the mark needs to scale
  further than current usages.
- **Video**: no video component exists; no hosting decision has been made.
- **Domain/deploy**: not yet deployed anywhere. `sitemap.xml`/`robots.txt`/
  canonical URLs currently point at `https://island-horizons.vercel.app` —
  update `SITE_URL` throughout (search-and-replace across all files, or
  regenerate from the generator script if you still have it) once a real
  domain is assigned.
- **Privacy Policy** (`privacy-policy/index.html`) is a reasonable draft,
  not legal-reviewed. Have it checked before relying on it. It was also
  simplified when the contact form and analytics were removed — it no
  longer mentions cookies, GA4, or Telegram, since none of those exist on
  this site anymore.
- **Insights**: only 4 seed articles (×2 locales) exist, covering 4 of the
  brand book's "10 mandatory launch articles." The other 6, plus the
  per-programme article series, are unwritten. New articles need to be
  hand-authored as a new `insights/<slug>/index.html` (+ `ru/` counterpart),
  following the pattern of an existing article page, and added to
  `sitemap.xml`.
