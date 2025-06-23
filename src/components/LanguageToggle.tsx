import { useEffect, useState, useRef } from "react";
import { getLangFromUrl } from "@/i18n/utils";
import twemoji from "@twemoji/api";

export function LanguageToggle(): React.JSX.Element {
  const [currentLang, setCurrentLang] = useState<"en" | "de">(() => {
    if (typeof window !== "undefined") {
      return getLangFromUrl(new URL(window.location.href)) as "en" | "de";
    }
    return "en";
  });
  const flagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href)) as "en" | "de";
    setCurrentLang(lang);
  }, []);

  useEffect(() => {
    if (flagRef.current) {
      const flagEmoji = currentLang === "en" ? "🇩🇪" : "🇺🇸";
      flagRef.current.innerHTML = twemoji.parse(flagEmoji, {
        folder: 'svg',
        ext: '.svg'
      });
    }
  }, [currentLang]);

  function toggleLanguage() {
    const newLang = currentLang === "en" ? "de" : "en";
    
    // Navigate to the new language
    if (newLang === "en") {
      window.location.href = "/"; // Root for English
    } else {
      window.location.href = "/de/"; // /de/ for German
    }
  }

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-md w-9 h-9 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center"
      aria-label="Toggle language"
    >
      <div 
        ref={flagRef}
        className="w-5 h-5 scale-100 transition-all [&>img]:w-full [&>img]:h-full"
      />
    </button>
  );
} 