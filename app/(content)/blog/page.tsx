import type { Metadata } from "next";
import { BlogPostItem } from "@/components/sections/blog-post-item";
import { getBlogPosts, getExternalPosts } from "@/lib/marble/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, design systems, and modern tooling.",
};

export default async function BlogPage() {
  const [posts, externalPosts] = await Promise.all([
    getBlogPosts(),
    getExternalPosts(),
  ]);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-12">
      <div className="flex flex-col gap-8">
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

      {externalPosts.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">External</h2>
            <p className="text-muted-foreground">
              External posts mentioning me or created with my help.
            </p>
          </div>

          <div className="space-y-8">
            {externalPosts.map((post) => (
              <BlogPostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
