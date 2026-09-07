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
no `tailwind.config.js` (v4 is CSS-first). `/styleguide` renders the whole
token layer and is **temporary** — Phase 18 deletes both the route and the link
to it in `src/app/page.tsx`.

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

## Asset inventory — `public/logo/`

13 files, one per supplied portfolio company. All map 1:1 by filename; nothing
is unmatched or orphaned. Measured with PIL, not assumed:

| File | Real format | Pixels | Background |
|---|---|---|---|
| `tribe.jpg` | JPEG | 480×480 | coloured tile (yellow) |
| `crux.png` | PNG | 400×400 | white tile |
| `uniblock.jpg` | JPEG | 400×400 | white tile |
| `desyn.jpg` | JPEG | 1164×1164 | white, non-uniform |
| `yousend.jpg` | JPEG | 400×400 | dark tile |
| `deconflict.jpg` | JPEG | 400×400 | dark tile |
| `silence-labs.jpg` | JPEG | 400×400 | coloured tile (navy) |
| `kuru.jpg` | JPEG | 1600×1600 | coloured, non-uniform |
| `stan.jpg` | JPEG | 400×400 | dark tile |
| `shield.png` | **PNG** | 240×206 | coloured, non-uniform |
| `cysic.jpg` | JPEG | 400×400 | dark tile |
| `blockscholes.png` | PNG | 400×400 | coloured tile (navy) |
| `kelp.jpg` | JPEG | 400×400 | coloured tile (teal) |

Filenames were normalised to URL-safe lowercase slugs (owner-approved). Each
rename was verified byte-identical, and each new extension matches the file's
real format — `shield.png` was `Shield Logo.jpg` but contained PNG data, which
would have been served as `image/jpeg` under our `nosniff` header.

### Remaining problems with these assets

1. **They are opaque app-style tiles, not transparent wordmarks.** Every file
   has a solid or busy background — white, dark or brand-coloured. None can sit
   directly on the ivory ground without showing its own box. Settled: the
   portfolio uses a disciplined contained treatment (see `docs/CONTENT.md`).
2. **Sizes range 240×206 → 1600×1600** (~376 KB total). Because static export
   forces `images.unoptimized`, these must be pre-sized and compressed by hand
   before Phase 8 — Kuru alone is 140 KB for a mark shown at ~120 px.
3. **`shield.png` is 240×206**, the only non-square asset, so it needs its own
   treatment in a uniform grid.

`npm run build` runs `scripts/clean-export.mjs`, which strips `.DS_Store` and
AppleDouble `._*` files from `out/` — Next copies `public/` verbatim and has no
exclude option, so they are removed after the build rather than deleted from
the working tree.

### Assets not supplied

- **No Trove brand mark or wordmark.** Navigation (Phase 3) and Footer
  (Phase 11) both need one. `src/app/icon.svg` is a labelled placeholder.
- **No team photographs** (Phase 9 needs five).
- **No founder photographs** (Phase 10).

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
| 10 | **Team**: roles, experience, bios, photos, surnames, ordering, links. Names only were supplied. | Phase 9 content |
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
