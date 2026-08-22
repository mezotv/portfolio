import type { Metadata } from "next";
import { Suspense } from "react";
import { Events } from "@/components/sections/events";
import { getEventsWithStatus } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Events I hosted or helped out at.",
};

async function EventsList() {
  const events = await getEventsWithStatus();
  return <Events events={events} />;
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={<p className="text-muted-foreground">Loading events...</p>}
    >
      <EventsList />
    </Suspense>
  );
}
