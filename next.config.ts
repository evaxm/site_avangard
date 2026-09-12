import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the supplied local assets directly in development and production.
    // The local Cloudflare preview does not expose an ASSETS binding to the
    // image optimizer, which otherwise causes broken images and an error overlay.
    unoptimized: true,
  },
};

export default nextConfig;
