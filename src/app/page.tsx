import Link from "next/link";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { InvestmentPerspectives } from "@/components/investment-perspectives";
import { Portfolio } from "@/components/portfolio";
import { Team } from "@/components/team";

/**
 * The single long-form page.
 *
 * The Hero, About, investment perspectives, Portfolio and Team are real. The
 * sections after them are deliberately UNDESIGNED SCAFFOLDING: they exist so
 * the sticky header and its anchor offsets have real scroll targets, and each
 * is replaced wholesale by its own phase — Founder Reviews, Final CTA.
 * Their ids must survive, because src/data/navigation.ts points at them.
 */

const scaffold = [
  { id: "contact", label: "Contact", phase: "Phase 11" },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <InvestmentPerspectives />
      <Portfolio />
      <Team />

      {scaffold.map(({ id, label, phase }) => (
        <section key={id} id={id} className="border-t border-border">
          <div className="shell flex min-h-[60vh] flex-col justify-center py-section">
            <p className="eyebrow text-foreground-muted">
              {label} — scaffolding
            </p>
            <p className="mt-4 max-w-measure text-base text-foreground-muted">
              Anchor target <code className="font-mono">#{id}</code>. Built in{" "}
              {phase}.
            </p>
          </div>
        </section>
      ))}

      {/* Internal link, kept out of the Hero so that section carries approved
          copy only. Removed with the styleguide route at deployment prep. */}
      <div className="border-t border-border">
        <p className="shell py-8 text-caption text-foreground-muted">
          <Link
            href="/styleguide"
            className="underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-accent"
          >
            Design system reference
          </Link>
        </p>
      </div>
    </main>
  );
}
