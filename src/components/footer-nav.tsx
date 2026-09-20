"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";

export function FooterNav() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
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
  );
}
