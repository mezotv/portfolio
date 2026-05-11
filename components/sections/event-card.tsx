import Image from "next/image";

import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/event";
import { statusConfig } from "@/utils/data/projects";
import { isEventPast } from "@/utils/event";

export function EventCard({
  event,
  clampDescription = false,
}: {
  event: EventItem;
  clampDescription?: boolean;
}) {
  return (
    <a
      className="-mx-2 flex cursor-pointer flex-col gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
      href={`https://lu.ma/event/${event.lumaEventId}?utm_source=dominikkoch.dev`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex items-start gap-3">
        {event.image ? (
          <Image
            alt={event.name}
            className="rounded-md object-cover"
            height={80}
            src={event.image}
            width={80}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted font-medium text-xl">
            {event.name.charAt(0)}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium">{event.name}</h3>
            {isEventPast(event) && (
              <span
                className={`rounded-md px-2 py-1 font-medium text-xs ${statusConfig.inactive.className}`}
              >
                Past
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            {event.date} &middot; {event.time}
          </p>
          <p className="text-muted-foreground text-sm">{event.location}</p>
        </div>
      </div>
      <p
        className={cn(
          "text-muted-foreground text-sm",
          clampDescription && "line-clamp-2"
        )}
      >
        {event.description}
      </p>
    </a>
  );
}
