import Link from "next/link";
import { About } from "@/components/about";
import { FinalCta } from "@/components/final-cta";
import { FounderReviews } from "@/components/founder-reviews";
import { Hero } from "@/components/hero";
import { InvestmentPerspectives } from "@/components/investment-perspectives";
import { Portfolio } from "@/components/portfolio";
import { Team } from "@/components/team";

/**
 * The single long-form page. Every section is now real; only the founder
 * reviews carry temporary dummy data (see src/data/founder-reviews.ts).
 *
 * The `id`s on About, Portfolio, Team and the closing CTA must survive: both
 * the header and footer navigation point at them via src/data/navigation.ts.
 */

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <InvestmentPerspectives />
      <Portfolio />
      <Team />
      <FounderReviews />
      <FinalCta />

      {/* Internal link, kept out of the Hero so that section carries approved
          copy only. `prefetch={false}` because the default would pull this
          dev-only route's RSC payload (~140 KB) on the production page.
          Removed with the styleguide route at deployment prep. */}
      <div className="border-t border-border">
        <p className="shell py-8 text-caption text-foreground-muted">
          <Link
            href="/styleguide"
            prefetch={false}
            className="underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-accent"
          >
            Design system reference
          </Link>
        </p>
      </div>
    </main>
  );
}
