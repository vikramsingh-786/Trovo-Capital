"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/data/navigation";

const DESKTOP_QUERY = "(min-width: 48rem)";

export function MobileMenu({
  items,
  className = "",
}: {
  items: readonly NavItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const media = window.matchMedia(DESKTOP_QUERY);
    function closeIfDesktop() {
      if (media.matches) setOpen(false);
    }
    closeIfDesktop();
    media.addEventListener("change", closeIfDesktop);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      media.removeEventListener("change", closeIfDesktop);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="flex size-11 items-center justify-center text-foreground transition-colors duration-base ease-standard hover:text-foreground-secondary active:text-accent"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`fixed inset-x-0 top-header z-40 max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto overscroll-contain bg-background border-b border-border transition-[opacity,transform] duration-swift ease-standard ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <nav className="shell py-4">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-border last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-title text-foreground transition-colors duration-base ease-standard hover:text-foreground-secondary active:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
