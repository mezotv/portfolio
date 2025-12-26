import type { Metadata } from "next";
import { BlogPostItem } from "@/components/sections/blog-post-item";
import { getBlogPosts } from "@/lib/marble/client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, design systems, and modern tooling.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on web development, design systems, and modern tooling.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blog posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogPostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
