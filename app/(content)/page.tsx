import type { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  description: "Software Engineer based in Germany. Open source enthusiast.",
};

export default async function Page() {
  return <About />;
}
