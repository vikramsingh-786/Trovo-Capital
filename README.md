# Trove Capital Partners — Website

Premium static marketing site for Trove Capital Partners. Deployed as a static
site to Cloudflare by DevOps.

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

## Deferred deliberately

- **`eslint-config-next` enables only 6 of ~30 `jsx-a11y` rules** (`alt-text`,
  `aria-props`, `aria-proptypes`, `aria-unsupported-elements`,
  `role-has-required-aria-props`, `role-supports-aria-props`). Rules like
  `label-has-associated-control`, `anchor-is-valid` and
  `click-events-have-key-events` are **off**. Turning them on requires adding
  `eslint-plugin-jsx-a11y` as a direct devDependency — for the accessibility phase.
- **`metadataBase` is unset** in `src/app/layout.tsx`. In Next 16 a relative URL
  in a metadata field is a hard *build error* without it, so the first
  `openGraph.images: "/og.png"` or `alternates.canonical: "/"` will fail the
  build until the production domain is known.
- **`src/app/icon.svg` is a placeholder**, not a Trove brand mark.
- **No Content-Security-Policy** in `public/_headers` yet; it depends on the
  font/analytics choices still to be made.
