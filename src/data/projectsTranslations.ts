export const projectTranslations = {
  "Would You Bot": {
    en: {
      name: "Would You Bot",
      description: "Interactive Discord bot providing engaging 'Would You Rather' questions and community features."
    },
    de: {
      name: "Would You Bot", 
      description: "Interaktiver Discord-Bot mit spannenden 'Würdest Du Lieber' Fragen und Community-Features."
    }
  },
} as const;

export type ProjectKey = keyof typeof projectTranslations; 