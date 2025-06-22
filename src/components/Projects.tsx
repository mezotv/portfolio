import { projects, type ProjectItem } from '../data/projects';

function formatDate(date: Date) {
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

function TechnologiesList({ technologies }: { technologies: { name: string }[] }) {
  if (technologies.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {technologies.map((tech, index) => (
        <span 
          key={index}
          className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ githubUrl, liveUrl }: { githubUrl?: string; liveUrl?: string }) {
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="flex gap-2 mt-2">
      {githubUrl && (
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      )}
      {liveUrl && (
        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </a>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectItem['status'] }) {
  const statusConfig = {
    active: { label: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    completed: { label: 'Completed', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    archived: { label: 'Archived', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md ${config.className}`}>
      {config.label}
    </span>
  );
}

function ProjectSection({ title, items }: { title: string; items: ProjectItem[] }) {
  if (items.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-col gap-8">
        {items.map((project, index) => {
          return (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-border bg-muted">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex flex-col mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {project.description}
                </p>

                <TechnologiesList technologies={project.technologies} />
                <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Projects() {
  const activeProjects = projects.filter(project => project.status === 'active');
  const completedProjects = projects.filter(project => project.status === 'completed');
  const archivedProjects = projects.filter(project => project.status === 'archived');

  const allActiveAndCompleted = [...activeProjects, ...completedProjects];

  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl">
      <ProjectSection title="Projects" items={allActiveAndCompleted} />
      {archivedProjects.length > 0 && (
        <ProjectSection title="Archived Projects" items={archivedProjects} />
      )}
    </div>
  );
} 