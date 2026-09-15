import { withDualmark } from "@dualmark/nextjs";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";
import { SITE_URL } from "./lib/constants";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
  },
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default withMDX(
  withDualmark(nextConfig, {
    siteUrl: SITE_URL,
  })
);
