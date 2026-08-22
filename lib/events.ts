import { cacheLife, cacheTag } from "next/cache";
import type { EventItem } from "@/types/event";
import { events } from "@/utils/data/events";
import { getLatestEventsByStartDate } from "@/utils/event";

export interface EventWithStatus extends EventItem {
  isPast: boolean;
}

// biome-ignore lint/suspicious/useAwait: "use cache" requires async; Date.now() is the cached value
async function getNow(): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag("events");
  return Date.now();
}

export async function getEventsWithStatus(): Promise<EventWithStatus[]> {
  const now = await getNow();
  return events.map((event) => ({
    ...event,
    isPast: new Date(event.endDate ?? event.startDate).getTime() < now,
  }));
}

export async function getLatestEventsWithStatus(
  limit: number
): Promise<EventWithStatus[]> {
  const eventsWithStatus = await getEventsWithStatus();
  const sorted = getLatestEventsByStartDate(
    eventsWithStatus as EventItem[],
    limit
  );
  return sorted as EventWithStatus[];
}
