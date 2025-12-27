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

function formatDate(date: Date) {
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function calculateDuration(startDate: Date, endDate: Date | "present"): string {
  const start = new Date(startDate);
  const end = endDate === "present" ? new Date() : new Date(endDate);

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

function calculateTotalCompanyDuration(experience: ExperienceItem): string {
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

  return calculateDuration(earliestStart, latestEnd);
}

function getEndDateText(
  endDate: Date | "present",
  showPresent: boolean
): string {
  if (endDate === "present") {
    return "Present";
  }
  if (showPresent) {
    return "Current";
  }
  return formatDate(endDate as Date);
}

function PositionCard({
  position,
  note,
  isEducation,
}: {
  position: Position;
  note?: string;
  isEducation: boolean;
}) {
  const duration = calculateDuration(position.startDate, position.endDate);
  const now = new Date();
  const isOngoing =
    position.endDate === "present" ||
    (position.endDate instanceof Date &&
      position.endDate > now &&
      position.startDate <= now);
  const showPresent = isOngoing && !isEducation;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center">
        <h4 className="mr-2 font-semibold text-base">{position.role}</h4>
        <span className="text-muted-foreground text-sm">{position.type}</span>
      </div>
      <div className="text-muted-foreground text-sm">
        {formatDate(position.startDate)} -{" "}
        {getEndDateText(position.endDate, showPresent)}
        {duration !== "1 mo" && ` · ${duration}`}
      </div>
      <span className="text-muted-foreground text-sm">{position.location}</span>
      {note && <span className="mt-1 text-foreground text-sm">{note}</span>}
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
            <TooltipTrigger
              render={
                <span className="cursor-help underline decoration-dotted underline-offset-2">
                  {`and +${remainingCount} skill${remainingCount !== 1 ? "s" : ""}`}
                </span>
              }
            />
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
  items: ExperienceItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex flex-col gap-8">
        {items.map((experience) => {
          const duration = calculateTotalCompanyDuration(experience);
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
                      {duration} · {experience.currentPosition.type}
                    </span>
                  )}
                </div>

                {experience.promotions && experience.promotions.length > 0 ? (
                  <div className="relative flex flex-col">
                    <div className="absolute top-2 bottom-2 left-[5px] w-[2px] bg-border" />

                    <div className="relative flex gap-4">
                      <div className="relative flex h-full w-3 items-center justify-center">
                        <div className="z-10 h-3 w-3 rounded-full bg-foreground/80" />
                      </div>
                      <div className="grow pt-1">
                        <PositionCard
                          isEducation={isEducation}
                          note={experience.note}
                          position={experience.currentPosition}
                        />
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
                          <PositionCard
                            isEducation={isEducation}
                            position={position}
                          />
                          <SkillsList skills={experience.skills} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <PositionCard
                      isEducation={isEducation}
                      note={experience.note}
                      position={experience.currentPosition}
                    />
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

function getLatestEndDate(experience: ExperienceItem): Date {
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

  return latestEnd === "present" ? new Date() : (latestEnd as Date);
}

function sortByEndDate(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => {
    const endDateA = getLatestEndDate(a);
    const endDateB = getLatestEndDate(b);
    return endDateB.getTime() - endDateA.getTime();
  });
}

export function Experience() {
  const workExperience = experiences.filter((exp) => exp.category === "work");
  const education = experiences.filter((exp) => exp.category === "education");

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <ExperienceSection items={sortByEndDate(workExperience)} title="Work" />
      <ExperienceSection items={sortByEndDate(education)} title="Education" />
    </div>
  );
}
