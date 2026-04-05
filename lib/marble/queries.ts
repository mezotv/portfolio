import type {
  AuthorsListResponse,
  CategoriesListResponse,
  Post,
  PostResponse,
  PostsListResponse,
  TagsListResponse,
} from "@usemarble/sdk/models";
import { marble } from "@/lib/marble/client";


interface GetPostsOptions {
  categories?: string[];
  excludeCategories?: string[];
}

export async function getPosts(
  options?: GetPostsOptions
): Promise<PostsListResponse | undefined> {
  try {
    const data = await marble.posts.list({
      categories: options?.categories,
      excludeCategories: options?.excludeCategories,
    });

    return data.result;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getTags(): Promise<TagsListResponse | undefined> {
  try {
    const data = await marble.tags.list();
    return data.result;
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}

export async function getCategories(): Promise<CategoriesListResponse | undefined> {
  try {
    const data = await marble.categories.list();
    return data.result;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function getAuthors(): Promise<AuthorsListResponse | undefined> {
  try {
    const data = await marble.authors.list();
    return data.result;
  } catch (error) {
    console.error("Error fetching authors:", error);
  }
}

export async function getSinglePost(
  slug: string
): Promise<PostResponse | undefined> {
  if (!slug || slug === "undefined") {
    return undefined;
  }

  try {
    const data = await marble.posts.get({ identifier: slug });
    return data;
  } catch (error) {
    console.error("Error fetching single post:", error);
  }
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    if (a.featured && !b.featured) {
      return -1;
    }
    if (!a.featured && b.featured) {
      return 1;
    }

    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });
}

export async function getBlogPosts(): Promise<Post[]> {
  const data = await getPosts({ excludeCategories: ["external"] });

  if (!data?.posts) {
    return [];
  }

  return sortPosts(data.posts);
}

export async function getExternalPosts(): Promise<Post[]> {
  const data = await getPosts({ categories: ["external"] });

  if (!data?.posts) {
    return [];
  }

  return sortPosts(data.posts);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const data = await getSinglePost(slug);
  const post = data?.post;

  if (post?.category.slug === "external") {
    return undefined;
  }

  return post;
}
