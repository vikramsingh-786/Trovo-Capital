import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

/* Both faces are variable and self-hosted by next/font at build time: no
   runtime request to Google, no layout shift, and static-export safe.
   Only the default `wght` axis is loaded. Newsreader also offers `opsz`, but
   measured on this project it added 73.7 KB (+127%) to the preloaded latin
   file — not worth it on the critical path for a refinement at this scale.

   NO ITALIC FACE IS LOADED. Measured, adding `style: ["normal","italic"]`
   here preloads the italic too: +64.5 KB (105 KB -> 169 KB critical). Until a
   real pull quote needs it (founder-reviews phase), `font-synthesis: style`
   in globals.css lets <em>/<cite> render as a synthesised oblique instead of
   silently upright. When real italics are wanted, add a SECOND Newsreader
   instance with `preload: false` so the italic loads only where used. */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
});

// "Trove Capital" is the visual brand; "Trove Capital Partners" is used in
// formal body copy. PLACEHOLDER description — awaiting real copy.
// `metadataBase` is intentionally omitted until the production domain is
// confirmed; it is required for absolute Open Graph / canonical URLs.
export const metadata: Metadata = {
  title: {
    default: "Trove Capital",
    template: "%s | Trove Capital",
  },
  description: "Trove Capital — venture capital. [PLACEHOLDER]",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibstedGrotesk.variable}`}
    >
      <body className="antialiased">
        {/* First focusable element on the page: lets keyboard and screen-reader
            users jump the nav. Visible only while focused. */}
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:bg-inverse focus:px-4 focus:py-3 focus:text-inverse-foreground"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
