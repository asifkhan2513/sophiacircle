import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  turbopack: {},

  reactStrictMode: true,
  compress: true,

  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;
