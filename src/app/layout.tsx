import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
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

// PLACEHOLDER COPY — awaiting real content from Trove Capital Partners.
// `metadataBase` is intentionally omitted until the production domain is
// confirmed; it is required for absolute Open Graph / canonical URLs.
export const metadata: Metadata = {
  title: {
    default: "Trove Capital Partners",
    template: "%s | Trove Capital Partners",
  },
  description: "Trove Capital Partners — venture capital. [PLACEHOLDER]",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibstedGrotesk.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
