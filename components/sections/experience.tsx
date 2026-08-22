import { cacheLife, cacheTag } from "next/cache";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type ExperienceItem,
  experiences,
  type Position,
} from "@/utils/data/experience";

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function calculateDuration(
  startDate: Date,
  endDate: Date | "present",
  now: Date
): string {
  const start = new Date(startDate);
  const end = endDate === "present" ? now : new Date(endDate);

  const diffInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""}`;
  }

  const diffInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();

  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;

  if (years === 0) {
    return `${months} mo${months !== 1 ? "s" : ""}`;
  }
  if (months === 0) {
    return `${years} yr${years !== 1 ? "s" : ""}`;
  }
  return `${years} yr${years !== 1 ? "s" : ""} ${months} mo${
    months !== 1 ? "s" : ""
  }`;
}

interface ProcessedPosition {
  role: string;
  type: string;
  location: string;
  note?: string;
  duration: string;
  formattedStartDate: string;
  endDateText: string;
  isOngoing: boolean;
  showPresent: boolean;
}

interface ProcessedExperience {
  company: string;
  companyUrl?: string;
  logo?: string;
  category: ExperienceItem["category"];
  note?: string;
  skills: { name: string }[];
  currentPosition: ProcessedPosition;
  promotions: ProcessedPosition[];
  totalDuration: string;
}

function processPosition(
  position: Position,
  note: string | undefined,
  isEducation: boolean,
  now: Date
): ProcessedPosition {
  const duration = calculateDuration(position.startDate, position.endDate, now);
  const isOngoing =
    position.endDate === "present" ||
    (position.endDate instanceof Date &&
      position.endDate > now &&
      position.startDate <= now);
  const showPresent = isOngoing && !isEducation;

  let endDateText: string;
  if (position.endDate === "present") {
    endDateText = "Present";
  } else if (showPresent) {
    endDateText = "Current";
  } else {
    endDateText = formatDate(position.endDate as Date);
  }

  return {
    role: position.role,
    type: position.type,
    location: position.location,
    note,
    duration,
    formattedStartDate: formatDate(position.startDate),
    endDateText,
    isOngoing,
    showPresent,
  };
}

function calculateTotalCompanyDuration(
  experience: ExperienceItem,
  now: Date
): string {
  let earliestStart = experience.currentPosition.startDate;
  let latestEnd = experience.currentPosition.endDate;

  if (experience.promotions && experience.promotions.length > 0) {
    for (const position of experience.promotions) {
      if (position.startDate < earliestStart) {
        earliestStart = position.startDate;
      }
      if (
        position.endDate !== "present" &&
        latestEnd !== "present" &&
        position.endDate > (latestEnd as Date)
      ) {
        latestEnd = position.endDate;
      }
    }
  }

  return calculateDuration(earliestStart, latestEnd, now);
}

function getLatestEndDate(experience: ExperienceItem, now: Date): Date {
  let latestEnd = experience.currentPosition.endDate;

  if (experience.promotions && experience.promotions.length > 0) {
    for (const position of experience.promotions) {
      const isPromotionNewer =
        position.endDate !== "present" &&
        latestEnd !== "present" &&
        position.endDate > (latestEnd as Date);

      if (isPromotionNewer) {
        latestEnd = position.endDate;
      }
    }
  }

  return latestEnd === "present" ? now : (latestEnd as Date);
}

function sortByEndDate(items: ExperienceItem[], now: Date): ExperienceItem[] {
  return [...items].sort((a, b) => {
    const endDateA = getLatestEndDate(a, now);
    const endDateB = getLatestEndDate(b, now);
    return endDateB.getTime() - endDateA.getTime();
  });
}

// biome-ignore lint/suspicious/useAwait: "use cache" requires async; computation is synchronous
async function getProcessedExperience(): Promise<{
  work: ProcessedExperience[];
  education: ProcessedExperience[];
}> {
  "use cache";
  cacheLife("hours");
  cacheTag("experience");

  const now = new Date();

  const process = (item: ExperienceItem): ProcessedExperience => {
    const isEducation = item.category === "education";
    return {
      company: item.company,
      companyUrl: item.companyUrl,
      logo: item.logo,
      category: item.category,
      note: item.note,
      skills: item.skills,
      currentPosition: processPosition(
        item.currentPosition,
        item.note,
        isEducation,
        now
      ),
      promotions:
        item.promotions?.map((p) =>
          processPosition(p, undefined, isEducation, now)
        ) ?? [],
      totalDuration: calculateTotalCompanyDuration(item, now),
    };
  };

  const workExperience = experiences.filter((exp) => exp.category === "work");
  const education = experiences.filter((exp) => exp.category === "education");

  return {
    work: sortByEndDate(workExperience, now).map(process),
    education: sortByEndDate(education, now).map(process),
  };
}

function PositionCard({ position }: { position: ProcessedPosition }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <h4 className="font-semibold text-base">{position.role}</h4>
        <span className="text-muted-foreground text-sm">{position.type}</span>
      </div>
      <div className="text-muted-foreground text-sm">
        {position.formattedStartDate} - {position.endDateText}
        {position.duration !== "1 mo" && ` · ${position.duration}`}
      </div>
      <span className="text-muted-foreground text-sm">{position.location}</span>
      {position.note && (
        <span className="mt-1 text-foreground text-sm">{position.note}</span>
      )}
    </div>
  );
}

function SkillsList({ skills }: { skills: { name: string }[] }) {
  if (skills.length === 0) {
    return null;
  }

  const skillCount = skills.length;
  const displaySkills = skills.slice(0, 2);
  const remainingCount = skillCount - 2;
  const allSkills = skills.map((skill) => skill.name).join(", ");

  return (
    <div className="mt-2 font-medium text-sm">
      {displaySkills.map((skill) => skill.name).join(", ")}
      {remainingCount > 0 && (
        <>
          <span> </span>
          <Tooltip>
            <TooltipTrigger className="group relative cursor-help before:absolute before:-inset-x-1.5 before:-inset-y-2 before:content-['']">
              <span className="underline decoration-dotted underline-offset-2 transition-colors group-hover:text-primary group-hover:decoration-solid">
                {`and +${remainingCount} skill${remainingCount !== 1 ? "s" : ""}`}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-48 text-xs">{allSkills}</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  );
}

function ExperienceSection({
  title,
  items,
}: {
  title: string;
  items: ProcessedExperience[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex flex-col gap-8">
        {items.map((experience) => {
          const isEducation = experience.category === "education";

          return (
            <div className="flex gap-4" key={experience.company}>
              <Avatar className="h-12 w-12" size="lg">
                {experience.logo && (
                  <AvatarImage alt={experience.company} src={experience.logo} />
                )}
                <AvatarFallback>{experience.company.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex grow flex-col">
                <div className="mb-2 flex flex-col">
                  <h2 className="font-semibold text-lg">
                    {experience.companyUrl ? (
                      <a
                        className="underline decoration-transparent transition-colors hover:text-primary hover:decoration-current"
                        href={experience.companyUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {experience.company}
                      </a>
                    ) : (
                      experience.company
                    )}
                  </h2>
                  {!isEducation && (
                    <span className="text-muted-foreground text-sm">
                      {experience.totalDuration} ·{" "}
                      {experience.currentPosition.type}
                    </span>
                  )}
                </div>

                {experience.promotions.length > 0 ? (
                  <div className="relative flex flex-col">
                    <div className="absolute top-2 bottom-2 left-[5px] w-[2px] bg-border" />

                    <div className="relative flex gap-4">
                      <div className="relative flex h-full w-3 items-center justify-center">
                        <div className="z-10 h-3 w-3 rounded-full bg-foreground/80" />
                      </div>
                      <div className="grow pt-1">
                        <PositionCard position={experience.currentPosition} />
                        <SkillsList skills={experience.skills} />
                      </div>
                    </div>

                    {experience.promotions.map((position) => (
                      <div
                        className="relative mt-6 flex gap-4"
                        key={`${experience.company}-${position.role}`}
                      >
                        <div className="relative flex h-full w-3 items-center justify-center">
                          <div className="z-10 h-2 w-2 rounded-full bg-foreground/30" />
                        </div>
                        <div className="grow pt-1">
                          <PositionCard position={position} />
                          <SkillsList skills={experience.skills} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <PositionCard position={experience.currentPosition} />
                    <SkillsList skills={experience.skills} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function Experience() {
  const { work, education } = await getProcessedExperience();

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <ExperienceSection items={work} title="Work" />
      <ExperienceSection items={education} title="Education" />
    </div>
  );
}
