import { PortfolioLedger } from "./portfolio-ledger";

/**
 * Portfolio.
 *
 * A ledger, not a directory: one row per company, separated by the same
 * hairlines the perspectives section uses, on the same 3/4/5 column grid — a
 * framed logo in the marginal rail, the company name, then its description.
 * Nothing is boxed, and there is no arrow glyph on every row; the row's own
 * hover state carries the fact that it goes somewhere.
 *
 * The eyebrow and heading are owner-approved copy (docs/CONTENT.md). Everything
 * interactive lives in <PortfolioLedger>, so this stays a server component.
 *
 * This heading rail engages at `md`, unlike About's and Perspectives' (which
 * engage at `lg`), because the ledger rows below it also split at `md`. Leaving
 * it at `lg` put the heading flush against the shell edge from 768-1023px while
 * every row beneath it was already indented to column 4. Within-section
 * alignment wins over matching the other sections' breakpoint.
 */
export function Portfolio() {
  return (
    <section id="portfolio" className="shell py-section">
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16 lg:w-20" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="reveal mt-10 grid gap-x-8 gap-y-6 md:mt-14 md:grid-cols-12 md:gap-y-0">
        <p className="eyebrow text-accent md:col-span-3 md:pt-0.5">Portfolio</p>
        <h2 className="text-display-md font-display md:col-span-9 md:col-start-4">
          The company we keep.
        </h2>
      </div>

      <PortfolioLedger />
    </section>
  );
}
