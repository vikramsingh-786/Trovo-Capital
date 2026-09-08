import Image from "next/image";

import { heroMedia, unsplash } from "@/data/media";
import { portfolioCategories, portfolioCompanies } from "@/data/portfolio";
import { teamMembers } from "@/data/team";

/**
 * Hero.
 *
 * A title page, not a landing-page banner: near-black architecture running the
 * full viewport, a bronze bloom in the low corner, grain over the whole plate,
 * and the headline set larger than anything else on the site. There is no
 * button pair and no supporting paragraph — no supporting copy has been
 * supplied, and inventing one is out of the question.
 *
 * The only copy is owner-approved (docs/CONTENT.md): the brand as the eyebrow
 * and "Capital for what comes next." as the headline.
 *
 * The figures along the foot are COUNTED FROM THE DATA, never written down, so
 * they cannot drift out of step with the portfolio, the categories or the team
 * — and so nothing here is a claim the project cannot substantiate. No amounts,
 * no vintages, no geographies, no returns.
 */

const facts = [
  { value: portfolioCompanies.length, label: "Portfolio companies" },
  { value: portfolioCategories.length, label: "Sectors" },
  { value: teamMembers.length, label: "Team" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-end overflow-hidden bg-obsidian-950">
      {/* --- The plate ---------------------------------------------------
          Each layer is its own `-z-10` sibling. A negative z-index makes every
          one of them a stacking context, so `.grain`'s `mix-blend-overlay` has
          no photograph to blend against and settles into a flat, even veil
          across the whole frame. That veil is the intended look here — the
          owner chose it over the higher-contrast nesting — and it is what
          keeps the headline sitting on a calm ground rather than on
          architecture. Do not "fix" this into a single wrapper.

          `sizes` is inert while `images.unoptimized` is forced by static
          export (no srcset is generated), but it is the correct hint to leave
          in place for whenever that changes. */}
      <div className="animate-plate absolute inset-0 -z-10">
        {/* The overscale is what the parallax travels inside, and it has to be
            larger than the travel or the drift exposes a bare edge at the
            section's clip. `scale-125` hangs 12.5% off each side; the tween
            runs ±8% of the element's height, and because the `scale` property
            is applied outside `transform`, that reads as ±10% on screen. Keep
            that inequality if either number is retuned.

            The entrance stays CSS (`animate-plate`) rather than GSAP — it has
            to run on the critical path, before the motion layer has
            hydrated. */}
        <Image
          data-parallax="16"
          src={unsplash(heroMedia, 2400, 72)}
          alt={heroMedia.alt}
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-70 grayscale-[0.4]"
        />
      </div>

      {/* Scrims, in two directions: one lifting the foot of the frame into the
          page ground so the section ends without a seam, one darkening the
          left where the headline sits. Separate elements rather than one
          multi-stop gradient, so each can be tuned without disturbing the
          other. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-obsidian-950 via-obsidian-950/55 to-obsidian-950/20" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-obsidian-950/85 via-obsidian-950/35 to-transparent" />
      <div className="glow absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell pt-6 md:pt-8 pb-24 md:pb-40">
        <p className="animate-rise eyebrow text-accent [animation-delay:120ms]">
          Trove Capital
        </p>

        {/* From `md` up the two clauses are set as their own lines: left to
            itself the browser balances to "Capital for what / comes next.",
            which splits "what" off from "comes next.". Below `md` the spans
            stay inline and wrap naturally — forcing the break there would
            overflow at 320px. */}
        <h1 className="animate-rise mt-8 max-w-[15ch] text-display-2xl text-on-media [animation-delay:220ms] md:mt-10">
          <span className="md:block">Capital for </span>
          <span className="md:block">what comes next.</span>
        </h1>

        {/* Counted facts, set as a ruled band rather than three cards. The
            rule sits above them so it reads as the base of the headline. */}
        <dl className="animate-rise mt-14 flex flex-wrap gap-x-12 gap-y-8 border-t border-border-strong pt-8 [animation-delay:340ms] sm:gap-x-16 md:mt-18 md:gap-x-24">
          {/* `dt` has to precede `dd` in the markup; `order` puts the figure
              above its label without breaking that. */}
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col">
              <dt className="eyebrow order-2 mt-2.5 text-on-media-muted">
                {fact.label}
              </dt>
              <dd className="order-1 font-display text-display-sm tabular-nums text-on-media">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
