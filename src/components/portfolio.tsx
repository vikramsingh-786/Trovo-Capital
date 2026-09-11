import { PortfolioLedger } from "./portfolio-ledger";

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
        </div>

        <PortfolioLedger />
      </div>
    </section>
  );
}
