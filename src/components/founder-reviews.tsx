import Image from "next/image";

import { founderReviews } from "@/data/founder-reviews";

type Review = (typeof founderReviews)[number];

function Portrait({
  review,
  className,
  sizes,
}: {
  review: Review;
  className: string;
  sizes: string;
}) {
  if (!review.image) return null;

  return (
    <div
      className={`grain relative overflow-hidden rounded-media border border-border bg-surface ${className}`}
    >
      <Image
        src={review.image.src}
        alt={review.name}
        width={review.image.width}
        height={review.image.height}
        sizes={sizes}
        className="media-plate aspect-[4/4.5] w-full object-cover"
      />
    </div>
  );
}

export function FounderReviews() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      <div data-reveal className="mt-12 md:mt-16">
        <p className="eyebrow text-[1rem]! text-accent">Founder Reviews</p>
      </div>

      <ul className="mt-10 flex flex-col gap-14 md:mt-12 lg:gap-10">
        {founderReviews.map((review, index) => {
          const portraitLeads = index % 2 === 0;

          return (
            <li
              key={review.name}
              data-reveal-group
              className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 xl:gap-x-12"
            >
              {/* Below lg the portrait moves into the attribution row instead,
                  so it isn't stranded beside an empty column. */}
              <Portrait
                review={review}
                sizes="30vw"
                className={`hidden lg:col-span-3 lg:row-start-1 lg:block ${
                  portraitLeads ? "lg:col-start-1" : "lg:col-start-10"
                }`}
              />

              <div
                data-reveal={portraitLeads ? "right" : "left"}
                className={`lg:col-span-8 lg:row-start-1 ${
                  portraitLeads ? "lg:col-start-5" : "lg:col-start-1"
                }`}
              >
                {review.quote ? (
                  <blockquote>
                    <p className="max-w-measure font-display text-base text-foreground-secondary">
                      {review.quote}
                    </p>
                  </blockquote>
                ) : (
                  <p className="max-w-measure text-caption italic text-foreground-faint">
                    Awaiting approved quote from {review.company}.
                  </p>
                )}

                <div className="mt-7 flex items-center gap-4 md:mt-8">
                  <Portrait
                    review={review}
                    sizes="64px"
                    className="w-16 shrink-0 lg:hidden"
                  />

                  <span className="hidden h-px w-8 shrink-0 bg-accent lg:block" />

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
                      {[review.role, review.company, review.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                {review.credentials && (
                  <p className="eyebrow mt-4 max-w-measure text-accent">
                    {review.credentials}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
