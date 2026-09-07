import { navItems } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

/**
 * Sticky site header. Server-rendered apart from <MobileMenu>.
 *
 * Sticky is pure CSS (`position: sticky`) — no scroll listener. The bar keeps a
 * solid ivory ground and a single hairline rule rather than a shadow or a
 * blur, which is the register the rest of the system uses.
 *
 * Its height is `--spacing-header`, the same token `html` uses for
 * `scroll-padding-top`, so an anchored section can never land underneath it.
 *
 * Active-section highlighting is deliberately absent: it needs a scroll
 * observer, and there are no sections to observe until later phases. Hover,
 * focus-visible and pressed states are all implemented. When it is added,
 * extract just the <ul> into a client component so this stays a server
 * component, and drive the styling off `aria-current` so the accessible state
 * and the underline cannot diverge.
 *
 * DO NOT add `transform`, `filter`, `backdrop-filter`, `will-change` or
 * `contain` to the <header> below. MobileMenu's panel is `position: fixed`
 * inside it; any of those would make the header a containing block and
 * collapse the panel to the height of the bar.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 h-header border-b border-border bg-background">
      <div className="shell flex h-full items-center justify-between gap-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-11">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow relative text-foreground-muted transition-colors duration-swift ease-standard after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-base after:ease-editorial hover:text-foreground hover:after:scale-x-100 focus-visible:text-foreground focus-visible:after:scale-x-100 active:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu items={navItems} className="md:hidden" />
      </div>
    </header>
  );
}
