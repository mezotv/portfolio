import type { EventItem } from "@/types/event";

export function isEventPast(event: EventItem): boolean {
  const endMs = new Date(event.endDate ?? event.startDate).getTime();
  return endMs < Date.now();
}

export function getLatestEventsByStartDate(
  items: EventItem[],
  limit: number
): EventItem[] {
  return [...items]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, limit);
}
