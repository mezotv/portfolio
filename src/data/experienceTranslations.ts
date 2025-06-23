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

export const experienceTranslations = {
  "RSU GmbH - E-Commerce": {
    en: {
      company: "RSU GmbH - E-Commerce",
      location: "Ulm, Baden-Württemberg, Germany",
      roles: {
        "Software Engineer": "Software Engineer",
        "Co-op": "Co-op",
        "Internship": "Internship"
      }
    },
    de: {
      company: "RSU GmbH - E-Commerce",
      location: "Ulm, Baden-Württemberg, Deutschland",
      roles: {
        "Software Engineer": "Software-Entwickler",
        "Co-op": "Duales Studium",
        "Internship": "Praktikum"
      }
    }
  },
  "Baden-Wuerttemberg Cooperative State University Heidenheim": {
    en: {
      company: "Baden-Wuerttemberg Cooperative State University Heidenheim",
      location: "Heidenheim, Baden-Württemberg, Germany",
      roles: {
        "Bachelor of Science - BS, Computer Science": "Bachelor of Science - BS, Computer Science",
        "Full-time": "Full-time"
      }
    },
    de: {
      company: "Duale Hochschule Baden-Württemberg Heidenheim",
      location: "Heidenheim, Baden-Württemberg, Deutschland",
      roles: {
        "Bachelor of Science - BS, Computer Science": "Bachelor of Science - BS, Informatik",
        "Full-time": "Vollzeit"
      }
    }
  },
  "Kaufmännische Schule Ehingen": {
    en: {
      company: "Kaufmännische Schule Ehingen",
      location: "Ehingen, Baden-Württemberg, Germany",
      roles: {
        "Fachhochschulreife, Foreign Languages": "Fachhochschulreife, Foreign Languages",
        "Full-time": "Full-time"
      }
    },
    de: {
      company: "Kaufmännische Schule Ehingen",
      location: "Ehingen, Baden-Württemberg, Deutschland",
      roles: {
        "Fachhochschulreife, Foreign Languages": "Fachhochschulreife, Fremdsprachen",
        "Full-time": "Vollzeit"
      }
    }
  },
  "Geschwister-Scholl-Realschule Riedlingen": {
    en: {
      company: "Geschwister-Scholl-Realschule Riedlingen",
      location: "Riedlingen, Baden-Württemberg, Germany",
      roles: {
        "Middle School Diploma": "Middle School Diploma",
        "Full-time": "Full-time"
      }
    },
    de: {
      company: "Geschwister-Scholl-Realschule Riedlingen",
      location: "Riedlingen, Baden-Württemberg, Deutschland",
      roles: {
        "Middle School Diploma": "Realschulabschluss",
        "Full-time": "Vollzeit"
      }
    }
  }
} as const;

export type ExperienceKey = keyof typeof experienceTranslations; 