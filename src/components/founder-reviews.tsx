import Image from "next/image";

import { founderReviews } from "@/data/founder-reviews";

/**
 * Founder reviews.
 *
 * An editorial voice section rather than a testimonial carousel: each review is
 * a quotation set in the display serif, with a hairline beneath it and the
 * attribution below — quote, rule, byline, the way a magazine sets a pull
 * quote. No cards, no slider, no quotation-mark graphic, and no star ratings.
 *
 * That internal rule is also what keeps this section from reading as a repeat
 * of Team's ruled grid: there the hairline opens each cell, here it separates
 * the voice from the person.
 *
 * ⚠️ The content is TEMPORARY DUMMY DATA — see src/data/founder-reviews.ts.
 * Replacing it is a data-only edit. A portrait renders only if one is supplied,
 * so the composition reads as finished without images.
 */
export function FounderReviews() {
  return (
    <section className="shell py-section">
      <div className="flex items-center">
        <span className="h-px w-12 bg-accent md:w-16" />
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="eyebrow mt-10 text-accent md:mt-14">Founder Reviews</p>

      <ul className="mt-12 grid items-start gap-x-8 gap-y-14 md:mt-14 lg:grid-cols-2 lg:gap-x-16">
        {founderReviews.map((review) => (
          <li key={review.name} className="reveal">
            <blockquote>
              <p className="max-w-measure text-title text-foreground">
                {review.quote}
              </p>
            </blockquote>

            {/* Quote, rule, byline. */}
            <div className="mt-7 flex items-center gap-4 border-t border-border pt-5">
              {review.image && (
                <Image
                  src={review.image.src}
                  alt={review.name}
                  width={review.image.width}
                  height={review.image.height}
                  className="size-12 shrink-0 rounded-media border border-border bg-surface object-cover"
                />
              )}

              <div className="min-w-0">
                <p className="font-sans text-title-sm text-foreground">
                  {review.link ? (
                    <a
                      href={review.link}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-swift ease-standard hover:text-accent"
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
          </li>
        ))}
      </ul>
    </section>
  );
}
