import type { Metadata } from "next";
import { Tools } from "@/components/sections/tools";

export const metadata: Metadata = {
  description: "Tools, libraries, and technologies I use and recommend.",
  title: "Tech Stack",
};

export default function ToolsPage() {
  return <Tools />;
}
