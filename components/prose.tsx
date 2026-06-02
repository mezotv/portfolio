import { Fragment, type HTMLAttributes, type ReactNode } from "react";
import { codeToHtml } from "shiki";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

type PostEmbed = (props: Record<string, string>) => ReactNode;

type ProseProps = HTMLAttributes<HTMLElement> & {
  as?: "article";
  html: string;
  components?: Record<string, PostEmbed>;
};

const PARAGRAPH_RE = /<p(?:\s[^>]*)?>\s*([\s\S]*?)\s*<\/p>/gi;
const CODE_BLOCK_RE =
  /<pre([^>]*)>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi;
const ANCHOR_OPEN_RE = /<a\b([^>]*)>/gi;
const ENTITY_RE =
  /&(?:amp|lt|gt|quot|apos|nbsp|#39|#x27|#X27|#\d+|#x[\da-fA-F]+);/g;
const LANGUAGE_CLASS_RE = /(?:^|\s)(?:language|lang)-([^\s]+)/;
const TARGET_ATTRIBUTE_RE =
  /\s+target(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?/gi;
const WHITESPACE_RE = /\s/;
const NAME_CHAR_RE = /[\w.-]/;
const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&nbsp;": "\u00A0",
  "&#39;": "'",
  "&#x27;": "'",
  "&#X27;": "'",
};
const NAME_RE = /^[A-Za-z][\w.-]*$/;
const CODE_THEMES = {
  light: "github-light",
  dark: "github-dark",
} as const;

function decodeEntities(value: string): string {
  return value.replace(ENTITY_RE, (entity) => {
    if (entity in ENTITIES) {
      return ENTITIES[entity];
    }

    if (entity.startsWith("&#x") || entity.startsWith("&#X")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(3, -1), 16));
    }

    if (entity.startsWith("&#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2, -1), 10));
    }

    return entity;
  });
}

function isWhitespace(char: string): boolean {
  return WHITESPACE_RE.test(char);
}

function isNameChar(char: string): boolean {
  return NAME_CHAR_RE.test(char);
}

function getQuoteEnd(char: string): string | null {
  if (char === '"' || char === "'") {
    return char;
  }
  if (char === "“") {
    return "”";
  }
  if (char === "‘") {
    return "’";
  }
  return null;
}

function skipWhitespace(input: string, index: number): number {
  let next = index;

  while (next < input.length && isWhitespace(input[next])) {
    next += 1;
  }

  return next;
}

function readAttributeName(
  input: string,
  index: number
): { name: string; index: number } | null {
  let next = index;

  while (
    next < input.length &&
    !isWhitespace(input[next]) &&
    input[next] !== "=" &&
    input[next] !== "/" &&
    input[next] !== ">"
  ) {
    next += 1;
  }

  const name = input.slice(index, next);
  return NAME_RE.test(name) ? { name, index: next } : null;
}

function readAttributeValue(
  input: string,
  index: number
): { value: string; index: number } {
  const quoteEnd = getQuoteEnd(input[index]);

  if (quoteEnd) {
    const valueStart = index + 1;
    let next = valueStart;

    while (next < input.length && input[next] !== quoteEnd) {
      next += 1;
    }

    return {
      value: input.slice(valueStart, next),
      index: input[next] === quoteEnd ? next + 1 : next,
    };
  }

  let next = index;
  while (
    next < input.length &&
    !isWhitespace(input[next]) &&
    input[next] !== "/" &&
    input[next] !== ">"
  ) {
    next += 1;
  }

  return { value: input.slice(index, next), index: next };
}

function parseAttributes(input: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  let index = 0;

  while (index < input.length) {
    index = skipWhitespace(input, index);

    if (index >= input.length || input[index] === "/" || input[index] === ">") {
      break;
    }

    const attrName = readAttributeName(input, index);
    if (!attrName) {
      break;
    }

    index = skipWhitespace(input, attrName.index);

    if (input[index] !== "=") {
      attrs[attrName.name] = "true";
      continue;
    }

    const attrValue = readAttributeValue(
      input,
      skipWhitespace(input, index + 1)
    );
    attrs[attrName.name] = decodeEntities(attrValue.value);
    index = attrValue.index;
  }

  return attrs;
}

