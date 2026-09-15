import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { captureRegistryEvent } from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/constants";

const dualmarkProxy = createDualmarkMiddleware({
  middleware: {
    skipPaths: ["/api", "/r", "/llms.txt", "/robots.txt", "/sitemap.xml"],
  },
  siteUrl: SITE_URL,
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
      missing: [{ key: "next-router-prefetch", type: "header" }],
      source: "/((?!_next/|favicon.ico|md/).*)",
    },
  ],
};
