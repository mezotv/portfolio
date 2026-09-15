import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { postComponents } from "@/components/blog/post-components";
import { Prose } from "@/components/prose";
import {
  getBlogPostBySlug,
  getBlogPostMarkdown,
  getBlogPosts,
} from "@/lib/marble/queries";
import { getBlogMarkdownUrl } from "@/utils/article";
import { getReadingTime } from "@/utils/reading-time";
import { ArticleActions } from "./article-actions";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

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
    description: post.description,
    openGraph: {
      description: post.description,
      modifiedTime: post.updatedAt.toISOString(),
      publishedTime: post.publishedAt.toISOString(),
      title: post.title,
      type: "article",
    },
    title: post.title,
    twitter: {
      card: "summary_large_image",
      description: post.description,
      title: post.title,
    },
  };
}

async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdown = await getBlogPostMarkdown(slug);

  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const readingTime = getReadingTime(post.content);
  const markdownUrl = getBlogMarkdownUrl(slug);

  return (
    <article className="flex w-full max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-muted-foreground text-sm">
          Published{" "}
          <time dateTime={post.publishedAt.toISOString()}>{formattedDate}</time>
        </p>

        <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-muted-foreground text-sm">
            {readingTime} min read
          </span>
          <ArticleActions markdown={markdown ?? ""} markdownUrl={markdownUrl} />
        </div>
      </header>

      <div className="max-w-none">
        <Prose components={postComponents} html={post.content} />
      </div>
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
