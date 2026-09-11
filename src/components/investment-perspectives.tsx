import Image from "next/image";

import { perspectiveMedia, unsplash } from "@/data/media";
import { perspectives } from "@/data/perspectives";

export function InvestmentPerspectives() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

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
