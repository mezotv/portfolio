import Link from "next/link";
import type { Post } from "@/lib/marble/types";

interface BlogPostItemProps {
  post: Post;
}

export function BlogPostItem({ post }: BlogPostItemProps) {
  const href = `/blog/${post.slug}`;

  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={href} prefetch={false}>
      <article className="-mx-4 mb-8 rounded-sm border-border border-b px-4 py-2 transition-colors last:border-b-0 hover:bg-muted/50">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <time className="whitespace-nowrap text-muted-foreground text-sm">
              {formattedDate}
            </time>
          </div>

          <p className="text-muted-foreground">{post.description}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  className="inline-block rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs"
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
