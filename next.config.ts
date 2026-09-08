import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `next build` emits a fully static site to `out/`,
  // which is what DevOps will upload to Cloudflare. Enabled from day one so
  // any server-only feature we accidentally introduce fails the build here
  // instead of at deployment time.
  output: "export",

  // Required by `output: "export"`: the built-in Image Optimization API needs
  // a server at runtime. Images are served as-is, so we must ship correctly
  // sized/compressed assets ourselves (revisit in the assets/performance phases).
  //
  // `remotePatterns` is therefore not enforced today — `unoptimized` makes
  // next/image emit a plain <img> and skip the allow-list check entirely. It is
  // declared anyway so that turning the optimizer back on (moving off static
  // export, or adding a custom loader) does not silently break every remote
  // image. See src/data/media.ts for what is hosted there and why.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },

  // Statically type every internal `href`, so a broken <Link> is a build
  // error rather than a live 404. Stable in Next 16 (not `experimental`).
  typedRoutes: true,

  // Emit `about/index.html` instead of `about.html` so directory-style URLs
  // resolve identically on Cloudflare and in local preview.
  trailingSlash: true,
};

export default nextConfig;
