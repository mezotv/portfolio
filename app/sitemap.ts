import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getBlogPosts } from "@/lib/marble/queries";
import { source } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: SITE_URL,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: `${SITE_URL}/projects`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${SITE_URL}/experience`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${SITE_URL}/events`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.7,
      url: `${SITE_URL}/tools`,
    },
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 0.9,
      url: `${SITE_URL}/blog`,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.7,
      url: `${SITE_URL}/ui`,
    },
  ];

  const docsRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.6,
    url: `${SITE_URL}${page.url}`,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    changeFrequency: "weekly",
    lastModified: new Date(post.updatedAt || post.publishedAt),
    priority: 0.8,
    url: `${SITE_URL}/blog/${post.slug}`,
  }));

  return [...staticRoutes, ...docsRoutes, ...blogRoutes];
}
