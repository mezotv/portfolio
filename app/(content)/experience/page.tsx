import type { Metadata } from "next";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience and work history.",
};

export default function ExperiencePage() {
  return <Experience />;
}
