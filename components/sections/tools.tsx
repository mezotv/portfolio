import Image from "next/image";

interface ToolProps {
  icon: string;
  name: string;
}

interface ToolGroupProps {
  title: string;
  tools: ToolProps[];
}

const toolGroups: ToolGroupProps[] = [
  {
    title: "Frontend",
    tools: [
      { icon: "/tools/react.svg", name: "React" },
      { icon: "/tools/nextjs_icon.svg", name: "Next.js" },
      { icon: "/tools/tailwindcss.svg", name: "TailwindCSS" },
    ],
  },
  {
    title: "Backend & Infrastructure",
    tools: [
      { icon: "/tools/nodejs.svg", name: "Node.js" },
      { icon: "/tools/bun.svg", name: "Bun" },
      { icon: "/tools/postgresql.svg", name: "PostgreSQL" },
      { icon: "/tools/hono.svg", name: "Hono" },
      { icon: "/tools/neon.svg", name: "Neon" },
      { icon: "/tools/drizzle-orm.svg", name: "Drizzle" },
    ],
  },
  {
    title: "Development Tools",
    tools: [
      { icon: "/tools/docker.svg", name: "Docker" },
      { icon: "/tools/vitest.svg", name: "Vitest" },
      { icon: "/tools/posthog.svg", name: "PostHog" },
      { icon: "/tools/upstash.svg", name: "Upstash" },
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
