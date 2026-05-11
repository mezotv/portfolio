import type { Metadata } from "next";
import { Events } from "@/components/sections/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Events I hosted or helped out at.",
};

export const dynamic = "force-static";

export default function EventsPage() {
  return <Events />;
}
