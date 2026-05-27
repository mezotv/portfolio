"use client";

import {
  CaretDownIcon,
  CopyIcon,
  MarkdownLogoIcon,
} from "@phosphor-icons/react";
import { type ReactNode, useState } from "react";
import { ClaudeIcon, OpenAiIcon } from "@/components/brand-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COPY_FEEDBACK_RESET_MS } from "@/lib/constants";
import { getChatGptUrl, getClaudeUrl } from "@/utils/article";

interface ArticleActionsProps {
  markdown: string;
  markdownUrl: string;
}

export function ArticleActions({ markdown, markdownUrl }: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyArticle = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-muted-foreground text-sm">
      <button
        className="cursor-pointer transition-colors hover:text-foreground"
        onClick={copyArticle}
        type="button"
      >
        {copied ? "Copied" : "Copy article"}
      </button>

      <span aria-hidden="true" className="h-4 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More article actions"
          className="flex cursor-pointer items-center rounded-sm outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
        >
          <CaretDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <ArticleActionItem
            description="Copy article as Markdown for LLMs"
            icon={<CopyIcon className="size-5" />}
            onClick={copyArticle}
            title={copied ? "Copied" : "Copy article"}
          />
          <ArticleActionItem
            description="View this article as plain text"
            href={markdownUrl}
            icon={<MarkdownLogoIcon className="size-5" />}
            title="View as Markdown"
          />
          <ArticleActionItem
            description="Ask questions about this article"
            href={getChatGptUrl(markdownUrl)}
            icon={<OpenAiIcon className="size-4" />}
            title="Open in ChatGPT"
          />
          <ArticleActionItem
            description="Ask questions about this article"
            href={getClaudeUrl(markdownUrl)}
            icon={<ClaudeIcon className="size-5" />}
            title="Open in Claude"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface ArticleActionItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}

const ITEM_CLASS =
  "flex cursor-pointer items-center gap-3 px-3 py-2.5 font-sans";

function ArticleActionItem({
  title,
  description,
  icon,
  href,
  onClick,
}: ArticleActionItemProps) {
  const body = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground">
        {icon}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-medium text-foreground text-sm">{title}</span>
        <span className="text-muted-foreground text-xs">{description}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <DropdownMenuItem
        className={ITEM_CLASS}
        render={(props) => (
          <a {...props} href={href} rel="noopener noreferrer" target="_blank">
            {body}
          </a>
        )}
      />
    );
  }

  return (
    <DropdownMenuItem className={ITEM_CLASS} onClick={onClick}>
      {body}
    </DropdownMenuItem>
  );
}
