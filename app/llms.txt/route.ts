import { createLlmsTxtHandler } from "@dualmark/nextjs";
import { SITE_URL } from "@/lib/constants";

const handler = createLlmsTxtHandler({
  brandName: "Dominik Koch",
  description:
    "Software Engineer based in Germany with a passion for open source.",
  sections: [
    {
      links: [
        { href: `${SITE_URL}/`, title: "Home" },
        { href: `${SITE_URL}/blog`, title: "Blog" },
        { href: `${SITE_URL}/projects`, title: "Projects" },
        { href: `${SITE_URL}/experience`, title: "Experience" },
        { href: `${SITE_URL}/events`, title: "Events" },
        { href: `${SITE_URL}/tools`, title: "Tech Stack" },
      ],
      title: "Pages",
    },
    {
      links: [
        { href: `${SITE_URL}/ui`, title: "Registry Overview" },
        {
          href: `${SITE_URL}/ui/expandable-tabs`,
          title: "Expandable Tabs",
        },
        { href: `${SITE_URL}/ui/braille-loader`, title: "Braille Loader" },
      ],
      title: "dominik-ui",
    },
  ],
});

export const GET = handler.GET;
