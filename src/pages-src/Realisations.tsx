'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ExternalLink, Star, Globe, Loader2, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEOHead } from "../components/seo/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";

type Realisation = {
  id: string;
  title: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  url: string;
  preview_url: string;
  tags: string[];
  client_name: string;
  featured: boolean;
  is_active: boolean;
  sort_order: number;
  category?: string;
  software_versions?: any[];
};

/* ─── Vercel-style preview card ─── */
function PreviewCard({ item, lang, canLoad, t }: { item: Realisation; lang: "fr" | "en" | "ar", canLoad: boolean, t: any }) {
  const [imgStatus, setImgStatus] = useState<"loading" | "ok" | "err">("loading");

  const description =
    lang === "en" ? item.description_en || item.description_fr
      : lang === "ar" ? item.description_ar || item.description_fr
        : item.description_fr;

  const screenshotSrc = item.preview_url?.trim()
    ? item.preview_url
    : item.url?.trim()
    ? `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&waitForTimeout=3000`
      : null;

  const domain = item.url ? item.url.replace(/^https?:\/\//, "").split("/")[0] : null;

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(201,168,76,0.9)", color: "#fff", backdropFilter: "blur(8px)" }}>
          <Star size={10} fill="currentColor" /> {t.realisations.vedette}
        </div>
      )}

      {/* Browser chrome + preview */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: "var(--muted)" }}>
        {/* Browser bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3 py-2"
          style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <div className="flex-1 flex items-center gap-1.5 px-3 py-1 rounded-md text-xs truncate"
              style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="truncate">{domain || "xenondz.com"}</span>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div className="absolute inset-0 pt-9">
          {screenshotSrc ? (
            <>
              {imgStatus === "loading" && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f8fafc" }}>
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={24} className="animate-spin" style={{ color: "#94a3b8" }} />
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{t.realisations.preview}</span>
                  </div>
                </div>
              )}
              <img
                src={canLoad ? screenshotSrc : ""}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ display: imgStatus === "err" ? "none" : (canLoad ? "block" : "none") }}
                onLoad={() => setImgStatus("ok")}
                onError={() => setImgStatus("err")}
              />
              {imgStatus === "err" && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f8fafc" }}>
                  <div className="flex flex-col items-center gap-2">
                    <Globe size={32} style={{ color: "#cbd5e1" }} />
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{t.realisations.notAvailable}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f8fafc" }}>
              <div className="flex flex-col items-center gap-2">
                <Globe size={32} style={{ color: "#cbd5e1" }} />
                <span className="text-xs" style={{ color: "#94a3b8" }}>{t.realisations.noUrl}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}>
          {item.category === "Software" ? (
            <Link href={`/software/${item.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
              onClick={e => e.stopPropagation()}>
              <Download size={14} />
              Télécharger
            </Link>
          ) : item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
              onClick={e => e.stopPropagation()}>
              <ExternalLink size={14} />
              {t.realisations.visite}
            </a>
          ) : null}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-snug" style={{ fontSize: "1rem" }}>{item.title}</h3>
            {item.category === "Software" ? (
              <Link href={`/software/${item.id}`}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-secondary"
                style={{ color: "var(--muted-foreground)" }}>
                <Download size={14} />
              </Link>
            ) : item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-secondary"
                style={{ color: "var(--muted-foreground)" }}>
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
          {item.client_name && (
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.client_name}</div>
          )}
        </div>

        {description && (
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
            {description}
          </p>
        )}

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {item.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(26,26,110,0.06)", color: "var(--primary)", border: "1px solid rgba(26,26,110,0.12)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export function Realisations() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    // Si le site est déjà chargé ou lorsqu'il se charge complètement
    if (document.readyState === "complete") {
      setSiteLoaded(true);
    } else {
      const handleLoad = () => setSiteLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    supabase
      .from("realisations")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, []);

  // Collect all unique tags
  const allTags = Array.from(new Set(items.flatMap(i => i.tags || [])));

  const featured = items.filter(i => i.featured);
  const filtered = activeTag ? items.filter(i => i.tags?.includes(activeTag)) : items;

  return (
    <>
      <SEOHead page="realisations" />
      <div className="w-full">
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20"
          style={{ background: "var(--background)" }}>
          <div className="absolute -top-32 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(26,26,110,0.06) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-1.5 badge-gold rounded-full mb-6 text-sm">
                <Star size={13} className="mr-2" fill="currentColor" />
                {t.realisations.badge}
              </div>
              <h1 className="hero-title-gradient mb-5" dangerouslySetInnerHTML={{ __html: t.realisations.title }} />
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {t.realisations.description}
              </p>
            </div>
          </div>
        </section>

        {/* TAG FILTERS */}
        {loading ? (
          <section className="py-8 border-b border-border/50 sticky top-24 z-30 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <Skeleton className="flex-shrink-0 w-24 h-9 rounded-full" />
                <Skeleton className="flex-shrink-0 w-32 h-9 rounded-full" />
                <Skeleton className="flex-shrink-0 w-28 h-9 rounded-full" />
                <Skeleton className="flex-shrink-0 w-36 h-9 rounded-full" />
              </div>
            </div>
          </section>
        ) : allTags.length > 0 && (
          <section className="py-8 border-b border-border/50 sticky top-24 z-30 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    onClick={() => setActiveTag(null)}
                    aria-pressed={!activeTag}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={!activeTag
                      ? { background: "var(--primary)", color: "#fff" }
                      : { background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                    {t.realisations.all} ({items.length})
                  </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    aria-pressed={activeTag === tag}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={activeTag === tag
                      ? { background: "var(--primary)", color: "#fff" }
                      : { background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED SPOTLIGHT (only when no filter active) */}
        {!activeTag && !loading && featured.length > 0 && (
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <Star size={16} style={{ color: "#c9a84c" }} fill="currentColor" />
                <span className="text-sm font-semibold uppercase tracking-widest section-label">{t.realisations.featured}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.slice(0, 2).map(item => (
                  <PreviewCard key={item.id} item={item} lang={lang as "fr" | "en" | "ar"} canLoad={siteLoaded} t={t} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ALL PROJECTS GRID */}
        <section className="py-16" style={{ background: "var(--muted)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!activeTag && !loading && (
              <div className="mb-8">
                <p className="section-label">{t.realisations.fullPortfolio}</p>
                <h2 className="text-foreground">{t.realisations.allProjects}</h2>
                <div className="gold-line" />
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm h-[380px]">
                    <Skeleton className="w-full h-[60%] rounded-none" />
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex justify-between items-start">
                        <Skeleton className="w-2/3 h-5 rounded" />
                        <Skeleton className="w-8 h-8 rounded-lg" />
                      </div>
                      <Skeleton className="w-1/3 h-3 rounded" />
                      <div className="mt-2 space-y-2">
                        <Skeleton className="w-full h-4 rounded" />
                        <Skeleton className="w-4/5 h-4 rounded" />
                      </div>
                      <div className="flex gap-2 mt-auto pt-2">
                        <Skeleton className="w-16 h-6 rounded-full" />
                        <Skeleton className="w-20 h-6 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <Globe size={48} className="mx-auto mb-4" style={{ color: "var(--border)" }} />
                <p className="text-muted-foreground">{t.realisations.empty}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(item => (
                  <PreviewCard key={item.id} item={item} lang={lang as "fr" | "en" | "ar"} canLoad={siteLoaded} t={t} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="reveal max-w-xl mx-auto">
              <h2 className="text-foreground mb-4">{t.realisations.ctaTitle}</h2>
              <div className="gold-line gold-line-center" />
              <p className="text-muted-foreground font-light mt-4 mb-8">
                {t.realisations.ctaDesc}
              </p>
              <Link href="/contact">
                <button className="btn-primary-pro inline-flex items-center px-8 py-3.5 text-base text-white rounded-lg active:translate-y-1 cursor-pointer">
                  {t.realisations.ctaButton}
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
