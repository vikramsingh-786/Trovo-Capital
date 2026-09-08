import Image from "next/image";

import { perspectiveMedia, unsplash } from "@/data/media";
import { perspectives } from "@/data/perspectives";

/**
 * The three investment perspectives.
 *
 * Set as three tall plates rather than three feature cards: a photograph, a
 * bronze ordinal on a hairline, the title as a serif statement and the approved
 * paragraph beneath it. No icons — there are no approved icons for these three
 * ideas, and inventing a glyph for "a network built to compound" would be
 * decoration pretending to be meaning.
 *
 * The numbering carries the progression the section is meant to communicate
 * (operator understanding, then network, then scaling partnership) without
 * adding a word of unapproved copy.
 *
 * NO SECTION HEADING OR EYEBROW: none has been supplied for this section. The
 * bronze tick on the opening rule marks the section the way it does elsewhere.
 *
 * Photography is decorative placeholder stock — see src/data/media.ts. Each
 * plate is paired by position, and renders without one if the array is ever
 * shortened.
 */
export function InvestmentPerspectives() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      {/* Three columns straight from `md`, with no two-column step. Three
          items in a two-column band always strand the third in a half-empty
          row, and the approved copy is short enough to hold a ~230px column at
          768px. Below `md` they stack. */}
      <ol
        data-reveal-group
        className="mt-14 grid gap-x-8 gap-y-16 md:mt-18 md:grid-cols-3 lg:gap-x-10"
      >
        {perspectives.map((perspective, index) => {
          const media = perspectiveMedia[index];

          return (
            <li
              key={perspective.marker}
              data-reveal
              data-tilt
              className="group tilt-card max-md:max-w-measure"
            >
              {media && (
                /* The clip lives here, not on the tilting <li>: `overflow:
                   hidden` forces `transform-style` back to flat. That is also
                   why this element is itself the lifted layer — anything nested
                   *inside* it would have its translateZ flattened away. */
                <div
                  data-tilt-layer="45"
                  className="grain relative mb-6 overflow-hidden rounded-media border border-border"
                >
                  <Image
                    src={unsplash(media, 800)}
                    alt={media.alt}
                    width={media.width}
                    height={media.height}
                    sizes="(min-width: 48rem) 32vw, 100vw"
                    className="media-plate aspect-square w-full object-cover"
                  />
                  <span data-tilt-glare className="tilt-glare" />
                </div>
              )}

              <div data-tilt-layer="35" className="flex items-center gap-4">
                <span className="eyebrow tabular-nums text-accent">
                  {perspective.marker}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <h2 data-tilt-layer="55" className="mt-6 text-title">
                {perspective.title}
              </h2>

              <p
                data-tilt-layer="25"
                className="mt-5 max-w-measure text-base text-foreground-muted"
              >
                {perspective.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
