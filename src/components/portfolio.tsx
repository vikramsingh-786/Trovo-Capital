import { PortfolioLedger } from "./portfolio-ledger";

/**
 * Portfolio.
 *
 * A showcase, not a logo wall: one card per company — a framed logo, the
 * company name, its supplied description and a sector tag. The card's own
 * hover state carries the fact that it goes somewhere.
 *
 * Set on the raised surface rather than the page ground so the section reads as
 * its own chapter — this is the one band on the page that steps away from the
 * base black.
 *
 * The eyebrow and heading are owner-approved copy (docs/CONTENT.md). Everything
 * interactive lives in <PortfolioLedger>, so this stays a server component.
 */
export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="border-y border-border bg-surface py-section"
    >
      <div className="shell">
        <div className="section-rule" />

        <div data-reveal className="mt-12 md:mt-16">
          <p className="eyebrow text-accent">Portfolio</p>
          <h2 className="mt-8 text-display-lg">The company we keep.</h2>
        </div>

        <PortfolioLedger />
      </div>
    </section>
  );
}