function getAttribute(
  attrs: Record<string, string>,
  name: string
): string | undefined {
  const key = Object.keys(attrs).find((attr) => attr.toLowerCase() === name);
  return key ? attrs[key] : undefined;
}

function isInternalHref(href: string): boolean {
  const normalizedHref = href.trim();
  return normalizedHref.startsWith("/") || normalizedHref.startsWith("#");
}

function normalizeContentLinks(html: string): string {
  return html.replace(ANCHOR_OPEN_RE, (tag, rawAttrs: string) => {
    const href = getAttribute(parseAttributes(rawAttrs), "href");

    if (!(href && isInternalHref(href))) {
      return tag;
    }

    return `<a${rawAttrs.replace(TARGET_ATTRIBUTE_RE, "")}>`;
  });
}

function findOpeningTagEnd(source: string, from: number): number {
  let quoteEnd: string | null = null;

  for (let index = from; index < source.length; index += 1) {
    const char = source[index];

    if (quoteEnd) {
      if (char === quoteEnd) {
        quoteEnd = null;
      }
      continue;
    }

    quoteEnd = getQuoteEnd(char);
    if (quoteEnd) {
      continue;
    }

    if (char === ">") {
      return index;
    }
  }

  return -1;
}

function lastNonWhitespaceIndex(value: string): number {
  for (let index = value.length - 1; index >= 0; index -= 1) {
    if (!isWhitespace(value[index])) {
      return index;
    }
  }

  return -1;
}

function parsePlaceholder(
  input: string
): { name: string; props: Record<string, string> } | null {
  const source = decodeEntities(input.trim());

  if (!source.startsWith("<")) {
    return null;
  }

  let index = 1;
  const nameStart = index;
  while (index < source.length && isNameChar(source[index])) {
    index += 1;
  }

  const name = source.slice(nameStart, index);
  if (!NAME_RE.test(name)) {
    return null;
  }

  if (
    index < source.length &&
    !isWhitespace(source[index]) &&
    source[index] !== "/" &&
    source[index] !== ">"
  ) {
    return null;
  }

  const openEnd = findOpeningTagEnd(source, index);
  if (openEnd === -1) {
    return null;
  }

  const attributeSource = source.slice(index, openEnd);
  const closeStart = lastNonWhitespaceIndex(attributeSource);
  const selfClosing = closeStart >= 0 && attributeSource[closeStart] === "/";

  if (selfClosing) {
    const rest = source.slice(openEnd + 1).trim();
    if (rest) {
      return null;
    }

    return {
      name,
      props: parseAttributes(attributeSource.slice(0, closeStart)),
    };
  }

  if (source.slice(openEnd + 1).trim() !== `</${name}>`) {
    return null;
  }

  return {
    name,
    props: parseAttributes(attributeSource),
  };
}

type Segment =
  | { kind: "html"; id: string; value: string }
  | { kind: "code"; id: string; code: string; html: string }
  | {
      kind: "component";
      id: string;
      name: string;
      raw: string;
      props: Record<string, string>;
    };

function appendPlaceholderSegments(segments: Segment[], html: string) {
  let lastIndex = 0;

  PARAGRAPH_RE.lastIndex = 0;
  let match = PARAGRAPH_RE.exec(html);
  while (match !== null) {
    const placeholder = parsePlaceholder(match[1]);
    if (!placeholder) {
      match = PARAGRAPH_RE.exec(html);
      continue;
    }

    if (match.index > lastIndex) {
      segments.push({
        kind: "html",
        id: `seg-${segments.length}`,
        value: html.slice(lastIndex, match.index),
      });
    }

    segments.push({
      kind: "component",
      id: `seg-${segments.length}`,
      name: placeholder.name,
      raw: match[0],
      props: placeholder.props,
    });
    lastIndex = match.index + match[0].length;
    match = PARAGRAPH_RE.exec(html);
  }

  if (lastIndex < html.length) {
    segments.push({
      kind: "html",
      id: `seg-${segments.length}`,
      value: html.slice(lastIndex),
    });
  }
}

