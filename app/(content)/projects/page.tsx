import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "My latest projects and open source contributions.",
};

export const dynamic = "force-static";

export default function ProjectsPage() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <Projects />
    </div>
  );
}
