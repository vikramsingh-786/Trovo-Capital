import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

/* Both faces are variable and self-hosted by next/font at build time: no
   runtime request to Google, no layout shift, and static-export safe.
   Only the default `wght` axis is loaded. Newsreader also offers `opsz`, but
   measured on this project it added 73.7 KB (+127%) to the preloaded latin
   file — not worth it on the critical path for a refinement at this scale.

   Newsreader is pinned to the static 400 instance rather than its variable
   file: the serif is only ever set at 400 (globals.css sets it explicitly on
   h1-h6 and nothing asks the serif for another weight), and the static cut is
   22.0 KB against 56.8 KB for the variable range 200-800. If a heading ever
   needs a different serif weight, drop the `weight` option to restore the full
   axis. Schibsted Grotesk stays variable — asking it for specific weights
   resolved to the same file, so pinning it would only cap future weights.

   NO ITALIC FACE IS LOADED. Measured, adding `style: ["normal","italic"]`
   here preloads the italic too: +64.5 KB (105 KB -> 169 KB critical). Until a
   real pull quote needs it (founder-reviews phase), `font-synthesis: style`
   in globals.css lets <em>/<cite> render as a synthesised oblique instead of
   silently upright. When real italics are wanted, add a SECOND Newsreader
   instance with `preload: false` so the italic loads only where used. */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-newsreader",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
});

// "Trove Capital" is the visual brand; "Trove Capital Partners" is used in
// formal body copy.
//
// The description is the approved About sentence verbatim, not marketing copy
// written for the tag — it replaced a "[PLACEHOLDER]" string that was shipping
// into search results.
//
// `metadataBase` is still intentionally omitted: it needs the production
// domain, which has not been supplied, and it is required before any relative
// Open Graph or canonical URL can be added.
export const metadata: Metadata = {
  title: {
    default: "Trove Capital",
    template: "%s | Trove Capital",
  },
  description:
    "Trove Capital Partners invests in emerging technology companies with the potential to shape large, evolving markets.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibstedGrotesk.variable}`}
    >
      <body className="antialiased">
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
