# Trove Capital Partners — Website

Premium static marketing site for Trove Capital Partners. Deployed as a static
site to Cloudflare by DevOps.

**Site copy lives in [`docs/CONTENT.md`](docs/CONTENT.md)** — owner-supplied and
authoritative. Read it before any content phase; never invent what it omits.

## Structure

One long-form page: Navigation · Hero · About Us · Three investment perspective
buckets · Portfolio · Founder Reviews · Meet the Team · Final CTA · Footer.
Founder Reviews are lowest priority and come after Portfolio and Team.

Portfolio companies, categories, team members and testimonials must come from
`src/data/` configuration, not hardcoded JSX — the site is expected to iterate
on content repeatedly.

## Phases

1 Setup ✅ · 2 Design system ✅ · 3 Navigation · 4 Hero · 5 About ·
6 Three buckets · 7 Portfolio architecture + filtering · 8 Portfolio
assets/content · 9 Team · 10 Founder Reviews · 11 Final CTA + Footer ·
12 Animation/polish · 13 Real content/assets · 14 SEO · ~~15 Accessibility~~ (out of scope) ·
16 Performance · 17 Final QA · 18 Static deployment prep

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (configured via `@import "tailwindcss"` in `src/app/globals.css` + `@tailwindcss/postcss`)
- **ESLint 9** flat config (`eslint-config-next` core-web-vitals + typescript)

No database, authentication, backend, or API routes — by design.

## Commands

```bash
npm run dev        # development server -> http://localhost:3000
npm run build      # production build + static export -> out/
npm run preview    # serve the exported out/ directory locally
npm run typecheck  # next typegen && tsc --noEmit
npm run lint       # eslint
```

## Deployment (for DevOps)

```bash
npm ci                 # or: npm install
npm run build          # writes the complete static site to out/
```

Deploy the contents of **`out/`** to Cloudflare as a static site. There is no
server, no API route, no database and no runtime environment variable — the
build output is the whole application, so any static host serves it.

Two things the hosting side must be told:

1. **`out/_headers`** ships with the build and sets immutable caching for
   `/_next/static/*` plus `nosniff`, `Referrer-Policy` and `X-Frame-Options`.
   Cloudflare Pages and Workers Static Assets both read it from the deploy root.
2. **`trailingSlash: true`**, so the export emits directory-style URLs
   (`about/index.html`). On Cloudflare Pages this matches the default
   behaviour. On **Workers Static Assets** the defaults do not match: set
   `html_handling` to `auto-trailing-slash` or `force-trailing-slash`, and set
   `not_found_handling` to `"404-page"` — otherwise the exported `404.html` is
   never served.

**Domain, DNS and TLS are DevOps'.** Nothing in the repo assumes a hostname.
Note that `metadataBase` is deliberately unset, so canonical and Open Graph
URLs cannot be emitted until a production domain is supplied.

There is also a **lockfile caveat** — see "Known issue" below.

## Static export

`next.config.ts` sets `output: "export"`, so `next build` writes a fully static
site to `out/`. Consequences to keep in mind:

- `next start` does **not** work. Use `npm run preview` for a local production preview.
- No server-only features: no API routes, Route Handlers, Middleware, ISR,
  Server Actions, or dynamic `cookies()`/`headers()` usage.
- `images.unoptimized: true` is required, so images must be pre-sized and
  pre-compressed in `public/`.
- `trailingSlash: true` gives directory-style URLs (`/about/` -> `about/index.html`).
- `typedRoutes: true` makes internal `<Link href>` values type-checked, so a
  broken internal link fails the build instead of shipping a 404.
- HTTP headers cannot come from `next.config.ts` under `output: "export"`, so
  they live in `public/_headers` (copied verbatim to `out/_headers`, which
  Cloudflare reads).

### Open questions for DevOps

1. **Cloudflare Pages or Workers Static Assets?** On Workers, the defaults do
   not match this build: `not_found_handling` defaults to `"none"`, which means
   the exported `404.html` is never served, and `html_handling` should be
   `"auto-trailing-slash"` or `"force-trailing-slash"` to match
   `trailingSlash: true` (otherwise every internal link costs a 308 redirect).
   Cloudflare Pages picks up `404.html` and canonicalises slashes on its own.
2. **Lockfile portability** — see below. This blocks any build that runs
   outside the corporate network.

## Known issue: the lockfile is not portable

Every one of the 436 entries in `package-lock.json` resolves to the internal
proxy over plain HTTP:

