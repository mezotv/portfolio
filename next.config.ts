import type { NextConfig } from "next";
import { withDualmark } from "@dualmark/nextjs";

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
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://dominikkoch.dev",
});
