import Image from "next/image";

import { ctaMedia, unsplash } from "@/data/media";

const EMAIL = "trovecapital@partners.co";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate border-t border-border bg-obsidian-950"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={unsplash(ctaMedia, 2000, 70)}
          alt={ctaMedia.alt}
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45 grayscale-[0.5]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/40" />
      <div className="glow absolute inset-0 -z-10" />
      <div className="grain absolute inset-0 -z-10" />

      <div data-reveal-group className="shell py-section">
        <div className="section-rule" />

        <h2
          data-reveal
          className="mt-10 max-w-[18ch] text-display-lg text-on-media md:mt-12"
        >
          Building a company ready to scale?
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-measure text-lead text-on-media-muted"
        >
          Connect with Trove Capital Partners.
        </p>

        <p data-reveal className="mt-10 md:mt-12">
          <a
            href={`mailto:${EMAIL}`}
            data-magnetic="26"
            className="group relative inline-block font-sans text-title text-on-media transition-colors duration-base ease-editorial hover:text-accent"
          >
            {EMAIL}
            <span className="absolute -bottom-2 left-0 h-px w-full bg-border-strong transition-colors duration-base ease-editorial group-hover:bg-accent" />
          </a>
        </p>
      </div>
    </section>
  );
}
