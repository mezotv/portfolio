import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogPosts } from "@/lib/marble/queries";
import { events } from "@/utils/data/events";
import { projects, statusConfig } from "@/utils/data/projects";

function SectionHeader({
  title,
  href,
  linkText,
}: {
  title: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-xl">{title}</h2>
      <Link
        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
        href={href}
      >
        {linkText} &rarr;
      </Link>
    </div>
  );
}

function ProjectPreview() {
  const previewProjects = projects.slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader href="/projects" linkText="View all" title="Projects" />
      <div className="flex flex-col gap-4">
        {previewProjects.map((project) => {
          const config = statusConfig[project.status.type];
          const label = project.status.label ?? config.label;
          const href = project.liveUrl ?? project.githubUrl;

          return (
            <a
              className="group -mx-2 flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
              href={href}
              key={project.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Avatar className="h-10 w-10">
                {project.image && (
                  <AvatarImage alt={project.name} src={project.image} />
                )}
                <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium group-hover:underline">
                    {project.name}
                  </h3>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-xs ${config.className}`}
                  >
                    {label}
                  </span>
                </div>
                <p className="truncate text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function EventPreview() {
  const upcomingEvents = events.slice(0, 1);

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">Events</h2>
      <div className="flex flex-col gap-4">
        {upcomingEvents.map((event) => (
          <a
            className="-mx-2 flex cursor-pointer flex-col gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
            href={`https://lu.ma/event/${event.lumaEventId}?utm_source=dominikkoch.dev`}
            key={event.name}
            target="_blank"
          >
            <div className="flex items-start gap-3">
              {event.image ? (
                <Image
                  alt={event.name}
                  className="rounded-md object-cover"
                  height={80}
                  src={event.image}
                  width={80}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted font-medium text-xl">
                  {event.name.charAt(0)}
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="font-medium">{event.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {event.date} &middot; {event.time}
                </p>
                <p className="text-muted-foreground text-sm">
                  {event.location}
                </p>
              </div>
            </div>
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {event.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

async function BlogPreview() {
  const posts = await getBlogPosts();
  const previewPosts = posts.slice(0, 2);

  if (previewPosts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader href="/blog" linkText="Read more" title="Blog" />
      <div className="flex flex-col gap-3">
        {previewPosts.map((post) => {
          const publishDate = new Date(post.publishedAt);
          const formattedDate = publishDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              className="group flex flex-col gap-1 rounded-md transition-colors"
              href={`/blog/${post.slug}`}
              key={post.id}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium group-hover:underline">
                  {post.title}
                </h3>
                <time className="shrink-0 text-muted-foreground text-sm">
                  {formattedDate}
                </time>
              </div>
              <p className="line-clamp-1 text-muted-foreground text-sm">
                {post.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">About</h1>
        <p className="text-muted-foreground">
          Software Engineer focused on building SaaS products and developer
          tools. I enjoy security research, contributing to open source, and
          organizing tech meetups. Notable contributions include a{" "}
          <a
            className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            href="https://github.com/Dokploy/dokploy/security/advisories/GHSA-h67g-mpq5-6ph5"
            rel="noopener noreferrer"
            target="_blank"
          >
            critical security vulnerability in Dokploy
          </a>{" "}
          and PRs to{" "}
          <a
            className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            href="https://github.com/shadcn-ui/ui/pull/9044"
            rel="noopener noreferrer"
            target="_blank"
          >
            shadcn/ui
          </a>{" "}
          and{" "}
          <a
            className="text-foreground underline underline-offset-4 hover:text-foreground/80"
            href="https://github.com/47ng/nuqs/pull/1271"
            rel="noopener noreferrer"
            target="_blank"
          >
            Nuqs
          </a>
          .
        </p>
      </div>

      <EventPreview />
      <ProjectPreview />
      <BlogPreview />
    </div>
  );
}
