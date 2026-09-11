import { About } from "@/components/about";
import { FinalCta } from "@/components/final-cta";
import { FounderReviews } from "@/components/founder-reviews";
import { Hero } from "@/components/hero";
import { InvestmentPerspectives } from "@/components/investment-perspectives";
import { Portfolio } from "@/components/portfolio";
import { Press } from "@/components/press";
import { Team } from "@/components/team";

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
