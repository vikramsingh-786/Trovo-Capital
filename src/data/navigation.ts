export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const navItems: readonly NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
] as const;
