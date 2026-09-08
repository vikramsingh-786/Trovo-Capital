import Image from "next/image";

import { ctaMedia, unsplash } from "@/data/media";

const EMAIL = "trovecapital@partners.co";

/**
 * Closing call to action.
 *
 * Carries `id="contact"`, which is what the navigation's Contact link points
 * at.
 *
 * Composed as a full-bleed plate to bookend the hero: the page opens on
 * photography and closes on it. The email is the interaction — a plain mailto
 * set large enough to be the thing you reach for, with no button and no
 * invented supporting copy around it.
 *
 * All three strings are owner-approved and exact (docs/CONTENT.md). The
 * photograph is decorative placeholder stock; see src/data/media.ts.
 */
export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate border-t border-border bg-obsidian-950"
    >
      {/* Layered exactly as the hero is, so the page opens and closes on the
          same plate: separate `-z-10` siblings, which keeps `.grain` in its own
          stacking context and leaves an even veil over the frame rather than a
          high-contrast texture. Deliberate — see the note in hero.tsx.

          `overflow-hidden` stays off the <section>: there it establishes a
          scroll container, and `animation-timeline: view()` resolves against
          the nearest one, so the three `.reveal` elements below would time
          against a box with no scrollable range and never play. Nothing here
          overflows anyway — the image is `fill`. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={unsplash(ctaMedia, 2000, 70)}
          alt={ctaMedia.alt}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45 grayscale-[0.5]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/40" />
      <div className="glow absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div data-reveal-group className="shell py-section">
        <div className="section-rule" />

        {/* `text-display-lg` (max 72px), not `text-display-xl` (max 104px).
            At xl this was the largest type on the page after the hero itself
            and it swallowed the plate. The full-bleed photograph is already
            what marks this section as the bookend to the hero, so the type
            does not have to carry that job as well — and lg is what every
            other section heading uses, so the close now agrees with them. */}
        <h2
          data-reveal
          className="mt-10 max-w-[18ch] text-display-lg text-on-media md:mt-12"
        >
          Building a company ready to scale?
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-measure text-lead text-on-media-muted"
        >
          Connect with Trove Capital Partners.
        </p>

        {/* `inline-block` so the animated underline spans the address and
            nothing else. A pseudo-element rather than `text-decoration`,
            because it can be wiped in from the left.

            The magnetic pull goes on the <a>, not the <p>: the paragraph is a
            full-width block, so its centre — what the pull is measured from —
            would sit far to the right of the address itself. */}
        <p data-reveal className="mt-10 md:mt-12">
          <a
            href={`mailto:${EMAIL}`}
            data-magnetic="26"
            className="group relative inline-block font-sans text-title text-on-media transition-colors duration-base ease-editorial hover:text-accent"
          >
            {EMAIL}
            <span className="absolute -bottom-2 left-0 h-px w-full bg-border-strong transition-colors duration-base ease-editorial group-hover:bg-accent" />
          </a>
        </p>
      </div>
    </section>
  );
}
