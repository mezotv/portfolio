export interface EventLocation {
  addressCountry: string;
  addressLocality: string;
  addressRegion?: string;
  name?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface EventOrganizer {
  name: string;
  type: "Person" | "Organization";
  url?: string;
}

export interface EventItem {
  date: string;
  description: string;
  endDate?: string;
  eventLocation?: EventLocation;
  image?: string;
  location: string;
  lumaEventId: string;
  name: string;
  organizers?: EventOrganizer[];
  startDate: string;
  time: string;
}
