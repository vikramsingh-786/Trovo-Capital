"use client";

import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { perspectiveMedia } from "@/data/media";
import { perspectives } from "@/data/perspectives";
import { restingDiff, tweenSlide, wrapDiff } from "@/lib/carousel-tween";
import { JourneyCard } from "./journey-card";

const SNAP_COUNT = perspectives.length;

export function JourneyCarousel({ className }: { className?: string }) {
  // Lazily constructed once — a fresh plugin instance per render would
  // reinitialise the carousel and restart the timer on every state change.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      containScroll: false,
      skipSnaps: false,
      dragFree: false,
      duration: 26,
    },
    [autoplay],
  );

  const [selected, setSelected] = useState(0);
  const cards = useRef<Array<HTMLElement | null>>([]);

  const applyTween = useCallback(
    (api: EmblaCarouselType, eventName?: string) => {
      const engine = api.internalEngine();
      const progress = api.scrollProgress();
      const inView = api.slidesInView();
      const snaps = api.scrollSnapList();
      const isScroll = eventName === "scroll";

      snaps.forEach((snap, snapIndex) => {
        engine.slideRegistry[snapIndex].forEach((slideIndex) => {
          if (isScroll && !inView.includes(slideIndex)) return;

          const card = cards.current[slideIndex];
          if (!card) return;

          // A looped slide rendered on the far side of the track reports a
          // non-zero target; its diff has to be measured across the seam.
          let loopSign = 0;
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (loopItem.index === slideIndex && target !== 0) {
                loopSign = Math.sign(target);
              }
            });
          }

          const tween = tweenSlide(
            wrapDiff(snap, progress, loopSign),
            snaps.length,
          );

          card.style.transform = tween.transform;
          card.style.opacity = String(tween.opacity);
          card.style.zIndex = String(tween.zIndex);
          card.style.setProperty("--shadow-alpha", String(tween.shadowAlpha));
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onReInit = (api: EmblaCarouselType) => {
      onSelect();
      applyTween(api);
    };

    onSelect();
    applyTween(emblaApi);

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", applyTween);
    emblaApi.on("reInit", onReInit);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", applyTween);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi, applyTween]);

  return (
    <div className={className}>
      <div className="-mx-gutter overflow-x-clip py-12">
        <div ref={emblaRef}>
          <div className="flex">
            {perspectives.map((perspective, index) => {
              const rest = tweenSlide(
                restingDiff(index, SNAP_COUNT),
                SNAP_COUNT,
              );

              return (
                <div
                  key={perspective.marker}
                  className="journey-slide min-w-0 flex-[0_0_76%] px-2"
                >
                  <JourneyCard
                    perspective={perspective}
                    media={perspectiveMedia[index]}
                    active={index === selected}
                    onClick={() => emblaApi?.scrollTo(index)}
                    ref={(el) => {
                      cards.current[index] = el;
                    }}
                    style={
                      {
                        transform: rest.transform,
                        opacity: rest.opacity,
                        zIndex: rest.zIndex,
                        "--shadow-alpha": rest.shadowAlpha,
                      } as CSSProperties
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {perspectives.map((perspective, index) => (
          <button
            key={perspective.marker}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-pill transition-[width,background-color] duration-base ease-standard ${
              index === selected ? "w-5 bg-accent" : "w-1.5 bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
