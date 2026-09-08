import Image from "next/image";

import { aboutMedia, unsplash } from "@/data/media";

/**
 * About.
 *
 * An editorial spread: the statement holds the left seven columns and a tall
 * plate holds the right four, with a column of air between them. The staggered
 * right edge of the text — a wide heading over a narrower body measure — does
 * the work a card or a box would otherwise be asked to do.
 *
 * Copy is exactly as supplied (docs/CONTENT.md). No statistics, counts,
 * amounts, geographies or history have been added.
 *
 * The photograph is decorative and clearly labelled as a placeholder in
 * src/data/media.ts. It does not depict Trove, and nothing in the copy claims
 * it does.
 */
export function About() {
  return (
    <section id="about" className="shell py-section">
      <div className="section-rule" />

      <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 lg:grid-cols-12 lg:gap-y-0">
        <div data-reveal="left" className="lg:col-span-7">
          <p className="eyebrow text-accent">About Trove Capital</p>

          {/* The two sentences are a deliberate parallel, so from `md` up each
              gets its own line. Below `md` they wrap naturally — forcing the
              break there would overflow. */}
          <h2 className="mt-8 text-display-lg">
            <span className="md:block">An investor’s capital. </span>
            <span className="md:block">An operator’s perspective.</span>
          </h2>

          {/* Two reading layers, descending in weight of voice: the first
              paragraph as a standfirst at `text-lead`, the second as body. */}
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

        {/* The plate. Deliberately taller than the copy block at `lg`, and
            offset downward, so the spread has a diagonal rather than two tops
            on one line. */}
        <figure
          data-reveal="right"
          data-tilt
          className="group tilt-card relative lg:col-span-4 lg:col-start-9"
        >
          <div className="grain relative overflow-hidden rounded-media border border-border">
            {/* Drifts against the scroll inside its own clip, so the plate
                reads as a window onto something moving rather than as a
                picture pinned to the page. The overscale has to exceed the
                travel or the drift exposes a bare edge at the clip:
                `scale-125` overhangs 12.5% a side against ±7% of travel,
                which the `scale` property renders as ±8.75%. */}
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

          {/* A hairline dropping off the bottom-left corner, tying the plate
              back to the section rule at the top of the section. */}
          <span className="absolute -bottom-6 left-0 hidden h-6 w-px bg-border lg:block" />
        </figure>
      </div>
    </section>
  );
}
