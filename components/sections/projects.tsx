import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  type ProjectItem,
  projects,
  statusConfig,
} from "@/utils/data/projects";

function _formatDate(date: Date) {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function TechnologiesList({
  technologies,
}: {
  technologies: { name: string }[];
}) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {technologies.map((tech) => (
        <span
          className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground text-xs"
          key={tech.name}
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({
  githubUrl,
  liveUrl,
}: {
  githubUrl?: string;
  liveUrl?: string;
}) {
  if (!(githubUrl || liveUrl)) {
    return null;
  }

  return (
    <div className="mt-2 flex gap-2">
      {githubUrl && (
        <a
          className="flex items-center gap-1 text-primary text-sm hover:underline"
          href={githubUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            aria-label="GitHub"
            className="h-4 w-4"
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      )}
      {liveUrl && (
        <a
          className="flex items-center gap-1 text-foreground text-sm hover:underline"
          href={liveUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            aria-label="Live demo"
            className="h-4 w-4"
            fill="none"
            role="img"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Live Demo
        </a>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectItem["status"] }) {
  const config = statusConfig[status.type];
  const label = status.label ?? config.label;

  return (
    <span
      className={`rounded-md px-2 py-1 font-medium text-xs ${config.className}`}
    >
      {label}
    </span>
  );
}

function ProjectSection({
  title,
  items,
}: {
  title: string;
  items: ProjectItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex flex-col gap-8">
        {items.map((project) => (
          <div className="flex gap-4" key={project.name}>
            <Avatar className="h-12 w-12" size="lg">
              {project.image && (
                <AvatarImage alt={project.name} src={project.image} />
              )}
              <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex grow flex-col">
              <div className="flex flex-col">
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="font-semibold text-lg">{project.name}</h2>
                  <StatusBadge status={project.status} />
                </div>
              </div>

              <p className="mb-2 text-muted-foreground text-sm">
                {project.description}
              </p>

              <TechnologiesList technologies={project.technologies} />
              <ProjectLinks
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const activeProjects = projects.filter(
    (project) => project.status.type === "active"
  );
  const completedProjects = projects.filter(
    (project) => project.status.type === "completed"
  );
  const inactiveProjects = projects.filter(
    (project) => project.status.type === "inactive"
  );
  const archivedProjects = projects.filter(
    (project) => project.status.type === "archived"
  );

  const allActiveAndCompleted = [
    ...activeProjects,
    ...completedProjects,
    ...inactiveProjects,
  ];

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <ProjectSection items={allActiveAndCompleted} title="Projects" />
      {archivedProjects.length > 0 && (
        <ProjectSection items={archivedProjects} title="Archived" />
      )}
    </div>
  );
}
