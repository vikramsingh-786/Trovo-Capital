import Image from "next/image";

import { founderReviews } from "@/data/founder-reviews";

export function FounderReviews() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      <div data-reveal className="mt-12 md:mt-16">
        <p className="eyebrow text-accent">Founder Reviews</p>
      </div>

      <ul className="mt-10 flex flex-col gap-8 md:mt-12 lg:gap-10">
        {founderReviews.map((review, index) => {
          const portraitLeads = index % 2 === 0;

          return (
            <li
              key={review.name}
              data-reveal-group
              className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 xl:gap-x-12"
            >
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
                    className="media-plate aspect-[4/4.5] w-full object-cover"
                  />
                )}
              </div>

              <div
                data-reveal={portraitLeads ? "right" : "left"}
                className={`mt-6 lg:col-span-8 lg:row-start-1 lg:mt-0 ${
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

                <div className="mt-6 flex items-center gap-4 md:mt-7">
                  <span className="h-px w-8 shrink-0 bg-accent" />

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
