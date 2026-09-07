import Link from "next/link";

/**
 * Trove wordmark.
 *
 * NO GRAPHICAL MARK HAS BEEN SUPPLIED, so this is type — "TROVE CAPITAL" set in
 * the editorial display face, uppercase and widely tracked, like a masthead.
 *
 * TO REPLACE WITH A REAL MARK: swap the inner <span> for an <Image> or inline
 * SVG. The link, sizing box and focus behaviour stay as they are, so no layout
 * or navigation change is needed.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Trove Capital, home"
      className={`font-display whitespace-nowrap text-[0.9375rem] leading-none tracking-[0.2em] text-foreground uppercase transition-colors duration-swift ease-standard hover:text-accent md:text-base ${className}`}
    >
      <span>Trove Capital</span>
    </Link>
  );
}
