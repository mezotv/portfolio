export interface Technology {
  name: string;
}

export const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
} as const;

export type StatusType = keyof typeof statusConfig;

export interface ProjectStatus {
  type: StatusType;
  label?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: ProjectStatus;
  category: "web" | "mobile" | "api" | "tool" | "game" | "other" | "saas";
}

export const projects: ProjectItem[] = [
  /* 
  {
    name: "Notra",
    description: "WIP: Content Engine",
    technologies: [{ name: "Next.js" }, { name: "TypeScript" }],
    liveUrl: "https://usenotra.com/",
    image: undefined,
    status: {
      type: "active",
    },
    category: "saas",
  },
  */
  {
    name: "Marble",
    description:
      "A modern, open-source headless CMS designed for blogs and content management, built with TypeScript and Nextjs.",
    technologies: [
      { name: "Next.js" },
      { name: "Postgres" },
      { name: "TypeScript" },
      { name: "Prisma" },
      { name: "Upstash" },
    ],
    liveUrl: "https://marblecms.com/",
    image: "/images/marble.webp",
    status: {
      type: "inactive",
      label: "Past Maintainer",
    },
    category: "saas",
  },
  {
    name: "Would You Bot",
    description:
      "Interactive Discord bot providing engaging 'Would You Rather' questions and community features.",
    technologies: [
      { name: "Node.js" },
      { name: "Discord.js" },
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Docker" },
    ],
    liveUrl: "https://wouldyoubot.gg/",
    image: "/images/wouldyoubot.webp",
    status: {
      type: "active",
      label: "On Hold",
    },
    category: "tool",
  },
];
