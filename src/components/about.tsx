import Image from "next/image";

import { aboutMedia, unsplash } from "@/data/media";

export function About() {
  return (
    <section id="about" className="shell py-section">
      <div className="section-rule" />

      <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 lg:grid-cols-12 lg:gap-y-0">
        <div data-reveal="left" className="lg:col-span-7">
          <p className="eyebrow text-accent">About Trove Capital</p>

          <h2 className="mt-8 text-display-lg">
            <span className="md:block">An investor’s capital. </span>
            <span className="md:block">An operator’s perspective.</span>
          </h2>

          <p className="mt-10 max-w-measure text-lead text-foreground-secondary md:mt-12">
            Trove Capital Partners invests in emerging technology companies with
            the potential to shape large, evolving markets.
          </p>
          <p className="mt-7 max-w-measure text-base text-foreground-muted md:mt-8">
            Built on the foundations of one of India’s leading technology groups,
            we combine investment discipline with an operator’s perspective,
            bringing deep technology understanding, global relationships, and
            first-hand company-building experience to every partnership.
          </p>
        </div>

        <figure
          data-reveal="right"
          data-tilt
          className="group tilt-card relative lg:col-span-4 lg:col-start-9"
        >
          <div className="grain relative overflow-hidden rounded-media border border-border">
            <Image
              data-parallax="14"
              src={unsplash(aboutMedia, 900)}
              alt={aboutMedia.alt}
              width={aboutMedia.width}
              height={aboutMedia.height}
              sizes="(min-width: 64rem) 30vw, 100vw"
              className="media-plate aspect-4/5 w-full scale-110 object-cover lg:aspect-square"
            />
            <span data-tilt-glare className="tilt-glare" />
          </div>

          <span className="absolute -bottom-6 left-0 hidden h-6 w-px bg-border lg:block" />
        </figure>
      </div>
    </section>
  );
}
