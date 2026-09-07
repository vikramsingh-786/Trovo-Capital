import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
