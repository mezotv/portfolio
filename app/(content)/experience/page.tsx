import type { Metadata } from "next";
import { Suspense } from "react";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience and work history.",
};

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={<p className="text-muted-foreground">Loading experience...</p>}
    >
      <Experience />
    </Suspense>
  );
}
