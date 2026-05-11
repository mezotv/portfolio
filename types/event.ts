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
