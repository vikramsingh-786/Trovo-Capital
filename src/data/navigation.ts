export type NavItem = {
  label: string;
  /**
   * Root-relative, not a bare `#hash`. The nav, mobile menu and footer render
   * on every route — including the 404 — where a bare hash would only append
   * to the unmatched URL and go nowhere. From the home page these still
   * resolve as same-document fragment navigation, so nothing reloads.
   */
  href: `/#${string}`;
};

export const navItems: readonly NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
] as const;
