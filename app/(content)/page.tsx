import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { EventJsonLd } from "@/components/seo/event-json-ld";
import { SITE_URL } from "@/lib/constants";
import { events } from "@/utils/data/events";

export const metadata: Metadata = {
  description: "Software Engineer based in Germany. Open source enthusiast.",
};

export default async function Page() {
  return (
    <>
      <EventJsonLd baseUrl={SITE_URL} events={events} />
      <About />
    </>
  );
}
