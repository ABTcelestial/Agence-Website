'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useLanguage();

  const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";
  const isAdmin = pathname.startsWith(`/${ADMIN_PATH}`) || pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdmin]);

  if (isAdmin) return null;

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const navigation = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.realisations, path: "/realisations" },
    { name: "Blog", path: "/blog" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.faq, path: "/faq" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const barBase: React.CSSProperties = {
    display: "block",
    position: "absolute",
    height: "2px",
    width: "22px",
    background: "var(--foreground)",
    borderRadius: "2px",
    transformOrigin: "center",
    left: "50%",
    marginLeft: "-11px",
  };

  return (
    <>
      {/* A11y: Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm focus:text-white"
        style={{ background: "var(--primary)" }}
      >
        {t.nav.skipToContent ?? "Skip to content"}
      </a>

      <header
        className={`fixed top-4 z-50 transition-all duration-500 ${
          scrolled
            ? "left-3 right-3 header-scrolled bg-background/96 backdrop-blur-xl shadow-lg"
            : "left-4 right-4 bg-background/85 backdrop-blur-md"
        } border border-border/60 rounded-2xl`}
      >
        <AnimatePresence mode="wait">
          <motion.nav
            key={lang}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 w-full"
          >
          <div className="flex items-center h-14">
            {/* Logo */}
            <div className="flex-none lg:w-[280px]">
              <Link href="/" className="flex items-center gap-2.5 group" aria-label="XenonDz — Retour à l'accueil">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ background: "var(--primary)" }}>
                  <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>X</span>
                </div>
                <span className="font-semibold text-foreground tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                  XenonDz
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  style={isActive(item.path) ? { background: "rgba(26,26,110,0.07)" } : {}}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side: Language + Theme + CTA */}
            <div className="hidden lg:flex flex-none w-[280px] items-center justify-end gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Link href="/contact">
                <button className="btn-primary-pro inline-flex items-center shrink-0 whitespace-nowrap px-5 py-2 text-sm text-white rounded-lg cursor-pointer">
                  {t.nav.cta}
                </button>
              </Link>
            </div>

            {/* Mobile right: Theme + Language + Hamburger */}
            <div className="lg:hidden flex flex-1 justify-end items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                className="relative flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                <span style={{
                  ...barBase,
                  transition: "top 0.35s cubic-bezier(0.23, 1, 0.32, 1), transform 0.35s cubic-bezier(0.23, 1, 0.32, 1) 0.05s",
                  top: mobileMenuOpen ? "calc(50% - 1px)" : "calc(50% - 7px)",
                  transform: mobileMenuOpen ? "rotate(45deg)" : "rotate(0deg)",
                }} />
                <span style={{
                  ...barBase,
                  top: "calc(50% - 1px)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  opacity: mobileMenuOpen ? 0 : 1,
                  transform: mobileMenuOpen ? "scaleX(0.3)" : "scaleX(1)",
                }} />
                <span style={{
                  ...barBase,
                  transition: "top 0.35s cubic-bezier(0.23, 1, 0.32, 1), transform 0.35s cubic-bezier(0.23, 1, 0.32, 1) 0.05s",
                  top: mobileMenuOpen ? "calc(50% - 1px)" : "calc(50% + 5px)",
                  transform: mobileMenuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                }} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-nav-menu"
            role="navigation"
            className="lg:hidden overflow-hidden"
            style={{
              maxHeight: mobileMenuOpen ? "420px" : "0px",
              opacity: mobileMenuOpen ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
            }}
          >
            <div className="py-4 border-t border-border">
              <div className="flex flex-col gap-1">
                {navigation.map((item, i) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-primary bg-primary/7"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    style={{
                      ...(isActive(item.path) ? { background: "rgba(26,26,110,0.07)" } : {}),
                      transform: mobileMenuOpen ? "translateX(0)" : "translateX(-8px)",
                      transitionProperty: "color, background, transform",
                      transitionDuration: "0.2s, 0.2s, 0.35s",
                      transitionTimingFunction: "ease, ease, cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: mobileMenuOpen ? `0ms, 0ms, ${i * 40}ms` : "0ms",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-0 mt-2"
                  style={{
                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(-8px)",
                    transitionProperty: "transform",
                    transitionDuration: "0.35s",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: mobileMenuOpen ? `${navigation.length * 40}ms` : "0ms",
                    display: "block",
                  }}
                >
                  <button className="btn-primary-pro w-full flex items-center justify-center px-4 py-3 text-sm text-white rounded-lg">
                    {t.nav.cta}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          </motion.nav>
        </AnimatePresence>
      </header>
    </>
  );
}
