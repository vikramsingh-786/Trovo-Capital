import { About } from "@/components/about";
import { FinalCta } from "@/components/final-cta";
import { FounderReviews } from "@/components/founder-reviews";
import { Hero } from "@/components/hero";
import { InvestmentPerspectives } from "@/components/investment-perspectives";
import { Portfolio } from "@/components/portfolio";
import { Press } from "@/components/press";
import { Team } from "@/components/team";

/**
 * The single long-form page. Every section carries real, owner-supplied
 * content. The one outstanding gap is the Uniblock founder quote, which is
 * held as `null` and rendered as a labelled placeholder — see
 * src/data/founder-reviews.ts.
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
      <Press />
      <FinalCta />
    </main>
  );
}
