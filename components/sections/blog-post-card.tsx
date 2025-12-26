import Link from "next/link";
import type { Post } from "@/lib/marble/types";

interface BlogPostCardProps {
  post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group relative flex w-full flex-col gap-3 rounded-lg border border-transparent px-4 py-6 transition-colors hover:border-border hover:bg-muted/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="font-semibold text-lg transition-colors group-hover:text-foreground">
              {post.title}
            </h1>
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {post.description}
            </p>
          </div>
          <time className="whitespace-nowrap text-muted-foreground text-xs">
            {formattedDate}
          </time>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                className="inline-block rounded-full bg-muted px-2.5 py-0.5 font-medium text-muted-foreground text-xs transition-colors group-hover:bg-primary/20 group-hover:text-primary"
                key={tag.id}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
