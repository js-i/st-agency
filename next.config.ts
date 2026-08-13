import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Dev server otherwise 403s all /_next/static chunk requests (and HMR's
  // websocket) when the site is opened from another device on the LAN via
  // its IP instead of localhost, since that origin isn't allow-listed.
  allowedDevOrigins: ["192.168.111.13"],
};

export default withNextIntl(nextConfig);
