import { createLlmsTxtHandler } from "@dualmark/nextjs";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dominikkoch.dev";

const handler = createLlmsTxtHandler({
  brandName: "Dominik Koch",
  description:
    "Software Engineer based in Germany with a passion for open source.",
  sections: [
    {
      title: "Pages",
      links: [
        { title: "Home", href: `${SITE_URL}/` },
        { title: "Blog", href: `${SITE_URL}/blog` },
        { title: "Projects", href: `${SITE_URL}/projects` },
        { title: "Experience", href: `${SITE_URL}/experience` },
        { title: "Events", href: `${SITE_URL}/events` },
        { title: "Tech Stack", href: `${SITE_URL}/tools` },
      ],
    },
  ],
});

export const dynamic = "force-static";
export const GET = handler.GET;
