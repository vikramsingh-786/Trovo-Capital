import Image from "next/image";

import { ctaMedia } from "@/data/media";

import { FooterNav } from "./footer-nav";
import { Wordmark } from "./wordmark";

const EMAIL = "blackinkcapital@partners.co";

export function SiteFooter() {
  return (
    <footer
      className="relative isolate overflow-hidden bg-obsidian-950
        before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px
        before:bg-linear-to-r before:from-transparent before:via-border-strong before:to-transparent"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={ctaMedia.src}
          alt={ctaMedia.alt}
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-25 grayscale-[0.6]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-obsidian-950/70 via-obsidian-950/85 to-obsidian-950" />

      <div className="footer-bloom absolute inset-0 -z-10" />

      <div className="grain absolute inset-0 -z-10" />

      <div className="shell pt-section-tight">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Wordmark priority={false} />
          </div>

          <FooterNav />

          <div className="md:col-span-3">
            <p className="eyebrow text-foreground-faint">Contact</p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-block text-base text-foreground-secondary transition-colors duration-base ease-standard hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 h-px bg-linear-to-r from-transparent via-border to-transparent md:mt-16" />
      </div>

      <div className="mt-8 overflow-hidden md:mt-12">
        <p className="shell translate-y-[0.1em] select-none text-center font-display text-[clamp(4rem,26vw,24rem)] leading-[0.72] tracking-[-0.04em] text-foreground uppercase opacity-[0.06]">
          Blackink
        </p>
      </div>
    </footer>
  );
}
