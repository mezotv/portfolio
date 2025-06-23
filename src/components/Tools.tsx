import { useTranslations } from '@/i18n/utils';

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
      { name: "React", icon: "/stack/react.svg" },
      { name: "Next.js", icon: "/stack/nextjs_icon.svg" },
      { name: "TailwindCSS", icon: "/stack/tailwindcss.svg" },
    ],
  },
  {
    title: "Backend & Infrastructure",
    tools: [
      { name: "Node.js", icon: "/stack/nodejs.svg" },
      { name: "Bun", icon: "/stack/bun.svg" },
      { name: "PostgreSQL", icon: "/stack/postgresql.svg" },
      { name: "Hono", icon: "/stack/hono.svg" },
    ],
  },
  {
    title: "Development Tools",
    tools: [
      { name: "Docker", icon: "/stack/docker.svg" },
      { name: "Vitest", icon: "/stack/vitest.svg" },
      { name: "PostHog", icon: "/stack/posthog.svg" },
      { name: "Upstash", icon: "/stack/upstash.svg" },
    ],
  },
];

function ToolCard({ name, icon }: ToolProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-lg">
      <div className="w-12 h-12">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
}

export function Tools({ lang = 'en' }: { lang?: string }) {
  const t = useTranslations(lang as 'en' | 'de');
  
  const getTranslatedTitle = (title: string) => {
    switch (title) {
      case 'Frontend':
        return t('tools.frontend');
      case 'Backend & Infrastructure':
        return t('tools.backend');
      case 'Development Tools':
        return t('tools.devtools');
      default:
        return title;
    }
  };

  return (
    <div className="space-y-12">
      {toolGroups.map((group) => (
        <div key={group.title} className="space-y-6">
          <h2 className="text-2xl font-bold">{getTranslatedTitle(group.title)}</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {group.tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 