import type { EventItem, EventOrganizer } from "@/utils/data/events";

interface EventJsonLdProps {
  events: EventItem[];
  baseUrl: string;
}

function formatOrganizers(organizers: EventOrganizer[] | undefined) {
  if (!organizers || organizers.length === 0) {
    return undefined;
  }

  const formatted = organizers.map((org) => ({
    "@type": org.type,
    name: org.name,
    url: org.url,
  }));

  return formatted.length === 1 ? formatted[0] : formatted;
}

export function EventJsonLd({ events, baseUrl }: EventJsonLdProps) {
  const structuredData = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.eventLocation
      ? {
          "@type": "Place",
          name: event.eventLocation.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: event.eventLocation.streetAddress,
            addressLocality: event.eventLocation.addressLocality,
            addressRegion: event.eventLocation.addressRegion,
            postalCode: event.eventLocation.postalCode,
            addressCountry: event.eventLocation.addressCountry,
          },
        }
      : {
          "@type": "Place",
          name: event.location,
        },
    image: event.image ? `${baseUrl}${event.image}` : undefined,
    url: `https://lu.ma/event/${event.lumaEventId}?utm_source=dominikkoch.dev`,
    organizer: formatOrganizers(event.organizers),
  }));

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Cant be modified
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          structuredData.length === 1 ? structuredData[0] : structuredData
        ),
      }}
      type="application/ld+json"
    />
  );
}
