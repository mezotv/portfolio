import { createDualmarkMiddleware } from "@dualmark/nextjs";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dominikkoch.dev";

export default createDualmarkMiddleware({
  siteUrl: SITE_URL,
});

export const config = {
  matcher: [
    {
      source: "/((?!_next/|favicon.ico|md/).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
