import { CHATGPT_BASE_URL, CLAUDE_BASE_URL, SITE_URL } from "@/lib/constants";

export function getBlogMarkdownUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}.md`;
}

function buildLlmPromptUrl(base: string, markdownUrl: string): string {
  const prompt = `Read ${markdownUrl} so I can ask questions about it.`;
  return `${base}?q=${encodeURIComponent(prompt)}`;
}

export function getChatGptUrl(markdownUrl: string): string {
  return buildLlmPromptUrl(CHATGPT_BASE_URL, markdownUrl);
}

export function getClaudeUrl(markdownUrl: string): string {
  return buildLlmPromptUrl(CLAUDE_BASE_URL, markdownUrl);
}
