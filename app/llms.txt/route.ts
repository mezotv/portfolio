import type { LlmsTxtSection } from "@dualmark/core";
import { renderLlmsTxt } from "@dualmark/core";
import type { Post } from "@usemarble/sdk/models";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts, getExternalPosts } from "@/lib/marble/queries";

const CACHE_CONTROL = "public, max-age=3600";

const STATIC_SECTIONS: LlmsTxtSection[] = [
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
];

function getExternalUrl(post: Post): string | undefined {
  const url = post.fields.original_url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
}

function toBlogLinks(
  posts: Post[],
  hrefFor: (post: Post) => string | undefined
): LlmsTxtSection["links"] {
  return posts.flatMap((post) => {
    const href = hrefFor(post);
    if (!href) {
      return [];
    }

    return [
      {
        description: post.description,
        href,
        title: post.title,
      },
    ];
  });
}

export async function GET() {
  const [posts, externalPosts] = await Promise.all([
    getBlogPosts(),
    getExternalPosts(),
  ]);

  const sections: LlmsTxtSection[] = [...STATIC_SECTIONS];

  const blogLinks = toBlogLinks(
    posts,
    (post) => `${SITE_URL}/blog/${post.slug}`
  );
  if (blogLinks.length > 0) {
    sections.push({
      links: blogLinks,
      title: "Blog",
    });
  }

  const externalLinks = toBlogLinks(externalPosts, getExternalUrl);
  if (externalLinks.length > 0) {
    sections.push({
      links: externalLinks,
      title: "External",
    });
  }

  const body = renderLlmsTxt({
    brandName: "Dominik Koch",
    description:
      "Software Engineer based in Germany with a passion for open source.",
    sections,
  });

  return new Response(body, {
    headers: {
      "Cache-Control": CACHE_CONTROL,
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
