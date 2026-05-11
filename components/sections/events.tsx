"use client";

import { EventCard } from "@/components/sections/event-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { events } from "@/utils/data/events";
import { getLatestEventsByStartDate } from "@/utils/event";

const EVENTS_DESCRIPTION = "Events I hosted or helped out at.";

const eventsTitleTriggerClass =
  "cursor-help border-0 bg-transparent p-0 font-inherit text-inherit underline-offset-4 decoration-2 decoration-wavy decoration-foreground outline-none transition-colors hover:underline focus-visible:underline";

export function Events() {
  const sortedEvents = getLatestEventsByStartDate(events, events.length);

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <h1 className="font-bold text-2xl">
        <Tooltip>
          <TooltipTrigger
            render={
              <button className={eventsTitleTriggerClass} type="button" />
            }
          >
            Events
          </TooltipTrigger>
          <TooltipContent
            className="corner-squircle max-w-xs rounded-xl text-left supports-[corner-shape:squircle]:rounded-lg"
            side="top"
          >
            <p>{EVENTS_DESCRIPTION}</p>
          </TooltipContent>
        </Tooltip>
      </h1>
      <div className="flex flex-col gap-6">
        {sortedEvents.map((event) => (
          <EventCard event={event} key={event.lumaEventId} />
        ))}
      </div>
    </div>
  );
}
