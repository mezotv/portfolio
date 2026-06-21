import { createLlmsTxtHandler } from "@dualmark/nextjs";
import { SITE_URL } from "@/lib/constants";

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
    {
      title: "dominik-ui",
      links: [
        { title: "Registry Overview", href: `${SITE_URL}/ui` },
        {
          title: "Expandable Tabs",
          href: `${SITE_URL}/ui/docs/expandable-tabs`,
        },
        { title: "Braille Loader", href: `${SITE_URL}/ui/docs/braille-loader` },
      ],
    },
  ],
});

export const dynamic = "force-static";
export const GET = handler.GET;
