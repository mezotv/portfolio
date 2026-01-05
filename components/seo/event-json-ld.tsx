import type { EventItem } from "@/utils/data/events";

interface EventJsonLdProps {
  events: EventItem[];
  baseUrl: string;
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
    url: `https://lu.ma/event/${event.lumaEventId}`,
    organizer: {
      "@type": "Person",
      name: "Dominik Koch",
      url: baseUrl,
    },
  }));

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          structuredData.length === 1 ? structuredData[0] : structuredData
        ),
      }}
      type="application/ld+json"
    />
  );
}
