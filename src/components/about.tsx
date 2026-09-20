import Image from "next/image";

import { aboutMedia } from "@/data/media";

export function About() {
  return (
    <section id="about" className="shell py-section">
      <div className="section-rule" />

      {/* Below lg the three blocks stack as heading -> image -> copy, so the
          image breaks up the text instead of landing under it. On lg they are
          placed explicitly: copy beneath the heading, image spanning both. */}
      <div className="mt-12 grid gap-x-8 md:mt-16 lg:grid-cols-12">
        <div
          data-reveal="left"
          className="lg:col-span-7 lg:col-start-1 lg:row-start-1"
        >
          <p className="eyebrow text-[1rem]! text-accent">About Trove Capital</p>

          <h2 className="mt-8 text-display-lg">
            <span className="block">An investor’s capital, </span>
            <span className="block">An operator’s perspective</span>
          </h2>
        </div>

        <figure
          data-reveal="right"
          data-tilt
          className="group tilt-card relative mt-10 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0"
        >
          <div className="grain relative overflow-hidden rounded-media border border-border">
            <Image
              data-parallax="14"
              src={aboutMedia.src}
              alt={aboutMedia.alt}
              width={aboutMedia.width}
              height={aboutMedia.height}
              sizes="(min-width: 64rem) 30vw, 100vw"
              className="media-plate aspect-4/3 w-full scale-110 object-cover md:aspect-3/2 lg:aspect-square"
            />
            <span data-tilt-glare className="tilt-glare" />
          </div>

          <span className="absolute -bottom-6 left-0 hidden h-6 w-px bg-border lg:block" />
        </figure>

        <div
          data-reveal="left"
          className="mt-10 md:mt-12 lg:col-span-7 lg:col-start-1 lg:row-start-2"
        >
          <p className="max-w-measure text-lead text-foreground-secondary">
            Trove Capital Partners invests in emerging technology companies with
            the potential to shape large, evolving markets
          </p>
          <p className="mt-7 max-w-measure text-base text-foreground-muted md:mt-8">
            Built on the foundations of one of India’s leading technology groups,
            we combine investment discipline with an operator’s perspective,
            bringing deep technology understanding, global relationships, and
            first-hand company-building experience to every partnership
          </p>
        </div>
      </div>
    </section>
  );
}
