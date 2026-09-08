"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  assignedCategories,
  portfolioCompanies,
  type PortfolioCategory,
} from "@/data/portfolio";
import { LAYOUT_EVENT } from "./motion/choreography";

/** The "show everything" pseudo-filter. Not one of the real categories. */
const ALL = "All";

type Filter = typeof ALL | PortfolioCategory;

/**
 * The portfolio grid and its category filter.
 *
 * One card per company on a responsive grid, replacing the row-per-company
 * ledger this component used to render. Each card is a hairline-bordered plate
 * with a vertical fill: the logo tile and sector at its head, the name and
 * supplied description below. Depth is illumination, not a drop shadow —
 * shadows read as dirt on a near-black ground — so hover fades in the same
 * bronze bloom the hero uses and wipes an accent hairline across the top edge.
 *
 * Each card is a `[data-tilt]` plate, the same 3D treatment the team,
 * perspectives and about sections use: it rotates toward the pointer, a glare
 * tracks the cursor across it, and the three `[data-tilt-layer]` groups lift
 * off it by increasing amounts so the name leads. Pointer devices only, and
 * driven from <Choreography>. Because the filter replaces these nodes, that
 * binding is re-run on LAYOUT_EVENT — see the note there.
 *
 * The only interactive component on the page, and deliberately the smallest one
 * that can work: the section heading around it stays server-rendered.
 * Filtering is a single `useState` — no router, no query string, no state
 * library. Query params were considered and rejected: they would add history
 * handling and a `useSearchParams` Suspense boundary for a control with five
 * options on a single-page site.
 *
 * The company data is imported here rather than passed across the server/client
 * boundary as props. It is static and known at build time either way, and
 * crossing the boundary made it serialize twice — once in the rendered HTML and
 * again in the hydration payload.
 *
 * `availableCategories` comes from the data, not from the full category list, so
 * a category with no companies can never render a chip that filters to nothing.
 *
 * ⚠️ The category each card is filed under is a PLACEHOLDER inferred from the
 * company's own description, not an owner-confirmed mapping — see
 * src/data/portfolio.ts.
 */
