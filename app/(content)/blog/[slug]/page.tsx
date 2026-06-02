import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
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
  params: {
    slug: string;
  };
}

export const revalidate = 0;

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
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
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
  if (process.env.NODE_ENV === "development") {
    await connection();
  }

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdown = await getBlogPostMarkdown(slug);

  const publishDate = new Date(post.publishedAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
