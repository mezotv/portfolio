import type { EventItem } from "@/types/event";

export const events: EventItem[] = [
  {
    date: "January 22, 2026",
    description:
      "An evening of building, shipping, and networking. Lightning talks, hands-on mini-hackathon with v0, AI models, and edge functions.",
    endDate: "2026-01-22T20:00:00+01:00",
    eventLocation: {
      addressCountry: "DE",
      addressLocality: "Munich",
      addressRegion: "Bavaria",
      name: "Netlight Consulting",
      postalCode: "80333",
      streetAddress: "Prannerstraße 4",
    },
    image: "/images/events/vercel-munich-2026.webp",
    location: "Munich, Germany",
    lumaEventId: "evt-t82Utu2HPEFxUB3",
    name: "Vercel Munich Meetup & Mini-Hackathon",
    organizers: [
      {
        name: "Vercel",
        type: "Organization",
        url: "https://vercel.com",
      },
      {
        name: "Dominik Koch",
        type: "Person",
        url: "https://dominikkoch.dev",
      },
      {
        name: "Gabby Shires",
        type: "Person",
        url: "https://x.com/gabbyshires",
      },
    ],
    startDate: "2026-01-22T17:00:00+01:00",
    time: "5:00 PM - 8:00 PM",
  },
  {
    date: "April 30, 2026",
    description:
      "We're hosting a happy hour to bring together the best engineers and builders after Stripe Sessions. Join us in Vercel's new office to grab a drink, meet some great people, and see a few lightning demos from teams doing interesting work in AI.",
    endDate: "2026-04-30T20:30:00-07:00",
    eventLocation: {
      addressCountry: "US",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      name: "Vercel",
      postalCode: "94105",
      streetAddress: "201 Mission St suite 300",
    },
    image: "/images/events/happy-hour-sf-2026.webp",
    location: "San Francisco, CA",
    lumaEventId: "yxkys279",
    name: "Stripe Sessions Happy Hour",
    organizers: [
      {
        name: "Neon",
        type: "Organization",
        url: "https://neon.tech",
      },
      {
        name: "Vercel",
        type: "Organization",
        url: "https://vercel.com",
      },
    ],
    startDate: "2026-04-30T17:00:00-07:00",
    time: "5:00 PM - 8:30 PM PDT",
  },
  {
    date: "November 3, 2025",
    description:
      "Join us for an evening of conversation about Context7, Upstash, Firecrawl, and whatever you're building with AI. Enjoy light bites, connect with fellow builders, and bring your hottest technical takes.",
    endDate: "2025-11-03T20:30:00-08:00",
    eventLocation: {
      addressCountry: "US",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      name: "a16z",
      postalCode: "94107",
      streetAddress: "180 Townsend St",
    },
    image: "/images/events/ai-night-sf-2025.webp",
    location: "San Francisco, CA",
    lumaEventId: "3laost30",
    name: "a16z x Upstash x Firecrawl AI Night",
    organizers: [
      {
        name: "a16z",
        type: "Organization",
        url: "https://a16z.com",
      },
      {
        name: "Upstash",
        type: "Organization",
        url: "https://upstash.com",
      },
      {
        name: "Firecrawl",
        type: "Organization",
        url: "https://firecrawl.dev",
      },
    ],
    startDate: "2025-11-03T17:30:00-08:00",
    time: "5:30 PM - 8:30 PM PST",
  },
];
