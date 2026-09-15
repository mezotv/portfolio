import type { EventItem, EventOrganizer } from "@/types/event";

interface EventJsonLdProps {
  baseUrl: string;
  events: EventItem[];
}

function formatOrganizers(organizers: EventOrganizer[] | undefined) {
  if (!organizers || organizers.length === 0) {
    return;
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
    description: event.description,
    endDate: event.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: event.image ? `${baseUrl}${event.image}` : undefined,
    location: event.eventLocation
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: event.eventLocation.addressCountry,
            addressLocality: event.eventLocation.addressLocality,
            addressRegion: event.eventLocation.addressRegion,
            postalCode: event.eventLocation.postalCode,
            streetAddress: event.eventLocation.streetAddress,
          },
          name: event.eventLocation.name,
        }
      : {
          "@type": "Place",
          name: event.location,
        },
    name: event.name,
    organizer: formatOrganizers(event.organizers),
    startDate: event.startDate,
    url: `https://lu.ma/event/${event.lumaEventId}?utm_source=dominikkoch.dev`,
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
