"use client";

import { CodeIcon, XIcon } from "@phosphor-icons/react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  preview: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ComponentPreview({
  preview,
  children,
  className,
}: ComponentPreviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "not-prose isolate my-6 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
    >
      <div className="relative flex min-h-[320px] items-center justify-center p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-position:center] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative w-full max-w-md">{preview}</div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "[&_.shiki]:!my-0 [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0 overflow-hidden transition-[max-height] duration-300 ease-out",
            open ? "max-h-[640px] overflow-y-auto" : "max-h-36"
          )}
        >
          {children}
        </div>

        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-card via-card/80 to-transparent" />
        )}

        <button
          className={cn(
            "absolute inset-x-0 z-10 mx-auto inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-md border border-border/60 bg-background px-3 py-1.5 font-medium text-muted-foreground text-xs shadow-sm transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            open ? "bottom-3" : "top-1/2 -translate-y-1/2"
          )}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? (
            <>
              <XIcon className="size-3.5" />
              Hide Code
            </>
          ) : (
            <>
              <CodeIcon className="size-3.5" />
              View Code
            </>
          )}
        </button>
      </div>
    </div>
  );
}
