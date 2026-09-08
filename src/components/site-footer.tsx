import Image from "next/image";

import { ctaMedia, unsplash } from "@/data/media";
import { navItems } from "@/data/navigation";

import { Wordmark } from "./wordmark";

const EMAIL = "trovecapital@partners.co";

/**
 * Site footer.
 *
 * Deliberately holds only what the project actually has: the supplied brand
 * mark, the same navigation the header uses (imported from
 * src/data/navigation.ts rather than redefined), and the approved email.
 *
 * There is no phone number, address, social account, legal entity or copyright
 * line, because none of those have been supplied and a footer is the easiest
 * place to invent them by accident. A copyright notice in particular needs a
 * confirmed legal entity, which we do not have. The treatment below is
 * therefore purely visual — it adds no content.
 *
 * The floor is an oversized wordmark rising out of a bronze bloom, clipped by
 * its own wrapper so it bleeds off the foot of the page. It is set as TYPE, not
 * as the brand lockup: the supplied lockup is a 336px raster, and blowing it up
 * to twelve hundred would be visibly soft. Setting the approved name in the
 * display serif is typography, not an invented mark.
 *
 * The size is `clamp(…, 26vw, 24rem)` rather than plain `26vw` because `shell`
 * caps its width at 84rem while a vw font-size keeps growing — past about
 * 1500px the unclamped wordmark outgrew the column it is supposed to align
 * with. Both wrappers clip, so an overrun can never reach the page scrollbar.
 */
export function SiteFooter() {
  return (
    <footer
      className="relative isolate overflow-hidden bg-obsidian-950
        before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px
        before:bg-linear-to-r before:from-transparent before:via-border-strong before:to-transparent"
    >
      {/* Photographic plate, the same layered construction the closing CTA
          uses — each layer its own `-z-10` sibling, which is deliberate; see
          the note in final-cta.tsx before collapsing them into one wrapper.

          The SAME `unsplash(ctaMedia, 2000, 70)` call as the CTA, character for
          character. That is the point: an identical URL is one download the
          browser already has by the time it reaches the footer, so this plate
          costs no extra bytes. Everything that distinguishes the two is CSS,
          which is free — a lower opacity, heavier greyscale, and the frame
          anchored to its bottom edge rather than its centre, so the footer
          reads as the same photograph continuing down rather than as the CTA's
          image pasted in again. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={unsplash(ctaMedia, 2000, 70)}
          alt={ctaMedia.alt}
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-25 grayscale-[0.6]"
        />
      </div>

      {/* Darkens downward so the page ends on near-black beneath the wordmark
          rather than on the middle of a photograph. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-obsidian-950/70 via-obsidian-950/85 to-obsidian-950" />

      <div className="footer-bloom absolute inset-0 -z-10" />

      {/* `grain` is BACK, and only because there is now a photograph under it.
          It blends `mix-blend-overlay`: over a picture it reads as texture,
          but on the flat dark plate this footer used to be, the grey noise
          lifted the value and made the whole panel lighter and visibly
          noisier. If the photograph is ever removed, remove this with it. */}
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell pt-section-tight">
        {/* 6 / 3 / 3 rather than 5 / 4 / 3: the two text blocks now sit
            together in the right half with the lockup anchoring the left,
            instead of three things drifting apart across the row. */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Wordmark priority={false} />
          </div>

          {/* Set in the display serif at title size, not as `eyebrow`. At 11px
              uppercase with 0.16em tracking these were a row of labels rather
              than links, and dimming them made that worse. The serif also
              echoes the oversized wordmark on the floor below, so the footer
              reads as one composition instead of small print above a graphic. */}
          <nav className="md:col-span-3">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-display text-title-sm text-foreground-secondary transition-colors duration-base ease-standard hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-foreground-faint">Contact</p>
            {/* The address stays in the SANS while the nav links go serif: it
                is data to be read character by character, not a label, and a
                serif `@` and dotted domain read worse at a glance. Sized to
                sit level with the links rather than matching them exactly. */}
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-block text-base text-foreground-secondary transition-colors duration-base ease-standard hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Divides the link row from the wordmark floor. The same gradient
            hairline the header closes with, so the page opens and ends on the
            same rule. */}
        <div className="mt-12 h-px bg-linear-to-r from-transparent via-border to-transparent md:mt-16" />
      </div>

      {/* `leading-[0.72]` collapses the line box to about the cap height, so
          the block is only as tall as the letters and does not carry a band of
          empty leading. The nudge down then crops the feet against this
          wrapper's clip. `select-none` because at this size the name is a
          graphic — the real one is in the lockup above. */}
      <div className="mt-8 overflow-hidden md:mt-12">
        <p className="shell translate-y-[0.1em] select-none text-center font-display text-[clamp(4rem,26vw,24rem)] leading-[0.72] tracking-[-0.04em] text-foreground uppercase opacity-[0.06]">
          Trove
        </p>
      </div>
    </footer>
  );
}
