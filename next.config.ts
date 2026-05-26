import { withDualmark } from "@dualmark/nextjs";
import type { NextConfig } from "next";
import { SITE_URL } from "./lib/constants";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withDualmark(nextConfig, {
  siteUrl: SITE_URL,
});
