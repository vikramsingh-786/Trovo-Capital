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
 * confirmed legal entity, which we do not have.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-10 py-section-tight md:flex-row md:items-center md:justify-between md:gap-8">
        <Wordmark priority={false} />

        <nav>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow text-foreground-muted transition-colors duration-swift ease-standard hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className="text-caption text-foreground-muted transition-colors duration-swift ease-standard hover:text-accent"
        >
          {EMAIL}
        </a>
      </div>
    </footer>
  );
}
