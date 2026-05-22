import type { DualmarkNextConfig } from "@dualmark/nextjs";
import { getBlogPosts } from "@/lib/marble/queries";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dominikkoch.dev";

async function getBlogEntries() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    id: post.slug,
    data: {
      title: post.title,
      description: post.description,
      author: post.authors?.map((author) => author.name).join(" & "),
      publishedDate: new Date(post.publishedAt),
      modifiedDate: new Date(post.updatedAt),
      category: post.category.name,
    },
    body: post.content,
  }));
}

export const dualmarkConfig: DualmarkNextConfig = {
  siteUrl: SITE_URL,
  collections: {
    blog: {
      converter: "blog",
      getEntries: getBlogEntries,
      listingMetadata: {
        title: "Blog",
        description:
          "Thoughts on web development, design systems, and modern tooling.",
      },
    },
  },
  staticPages: [
    {
      pattern: "/",
      render: () => `# Dominik Koch

Software Engineer based in Germany with a passion for open source.

Currently working full-time on Notra and maintaining Hotkeys and Rivo.

- [Blog](${SITE_URL}/blog)
- [Projects](${SITE_URL}/projects)
- [Experience](${SITE_URL}/experience)
- [Events](${SITE_URL}/events)
- [Tech Stack](${SITE_URL}/tools)`,
    },
    {
      pattern: "/projects",
      render: () => `# Projects

My latest projects and open source contributions.

See the HTML page for the current project list: ${SITE_URL}/projects`,
    },
    {
      pattern: "/experience",
      render: () => `# Experience

My professional experience and work history.

See the HTML page for the current work history: ${SITE_URL}/experience`,
    },
    {
      pattern: "/events",
      render: () => `# Events

Events I hosted or helped out at.

See the HTML page for the current event list: ${SITE_URL}/events`,
    },
    {
      pattern: "/tools",
      render: () => `# Tech Stack

Tools, libraries, and technologies I use and recommend.

See the HTML page for the current tool list: ${SITE_URL}/tools`,
    },
  ],
};
