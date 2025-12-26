export interface Technology {
  name: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: "active" | "completed" | "archived" | "inactive";
  category: "web" | "mobile" | "api" | "tool" | "game" | "other" | "saas";
}

export const projects: ProjectItem[] = [
  {
    name: "Notra",
    description: "WIP: Content Engine",
    technologies: [{ name: "Next.js" }, { name: "TypeScript" }],
    liveUrl: "https://usenotra.com/",
    image: "/images/notra.webp",
    status: "active",
    category: "saas",
  },
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
    status: "inactive",
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
    status: "inactive",
    category: "tool",
  },
];
