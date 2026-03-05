import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  turbopack: {},

  reactStrictMode: true,
  compress: true,

  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;
