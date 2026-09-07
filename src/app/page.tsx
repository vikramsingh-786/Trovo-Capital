import Link from "next/link";

/**
 * PLACEHOLDER PAGE — Phase 3 (navigation) only.
 *
 * The sections below are deliberately UNDESIGNED SCAFFOLDING: they exist so the
 * sticky header, the anchor offset and the mobile menu can actually be tested
 * against real scroll targets. Each is replaced wholesale by its own phase —
 * Hero, About, the three investment blocks, Portfolio, Team, Founder Reviews,
 * Final CTA. The ids must survive, because src/data/navigation.ts points at
 * them.
 */

const scaffold = [
  { id: "about", label: "About", phase: "Phase 5" },
  { id: "portfolio", label: "Portfolio", phase: "Phases 7–8" },
  { id: "team", label: "Team", phase: "Phase 9" },
  { id: "contact", label: "Contact", phase: "Phase 11" },
];

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="shell flex min-h-[70vh] flex-col justify-center py-section">
        <p className="eyebrow text-accent">Placeholder</p>
        <h1 className="mt-5 text-display-lg">Trove Capital</h1>
        <p className="mt-6 max-w-measure text-lead text-foreground-secondary">
          Navigation is in place. No content sections are built yet.
        </p>
        <p className="mt-8">
          <Link
            href="/styleguide"
            className="text-accent underline decoration-from-font underline-offset-4 transition-colors duration-swift ease-editorial hover:text-foreground"
          >
            View the design system
          </Link>
        </p>
      </section>

      {scaffold.map(({ id, label, phase }) => (
        <section
          key={id}
          id={id}
          aria-label={`${label} (placeholder)`}
          className="border-t border-border"
        >
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
    </main>
  );
}
