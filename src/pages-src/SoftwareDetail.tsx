'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft, Download, Monitor, Terminal, Apple, Smartphone, Star, Globe, Loader2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEOHead } from "../components/seo/SEOHead";

type SoftwareVersion = {
  version: string;
  os: "Windows" | "macOS" | "Linux" | "Android" | "iOS" | string;
  file_url: string;
};

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
  category: string;
  software_versions: SoftwareVersion[];
  gallery?: string[];
};

export function SoftwareDetail({ initialSoftware }: { initialSoftware?: Realisation }) {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [software, setSoftware] = useState<Realisation | null>(initialSoftware || null);
  const [loading, setLoading] = useState(!initialSoftware);
  const [activeOs, setActiveOs] = useState<string>("Windows");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (initialSoftware) {
      setSoftware(initialSoftware);
      const versions = initialSoftware.software_versions as SoftwareVersion[];
      if (versions && versions.length > 0) {
        const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : "";
        let defaultOs = versions[0].os;
        
        if (/iPhone|iPad|iPod/.test(userAgent)) defaultOs = versions.find((v: SoftwareVersion) => v.os === "iOS")?.os || defaultOs;
        else if (userAgent.includes("Android")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Android")?.os || defaultOs;
        else if (userAgent.includes("Win")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Windows")?.os || defaultOs;
        else if (userAgent.includes("Mac")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "macOS")?.os || defaultOs;
        else if (userAgent.includes("Linux")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Linux")?.os || defaultOs;

        setActiveOs(defaultOs);
      }
      setLoading(false);
      return;
    }

    async function fetchSoftware() {
      if (!id) return;
      const { data, error } = await supabase
        .from("realisations")
        .select("*")
        .eq("id", id)
        .eq("category", "Software")
        .single();

      if (data) {
        setSoftware(data);
        // Set default OS if possible
        const versions = data.software_versions as SoftwareVersion[];
        if (versions && versions.length > 0) {
          const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : "";
          let defaultOs = versions[0].os;

          if (/iPhone|iPad|iPod/.test(userAgent)) defaultOs = versions.find((v: SoftwareVersion) => v.os === "iOS")?.os || defaultOs;
          else if (userAgent.includes("Android")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Android")?.os || defaultOs;
          else if (userAgent.includes("Win")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Windows")?.os || defaultOs;
          else if (userAgent.includes("Mac")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "macOS")?.os || defaultOs;
          else if (userAgent.includes("Linux")) defaultOs = versions.find((v: SoftwareVersion) => v.os === "Linux")?.os || defaultOs;
          
          setActiveOs(defaultOs);
        }
      }
      setLoading(false);
    }
    fetchSoftware();
  }, [id, initialSoftware]);

  const images: string[] = [];
  if (software?.preview_url) {
    images.push(software.preview_url);
  } else if (software?.url) {
    images.push(`https://api.microlink.io/?url=${encodeURIComponent(software.url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2`);
  }
  if (software?.gallery && software.gallery.length > 0) {
    images.push(...software.gallery);
  }

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % images.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + images.length) % images.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: "var(--background)" }}>
        <Loader2 size={40} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!software) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center" style={{ background: "var(--background)" }}>
        <Globe size={64} className="mb-6 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Logiciel introuvable</h1>
        <p className="text-muted-foreground mb-8">Ce logiciel n'existe pas ou n'est plus disponible.</p>
        <Link href="/realisations" className="btn-primary-pro px-6 py-2.5 rounded-lg text-sm text-white">
          Retour aux réalisations
        </Link>
      </div>
    );
  }

  const description =
    lang === "en" ? software.description_en || software.description_fr
      : lang === "ar" ? software.description_ar || software.description_fr
        : software.description_fr;

  const getOsIcon = (os: string) => {
    switch (os.toLowerCase()) {
      case "windows": return <Monitor size={18} />;
      case "macos": return <Apple size={18} />;
      case "linux": return <Terminal size={18} />;
      case "android": return <Smartphone size={18} />;
      case "ios": return <Apple size={18} />;
      default: return <Download size={18} />;
    }
  };

  const activeVersion = software.software_versions?.find(v => v.os === activeOs) || software.software_versions?.[0];
  const isMobileOs = activeVersion?.os === "Android" || activeVersion?.os === "iOS";

  return (
    <>
      <SEOHead 
        page="services" 
        customTitle={`${software.title} - Logiciel Xenon`}
        customDescription={description} 
      />
      
      <div className="min-h-screen pb-24" style={{ background: "var(--background)" }}>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(26,26,110,0.15), transparent 70%)" }} />
            
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/realisations" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Retour au portfolio
            </Link>
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Info Logiciel */}
              <div className="flex-1">
                {software.featured && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.2)" }}>
                    <Star size={12} fill="currentColor" className="mr-1.5" /> Logiciel Vedette
                  </div>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {software.title}
                </h1>
                
                {software.client_name && (
                  <p className="text-sm text-muted-foreground mb-6">Pour : <span className="text-foreground">{software.client_name}</span></p>
                )}
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {description}
                </p>
                
                {software.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {software.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: "var(--secondary)", color: "var(--primary)", border: "1px solid var(--border)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {software.url && (
                  <a href={software.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium hover:underline"
                    style={{ color: "var(--primary)" }}>
                    <Globe size={16} className="mr-2" />
                    Visiter le site officiel
                  </a>
                )}
              </div>
              
              {/* Aperçu Logiciel */}
              <div className="w-full md:w-[400px] flex-shrink-0">
                <div className="rounded-2xl overflow-hidden border border-border shadow-2xl relative group" style={{ background: "var(--card)", aspectRatio: "4/3" }}>
                  {images.length > 0 ? (
                    <>
                      <div className="w-full h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {images.map((img, i) => (
                          <div key={i} className="w-full h-full flex-shrink-0 relative bg-black/20">
                            {/* Fond flouté pour combler l'espace si l'image n'est pas au format 4/3 */}
                            <div className="absolute inset-0 opacity-40 blur-xl scale-110 pointer-events-none">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                            {/* Image complète (object-contain) */}
                            <img src={img} alt={`${software.title} preview ${i+1}`} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                          </div>
                        ))}
                      </div>
                      
                      {images.length > 1 && (
                        <>
                          <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 backdrop-blur-sm border border-white/10 shadow-lg">
                            <ChevronLeft size={18} className="mr-0.5" />
                          </button>
                          <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 backdrop-blur-sm border border-white/10 shadow-lg">
                            <ChevronRight size={18} className="ml-0.5" />
                          </button>
                          
                          {/* Dots */}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, i) => (
                              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/40 hover:bg-white/70 w-1.5"}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Globe size={48} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TELECHARGEMENT SECTION */}
        {software.software_versions && software.software_versions.length > 0 && (
          <section className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl p-8 md:p-10 border border-border text-center"
                style={{ background: "var(--card)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                
                <h2 className="text-2xl font-bold text-foreground mb-3">{isMobileOs ? "Installation" : "Téléchargement"}</h2>
                <p className="text-muted-foreground mb-8">Choisissez votre plateforme pour {isMobileOs ? "installer" : "télécharger"} la dernière version.</p>
                
                {/* OS Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {software.software_versions.map(v => (
                    <button
                      key={v.os}
                      onClick={() => setActiveOs(v.os)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all"
                      style={activeOs === v.os 
                        ? { background: "var(--primary)", color: "white", boxShadow: "0 4px 12px rgba(26,26,110,0.2)" }
                        : { background: "var(--secondary)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                      {getOsIcon(v.os)}
                      {v.os}
                    </button>
                  ))}
                </div>
                
                {/* Download Area */}
                {activeVersion && (
                  <div className="max-w-md mx-auto p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-left">
                        <div className="text-sm text-muted-foreground font-medium mb-1">{isMobileOs ? "Application" : "Version"} pour {activeVersion.os}</div>
                        <div className="text-xl font-bold text-foreground">v{activeVersion.version || "1.0"}</div>
                      </div>
                      <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "rgba(26,26,110,0.1)", color: "var(--primary)" }}>
                        {getOsIcon(activeVersion.os)}
                      </div>
                    </div>
                    
                    <ul className="text-left space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-green-500" /> Sécurisé et vérifié
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-green-500" /> {isMobileOs ? "Compatible avec votre appareil" : "Installation rapide"}
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-green-500" /> Mises à jour incluses
                      </li>
                    </ul>
                    
                    <a 
                      href={activeVersion.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary-pro w-full flex items-center justify-center py-4 rounded-xl text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <Download size={18} className="mr-2" />
                      {isMobileOs ? "Installer" : "Télécharger"} pour {activeVersion.os}
                    </a>
                  </div>
                )}
                
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
