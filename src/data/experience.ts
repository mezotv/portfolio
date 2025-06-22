export interface Skill {
  name: string;
}

export interface Position {
  role: string;
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

export interface ExperienceItem {
  company: string;
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
    company: "RSU GmbH - E-Commerce",
    location: "Ulm, Baden-Württemberg, Germany",
    currentPosition: {
      role: "Software Engineer",
      type: "Co-op",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-07-31"),
      location: "Ulm, Baden-Württemberg, Germany"
    },
    promotions: [
      {
        role: "Software Engineer",
        type: "Internship",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-09-30"),
        location: "Ulm, Baden-Württemberg, Deutschland"
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