# Trove Capital — supplied content of record

Everything in this file was **supplied by the project owner**. It is the single
source of truth for site copy.

Rules for this file:

- **Do not alter supplied copy** (wording, punctuation, capitalisation) without
  explicit owner approval. If revised copy is provided, update this file first.
- **Do not invent** anything absent here: no founder or employee names, roles,
  biographies, quotes, statistics, claims, awards, partnerships, portfolio
  categories or descriptions.
- Anything not yet supplied is listed under "Open items" at the bottom and must
  be rendered as a clearly-labelled placeholder until provided.
- Once `src/data/*` files exist (portfolio / team / testimonials), they are
  derived from this document. This file remains the owner-supplied record.

---

## Reference sites (inspiration only)

- https://www.inception.capital/
- https://maelstrom.fund/
- https://www.tritoncapital.xyz/
- https://www.cxpartners.in/

Use for information architecture, visual quality, typography, spacing,
interaction patterns and investment-firm presentation only. **Do not copy their
design, code, content, branding or assets.**

---

## Site structure (long-form single narrative)

1. Navigation
2. Hero
3. About Us
4. Three investment perspective buckets
5. Portfolio
6. Founder Reviews
7. Meet the Team
8. Final CTA
9. Footer

Founder Reviews are the **lowest-priority** content section and are built after
Portfolio and Team.

---

## Brand naming (owner decision)

**Trove Capital** is the primary visual brand name — navigation, footer and
page-level branding. **Trove Capital Partners** is used where it appears
naturally in formal body copy (About, CTA). Do not rewrite supplied copy to
force either form.

There is no supplied Trove wordmark or mark. Navigation and footer use
**TROVE CAPITAL** set in the design system's typography, implemented so a real
mark can replace it without touching layout. Never invent or generate a
graphical logo.

## Navigation (owner decision)

Single-page site with anchor navigation. Items, in order: **About · Portfolio ·
Team · Contact**. Subtle sticky navigation on desktop, an accessible compact
menu on mobile. **No large CTA button in the nav** — the contact CTA is the
final section's job.

## Hero

- **Brand:** Trove Capital
- **Headline:** Capital for what comes next.

Keep the hero minimal and premium.

---

## About Us

- **Eyebrow:** ABOUT US
- **Headline:** An investor's capital. An operator's perspective.

**Body:**

> Trove Capital Partners invests in emerging technology companies with the
> potential to shape large, evolving markets.
>
> Built on the foundations of one of India’s leading technology groups, we
> combine investment discipline with an operator’s perspective, bringing deep
> technology understanding, global relationships, and first-hand
> company-building experience to every partnership.

---

## Three investment perspective buckets

Three distinct editorial blocks.

### Understanding that runs deep

> Our roots are in building and scaling technology businesses — bringing an
> operator’s understanding of products, markets and the challenges of growth to
> how we invest.

### A network built to compound

> Our global network of founders, operators and investors creates meaningful
> access to expertise, strategic relationships and capital.

### Built for the scaling journey

> We partner with companies at pivotal stages of growth, bringing an operator’s
> perspective to go-to-market, new markets, and the decisions that shape scale.

---

## Portfolio

Significantly more important than the original brief specified. Not a static
logo wall — a polished, interactive showcase.

- **Eyebrow:** PORTFOLIO
- **Headline:** The company we keep.
- **Filters:** All · Consumer · Enterprise · Infrastructure · Digital Assets

### Categories

1. Consumer
2. Enterprise
3. Infrastructure
4. Digital Assets

> **CATEGORY ASSIGNMENTS HAVE NOT BEEN SUPPLIED.** Not one of the 13 companies
> below has a confirmed category. These must come from data/configuration and
> must not be guessed. See "Open items".

### Companies (13 supplied)

Descriptions and URLs below are **exact as supplied** — do not rewrite them.

Display names are **exactly as listed** — "BlockScholes" (not "Block Scholes")
and "Stan" (not "Stan Labs"), per owner decision.

