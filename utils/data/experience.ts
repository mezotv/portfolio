export interface Skill {
  name: string;
}

export type PositionType =
  | "Co-op"
  | "Internship"
  | "Part-time"
  | "Full-time"
  | "Self-Employed"
  | "Contract";

export interface Position {
  endDate: Date | "present";
  location: string;
  role: string;
  startDate: Date;
  type: PositionType;
}

export interface ExperienceItem {
  category: "work" | "education";
  company: string;
  companyUrl?: string;
  currentPosition: Position;
  location: string;
  logo?: string;
  note?: string;
  promotions?: Position[];
  skills: Skill[];
}

export const experiences: ExperienceItem[] = [
  {
    category: "work",
    company: "Databricks (Neon)",
    companyUrl: "https://neon.com/",
    currentPosition: {
      endDate: "present",
      location: "Remote",
      role: "DX Engineer",
      startDate: new Date("2026-01-15"),
      type: "Contract",
    },
    location: "Remote",
    logo: "/images/databricks.svg",
    skills: [{ name: "v0" }, { name: "Next.js" }, { name: "TailwindCSS" }],
  },
  {
    category: "work",
    company: "RentMyHeader",
    companyUrl: "https://rentmyheader.com/",
    currentPosition: {
      endDate: new Date("2026-03-31"),
      location: "Remote",
      role: "Software Engineer",
      startDate: new Date("2025-11-28"),
      type: "Contract",
    },
    location: "Remote",
    logo: "/images/rentmyheader.svg",
    skills: [{ name: "TypeScript" }, { name: "Next.js" }, { name: "Drizzle" }],
  },
  {
    category: "work",
    company: "Rivo",
    companyUrl: "https://rivo.gg/",
    currentPosition: {
      endDate: "present",
      location: "Riedlingen, Baden-Württemberg, Germany",
      role: "Founder & Lead Developer",
      startDate: new Date("2023-02-01"),
      type: "Self-Employed",
    },
    location: "Riedlingen, Baden-Württemberg, Germany",
    logo: "/images/rivo.webp",
    skills: [
      { name: "TypeScript" },
      { name: "GoLang" },
      { name: "SEO" },
      { name: "PostgreSQL" },
    ],
  },
  {
    category: "work",
    company: "Orchid (P25)",
    companyUrl: "https://orchid.ai/",
    currentPosition: {
      endDate: new Date("2025-08-17"),
      location: "Remote, Germany",
      role: "Discord Community Manager",
      startDate: new Date("2025-07-17"),
      type: "Contract",
    },
    location: "Remote, Germany",
    logo: "/images/orchid.webp",
    skills: [
      { name: "Discord" },
      { name: "Community" },
      { name: "Management" },
    ],
  },
  {
    category: "work",
    company: "RSU GmbH - E-Commerce",
    companyUrl: "https://www.rsu.de",
    currentPosition: {
      endDate: new Date("2025-08-19"),
      location: "Ulm, Baden-Württemberg, Germany",
      role: "Software Engineer",
      startDate: new Date("2024-10-01"),
      type: "Co-op",
    },
    location: "Ulm, Baden-Württemberg, Germany",
    logo: "/images/RSU.webp",
    promotions: [
      {
        endDate: new Date("2024-10-01"),
        location: "Riedlingen, Baden-Württemberg, Germany",
        role: "Software Engineer",
        startDate: new Date("2024-09-01"),
        type: "Internship",
      },
    ],
    skills: [{ name: "Git" }, { name: "Angular" }, { name: "Laravel" }],
  },
  {
    category: "work",
    company: "Koch - Bautechnik Energieberatung",
    companyUrl: "https://www.koch-bautechnik.de/",
    currentPosition: {
      endDate: "present",
      location: "Riedlingen, Baden-Württemberg, Germany",
      role: "Office Assistant",
      startDate: new Date("2021-08-01"),
      type: "Part-time",
    },
    location: "Riedlingen, Baden-Württemberg, Germany",
    logo: "/images/koch-bautechnik.webp",
    skills: [{ name: "Adobe Photoshop" }, { name: "Adobe XD" }],
  },
  {
    category: "work",
    company: "BFG MEDIA GROUP®",
    companyUrl: "https://www.bfg-mediagroup.com/",
    currentPosition: {
      endDate: new Date("2020-11-06"),
      location: "Aulendorf, Baden-Württemberg, Germany",
      role: "Digital Marketing",
      startDate: new Date("2020-11-02"),
      type: "Internship",
    },
    location: "Aulendorf, Baden-Württemberg, Germany",
    logo: "/images/BFG.webp",
    skills: [
      { name: "Adobe Lightroom" },
      { name: "Adobe Premiere Pro" },
      { name: "Adobe Photoshop" },
    ],
  },
  {
    category: "education",
    company: "Baden-Wuerttemberg Cooperative State University Heidenheim",
    currentPosition: {
      endDate: new Date("2025-08-11"),
      location: "Heidenheim, Baden-Württemberg, Germany",
      role: "Bachelor of Science - BS, Computer Science",
      startDate: new Date("2024-10-01"),
      type: "Full-time",
    },
    location: "Heidenheim, Baden-Württemberg, Germany",
    logo: "/images/DHBW.webp",
    note: "Dropped Out",
    skills: [],
  },
  {
    category: "education",
    company: "Kaufmännische Schule Ehingen",
    currentPosition: {
      endDate: new Date("2024-07-31"),
      location: "Ehingen, Baden-Württemberg, Germany",
      role: "Fachhochschulreife, Foreign Languages",
      startDate: new Date("2022-09-01"),
      type: "Full-time",
    },
    location: "Ehingen, Baden-Württemberg, Germany",
    logo: "/images/KSE.webp",
    note: "Grade: 2.9",
    skills: [],
  },
  {
    category: "education",
    company: "Geschwister-Scholl-Realschule Riedlingen",
    currentPosition: {
      endDate: new Date("2022-07-31"),
      location: "Riedlingen, Baden-Württemberg, Germany",
      role: "Middle School Diploma",
      startDate: new Date("2016-09-01"),
      type: "Full-time",
    },
    location: "Riedlingen, Baden-Württemberg, Germany",
    logo: "/images/GSR.webp",
    skills: [{ name: "Englisch" }, { name: "German" }],
  },
];
