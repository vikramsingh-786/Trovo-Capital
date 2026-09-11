import Image from "next/image";

import { heroMedia, unsplash } from "@/data/media";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[52svh] flex-col justify-center overflow-hidden bg-obsidian-950 md:min-h-[calc(95svh-var(--spacing-header))] md:justify-end">
      <div className="animate-plate absolute inset-0 -z-10">
        <Image
          data-parallax="16"
          src={unsplash(heroMedia, 2400, 72)}
          alt={heroMedia.alt}
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-70 grayscale-[0.4]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-t from-obsidian-950 via-obsidian-950/55 to-obsidian-950/20" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-obsidian-950/85 via-obsidian-950/35 to-transparent" />
      <div className="glow absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell py-10 md:pt-8 md:pb-60">
        <p className="animate-rise eyebrow text-accent [animation-delay:120ms]">
          Trove Capital
        </p>

        <h1 className="animate-rise mt-8 max-w-[15ch] text-display-2xl text-on-media [animation-delay:220ms] md:mt-10">
          <span className="md:block">Capital for </span>
          <span className="md:block">what comes next.</span>
        </h1>
      </div>
    </section>
  );
}
