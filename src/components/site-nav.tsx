import { navItems } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

/**
 * Sticky site header. Server-rendered apart from <MobileMenu> and the toggle.
 *
 * Sticky is pure CSS (`position: sticky`) — no scroll listener. The bar keeps a
 * solid ground and a single hairline rule rather than a shadow or a blur, which
 * is the register the rest of the system uses.
 *
 * Its height is `--spacing-header`, the same token `html` uses for
 * `scroll-padding-top`, so an anchored section can never land underneath it.
 *
 * Layout is a three-column grid rather than `justify-between`, so the nav is
 * centred against the page, not against whatever width the wordmark happens to
 * be. With `justify-between` the links drifted left of centre and left a dead
 * gap before the toggle.
 *
 * The links sit inside a hairline capsule. Four loose words floating in an
 * empty bar had no structure to hold them; enclosing them gives the bar a
 * centre of gravity and lets each link own a hover fill instead of an
 * underline that has to be animated in. The ordinals that used to prefix each
 * label were dropped here — at nav size they read as clutter rather than as
 * the numbering device they are elsewhere. The mobile panel still carries them,
 * where there is room.
 *
 * DO NOT add `transform`, `filter`, `backdrop-filter`, `will-change` or
 * `contain` to the <header> below. MobileMenu's panel is `position: fixed`
 * inside it; any of those would make the header a containing block and
 * collapse the panel to the height of the bar. This is why the bar is opaque
 * rather than a blurred glass strip, and why its background is a flat token: a
 * sticky bar with any transparency lets the page scroll through it.
 */
export function SiteNav() {
  return (
    <header
      className="sticky top-0 z-50 h-header bg-background transition-colors duration-base
        after:absolute after:inset-x-0 after:bottom-0 after:h-px
        after:bg-linear-to-r after:from-transparent after:via-border-strong after:to-transparent"
    >
      {/* Reading progress, riding the hairline above rather than floating as a
          second bar: the foot of the header is already the line between the
          chrome and the page, so the fill reads as that line filling in.

          `z-10` because the hairline is an ::after on the header, which paints
          after its children — without it the rule would sit on top of the
          bronze. The `scale` this animates is on THIS element, never on the
          <header>: a transform there would make the header a containing block
          and collapse MobileMenu's fixed panel, as the note above warns. */}
      <span className="scroll-progress absolute inset-x-0 bottom-0 z-10 h-0.5 bg-accent" />

      <div className="shell flex h-full items-center justify-between gap-6">
        <div className="md:hidden">
          <MobileMenu items={navItems} />
        </div>

        <Wordmark />

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow block rounded-pill border-t border-b border-border-strong bg-surface px-4 py-2.5 text-foreground-muted keycap transition-all duration-swift ease-standard hover:bg-surface-raised hover:text-foreground hover:keycap-pressed"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
