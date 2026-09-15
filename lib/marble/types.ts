export interface BlogPost {
  author?: {
    name: string;
    email?: string;
  };
  content: string;
  description: string;
  featured?: boolean;
  id: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
}

export interface PostEventData {
  createdAt: string;
  data: BlogPost;
  type: string;
}

export interface WebhookPayload {
  data: BlogPost;
  type: string;
}
