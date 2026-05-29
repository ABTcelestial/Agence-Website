import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative z-10 shrink-0 flex-shrink-0 aspect-square w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={t.nav.toggleTheme ?? "Toggle theme"}
    >
      {!mounted ? (
        <div className="w-5 h-5 rounded-full bg-slate-200/20 animate-pulse" />
      ) : (
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Sun Icon (Visible in Light Mode) */}
          <Sun 
            className={`absolute text-amber-500 transition-all duration-300 ease-in-out ${
              isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
            }`} 
            size={18} 
          />
          {/* Moon Icon (Visible in Dark Mode) */}
          <Moon 
            className={`absolute text-slate-200 transition-all duration-300 ease-in-out ${
              isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
            }`} 
            size={18} 
          />
        </div>
      )}
    </button>
  );
}
