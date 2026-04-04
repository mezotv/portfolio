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
