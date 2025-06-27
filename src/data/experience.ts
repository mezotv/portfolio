export interface Skill {
  name: string;
}

export type PositionType = "Co-op" | "Internship" | "Part-time" | "Full-time" | "Self-Employed";

export interface Position {
  role: string;
  type: PositionType;
  startDate: Date;
  endDate: Date | "present";
  location: string;
}

export interface ExperienceItem {
  company: string;
  companyUrl?: string;
  location: string;
  skills: Skill[];
  logo?: string;
  currentPosition: Position;
  promotions?: Position[];
  category: 'work' | 'education';
  grade?: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Rivo",
    companyUrl: "https://rivo.gg/",
    location: "Riedlingen, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Founder & Lead Developer",
        type: "Self-Employed",
        startDate: new Date("2023-02-01"),
        endDate: "present",
        location: "Riedlingen, Baden-Württemberg, Germany",
    },
    skills: [
      { name: "TypeScript" },
      { name: "GoLang" },
      { name: "SEO" },
      { name: "PostgreSQL" },
    ],
    logo: "/images/rivo.webp",
    category: 'work'
  },
  {
    company: "RSU GmbH - E-Commerce",
    companyUrl: "https://www.rsu.de",
    location: "Ulm, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Software Engineer",
      type: "Co-op",
      startDate: new Date("2024-10-01"),
      endDate: "present",
      location: "Ulm, Baden-Württemberg, Germany"
    },
    promotions: [
      {
        role: "Software Engineer",
        type: "Internship",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-10-01"),
        location: "Riedlingen, Baden-Württemberg, Germany",
      }
    ],
    skills: [
      { name: "Git" },
      { name: "Angular" },
      { name: "Laravel" }
    ],
    logo: "/images/RSU.webp",
    category: 'work'
  },
  {
    company: "Koch - Bautechnik Energieberatung",
    companyUrl: "https://www.koch-bautechnik.de/",
    location: "Riedlingen, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Office Assistant",
        type: "Part-time",
        startDate: new Date("2021-08-01"),
        endDate: "present",
        location: "Riedlingen, Baden-Württemberg, Germany",
    },
    skills: [
      { name: "Adobe Photoshop" },
      { name: "Adobe XD" },
    ],
    logo: "/images/koch-bautechnik.webp",
    category: 'work'
  },
  {
    company: "BFG MEDIA GROUP®",
    companyUrl: "https://www.bfg-mediagroup.com/",
    location: "Aulendorf, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Digital Marketing",
        type: "Internship",
        startDate: new Date("2020-11-02"),
        endDate: new Date("2020-11-06"),
        location: "Aulendorf, Baden-Württemberg, Germany",
    },
    skills: [
      { name: "Adobe Lightroom" },
      { name: "Adobe Premiere Pro" },
      { name: "Adobe Photoshop" },
    ],
    logo: "/images/BFG.webp",
    category: 'work'
  },
  {
    company: "Baden-Wuerttemberg Cooperative State University Heidenheim",
    location: "Heidenheim, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Bachelor of Science - BS, Computer Science",
      type: "Full-time",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2027-12-31"),
      location: "Heidenheim, Baden-Württemberg, Germany"
    },
    skills: [],
    logo: "/images/DHBW.webp",
    category: 'education'
  },
  {
    company: "Kaufmännische Schule Ehingen",
    location: "Ehingen, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Fachhochschulreife, Foreign Languages",
      type: "Full-time",
      startDate: new Date("2022-09-01"),
      endDate: new Date("2024-07-31"),
      location: "Ehingen, Baden-Württemberg, Germany"
    },
    skills: [],
    logo: "/images/KSE.webp",
    category: 'education',
    grade: "2.9"
  },
  {
    company: "Geschwister-Scholl-Realschule Riedlingen",
    location: "Riedlingen, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Middle School Diploma",
      type: "Full-time",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2022-07-31"),
      location: "Riedlingen, Baden-Württemberg, Germany"
    },
    skills: [
      { name: "Englisch" },
      { name: "Deutsch" }
    ],
    logo: "/images/GSR.webp",
    category: 'education'
  }
]; 