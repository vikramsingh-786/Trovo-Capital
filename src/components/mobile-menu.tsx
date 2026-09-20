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
        <span className="relative block size-6">
          <span
            className={`absolute left-0 h-px w-full bg-current transition-[top,rotate,translate] duration-base ease-editorial ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[9px]"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-full bg-current transition-[top,rotate,translate] duration-base ease-editorial ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[15px]"
            }`}
          />
        </span>
      </button>

      {/* 0fr -> 1fr unfurls the panel without hard-coding its height. The inner
          wrapper does the clipping, so the rule below the nav collapses too. */}
      <div
        className={`fixed inset-x-0 top-header z-40 grid bg-background transition-[grid-template-rows,opacity] duration-base ease-editorial ${
          open
            ? "pointer-events-auto grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="shell max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto overscroll-contain border-b border-border py-4">
            <ul>
              {items.map((item, index) => (
                <li
                  key={item.href}
                  style={{
                    transitionDelay: open ? `${90 + index * 55}ms` : "0ms",
                  }}
                  className={`border-b border-border transition-[opacity,translate] duration-base ease-editorial last:border-b-0 ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                  }`}
                >
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
    </div>
  );
}
