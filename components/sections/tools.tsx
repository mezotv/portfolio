import Image from "next/image";

interface ToolProps {
  name: string;
  icon: string;
}

interface ToolGroupProps {
  title: string;
  tools: ToolProps[];
}

const toolGroups: ToolGroupProps[] = [
  {
    title: "Frontend",
    tools: [
      { name: "React", icon: "/tools/react.svg" },
      { name: "Next.js", icon: "/tools/nextjs_icon.svg" },
      { name: "TailwindCSS", icon: "/tools/tailwindcss.svg" },
    ],
  },
  {
    title: "Backend & Infrastructure",
    tools: [
      { name: "Node.js", icon: "/tools/nodejs.svg" },
      { name: "Bun", icon: "/tools/bun.svg" },
      { name: "PostgreSQL", icon: "/tools/postgresql.svg" },
      { name: "Hono", icon: "/tools/hono.svg" },
      { name: "Neon", icon: "/tools/neon.svg" },
      { name: "Drizzle", icon: "/tools/drizzle-orm.svg" },
    ],
  },
  {
    title: "Development Tools",
    tools: [
      { name: "Docker", icon: "/tools/docker.svg" },
      { name: "Vitest", icon: "/tools/vitest.svg" },
      { name: "PostHog", icon: "/tools/posthog.svg" },
      { name: "Upstash", icon: "/tools/upstash.svg" },
    ],
  },
];

function ToolCard({ name, icon }: ToolProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center">
        <Image alt={name} height={32} loading="eager" src={icon} width={32} />
      </div>
      <span className="text-muted-foreground text-xs">{name}</span>
    </div>
  );
}

export function Tools() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      {toolGroups.map((group) => (
        <div className="flex flex-col gap-6" key={group.title}>
          <h2 className="font-bold text-2xl">{group.title}</h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
            {group.tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
