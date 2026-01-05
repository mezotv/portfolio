import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { EventJsonLd } from "@/components/seo/event-json-ld";
import { events } from "@/utils/data/events";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dominikkoch.dev";

export const metadata: Metadata = {
  description: "Software Engineer based in Germany. Open source enthusiast.",
};

export default async function Page() {
  return (
    <>
      <EventJsonLd baseUrl={BASE_URL} events={events} />
      <About />
    </>
  );
}
