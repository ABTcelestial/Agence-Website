'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".reveal.visible").forEach((el) => {
      el.classList.remove("visible");
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>(".reveal")
          .forEach((el) => el.classList.add("visible"));
      }, 60);
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observeEl = (el: Element) => {
      if (!el.classList.contains("visible")) io.observe(el as HTMLElement);
    };

    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(observeEl);
    }, 60);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as Element;
          if (el.classList?.contains("reveal")) observeEl(el);
          el.querySelectorAll?.(".reveal").forEach(observeEl);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}

export function PageTransitions({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  const { lang } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 flex flex-col h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
