import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  typedRoutes: true,

  trailingSlash: true,
};

export default nextConfig;
