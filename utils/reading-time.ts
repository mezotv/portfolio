import { WORDS_PER_MINUTE } from "@/lib/constants";

const HTML_TAG = /<[^>]*>/g;
const WHITESPACE = /\s+/;

export function getReadingTime(content: string): number {
  const text = content.replace(HTML_TAG, " ");
  const wordCount = text.split(WHITESPACE).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
