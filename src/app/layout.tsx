import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { Choreography } from "@/components/motion/choreography";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

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
      <head></head>
      <body className="antialiased">
        <SiteNav />
        {children}
        <SiteFooter />
        <Choreography />
      </body>
    </html>
  );
}
