// General translation helpers
export const generalTranslations = {
  en: {
    'grade': 'Grade',
    'germany': 'Germany',
    'deutschland': 'Deutschland'
  },
  de: {
    'grade': 'Note',
    'germany': 'Deutschland', 
    'deutschland': 'Deutschland'
  }
} as const;

// Type definitions for translation structure
export interface PositionTranslation {
  role: string;
  type: string;
  location: string;
}

export interface ExperienceLanguageTranslation {
  company: string;
  location: string;
  positions: Record<string, PositionTranslation>;
}

export interface ExperienceTranslationItem {
  en: ExperienceLanguageTranslation;
  de: ExperienceLanguageTranslation;
}

export const experienceTranslations = {
  "Rivo": {
    en: {
      company: "Rivo",
      location: "Riedlingen, Baden-Württemberg, Germany",
      positions: {
        "Founder & Lead Developer": {
          role: "Founder & Lead Developer",
          type: "Self-Employed",
          location: "Riedlingen, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "Rivo",
      location: "Riedlingen, Baden-Württemberg, Deutschland",
      positions: {
        "Founder & Lead Developer": {
          role: "Gründer & Lead Developer",
          type: "Selbstständig",
          location: "Riedlingen, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "RSU GmbH - E-Commerce": {
    en: {
      company: "RSU GmbH - E-Commerce",
      location: "Ulm, Baden-Württemberg, Germany",
      positions: {
        "Software Engineer": {
          role: "Software Engineer",
          type: "Co-op",
          location: "Ulm, Baden-Württemberg, Germany"
        },
        "Software Engineer_Internship": {
          role: "Software Engineer",
          type: "Internship",
          location: "Ulm, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "RSU GmbH - E-Commerce",
      location: "Ulm, Baden-Württemberg, Deutschland",
      positions: {
        "Software Engineer": {
          role: "Software-Entwickler",
          type: "Duales Studium",
          location: "Ulm, Baden-Württemberg, Deutschland"
        },
        "Software Engineer_Internship": {
          role: "Software-Entwickler",
          type: "Praktikum",
          location: "Riedlingen, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "Koch - Bautechnik Energieberatung": {
    en: {
      company: "Koch - Bautechnik Energieberatung",
      location: "Riedlingen, Baden-Württemberg, Germany",
      positions: {
        "Office Assistant": {
          role: "Office Assistant",
          type: "Part-time",
          location: "Riedlingen, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "Koch - Bautechnik Energieberatung",
      location: "Riedlingen, Baden-Württemberg, Deutschland",
      positions: {
        "Office Assistant": {
          role: "Büroassistent",
          type: "Teilzeit",
          location: "Riedlingen, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "BFG MEDIA GROUP®": {
    en: {
      company: "BFG MEDIA GROUP®",
      location: "Aulendorf, Baden-Württemberg, Germany",
      positions: {
        "Digital Marketing": {
          role: "Digital Marketing",
          type: "Internship",
          location: "Aulendorf, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "BFG MEDIA GROUP®",
      location: "Aulendorf, Baden-Württemberg, Deutschland",
      positions: {
        "Digital Marketing": {
          role: "Digital Marketing",
          type: "Praktikum",
          location: "Aulendorf, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "Baden-Wuerttemberg Cooperative State University Heidenheim": {
    en: {
      company: "Baden-Wuerttemberg Cooperative State University Heidenheim",
      location: "Heidenheim, Baden-Württemberg, Germany",
      positions: {
        "Bachelor of Science - BS, Computer Science": {
          role: "Bachelor of Science - BS, Computer Science",
          type: "Full-time",
          location: "Heidenheim, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "Duale Hochschule Baden-Württemberg Heidenheim",
      location: "Heidenheim, Baden-Württemberg, Deutschland",
      positions: {
        "Bachelor of Science - BS, Computer Science": {
          role: "Bachelor of Science - BS, Informatik",
          type: "Vollzeit",
          location: "Heidenheim, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "Kaufmännische Schule Ehingen": {
    en: {
      company: "Kaufmännische Schule Ehingen",
      location: "Ehingen, Baden-Württemberg, Germany",
      positions: {
        "Fachhochschulreife, Foreign Languages": {
          role: "Fachhochschulreife, Foreign Languages",
          type: "Full-time",
          location: "Ehingen, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "Kaufmännische Schule Ehingen",
      location: "Ehingen, Baden-Württemberg, Deutschland",
      positions: {
        "Fachhochschulreife, Foreign Languages": {
          role: "Fachhochschulreife, Fremdsprachen",
          type: "Vollzeit",
          location: "Ehingen, Baden-Württemberg, Deutschland"
        }
      }
    }
  },
  "Geschwister-Scholl-Realschule Riedlingen": {
    en: {
      company: "Geschwister-Scholl-Realschule Riedlingen",
      location: "Riedlingen, Baden-Württemberg, Germany",
      positions: {
        "Middle School Diploma": {
          role: "Middle School Diploma",
          type: "Full-time",
          location: "Riedlingen, Baden-Württemberg, Germany"
        }
      }
    },
    de: {
      company: "Geschwister-Scholl-Realschule Riedlingen",
      location: "Riedlingen, Baden-Württemberg, Deutschland",
      positions: {
        "Middle School Diploma": {
          role: "Realschulabschluss",
          type: "Vollzeit",
          location: "Riedlingen, Baden-Württemberg, Deutschland"
        }
      }
    }
  }
} as const;

export type ExperienceKey = keyof typeof experienceTranslations; 