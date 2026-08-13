@AGENTS.md

# CLAUDE.md

Guidance for Claude Code when working in this project.

## What this is

Island Horizons — international citizenship-by-investment / global mobility
consulting. This is a from-scratch rebuild of `citizenshipsaotome.com`
(currently a Russian-only WordPress/Inspiro site covering only a fraction of
the brand) as a bilingual (EN default, RU) Next.js site, implementing the
full brand book at `../agency_IG/refer/ISLAND HORIZONS.docx`.

The old WordPress site keeps running independently. This project does not
touch its DNS/hosting — see "Deployment" below for the current state.

## Stack

- **Next.js 16 (App Router, Turbopack)**, TypeScript, React 19
- **Tailwind CSS v4** — brand tokens (navy/white/mist/gold) in
  `src/app/globals.css` under `@theme`
- **next-intl** — bilingual routing, `en` (default, no URL prefix) / `ru`
  (`/ru/...` prefix). Locale segment lives at `src/app/[locale]/`, which
  acts as the root layout (there is no separate `src/app/layout.tsx`).
- **motion** (`motion/react`, formerly Framer Motion) via `LazyMotion` — the
  only animation used is a slow fade-up on scroll into view
  (`SectionReveal`), per the brand book's "no abrupt effects" rule.
- **next-mdx-remote/rsc** — Insights articles are MDX files in
  `src/content/insights/{en,ru}/*.mdx`, read from the filesystem at build
  time (see `src/lib/insights.ts`). No CMS.
- **Zod + Server Actions** — the contact form (`src/lib/actions/contact.ts`)
  validates input and posts to the Telegram Bot API. It requires
  `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` in the environment; without them
  it fails gracefully (logs server-side, shows a translated error to the
  user) rather than crashing.
- **GA4 + Yandex Metrika**, both consent-gated behind the cookie banner
  (`src/components/analytics/`), loaded via `useSyncExternalStore` reading
  `localStorage` — not `useEffect` + `setState`, to satisfy
  `react-hooks/set-state-in-effect` and avoid a hydration flash.

## Commands

```
npm run dev      # Turbopack dev server
npm run build    # production build (also runs the TS project check)
npm run start    # serve the production build
npm run lint     # ESLint (flat config)
npx tsc --noEmit # standalone type check
```

There is no test suite yet. Verification so far has been: `tsc --noEmit`,
`eslint .`, `next build` (full SSG of all 49 routes), and a manual
Playwright-driven visual pass (desktop/mobile viewports, locale switch,
mobile menu, Insights drawer, contact form) — see git history for the
one real bug that pass caught (below).

## Workflow: developer + independent reviewer

Before treating any non-trivial change as done, run it through two
separate passes — don't let the same context that wrote the code be the
only one that checks it:

1. **Implement** the change normally.
2. **Independent code review** — run `/code-review` on the diff (use
   `/code-review ultra` for risky/large changes: cloud multi-agent review
   with adversarial verification of each finding). This is a fresh look at
   just the diff, not a continuation of the implementation reasoning.
3. **Security-sensitive changes** (auth, form handling, anything touching
   `TELEGRAM_BOT_TOKEN`/env secrets, user input) — also run
   `security-review`.
4. **Actually run the app** for any UI/UX change — don't rely on `tsc`/
   `eslint`/`next build` passing as proof the feature works. Start
   `npm run dev`, drive it with a real (headless-OK) browser: navigate,
   interact, **scroll the full page**, and check `console --errors` /
   `pageerror` / failed network requests. Screenshot and actually look at
   it. See the `SectionReveal` gotcha below — a page can build clean and
   still render blank to a real visitor.
5. For a genuinely blind second opinion on code you're unsure about,
   spawn a separate `code-reviewer` subagent with only the diff/files —
   not the conversation that produced them — so it isn't anchored on your
   own reasoning.

Skipping straight from "build succeeded" to "done" is how the
`SectionReveal` blank-page issue would have shipped unnoticed.

## Architecture notes

