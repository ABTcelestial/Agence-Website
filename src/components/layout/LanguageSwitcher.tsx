'use client';

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

const LANGUAGES: { code: Language; flag: string; label: string; short: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "Français", short: "FR" },
  { code: "en", flag: "🇬🇧", label: "English", short: "EN" },
  { code: "ar", flag: "🇩🇿", label: "العربية", short: "AR" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
        aria-label="Change language"
        aria-expanded={open}
      >
        <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{current.flag}</span>
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          right: 0,
          minWidth: "130px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          zIndex: 100,
          overflow: "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}
      >
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => { setLang(l.code); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors duration-150"
            style={{
              background: lang === l.code ? "rgba(26,26,110,0.06)" : "transparent",
              color: lang === l.code ? "var(--primary)" : "var(--muted-foreground)",
              fontWeight: lang === l.code ? 600 : 400,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{l.flag}</span>
            <span>{l.label}</span>
            {lang === l.code && (
              <span style={{ marginLeft: "auto", color: "var(--primary)" }}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