```
"resolved": "http://pkgproxy-uat.coinswitch.co/npm/next/-/next-16.3.4.tgz"
```

`npm ci` therefore only works on a machine that can reach that host, so a
Cloudflare Pages / GitHub Actions build would fail. It also pins a production
build to a **UAT** proxy.

This cannot be fixed from a developer machine: an npm policy shim rejects any
other registry outright —

```
[Peepalco Policy] ERROR: 'https://registry.npmjs.org/' not approved.
[Peepalco Policy] Only pkgproxy-uat.coinswitch.co is permitted.
```

**Options for DevOps (pick one):**

- Regenerate the lockfile once from an unrestricted environment
  (`rm package-lock.json && npm install --registry=https://registry.npmjs.org/`)
  and commit that. This also removes the need for the `overrides` block below.
- Or give the CI/Cloudflare builder network access plus credentials for the
  proxy, and promote it from `uat` to a production host.

No project `.npmrc` is committed on purpose: hard-coding the UAT proxy in the
repo would guarantee the failure above for any external builder.

## npm `overrides` — why they exist

The corporate npm proxy (`pkgproxy-uat.coinswitch.co`) returns **403 Forbidden**
for two very recently published transitive packages, which makes a clean
`npm install` fail:

| Blocked package    | Pulled in by                     | Override applied              |
| ------------------ | -------------------------------- | ----------------------------- |
| `es-abstract-get`  | `es-to-primitive@1.3.1+`         | `es-to-primitive: 1.3.0`      |
| `is-document.all`  | `function.prototype.name@1.2.0`  | `function.prototype.name: 1.1.8` |

Both are deep dev-only dependencies of `eslint-config-next` (via
`eslint-plugin-import` -> `es-abstract`). The pinned versions still satisfy their
parents' semver ranges, so nothing is force-downgraded beyond these two leaves,
and no runtime/site code is affected.

**Remove these overrides once the proxy allowlists the two packages** (or once
the lockfile is regenerated against the public registry), then run
`npm install` and confirm `npm run lint` still passes.

The overrides are intentionally tree-wide rather than scoped under `es-abstract`,
because `function.prototype.name` has more than one consumer in the tree and a
scoped override would let the blocked version back in. The residual risk is that
a future *production* dependency wanting `es-to-primitive@^1.4` or
`function.prototype.name@^1.2` would be silently downgraded — worth re-checking
whenever a runtime dependency is added.

## Design system (Phase 2)

Tokens live in `src/app/globals.css` as a Tailwind v4 `@theme` block; there is
no `tailwind.config.js` (v4 is CSS-first). A temporary `/styleguide` route
documented the token layer during development and was removed at deployment
prep; `git show 16f9c04:src/app/styleguide/page.tsx` still has it if a
reference is ever wanted.

- **Display:** Newsreader (variable, weight 200–800, latin)
- **Text/UI:** Schibsted Grotesk (variable, weight 400–900, latin)
- Both self-hosted by `next/font` at build time: no runtime Google request, no
  layout shift, static-export safe. Preloaded payload is **105 KB** total.
- Palette: warm ivory surfaces, warm near-black ink, one muted bronze accent.
  Every semantic alias is text-safe on the ground it is named for, with the
  measured ratio recorded next to the token.

Two measured decisions worth keeping:

- Newsreader's `opsz` axis was **dropped**: it added 73.7 KB (+127%) to the
  preloaded latin file for a refinement invisible at this scale.
- **No italic face is loaded.** Adding one preloads it too (+64.5 KB). Until a
  pull quote needs real italics, `font-synthesis: style` renders `<em>` as a
  synthesised oblique. When they are wanted, add a second Newsreader instance
  with `preload: false`.

## Assets

Owner-supplied originals live in **`assets/brand/`**, outside `public/`, so they
are never deployed — `next build` copies `public/` verbatim and Next offers no
exclude option. `public/logo/` contains only built output.

```
assets/brand/logo.jpg             supplied Trove lockup (source of record)
assets/brand/portfolio/*.jpg|png  the 13 supplied company logos
assets/brand/founders/*           the 3 supplied founder portraits
        |
        |  python3 scripts/build-assets.py
        v
public/logo/trove-logo.webp       336x128, lossless
public/logo/<slug>.webp           13 tiles, 192x192
public/founders/<name>.webp       capped at 900px on the long edge, aspect kept
```

