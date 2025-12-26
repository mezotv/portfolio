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
        "prose mx-auto prose-img:rounded-xl prose-p:text-justify prose-h1:font-bold prose-headings:font-normal prose-headings:font-serif prose-a:text-primary prose-h1:text-xl text-foreground",
        className
      )}
    >
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: No Brainer*/}
      {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
    </article>
  );
}
