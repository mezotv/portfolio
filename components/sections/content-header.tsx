"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Intro } from "@/components/sections/intro";
import { SectionTabs } from "@/components/sections/section-tabs";

export function ContentHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/blog/")) {
    return (
      <Link
        className="group flex w-fit items-center gap-2 text-sm text-zinc-900/60 transition-colors hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
        href="/blog"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        All posts
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Intro />
      <SectionTabs />
    </div>
  );
}
