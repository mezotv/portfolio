import type { Metadata } from "next";
import { Tools } from "@/components/sections/tools";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Tools, libraries, and technologies I use and recommend.",
};

export default function ToolsPage() {
  return <Tools />;
}