Re-run `scripts/build-assets.py` whenever a supplied asset changes. It needs
Pillow — a local tool dependency, deliberately not a project one.

### Why WebP

Static export forces `images.unoptimized`, so the browser gets exactly the
bytes we ship and format is the only lever. Measured on this set:

| approach | total | note |
|---|---|---|
| supplied originals | 376 KB | Kuru 1600x1600 at 140 KB for a 56px tile |
| resized, formats kept | 70.6 KB | makes 3 PNGs *larger* (crux 1.8 -> 4.8 KB) |
| **resized + WebP** | **23.3 KB** | keeps Shield's alpha; 93.8% smaller |

Deployed image payload overall: **421 KB -> 48 KB** (the 24.7 KB wordmark is
lossless, since lossy artefacts on the primary brand mark are not worth ~9 KB).

Tiles are padded to a uniform 192x192 square. The padding is transparent, so it
renders exactly as letterboxing would inside the framed tile, but keeps one set
of dimensions for all thirteen — Shield is the only non-square original
(240x206). No logo was recreated, recoloured or redrawn.

Founder portraits are **not** squared or padded like the logo tiles — each
keeps its own aspect ratio (the three supplied originals are 0.8–1.0), only
capped at 900px on the long edge, since `founder-reviews.tsx` frames them
itself. Adeoye's original alone was 2400x3000 at 1.2MB; the full set of three
went from 1.5MB to 110 KB (92.9% smaller) with no visible quality loss at the
sizes they render at.

### Still worth improving

- **A vector Trove mark would beat any raster**: the mark is monochrome line
  art, so an SVG would be a few KB instead of 24.7, scale perfectly, and remove
  the white-keying step entirely.
- `src/app/icon.svg` (the favicon) is still a labelled placeholder, not the
  Trove mark.
- **Team portraits are not yet normalized.** `public/team/*.png` are supplied
  originals shipped directly (1.2–1.6MB, ~1200px each) with no equivalent
  `assets/brand/` + `build-assets.py` pass — the same problem the founder
  portraits had until now.

## Open decisions

Blocking items are marked. Nothing here will be guessed.

Settled by the owner: brand naming, text wordmark, navigation contents, logo
presentation, filename normalisation, and display names ("BlockScholes",
"Stan") — all recorded in `docs/CONTENT.md`.

| # | Question | Blocks |
|---|---|---|
| 1 | **Portfolio category for each of the 13 companies.** None supplied. | Phase 8 content (not Phase 7 architecture) |
| 8 | **Three-buckets section** has no eyebrow or headline, unlike Portfolio. Add one, or run the three blocks bare? | Phase 6 |
| 9 | **Hero**: anything beyond brand + headline — sub-line, CTA, scroll cue, imagery? | Phase 4 |
| 10 | **Team**: order and descriptions are now settled (`docs/CONTENT.md`). Balaji Srihari still needs role, experience credential, portrait and link. | Phase 9 content |
| 11 | **Footer contents**: nav repeat, email, social, legal, address, copyright entity. | Phase 11 |
| 12 | **Founder Reviews**: how many placeholder slots to architect for? | Phase 10 |
| 13 | **Production domain** — still needed for `metadataBase`, canonical and OG URLs. | Phase 14 |
| 14 | `trovecapital@partners.co` — used exactly as supplied; confirming the domain is intentional. | Phase 11 |

## Deferred deliberately

- **Accessibility is out of scope** by owner decision (see AGENTS.md rule 10).
  The stricter `jsx-a11y` ESLint rules are therefore deliberately left off, and
  no accessibility auditing is performed. Accessibility code already written in
  Phases 2-3 stays as-is rather than being torn out.
- **`metadataBase` is unset** in `src/app/layout.tsx`. In Next 16 a relative URL
  in a metadata field is a hard *build error* without it, so the first
  `openGraph.images: "/og.png"` or `alternates.canonical: "/"` will fail the
  build until the production domain is known.
- **`src/app/icon.svg` is a placeholder**, not a Trove brand mark.
- **No Content-Security-Policy** in `public/_headers` yet; it depends on the
  font/analytics choices still to be made.
- **No hairline / rule vocabulary.** Editorial layout does most of its
  structural work with rules, and the token layer only has two border colours.
  Deliberately not invented in Phase 2: rule placement is a composition
  decision, so it is settled in the navigation/section phases where there is
  real layout to design against.
- **Real italics** — see the design-system note above.