export function PortfolioLedger() {
  const companies = portfolioCompanies;
  const availableCategories = assignedCategories();
  const [filter, setFilter] = useState<Filter>(ALL);

  // A category can stop being available if the data changes underneath the
  // current selection; fall back rather than render an empty ledger.
  const active =
    filter !== ALL && !availableCategories.includes(filter) ? ALL : filter;

  const visible =
    active === ALL
      ? companies
      : companies.filter((company) => company.category === active);

  // Filtering to one category drops over a thousand pixels of document height,
  // which leaves every ScrollTrigger below this section measured against a
  // scroll position the page no longer reaches. Nothing in ScrollTrigger's
  // `autoRefreshEvents` observes content height, so the refresh has to be
  // announced. In an effect rather than the click handler: the cards have to be
  // committed to the DOM before anything is worth re-measuring.
  useEffect(() => {
    window.dispatchEvent(new Event(LAYOUT_EVENT));
  }, [active]);

  return (
    <div className="mt-14 md:mt-18">
      {availableCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 border-b border-border pb-8">
          {([ALL, ...availableCategories] as Filter[]).map((category) => {
            const isActive = category === active;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                // The dimension carries the selection: the active chip is a
                // key held DOWN, the rest sit raised. Border and padding are
                // identical in both states and only the colours and the shadow
                // change, so switching filters cannot reflow the row.
                className={`eyebrow rounded-pill border px-4 py-2.5 transition-[color,background-color,border-color,box-shadow] duration-swift ease-standard ${
                  isActive
                    ? "border-accent bg-accent text-background keycap-pressed-accent"
                    : "border-border bg-surface-raised text-foreground-muted keycap hover:border-border-strong hover:text-foreground hover:keycap-pressed"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      <div
        key={active}
        className="animate-fade mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
      >
        {visible.map((company) => (
          <a
            key={company.name}
            data-tilt
            href={company.url}
            target="_blank"
            rel="noreferrer"
            // Both gradient stops have to clear `bg-surface` — the band this
            // section sits on. Ending the fill at `to-surface` matched that
            // ground exactly and the lower half of every card dissolved.
            //
            // NOTHING here may set `overflow`, `isolation`, `opacity`, a
            // filter or a mask: every one of those is a grouping property that
            // forces `transform-style` back to `flat`, which would kill the
            // tilt `tilt-card` sets up and flatten the lifted layers onto the
            // plate. Decorations are clipped by their own wrapper instead, and
            // depth order comes from DOM order rather than a negative
            // z-index — the latter needs a stacking context this element is
            // not allowed to create.
            className="group tilt-card relative flex flex-col rounded-card border border-border bg-linear-to-b from-surface-sunken to-surface-raised p-6 transition-colors duration-base ease-editorial hover:border-border-strong md:p-7"
          >
            {/* First in DOM so every later sibling paints over it.
                `-inset-px` rather than `inset-0`: an absolute child is placed
                against the PADDING box, whose corner curve is already a border
                width tighter than `rounded-card`, so at `inset-0` this
                wrapper's own radius overshoots it and the bloom grazes the
                border corner. */}
            <span className="absolute -inset-px overflow-hidden rounded-card">
              {/* Depth on a dark ground comes from illumination, not from a
                  drop shadow: the same bronze bloom the hero uses, held at
                  zero opacity until the card is hovered. */}
              <span className="glow absolute inset-0 opacity-0 transition-opacity duration-slow ease-editorial group-hover:opacity-100" />

              {/* An accent hairline wiping across the head of the card — the
                  same device the nav links use, so the hover reads as one
                  language. Clipped by this wrapper, so it follows the corner
                  radius instead of overshooting it. */}
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-base ease-editorial group-hover:scale-x-100" />
            </span>

            {/* The travelling specular highlight. `tilt-glare` gives it
                `z-index: 2` to out-paint the decoration wrapper above, which
                is coplanar with it, and it carries its own `rounded-card`
                because that wrapper therefore cannot clip it. Once the layers
                below are raised they sit in FRONT of it: a preserve-3d parent
                depth-sorts its children and falls back to z-index only among
                coplanar ones. */}
            <span data-tilt-glare className="tilt-glare rounded-card" />

            {/* The supplied logos are opaque tiles with their own grounds, so
                they keep a hairline frame rather than floating on the card.
                Lifted least of the three layers, so the plate still reads as
                the thing being tilted. */}
            <div
              data-tilt-layer="25"
              className="relative flex items-start justify-between gap-4"
            >
              <Image
                src={company.logo.src}
                alt={company.name}
                width={company.logo.width}
                height={company.logo.height}
                className="size-14 rounded-media border border-border object-contain transition-colors duration-base ease-standard group-hover:border-border-strong"
              />

              {company.category && (
                <span className="eyebrow shrink-0 text-[0.5625rem] text-foreground-faint transition-colors duration-base ease-standard group-hover:text-accent">
                  {company.category}
                </span>
              )}
            </div>

            {/* Lifted furthest, so the name is what comes forward. */}
            <div
              data-tilt-layer="55"
              className="relative mt-8 flex items-baseline justify-between gap-3 md:mt-10"
            >
              <h3 className="text-title transition-colors duration-base ease-standard group-hover:text-accent">
                {company.name}
              </h3>

              {/* Tailwind gates `group-hover:` behind `(hover: hover)`, so on a
                  touch screen this would never arrive and nothing would mark
                  the card as an outbound link. `pointer-coarse` rests it in the
                  arrived state there instead. */}
              <svg
                viewBox="0 0 16 16"
                className="size-4 shrink-0 -translate-x-1 text-foreground-faint opacity-0 transition-[translate,color,opacity] duration-base ease-editorial group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 pointer-coarse:translate-x-0 pointer-coarse:opacity-100"
                fill="none"
              >
                <path
                  d="M4.5 11.5L11.5 4.5M6 4.5h5.5V10"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p
              data-tilt-layer="35"
              className="relative mt-3 text-caption text-foreground-muted"
            >
              {company.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
