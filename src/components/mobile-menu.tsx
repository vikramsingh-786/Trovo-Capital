"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/data/navigation";

/** Tailwind's `md` breakpoint, where the desktop nav takes over. */
const DESKTOP_QUERY = "(min-width: 48rem)";

/**
 * The only client component in the navigation: a disclosure menu for small
 * screens. The wordmark, the header itself and the desktop nav are all
 * server-rendered, so this is the entire JavaScript cost of the nav.
 *
 * A simple disclosure: the panel stays mounted and toggles `hidden`. Escape
 * closes it, choosing a link closes it before the anchor jump, and crossing
 * into desktop width closes it too.
 */
export function MobileMenu({
  items,
  className = "",
}: {
  items: readonly NavItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // This component sits in the layout and survives route changes, so a soft
  // navigation started from outside the panel (the wordmark, say) would
  // otherwise leave it open over the new page. Adjusted during render rather
  // than in an effect — the documented React pattern for reacting to a
  // changed value, and it avoids a cascading re-render.
  const pathname = usePathname();
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    // Crossing into desktop hides both the panel and its trigger via
    // `md:hidden`. Without this the menu would stay logically open with no
    // visible control to close it.
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
        className="-mr-3 flex size-11 items-center justify-center text-foreground transition-colors duration-swift ease-standard hover:text-accent"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sized to its content rather than the viewport, so no body scroll lock
          is needed. `overscroll-contain` stops the panel's scroll from
          chaining into the page behind it. */}
      <div
        hidden={!open}
        className="fixed inset-x-0 top-header z-40 max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto overscroll-contain bg-background"
      >
        <nav className="shell py-2">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-border last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-title text-foreground transition-colors duration-swift ease-standard active:text-accent"
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

/* Two rules rather than three: less familiar, quieter, still unmistakable. */
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
