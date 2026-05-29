'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "./translations";

// Use a union of all language translation shapes so that
// switching languages doesn't create literal-type mismatches.
export type TranslationShape = (typeof translations)[Language];

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: TranslationShape;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("xenon-lang");
    if (saved) setLangState(saved as Language);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("xenon-lang", l);
  };

  // Update <html> dir and lang attributes for RTL support
  useEffect(() => {
    const translation = translations[lang];
    document.documentElement.dir = translation.dir;
    document.documentElement.lang = translation.lang;
  }, [lang]);

  const t = translations[lang] as TranslationShape;
  const dir = (t.dir as "ltr" | "rtl");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
