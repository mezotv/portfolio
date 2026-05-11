import type { EventItem } from "@/types/event";

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
  {
    name: "Stripe Sessions Happy Hour",
    description:
      "We're hosting a happy hour to bring together the best engineers and builders after Stripe Sessions. Join us in Vercel's new office to grab a drink, meet some great people, and see a few lightning demos from teams doing interesting work in AI.",
    date: "April 30, 2026",
    time: "5:00 PM - 8:30 PM PDT",
    location: "San Francisco, CA",
    image: "/images/events/happy-hour-sf-2026.webp",
    lumaEventId: "yxkys279",
    startDate: "2026-04-30T17:00:00-07:00",
    endDate: "2026-04-30T20:30:00-07:00",
    eventLocation: {
      name: "Vercel",
      streetAddress: "201 Mission St suite 300",
      addressLocality: "San Francisco",
      postalCode: "94105",
      addressRegion: "CA",
      addressCountry: "US",
    },
    organizers: [
      {
        type: "Organization",
        name: "Neon",
        url: "https://neon.tech",
      },
      {
        type: "Organization",
        name: "Vercel",
        url: "https://vercel.com",
      },
    ],
  },
  {
    name: "a16z x Upstash x Firecrawl AI Night",
    description:
      "Join us for an evening of conversation about Context7, Upstash, Firecrawl, and whatever you're building with AI. Enjoy light bites, connect with fellow builders, and bring your hottest technical takes.",
    date: "November 3, 2025",
    time: "5:30 PM - 8:30 PM PST",
    location: "San Francisco, CA",
    image: "/images/events/ai-night-sf-2025.webp",
    lumaEventId: "3laost30",
    startDate: "2025-11-03T17:30:00-08:00",
    endDate: "2025-11-03T20:30:00-08:00",
    eventLocation: {
      name: "a16z",
      streetAddress: "180 Townsend St",
      addressLocality: "San Francisco",
      postalCode: "94107",
      addressRegion: "CA",
      addressCountry: "US",
    },
    organizers: [
      {
        type: "Organization",
        name: "a16z",
        url: "https://a16z.com",
      },
      {
        type: "Organization",
        name: "Upstash",
        url: "https://upstash.com",
      },
      {
        type: "Organization",
        name: "Firecrawl",
        url: "https://firecrawl.dev",
      },
    ],
  },
];
