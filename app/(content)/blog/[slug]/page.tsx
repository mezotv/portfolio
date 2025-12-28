import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/marble/client";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">{post.title}</h1>

        <div className="flex flex-col gap-2 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.authors && post.authors.length > 0 && (
            <div>
              by{" "}
              <span className="text-foreground">
                {post.authors.map((author) => author.name).join(" & ")}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <Prose html={post.content} />
      </div>
    </article>
  );
}
