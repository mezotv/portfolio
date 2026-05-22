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
  type: string;
  data: BlogPost;
  createdAt: string;
}

export interface WebhookPayload {
  type: string;
  data: BlogPost;
}
