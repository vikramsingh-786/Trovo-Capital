import { perspectiveMedia } from "@/data/media";
import { perspectives } from "@/data/perspectives";
import { JourneyCard } from "./journey-card";
import { JourneyCarousel } from "./journey-carousel";

export function InvestmentPerspectives() {
  return (
    <section className="shell py-section">
      <div className="section-rule" />

      <ol
        data-reveal-group
        className="mt-14 hidden md:mt-18 md:grid md:grid-cols-3 md:gap-x-8 lg:gap-x-10"
      >
        {perspectives.map((perspective, index) => (
          <li
            key={perspective.marker}
            data-reveal
            data-tilt
            className="group tilt-card"
          >
            <JourneyCard
              perspective={perspective}
              media={perspectiveMedia[index]}
            />
          </li>
        ))}
      </ol>

      <JourneyCarousel className="md:hidden" />
    </section>
  );
}