| # | Company | Description | Website | Logo | Category |
|---|---|---|---|---|---|
| 1 | Tribe | 24/7 personal finance companion | https://www.tribemoney.ai/ | `tribe.jpg` | *unassigned* |
| 2 | Crux | AI platform for performance-marketing | http://getcrux.ai/ | `crux.png` | *unassigned* |
| 3 | Uniblock | Unified Web3 API layer | https://uniblock.dev/ | `uniblock.jpg` | *unassigned* |
| 4 | Desyn | Decentralized Liquidity Infrastructure | https://desyn.io/#/ | `desyn.jpg` | *unassigned* |
| 5 | YouSend | Stablecoin powered remittance platform | https://yousend.co/ | `yousend.jpg` | *unassigned* |
| 6 | Deconflict | Verified Intelligence for Financial Crime | https://deconflict.com/law-enforcement/ | `deconflict.jpg` | *unassigned* |
| 7 | Silence Labs | Institutional grade security platform | https://silencelaboratories.com/ | `silence-labs.jpg` | *unassigned* |
| 8 | Kuru | Fully onchain order book DEX | https://www.kuru.io/ | `kuru.jpg` | *unassigned* |
| 9 | Stan | Gaming & Creator Hub | https://getstan.app/ | `stan.jpg` | *unassigned* |
| 10 | Shield | Cross Border Stablecoin Neo Bank | https://www.getshield.xyz/en | `shield.png` | *unassigned* |
| 11 | Cysic | Full-Stack Compute Network | https://app.cysic.xyz/ | `cysic.jpg` | *unassigned* |
| 12 | BlockScholes | Crypto Derivatives Intelligence | https://www.blockscholes.com/ | `blockscholes.png` | *unassigned* |
| 13 | Kelp | Liquid Restaking Platform | https://kerneldao.com/kelp/ | `kelp.jpg` | *unassigned* |

### Portfolio presentation (owner decision)

Use the supplied logos **as they actually exist** — never recreate, redraw,
recolour or invent a company logo. Because they are opaque tiles, present them
in a disciplined contained treatment rather than pretending they are transparent
wordmarks: uniform visual dimensions, restrained containers, hairline borders,
no unnecessary shadows, strong company names and descriptions, subtle
interaction. **The logo supports the content; it does not dominate it.**

`All` is the default active filter. Category buttons may exist during
development, but must never carry fabricated company mappings.

### Portfolio UI requirements

Must support: category filtering · "all companies" view · company logo ·
company name · short description · external website link.

Prioritise: elegance · discoverability · smooth filtering · strong logo
presentation · concise descriptions · external website access · excellent
mobile experience.

Avoid: generic SaaS cards · excessive rounded corners · excessive shadows ·
overly complex filtering · unnecessary animations.

Must be easy to update when the final category mapping and additional companies
arrive.

---

## Meet the Team

Five people supplied — **names only**:

1. Ashish
2. Vimal
3. Siva
4. Balaji
5. Pratyush

Owner's requirement, verbatim:

> "need to highlight each of their startup experience along with the image"

The Team component must support: name · image · current designation/role ·
startup/company experience · experience description · optional links.

Must visually emphasise **both** the person/photo **and** their
founder/operator/startup experience. Not a generic employee directory.

> **Biographies, roles, experience and images have NOT been supplied.** Do not
> invent them. Build the data structure so they drop in later.

---

## Founder Reviews

Lower priority; built after Portfolio and Team.

> **Founder list, photographs and quotes have NOT been supplied.** Do not invent
> quotes, names, photos or company claims. Build reusable architecture with
> clearly-labelled placeholders.

---

## Final CTA

- **Headline:** Building a company ready to scale?
- **Supporting text:** Connect with Trove Capital Partners.
- **Email:** trovecapital@partners.co  ← use this address exactly as given

---

## Content flexibility requirement

The site is expected to iterate repeatedly. Therefore:

- Portfolio companies come from data/configuration, never hardcoded in JSX.
- Team members come from data/configuration.
- Founder testimonials come from data/configuration.
- Portfolio categories are configurable.

Components must not need redesigning every time content changes.

---

## Open items (owner decision required)

Tracked in README.md under "Open decisions". Nothing here may be guessed.
