import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  description: "My latest projects and open source contributions.",
};

export const dynamic = "force-static";

export default function Page() {
  return <Projects />;
}
