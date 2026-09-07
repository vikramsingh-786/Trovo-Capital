/**
 * Primary navigation. Single-page site, so every destination is an in-page
 * anchor — the `id` must exist on the corresponding section.
 *
 * Order is owner-specified (docs/CONTENT.md). Adding an item here is the only
 * change needed: both the desktop nav and the mobile menu render from this.
 */
export type NavItem = {
  label: string;
  /** In-page anchor; the target section must carry this id. */
  href: `#${string}`;
};

export const navItems: readonly NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;
