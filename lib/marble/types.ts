export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
  author?: {
    name: string;
    email?: string;
  };
}

export interface PostEventData {
  event: string;
  data: BlogPost;
  timestamp: string;
}

export interface WebhookPayload {
  event: string;
  data: BlogPost;
}

// Marble API types
export interface Author {
  id: string;
  name: string;
  email?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  authors: Author[];
  category?: Category;
  coverImage?: string;
}

export interface MarblePost {
  post: Post;
}

export interface MarblePostList {
  posts: Post[];
  pagination: {
    limit: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface MarbleTag {
  tag: Tag;
}

export interface MarbleTagList {
  tags: Tag[];
  pagination: {
    limit: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface MarbleCategory {
  category: Category;
}

export interface MarbleCategoryList {
  categories: Category[];
  pagination: {
    limit: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface MarbleAuthor {
  author: Author;
}

export interface MarbleAuthorList {
  authors: Author[];
  pagination: {
    limit: number;
    currentPage: number;
    nextPage?: number;
    previousPage?: number;
    totalItems: number;
    totalPages: number;
  };
}
