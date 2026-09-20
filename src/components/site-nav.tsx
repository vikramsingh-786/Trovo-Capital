"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

export function SiteNav() {
  const pathname = usePathname();
  const showNav = pathname === "/";

  return (
    <header
      className="sticky top-0 z-50 h-header bg-background transition-colors duration-base
        after:absolute after:inset-x-0 after:bottom-0 after:h-px
        after:bg-linear-to-r after:from-transparent after:via-border-strong after:to-transparent"
    >
      <span className="scroll-progress absolute inset-x-0 bottom-0 z-10 h-0.5 bg-accent" />

      <div className="shell flex h-full items-center justify-between gap-6">
        <div className="md:hidden">
          {showNav ? <MobileMenu items={navItems} /> : <div className="size-11" />}
        </div>

        <Wordmark />

        {showNav && (
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="eyebrow rounded-pill border border-border bg-surface-raised px-4 py-2.5 font-bold text-foreground-muted keycap transition-[color,background-color,border-color,box-shadow] duration-swift ease-standard hover:border-accent hover:bg-accent hover:text-background hover:keycap-pressed-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
