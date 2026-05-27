import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProseProps = HTMLAttributes<HTMLElement> & {
  as?: "article";
  html: string;
};

export function Prose({ children, html, className }: ProseProps) {
  return (
    <article
      className={cn(
        "prose mx-auto prose-img:rounded-xl prose-p:text-justify prose-headings:font-bold prose-a:text-foreground prose-blockquote:text-foreground prose-code:text-foreground prose-em:text-foreground prose-h1:text-xl prose-headings:text-foreground prose-li:text-foreground prose-ol:text-foreground prose-strong:text-foreground prose-ul:text-foreground text-foreground prose-a:underline",
        className
      )}
    >
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Html is sanitized by Marble */}
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </article>
  );
}
