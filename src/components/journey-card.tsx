import Image from "next/image";
import type { CSSProperties, Ref } from "react";

import type { Media } from "@/data/media";
import type { Perspective } from "@/data/perspectives";

type JourneyCardProps = {
  perspective: Perspective;
  media: Media;
  /** Carousel-selected. The grid renders every card in the revealed state. */
  active?: boolean;
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
  onClick?: () => void;
};

export function JourneyCard({
  perspective,
  media,
  active = true,
  ref,
  style,
  onClick,
}: JourneyCardProps) {
  return (
    <article
      ref={ref}
      style={style}
      data-active={active || undefined}
      onClick={onClick}
      className="journey-card tilt-card relative transform-flat cursor-pointer max-md:overflow-hidden max-md:rounded-card max-md:border max-md:border-border max-md:bg-surface max-md:p-3"
    >
      <div
        data-tilt-layer="45"
        className="grain relative mb-4 overflow-hidden rounded-media border border-border md:mb-6"
      >
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(min-width: 48rem) 32vw, 76vw"
          className="media-plate aspect-4/3 w-full object-cover md:aspect-square"
        />
        <span data-tilt-glare className="tilt-glare" />
      </div>

      <div
        data-tilt-layer="35"
        className="journey-reveal flex items-center gap-4"
      >
        <span className="eyebrow tabular-nums text-accent">
          {perspective.marker}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <h2
        data-tilt-layer="55"
        className="journey-reveal mt-4 text-title-sm delay-[60ms] md:mt-6 md:text-title"
      >
        {perspective.title}
      </h2>

      <p
        data-tilt-layer="25"
        className="journey-reveal mt-3 max-w-measure text-caption text-foreground-muted delay-[120ms] md:mt-5 md:text-base"
      >
        {perspective.description}
      </p>
    </article>
  );
}
