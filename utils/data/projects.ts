export interface Technology {
  name: string;
}

export const statusConfig = {
  active: {
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    label: "Active",
  },
  archived: {
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    label: "Archived",
  },
  completed: {
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    label: "Completed",
  },
  inactive: {
    className: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    label: "Inactive",
  },
} as const;

export type StatusType = keyof typeof statusConfig;

export interface ProjectStatus {
  label?: string;
  type: StatusType;
}

export interface ProjectItem {
  category: "web" | "mobile" | "api" | "tool" | "game" | "other" | "saas";
  description: string;
  githubUrl?: string;
  image?: string;
  liveUrl?: string;
  name: string;
  status: ProjectStatus;
  technologies: Technology[];
}

export const projects: ProjectItem[] = [
  {
    category: "saas",
    description: "Notra is a content engine you turns your work into content.",
    image: "/images/notra.svg",
    liveUrl: "https://www.usenotra.com/",
    name: "Notra",
    status: {
      type: "active",
    },
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Drizzle" },
    ],
  },
  {
    category: "saas",
    description:
      "A modern, open-source headless CMS designed for blogs and content management, built with TypeScript and Nextjs.",
    image: "/images/marble.webp",
    liveUrl: "https://marblecms.com/",
    name: "Marble",
    status: {
      label: "Past Maintainer",
      type: "inactive",
    },
    technologies: [
      { name: "Next.js" },
      { name: "Postgres" },
      { name: "TypeScript" },
      { name: "Prisma" },
      { name: "Upstash" },
    ],
  },
  {
    category: "tool",
    description:
      "Interactive Discord bot providing engaging 'Would You Rather' questions and community features.",
    image: "/images/wouldyoubot.webp",
    liveUrl: "https://wouldyoubot.gg/",
    name: "Would You Bot",
    status: {
      type: "active",
    },
    technologies: [
      { name: "Node.js" },
      { name: "Discord.js" },
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Docker" },
    ],
  },
];
