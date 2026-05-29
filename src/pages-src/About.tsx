'use client';

import Link from "next/link";
import { Target, Users, Lightbulb, Award, Github, Linkedin, Instagram, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DbTeamMember } from "../admin/AdminTeam";
import { SEOHead } from '../components/seo/SEOHead';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';


/* ─── Static fallback ─── */
const STATIC_TEAM: DbTeamMember[] = [
  {
    id: "1", name: "Rynas Kebdi", sort_order: 0, is_active: true,
    role_fr: "CEO & Fondateur", role_en: "CEO & Founder", role_ar: "المدير التنفيذي والمؤسس",
    bio_fr: "Spécialiste Front-end et Automatisation IA, passionné par l'entrepreneuriat digital.",
    bio_en: "Front-end & AI Automation specialist, passionate about digital entrepreneurship.",
    bio_ar: "متخصص في الواجهة الأمامية وأتمتة الذكاء الاصطناعي، شغوف بريادة الأعمال الرقمية.",
    avatar_url: "", github: "https://github.com/sayniir",
    linkedin: "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
    instagram: "https://www.instagram.com/xenon.dz",
  },
  {
    id: "2", name: "Ryan AitBessai", sort_order: 1, is_active: true,
    role_fr: "Lead Dev & Co-Fondateur", role_en: "Lead Dev & Co-Founder", role_ar: "مطور رئيسي ومؤسس مشارك",
    bio_fr: "Spécialiste Backend.", bio_en: "Backend specialist.", bio_ar: "متخصص في الواجهة الخلفية.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
  {
    id: "3", name: "Amar Bellabas", sort_order: 2, is_active: true,
    role_fr: "Directeur Créatif & Cybersécurité", role_en: "Creative Director & Cybersecurity", role_ar: "المدير الإبداعي والأمن السيبراني",
    bio_fr: "Spécialiste UI/UX, consultant cybersécurité.", bio_en: "UI/UX specialist, cybersecurity consultant.", bio_ar: "متخصص في UI/UX واستشاري أمن سيبراني.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
];

function useTeam() {
  const [team, setTeam] = useState<DbTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    if (!url || !key) { setTeam(STATIC_TEAM); setLoading(false); return; }

    async function fetchTeam() {
      try {
        const { data, error } = await supabase.from("team_members").select("*").eq("is_active", true).order("sort_order", { ascending: true });
        if (error) throw error;
        setTeam(data && data.length > 0 ? data as DbTeamMember[] : STATIC_TEAM);
      } catch (err) {
        setTeam(STATIC_TEAM);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return { team, loading };
}

export function About() {
  const { t, lang: language } = useLanguage();
  const a = t.about;
  const { team, loading } = useTeam();

  const valueIcons = [
    <Target size={24} style={{ color: "var(--primary)" }} />,
    <Users size={24} style={{ color: "var(--primary)" }} />,
    <Lightbulb size={24} style={{ color: "var(--primary)" }} />,
    <Award size={24} style={{ color: "var(--primary)" }} />,
  ];

  function getMemberRole(m: DbTeamMember) {
    if (language === "en") return m.role_en || m.role_fr;
    if (language === "ar") return m.role_ar || m.role_fr;
    return m.role_fr;
  }
  function getMemberBio(m: DbTeamMember) {
    if (language === "en") return m.bio_en || m.bio_fr;
    if (language === "ar") return m.bio_ar || m.bio_fr;
    return m.bio_fr;
  }

  const initials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <SEOHead page="about" />
      <BreadcrumbSchema items={BREADCRUMBS.about} />
      {/* AEO: AboutPage schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "À propos de XenonDz — Agence Digitale Algérienne",
        "description": "XenonDz est une agence digitale fondée à Béjaïa, Algérie, par une équipe de 3 spécialistes en développement web, e-commerce et automatisation.",
        "url": "https://xenondz.vercel.app/about",
        "mainEntity": {
          "@id": "https://xenondz.vercel.app/#organization"
        }
      })}} />
      <div className="w-full">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center hero-animate-1">
            <p className="section-label" style={{ justifyContent: "center" }}>{a.heroLabel}</p>
            <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {a.heroTitle1}<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{a.heroTitleEm}</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-lg text-muted-foreground mt-4 font-light">{a.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{a.teamLabel}</p>
            <h2 className="text-foreground">{a.teamTitle}</h2>
            <div className="gold-line gold-line-center" />
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={24} className="animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {team.map((m, i) => (
                <div key={m.id} className={`card-pro text-center reveal reveal-delay-${i + 1}`}
                  style={{ width: "clamp(260px, 30%, 320px)" }}>
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.1), rgba(201,168,76,0.1))" }}>
                    {m.avatar_url ? (
                      <img src={m.avatar_url} alt={m.name} className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.innerHTML =
                            `<span style="font-size:1.5rem;font-weight:700;color:var(--primary);font-family:var(--font-display)">${initials(m.name)}</span>`;
                        }} />
                    ) : (
                      <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}>
                        {initials(m.name)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                    {m.name}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>{getMemberRole(m)}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{getMemberBio(m)}</p>

                  {/* Social links */}
                  {(m.github || m.linkedin || m.instagram) && (
                    <div className="flex items-center justify-center gap-3 pt-3 border-t border-border">
                      {m.github && (
                        <a href={m.github} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                          style={{ background: "rgba(26,26,110,0.07)", color: "var(--muted-foreground)" }}
                          title="GitHub">
                          <Github size={15} />
                        </a>
                      )}
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                          style={{ background: "rgba(26,26,110,0.07)", color: "var(--muted-foreground)" }}
                          title="LinkedIn">
                          <Linkedin size={15} />
                        </a>
                      )}
                      {m.instagram && (
                        <a href={m.instagram} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                          style={{ background: "rgba(26,26,110,0.07)", color: "var(--muted-foreground)" }}
                          title="Instagram">
                          <Instagram size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{a.valuesLabel}</p>
            <h2 className="text-foreground">{a.valuesTitle}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((v, i) => (
              <div key={i} className="card-pro">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(26,26,110,0.03))" }}>
                  {valueIcons[i]}
                </div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-family)", fontSize: "1rem" }}>{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-24 relative z-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="section-label" style={{ color: "var(--accent-light, #f0d98a)", justifyContent: "center" }}>{a.ctaLabel}</p>
          <h2 className="text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>{a.ctaTitle}</h2>
          <div className="gold-line gold-line-center" />
          <p className="text-white/70 text-lg mb-10 mt-4 font-light">{a.ctaDesc}</p>
          <Link href="/contact">
            <button className="inline-flex items-center px-9 py-4 bg-white rounded-lg font-semibold text-base hover:bg-white/92 transition-all hover:-translate-y-1 duration-200 cursor-pointer"
              style={{ color: "var(--primary)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
              {a.ctaButton}
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}