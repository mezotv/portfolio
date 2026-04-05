import Link from "next/link";
import type { Post } from "@usemarble/sdk/models";

interface BlogPostItemProps {
  post: Post;
}

export function BlogPostItem({ post }: BlogPostItemProps) {
  const isExternal = post.category.slug === "external";
  const originalAuthor = post.fields.original_author ? post.fields.original_author : undefined;
  const originalUrl = post.fields.original_url ? post.fields.original_url : undefined;
  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const content = (
    <article className="-mx-4 mb-8 rounded-sm border-border border-b px-4 py-2 transition-colors last:border-b-0 hover:bg-muted/50">
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <time className="whitespace-nowrap text-muted-foreground text-sm">
            {formattedDate}
          </time>
        </div>

        <p className="text-muted-foreground">{post.description}</p>

        {isExternal && originalAuthor && (
          <p className="text-muted-foreground text-sm">by {originalAuthor}</p>
        )}

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
  );

  if (isExternal && originalUrl) {
    return (
      <a href={originalUrl} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} prefetch={false}>
      {content}
    </Link>
  );
}
