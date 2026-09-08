import Image from "next/image";

import { founderReviews } from "@/data/founder-reviews";

/**
 * Founder reviews.
 *
 * Alternating editorial rows, not a testimonial grid: each founder gets a full
 * row — a tall portrait on one side, the quote on the other, and the side flips
 * down the page. Three specific properties of the real content drove that
 * choice, so it is worth recording why before anyone "tidies" it into columns:
 *
 *   - There are only THREE quotes. A wall or a card grid needs volume to read
 *     as social proof, and three cells in a two-column grid orphans one.
 *   - The quotes are very unevenly long (one is roughly twice another). In a
 *     grid that ragged bottom edge has to be either stretched or lived with;
 *     independent rows simply absorb it.
 *   - The team section is ALREADY a three-up portrait grid. Repeating that
 *     shape here made the two sections read as one component used twice.
 *
 * The credential line LEADS, set as a bronze eyebrow above the quote, because
 * it is the reason the quote carries: these are operators, and "22 years US
 * Secret Service, MIT, Harvard University" is a stronger opening than any
 * sentence about diligence. The reader learns who is speaking first.
 *
 * Portraits reuse the site's standard photograph treatment (`media-plate` over
 * `grain`, desaturated at rest and recovering on hover) so they stay part of
 * the same visual system the composition deliberately departs from.
 *
 * ⚠️ One quote (Uniblock) has not been supplied yet, so `quote` is `null` for
 * it and this component renders a LABELLED placeholder in its place — body
 * sans, caption size, italic, no <blockquote>. It cannot be mistaken for a
 * testimonial or screenshotted as one. Do not replace that branch with
 * invented copy. See src/data/founder-reviews.ts.
 */
export function FounderReviews() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      <div data-reveal className="mt-12 md:mt-16">
        <p className="eyebrow text-accent">Founder Reviews</p>
      </div>

      {/* The row gap has to stay UNDER the space between whole sections, or
          each row starts reading as its own section. `--spacing-section` is
          `clamp(2rem, 4vw, 4rem)` and is paid twice between neighbours, so the
          ceiling is 64px below `lg` and ~115px at 1440. It also has to stay
          above the row's own internal `mt-8`, or the portrait binds to the
          wrong quote when the layout stacks. That leaves a narrow band. */}
      <ul className="mt-10 flex flex-col gap-14 md:mt-12 lg:gap-18">
        {founderReviews.map((review, index) => {
          // Even rows lead with the portrait, odd rows lead with the quote.
          const portraitLeads = index % 2 === 0;

          return (
            // `data-reveal-group` makes the row one batch, so its portrait and
            // its text stagger against each other rather than each waiting for
            // its own scroll position — which, on a row this tall, would have
            // arrived visibly apart.
            <li
              key={review.name}
              data-reveal-group
              // `gap-x-8` until `xl`, matching the about section's column
              // rhythm. At 12 columns a 3rem gutter spends more than half the
              // row on gaps at 1024px, which starved the quote.
              className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 xl:gap-x-12"
            >
              {/* Portrait. Explicit `lg:row-start-1` on both children: with
                  only a column start, grid auto-placement will not backtrack
                  to fill columns left of an already-placed sibling, so the
                  quote-leading rows would drop the text to a second row. */}
              <div
                data-reveal={portraitLeads ? "left" : "right"}
                className={`group grain relative max-w-48 overflow-hidden rounded-media border border-border bg-surface sm:max-w-56 lg:col-span-3 lg:row-start-1 lg:max-w-none ${
                  portraitLeads ? "lg:col-start-1" : "lg:col-start-10"
                }`}
              >
                {review.image && (
                  <Image
                    src={review.image.src}
                    alt={review.name}
                    width={review.image.width}
                    height={review.image.height}
                    sizes="(min-width: 64rem) 30vw, 60vw"
                    className="media-plate aspect-4/5 w-full object-cover"
                  />
                )}
              </div>

              <div
                data-reveal={portraitLeads ? "right" : "left"}
                className={`mt-8 lg:col-span-8 lg:row-start-1 lg:mt-0 ${
                  portraitLeads ? "lg:col-start-5" : "lg:col-start-1"
                }`}
              >
                {review.credentials && (
                  <p className="eyebrow max-w-measure text-accent">
                    {review.credentials}
                  </p>
                )}

                {review.quote ? (
                  <blockquote className="mt-5">
                    {/* `font-display` has to be explicit. The base layer
                        applies the serif to h1-h6 only, so this <p> was
                        setting in the sans face and the pull quote read as
                        body copy.

                        `text-lead` (up to 23px), not `text-title` (up to
                        30px): at title size a 55-word quote filled most of the
                        row on its own and the section read as oversized. No
                        `leading-*` override, so the token's own 1.55 applies —
                        at this size the quote is being read, not scanned. */}
                    <p className="max-w-measure font-display text-lead text-foreground-secondary">
                      {review.quote}
                    </p>
                  </blockquote>
                ) : (
                  /* Not a <blockquote>, not the serif, not quote-sized: the
                     placeholder has to be unmistakable as a placeholder. It
                     inherits the body sans, a real contrast against the quote
                     rather than the same face at another size. */
                  <p className="mt-5 max-w-measure text-caption italic text-foreground-faint">
                    Awaiting approved quote from {review.company}.
                  </p>
                )}

                {/* The bronze tick stands in for the dash an attribution would
                    normally open with — the same hairline device that opens
                    every section, at attribution scale. */}
                <div className="mt-6 flex items-center gap-4 md:mt-7">
                  <span className="h-px w-8 shrink-0 bg-accent" />

                  {/* `text-base`, not `text-title-sm`: title-sm tops out at
                      22px against the quote's 23px, so the name competed with
                      the thing it attributes instead of sitting under it. */}
                  <div className="min-w-0">
                    <p className="text-base text-foreground">
                      {review.link ? (
                        <a
                          href={review.link}
                          target="_blank"
                          rel="noreferrer"
                          className="transition-colors duration-base ease-standard hover:text-accent"
                        >
                          {review.name}
                        </a>
                      ) : (
                        review.name
                      )}
                    </p>
                    <p className="mt-1 text-caption text-foreground-muted">
                      {[review.role, review.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
