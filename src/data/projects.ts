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
  status: 'active' | 'completed' | 'archived';
  category: 'web' | 'mobile' | 'api' | 'tool' | 'game' | 'other';
}

export const projects: ProjectItem[] = [
  {
    name: "Would You Bot",
    description: "Interactive Discord bot providing engaging 'Would You Rather' questions and community features.",
    technologies: [
      { name: "Node.js" },
      { name: "Discord.js" },
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Docker" }
    ],
    liveUrl: "https://wouldyoubot.gg/",
    image: "/images/wouldyoubot.webp",
    status: 'active',
    category: 'tool'
  },
]; 