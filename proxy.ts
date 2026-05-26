import { createDualmarkMiddleware } from "@dualmark/nextjs";
import { SITE_URL } from "@/lib/constants";

export default createDualmarkMiddleware({
  siteUrl: SITE_URL,
  middleware: {
    skipPaths: ["/api", "/r", "/llms.txt", "/robots.txt", "/sitemap.xml"],
  },
});

export const config = {
  matcher: [
    {
      source: "/((?!_next/|favicon.ico|md/).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
