import { experiences, type Position, type ExperienceItem, type PositionType } from '../data/experience';
import { useTranslations } from '@/i18n/utils';
import { experienceTranslations, generalTranslations, type ExperienceKey } from '../data/experienceTranslations';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function formatDate(date: Date) {
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

function translateLocation(location: string, lang: 'en' | 'de'): string {
  if (lang === 'de') {
    return location.replace(/Germany/g, 'Deutschland');
  }
  return location;
}

function translatePositionType(type: PositionType, lang: 'en' | 'de'): string {
  const typeKey = type.toLowerCase().replace('-', '-') as 'co-op' | 'internship' | 'part-time' | 'full-time';
  const translationKey = `experience.types.${typeKey}` as const;
  
  // Use a simple mapping for now since we can't access t() here
  const translations = {
    en: {
      'Co-op': 'Co-op',
      'Internship': 'Internship', 
      'Part-time': 'Part-time',
      'Full-time': 'Full-time',
      'Self-Employed': 'Self-Employed'
    },
    de: {
      'Co-op': 'Duales Studium',
      'Internship': 'Praktikum',
      'Part-time': 'Teilzeit', 
      'Full-time': 'Vollzeit',
      'Self-Employed': 'Selbstständig'
    }
  };
  
  return translations[lang][type] || type;
}

function calculateDuration(startDate: Date, endDate: Date | "present"): string {
  const start = new Date(startDate);
  const end = endDate === "present" ? new Date() : new Date(endDate);
  
  // Calculate total days first
  const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  
  // If less than 30 days, show days
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
  }
  
  // Otherwise calculate months and years
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  if (years === 0) {
    return `${months} mo${months !== 1 ? 's' : ''}`;
  } else if (months === 0) {
    return `${years} yr${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} yr${years !== 1 ? 's' : ''} ${months} mo${months !== 1 ? 's' : ''}`;
  }
}

function calculateTotalCompanyDuration(experience: ExperienceItem): string {
  // Find the earliest start date and latest end date across all positions
  let earliestStart = experience.currentPosition.startDate;
  let latestEnd = experience.currentPosition.endDate;
  
  if (experience.promotions && experience.promotions.length > 0) {
    experience.promotions.forEach(position => {
      if (position.startDate < earliestStart) {
        earliestStart = position.startDate;
      }
      if (position.endDate !== "present" && latestEnd !== "present") {
        if (position.endDate > (latestEnd as Date)) {
          latestEnd = position.endDate;
        }
      }
    });
  }
  
  return calculateDuration(earliestStart, latestEnd);
}

function PositionCard({ position, grade, isEducation, lang = 'en', experienceKey }: { position: Position; grade?: string; isEducation: boolean; lang?: string; experienceKey: ExperienceKey }) {
  const t = useTranslations(lang as 'en' | 'de');
  const duration = calculateDuration(position.startDate, position.endDate);
  const now = new Date();
  const isOngoing = position.endDate === "present" || (position.endDate instanceof Date && position.endDate > now && position.startDate <= now);
  const showPresent = isOngoing && !isEducation;

  // Get translated role and type
  const translatedExperience = experienceTranslations[experienceKey];
  const getTranslatedRole = (role: string) => {
    if (translatedExperience && translatedExperience[lang as 'en' | 'de'].roles[role as keyof typeof translatedExperience.en.roles]) {
      return translatedExperience[lang as 'en' | 'de'].roles[role as keyof typeof translatedExperience.en.roles];
    }
    return role;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center">
        <h4 className="text-base font-semibold mr-2">{getTranslatedRole(position.role)}</h4>
        <span className="text-sm text-muted-foreground">{translatePositionType(position.type, lang as 'en' | 'de')}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        {formatDate(position.startDate)} - {position.endDate === "present" ? t('experience.present') : (showPresent ? t('experience.current') : formatDate(position.endDate as Date))} · {duration}
      </div>
      <span className="text-sm text-muted-foreground">{translateLocation(position.location, lang as 'en' | 'de')}</span>
      {grade && (
        <span className="text-sm text-muted-foreground mt-1">
          {t('experience.grade')}: {grade}
        </span>
      )}
    </div>
  );
}

