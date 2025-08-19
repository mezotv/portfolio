export const projectTranslations = {
  Marble: {
    en: {
      name: "Marble",
      description:
        "A modern, open-source headless CMS designed for blogs and content management, built with TypeScript and Next.js.",
    },
    de: {
      name: "Marble",
      description:
        "Ein modernes, Open-Source Headless CMS, entwickelt für Blogs und Content-Management, basierend auf TypeScript und Next.js.",
    },
  },
  "Would You Bot": {
    en: {
      name: "Would You Bot",
      description:
        "Interactive Discord bot providing engaging 'Would You Rather' questions and community features.",
    },
    de: {
      name: "Would You Bot",
      description:
        "Interaktiver Discord-Bot mit spannenden 'Würdest Du Lieber' Fragen und Community-Features.",
    },
  },
} as const;

export type ProjectKey = keyof typeof projectTranslations;
