export interface EventItem {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  lumaEventId: string;
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
  },
];