function SkillsList({ skills }: { skills: { name: string }[] }) {
  if (skills.length === 0) return null;
  
  const skillCount = skills.length;
  const displaySkills = skills.slice(0, 2);
  const remainingCount = skillCount - 2;
  const allSkills = skills.map(skill => skill.name).join(', ');

  return (
    <div className="text-sm font-medium mt-2">
      {displaySkills.map(skill => skill.name).join(', ')}
      {remainingCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help underline decoration-dotted underline-offset-2">
              {` and +${remainingCount} skill${remainingCount !== 1 ? 's' : ''}`}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-48 text-xs">{allSkills}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

function ExperienceSection({ title, items, lang = 'en' }: { title: string; items: ExperienceItem[]; lang?: string }) {
  if (items.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-col gap-8">
        {items.map((experience, index) => {
          const duration = calculateTotalCompanyDuration(experience);
          const isEducation = experience.category === 'education';

          // Get translated experience data if available
          const experienceKey = experience.company as ExperienceKey;
          const translatedExperience = experienceTranslations[experienceKey];
          const displayCompany = translatedExperience ? translatedExperience[lang as 'en' | 'de'].company : experience.company;
          const displayLocation = translatedExperience ? translatedExperience[lang as 'en' | 'de'].location : translateLocation(experience.location, lang as 'en' | 'de');
          
          const getTranslatedRole = (role: string) => {
            if (translatedExperience && translatedExperience[lang as 'en' | 'de'].roles[role as keyof typeof translatedExperience.en.roles]) {
              return translatedExperience[lang as 'en' | 'de'].roles[role as keyof typeof translatedExperience.en.roles];
            }
            return role;
          };

          return (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-border bg-muted">
                {experience.logo ? (
                  <img 
                    src={experience.logo} 
                    alt={displayCompany} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex flex-col mb-2">
                  <h3 className="text-lg font-semibold">
                    {experience.companyUrl ? (
                      <a 
                        href={experience.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors underline decoration-transparent hover:decoration-current"
                      >
                        {displayCompany}
                      </a>
                    ) : (
                      displayCompany
                    )}
                  </h3>
                  {!isEducation && (
                    <span className="text-sm text-muted-foreground">
                      {duration} · {translatePositionType(experience.currentPosition.type, lang as 'en' | 'de')}
                    </span>
                  )}
                </div>

                {experience.promotions && experience.promotions.length > 0 ? (
                  <div className="flex flex-col relative">
                    <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-border" />

                    <div className="flex gap-4 relative">
                      <div className="relative flex items-center justify-center w-3 h-full">
                        <div className="w-3 h-3 rounded-full bg-primary z-10" />
                      </div>
                      <div className="flex-grow pt-1">
                        <PositionCard position={experience.currentPosition} grade={experience.grade} isEducation={isEducation} lang={lang} experienceKey={experienceKey} />
                        <SkillsList skills={experience.skills} />
                      </div>
                    </div>

                    {experience.promotions.map((position, idx) => (
                      <div key={idx} className="flex gap-4 relative mt-6">
                        <div className="relative flex items-center justify-center w-3 h-full">
                          <div className="w-2 h-2 rounded-full bg-muted z-10" />
                        </div>
                        <div className="flex-grow pt-1">
                          <PositionCard position={position} isEducation={isEducation} lang={lang} experienceKey={experienceKey} />
                          <SkillsList skills={experience.skills} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <PositionCard position={experience.currentPosition} grade={experience.grade} isEducation={isEducation} lang={lang} experienceKey={experienceKey} />
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

export function Experience({ lang = 'en' }: { lang?: string }) {
  const t = useTranslations(lang as 'en' | 'de');
  const workExperience = experiences.filter(exp => exp.category === 'work');
  const education = experiences.filter(exp => exp.category === 'education');

  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl">
      <ExperienceSection title={t('experience.work')} items={workExperience} lang={lang} />
      <ExperienceSection title={t('experience.education')} items={education} lang={lang} />
    </div>
  );
} 