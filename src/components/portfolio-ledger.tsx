"use client";

import Image from "next/image";
import { useState } from "react";
import {
  assignedCategories,
  portfolioCompanies,
  type PortfolioCategory,
} from "@/data/portfolio";

/** The "show everything" pseudo-filter. Not one of the real categories. */
const ALL = "All";

type Filter = typeof ALL | PortfolioCategory;

/**
 * The portfolio ledger and its category filter.
 *
 * The only interactive component on the page, and deliberately the smallest one
 * that can work: the section heading around it stays server-rendered.
 * Filtering is a single `useState` — no router, no query string, no state
 * library. Query params were considered and rejected for this phase: they would
 * add history handling and a `useSearchParams` Suspense boundary for a control
 * with at most five options on a single-page site.
 *
 * The company data is imported here rather than passed across the server/client
 * boundary as props. It is static and known at build time either way, and
 * crossing the boundary made it serialize twice — once in the rendered HTML and
 * again in the hydration payload.
 *
 * `availableCategories` comes from the data, not from the full category list, so
 * a category with no confirmed companies can never render a chip that filters
 * to nothing. Today no company has a category, so the bar does not render at
 * all — and it will appear on its own the moment the owner supplies the
 * mapping, with no code change.
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

  return (
    <div className="mt-12 md:mt-16">
      {availableCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-border pb-6">
          {([ALL, ...availableCategories] as Filter[]).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              // The border is always present and only changes colour, so
              // switching filters cannot nudge the row below it.
              className={`eyebrow border-b pb-1 transition-colors duration-swift ease-standard ${
                category === active
                  ? "border-accent text-foreground"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <ul key={active} className="animate-fade">
        {visible.map((company) => (
          <li key={company.name} className="border-b border-border last:border-b-0">
            {/* The three-column split engages at `md`, not `lg`. Stacked rows
                at tablet width were the densest on the site — 164px each
                against 113px at laptop, because the tile and padding had
                already grown while the description still sat below the name.
                Measured with the real font metrics, the 279px description
                column at 768px holds every supplied description on one line
                (longest is 244px) and the 217px name column holds the longest
                name at 105px, so the split is safe there and cuts the tablet
                ledger from ~2130px to ~1470px. */}
            <a
              href={company.url}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-7 transition-colors duration-base ease-standard hover:bg-surface-sunken md:grid-cols-12 md:gap-x-8 md:py-8 lg:py-9"
            >
              {/* The supplied logos are opaque tiles with their own
                  backgrounds, so they are framed at a uniform size rather than
                  floated on the ivory as if they were transparent marks. */}
              <Image
                src={company.logo.src}
                alt=""
                width={company.logo.width}
                height={company.logo.height}
                className="size-12 rounded-card border border-border bg-surface object-contain transition-all duration-base ease-standard group-hover:border-border-strong group-hover:bg-surface-sunken md:col-span-3 md:size-14 lg:size-16"
              />

              <h3 className="text-title-sm text-foreground transition-colors duration-base ease-standard group-hover:text-accent md:col-span-4 md:col-start-4 lg:text-title">
                {company.name}
              </h3>

              <p className="col-span-2 max-w-measure text-caption text-foreground-muted transition-colors duration-base ease-standard group-hover:text-foreground-muted md:col-span-5 md:col-start-8">
                {company.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
