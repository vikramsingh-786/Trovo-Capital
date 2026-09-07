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
 */
export function Portfolio() {
  return (
    <section id="portfolio" className="shell py-section">
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-6 md:mt-14 lg:grid-cols-12 lg:gap-y-0">
        <p className="eyebrow text-accent lg:col-span-3 lg:pt-0.5">Portfolio</p>
        <h2 className="text-display-md lg:col-span-9 lg:col-start-4">
          The company we keep.
        </h2>
      </div>

      <PortfolioLedger />
    </section>
  );
}
