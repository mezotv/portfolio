import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { captureRegistryEvent } from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/constants";

const dualmarkProxy = createDualmarkMiddleware({
  siteUrl: SITE_URL,
  middleware: {
    skipPaths: ["/api", "/r", "/llms.txt", "/robots.txt", "/sitemap.xml"],
  },
});

export function proxy(request: NextRequest) {
  const token = process.env.NEXT_PUBLIC_WANDRY_REGISTRY_TOKEN;

  if (token) {
    void captureRegistryEvent(request, token).catch(() => {});
  }

  return dualmarkProxy(request);
}

export default proxy;

export const config = {
  matcher: [
    {
      source: "/((?!_next/|favicon.ico|md/).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