function getCodeLanguage(preAttrs: string, codeAttrs: string): string {
  const pre = parseAttributes(preAttrs);
  const code = parseAttributes(codeAttrs);
  const explicitLanguage =
    code["data-language"] ??
    code["data-lang"] ??
    pre["data-language"] ??
    pre["data-lang"];
  const className = [code.class, pre.class].filter(Boolean).join(" ");
  const languageClass = LANGUAGE_CLASS_RE.exec(className)?.[1];

  return (languageClass ?? explicitLanguage ?? "text").toLowerCase();
}

async function highlightCodeBlock(
  preAttrs: string,
  codeAttrs: string,
  code: string
): Promise<{ code: string; html: string }> {
  const decodedCode = decodeEntities(code);
  const language = getCodeLanguage(preAttrs, codeAttrs);

  try {
    const html = await codeToHtml(decodedCode, {
      lang: language,
      themes: CODE_THEMES,
      defaultColor: "light",
    });

    return { code: decodedCode, html };
  } catch {
    const html = await codeToHtml(decodedCode, {
      lang: "text",
      themes: CODE_THEMES,
      defaultColor: "light",
    });

    return { code: decodedCode, html };
  }
}

async function splitContent(html: string): Promise<Segment[]> {
  const segments: Segment[] = [];
  let lastIndex = 0;

  CODE_BLOCK_RE.lastIndex = 0;
  let match = CODE_BLOCK_RE.exec(html);
  while (match !== null) {
    appendPlaceholderSegments(segments, html.slice(lastIndex, match.index));

    const highlighted = await highlightCodeBlock(match[1], match[2], match[3]);
    segments.push({
      kind: "code",
      id: `seg-${segments.length}`,
      ...highlighted,
    });

    lastIndex = match.index + match[0].length;
    match = CODE_BLOCK_RE.exec(html);
  }

  appendPlaceholderSegments(segments, html.slice(lastIndex));

  return segments;
}

function RawHtml({ html }: { html: string }) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized by Marble, with code blocks generated by Shiki.
    <div dangerouslySetInnerHTML={{ __html: normalizeContentLinks(html) }} />
  );
}

export async function Prose({
  children,
  html,
  className,
  components,
}: ProseProps) {
  const proseClassName = cn(
    "prose prose-neutral prose-sm dark:prose-invert prose-pre:my-6 max-w-none prose-pre:overflow-x-auto prose-img:rounded-xl prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60 prose-pre:p-4 prose-figcaption:text-center prose-code:font-mono prose-headings:font-sans prose-headings:font-semibold prose-p:font-sans prose-pre:font-mono prose-a:text-primary prose-blockquote:text-foreground prose-code:text-foreground prose-em:text-foreground prose-headings:text-foreground prose-li:text-foreground/80 prose-p:text-foreground/80 prose-pre:text-sm prose-strong:text-foreground text-foreground prose-p:leading-7 prose-pre:leading-6 prose-headings:tracking-tight prose-a:no-underline prose-code:before:content-none prose-code:after:content-none prose-a:hover:underline",
    className
  );

  if (!html) {
    return <article className={proseClassName}>{children}</article>;
  }

  const segments = await splitContent(html);

  return (
    <article className={proseClassName}>
      {segments.map((segment) => {
        if (segment.kind === "component") {
          const embed = components?.[segment.name];
          return embed ? (
            <Fragment key={segment.id}>{embed(segment.props)}</Fragment>
          ) : (
            <RawHtml html={segment.raw} key={segment.id} />
          );
        }

        if (segment.kind === "code") {
          return (
            <CodeBlock
              code={segment.code}
              html={segment.html}
              key={segment.id}
            />
          );
        }

        return <RawHtml html={segment.value} key={segment.id} />;
      })}
    </article>
  );
}
