import type {
  MarbleAuthorList,
  MarbleCategoryList,
  MarblePost,
  MarblePostList,
  MarbleTagList,
  Post,
} from "./types";

const url = process.env.MARBLE_API_URL;
const key = process.env.MARBLE_API_KEY;

interface GetPostsOptions {
  categories?: string;
  excludeCategories?: string;
}

export async function getPosts(
  options?: GetPostsOptions
): Promise<MarblePostList | undefined> {
  if (!(url && key)) {
    console.warn(
      "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
    );
    return undefined;
  }

  try {
    const params = new URLSearchParams();
    if (options?.categories) {
      params.set("categories", options.categories);
    }
    if (options?.excludeCategories) {
      params.set("excludeCategories", options.excludeCategories);
    }
    const queryString = params.toString();
    const fetchUrl = queryString
      ? `${url}/posts?${queryString}`
      : `${url}/posts`;

    const raw = await fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["posts"],
      },
    });
    const data: MarblePostList = await raw.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getTags(): Promise<MarbleTagList | undefined> {
  if (!(url && key)) {
    console.warn(
      "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
    );
    return undefined;
  }

  try {
    const raw = await fetch(`${url}/tags`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["tags"],
      },
    });
    const data: MarbleTagList = await raw.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
}

export async function getSinglePost(
  slug: string
): Promise<MarblePost | undefined> {
  if (!(url && key)) {
    console.warn(
      "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
    );
    return undefined;
  }

  if (!slug || slug === "undefined") {
    return undefined;
  }

  try {
    const raw = await fetch(`${url}/posts/${slug}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["posts", slug],
      },
    });
    const data: MarblePost = await raw.json();
    return data;
  } catch (error) {
    console.error("Error fetching single post:", error);
  }
}

export async function getCategories(): Promise<MarbleCategoryList | undefined> {
  if (!(url && key)) {
    console.warn(
      "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
    );
    return undefined;
  }

  try {
    const raw = await fetch(`${url}/categories`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["categories"],
      },
    });
    const data: MarbleCategoryList = await raw.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function getAuthors(): Promise<MarbleAuthorList | undefined> {
  if (!(url && key)) {
    console.warn(
      "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
    );
    return undefined;
  }

  try {
    const raw = await fetch(`${url}/authors`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["authors"],
      },
    });
    const data: MarbleAuthorList = await raw.json();
    return data;
  } catch (error) {
    console.error("Error fetching authors:", error);
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

/**
 * Get all blog posts excluding external posts, sorted by featured status and publication date
 */
export async function getBlogPosts(): Promise<Post[]> {
  const data = await getPosts({ excludeCategories: "external" });

  if (!data?.posts) {
    return [];
  }

  return sortPosts(data.posts);
}

/**
 * Get external posts (posts mentioning me or created with my help)
 */
export async function getExternalPosts(): Promise<Post[]> {
  const data = await getPosts({ categories: "external" });

  if (!data?.posts) {
    return [];
  }

  return sortPosts(data.posts);
}

/**
 * Get a single post by slug (excludes external posts)
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const data = await getSinglePost(slug);
  const post = data?.post;

  // External posts don't have internal pages
  if (post?.category?.slug === "external") {
    return undefined;
  }

  return post;
}