- **Content vs. UI strings**: short UI chrome (nav labels, buttons, form
  field labels, footer) lives in `src/messages/{en,ru}.json` and is read via
  `next-intl`'s `useTranslations`/`getTranslations`. Long-form page copy
  (Home, About, Solutions, Our Approach, Programmes, FAQ, Contact, Privacy)
  lives in typed `src/content/*.ts` modules keyed by locale — this mirrors
  the brand book's chapter structure and keeps prose out of JSON. Insights
  articles are the exception: real MDX files, since that content is meant to
  be edited/added independently over time (see brand book's editorial plan).
- **Routing**: `src/i18n/routing.ts` defines the locale + pathname map.
  Internal links/redirects must go through `Link`/`redirect`/`useRouter`
  from `@/i18n/navigation`, not `next/link` or `next/navigation` directly —
  otherwise locale prefixing breaks.
- **Dev server on LAN IP**: Next.js 16's dev server blocks `/_next/static/*`
  chunk requests (403) and the HMR websocket if the site is opened from a
  device on the local network via IP (e.g. `192.168.x.x:3006`) rather than
  `localhost` — a DNS-rebinding guard. JS never loads in that case, so
  React never hydrates: the page looks static/broken and things like the
  cookie-banner buttons don't respond, even though the SSR'd HTML is fine.
  Fixed via `allowedDevOrigins` in `next.config.ts`, currently hardcoded to
  one IP — update it (or the network changes) if this 403 pattern
  reappears in the console for another device/IP.
- **Next.js 16 specifics** (this version is newer than most training data —
  see `node_modules/next/dist/docs/` before assuming an API): `proxy.ts`
  replaces `middleware.ts` (same behavior, renamed); `params`/`searchParams`
  are always `Promise`s; `PageProps<'/route'>` / `LayoutProps<'/route'>`
  generated helper types are used everywhere instead of hand-rolled prop
  types — run `npx next typegen` after adding/renaming a route if TS
  complains about a missing route string.
- **`InsightsDrawer` is portaled to `document.body`** (`react-dom`'s
  `createPortal`), not rendered inline in `Header`. Reason: the header has
  `backdrop-blur-sm`, and `backdrop-filter` (like `filter`/`transform`)
  makes its element the containing block for `position: fixed` descendants
  per the CSS spec — so an inline fixed-height-100%-of-viewport drawer
  would instead size itself to the 80px header. Keep this in mind before
  adding any other `fixed`-positioned overlay under a blurred/transformed
  ancestor.
- **`SectionReveal` (`src/components/ui/SectionReveal.tsx`) starts every
  wrapped block at `opacity: 0`** and only reveals it via `whileInView`
  (an `IntersectionObserver` under the hood) when the block actually
  scrolls into the viewport. A `next build`/`tsc`/full-page screenshot
  taken without scrolling will show those sections as blank — that's
  expected, not a bug, but it means "the build succeeded" is not evidence
  the page displays content. Confirmed via headless Chromium: static
  screenshot after load = blank mid-page sections; after emulating real
  scroll = all content visible, opacity 1, no console/page errors. If a
  real visitor ever reports "content isn't showing," check this first
  before assuming a data/hydration bug.
- **JSON-LD**: `src/lib/json-ld.tsx` has generators for `Organization`
  (emitted once, in the locale layout), `Service`, `FAQPage`,
  `BreadcrumbList`, `Article`. Add new ones there rather than inlining
  `<script type="application/ld+json">` in a page.
- **SEO metadata**: every page exports `generateMetadata` via
  `buildMetadata()` in `src/lib/seo.ts`, which fills in canonical +
  hreflang alternates for both locales automatically from the `Href` you
  pass. `sitemap.ts`/`robots.ts` live at the top level (`src/app/`, outside
  `[locale]`) since they cover both locales.

## Known gaps / next steps (not yet done)

- **Photography**: almost nothing in `../agency_IG/refer/` is usable —
  it's mostly unrelated stock (birds, cacao, a waterfall) or directly
  against the brand book's "no beach/palm-tree tourism imagery" rule. The
  two real São Tomé photos in that folder are 320×213px, too low-res for
  any real placement. The site currently uses an abstract
  navy/gold horizon-line + compass-ring SVG system (`src/components/ui/
  HorizonArt.tsx`) in place of photography everywhere. Real commissioned or
  licensed photography (coastal architecture, business meetings, airports —
  per the brand book's list) still needs to be sourced and dropped into the
  hero sections.
- **Logo**: using `public/images/logo-mark.png` / `logo-full.png`, cropped
  from the supplied `agency_IG/refer/logo2.png`. Only a raster PNG exists —
  no vector source. Ask for an SVG/AI file if the mark needs to scale
  further than the current usages.
- **Video**: the three source videos in `agency_IG/refer/` (up to 171MB)
  are intentionally not included anywhere in this repo. No hosting decision
  has been made yet (Cloudflare Stream was recommended, not confirmed) — no
  video component exists until that's decided.
- **Telegram delivery**: `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` are not
  set (see `.env.example`). The form works end-to-end except final
  delivery until those are provided.
- **Domain/deploy**: not yet deployed anywhere. Plan was Vercel without
  touching `citizenshipsaotome.com`'s existing DNS for now.
- **Privacy Policy** (`src/content/privacy.ts`) is a reasonable draft, not
  legal-reviewed. Have it checked before relying on it.
- **Insights**: only 4 seed articles (×2 locales) exist, covering 4 of the
  brand book's "10 mandatory launch articles." The other 6, plus the
  per-programme article series, are unwritten.
