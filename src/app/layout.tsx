import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://blacklanecapital.com"),
  title: {
    default: "BlackLane Capital | Capital for What Comes Next",
    template: "%s | BlackLane Capital",
  },
  description:
    "An investor's capital with an operator's perspective. BlackLane Capital partners with tech founders at pivotal growth stages, from India to global markets.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ZQvFVO8R467VWr-WbbdrsKyrrOz3e-QfOwCvw_cHMeg",
  },
};

const GTM_ID = "GTM-MFMFV3XR";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${schibstedGrotesk.variable}`}
    >
      <head></head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SiteNav />
        {children}
        <SiteFooter />
        <Choreography />

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </body>
    </html>
  );
}
