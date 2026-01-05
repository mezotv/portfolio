export interface EventLocation {
  name?: string;
  streetAddress?: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

export interface EventOrganizer {
  type: "Person" | "Organization";
  name: string;
  url?: string;
}

export interface EventItem {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  lumaEventId: string;
  startDate: string;
  endDate?: string;
  eventLocation?: EventLocation;
  organizers?: EventOrganizer[];
}

export const events: EventItem[] = [
  {
    name: "Vercel Munich Meetup & Mini-Hackathon",
    description:
      "An evening of building, shipping, and networking. Lightning talks, hands-on mini-hackathon with v0, AI models, and edge functions.",
    date: "January 22, 2026",
    time: "5:00 PM - 8:00 PM",
    location: "Munich, Germany",
    image: "/images/events/vercel-munich-2026.webp",
    lumaEventId: "evt-t82Utu2HPEFxUB3",
    startDate: "2026-01-22T17:00:00+01:00",
    endDate: "2026-01-22T20:00:00+01:00",
    eventLocation: {
      name: "Netlight Consulting",
      streetAddress: "Prannerstraße 4",
      addressLocality: "Munich",
      postalCode: "80333",
      addressRegion: "Bavaria",
      addressCountry: "DE",
    },
    organizers: [
      {
        type: "Organization",
        name: "Vercel",
        url: "https://vercel.com",
      },
      {
        type: "Person",
        name: "Dominik Koch",
        url: "https://dominikkoch.dev",
      },
      {
        type: "Person",
        name: "Gabby Shires",
        url: "https://x.com/gabbyshires",
      },
    ],
  },
];
