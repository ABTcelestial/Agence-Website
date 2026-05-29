'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Linkedin, Instagram, Github } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const f = t.footer;

  const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";
  const isAdmin = pathname.startsWith(`/${ADMIN_PATH}`) || pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <footer className="footer-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--primary)" }}>
                <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-display)" }}>X</span>
              </div>
              <span className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>XenonDz</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              {f.tagline}
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, url: "https://www.instagram.com/xenon.dz?igsh=MWNwa2t4ZjJra205dg==", label: "XenonDz sur Instagram" },
                { Icon: Linkedin, url: "https://www.linkedin.com/in/rynas-kebdi-526b70364/", label: "XenonDz sur LinkedIn" },
                { Icon: Github, url: "https://github.com/sayniir", label: "XenonDz sur GitHub" },
                { Icon: Mail, url: "mailto:xenondz.inc@gmail.com", label: "Envoyer un email à XenonDz" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:text-[#c9a84c] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                >
                  <item.Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-0">{f.navigation}</h3>
            <ul className="space-y-2.5 mt-4">
              {[
                { label: t.nav.home, to: "/" },
                { label: t.nav.services, to: "/services" },
                { label: t.nav.realisations, to: "/realisations" },
                { label: t.nav.about, to: "/about" },
                { label: t.nav.faq, to: "/faq" },
                { label: t.nav.contact, to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-0">{f.services}</h3>
            <ul className="space-y-2.5 mt-4">
              {f.servicesList.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm transition-colors hover:text-white/80"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-0">{f.contact}</h3>
            <div className="space-y-2 mt-4">
              <a
                href="mailto:xenondz.inc@gmail.com"
                className="text-sm block transition-colors hover:text-white/80"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                xenondz.inc@gmail.com
              </a>
              <a href="tel:+2130794055836" className="block text-sm transition-colors hover:text-white/80" style={{ color: "rgba(255,255,255,0.5)" }}>+213 0794055836</a>
              <a href="tel:+2130658834848" className="block text-sm transition-colors hover:text-white/80" style={{ color: "rgba(255,255,255,0.5)" }}>+213 0658834848</a>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Bejaia, Algerie</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {currentYear} XenonDz. {f.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="text-xs transition-colors hover:text-white/60"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              {f.legal}
            </Link>
            <Link href="/confidentialite" className="text-xs transition-colors hover:text-white/60"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              {f.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
