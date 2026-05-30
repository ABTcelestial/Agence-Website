'use client';

import Link from "next/link";
import { 
  Target, Users, Lightbulb, Award, Github, Linkedin, Instagram, Loader2, 
  ShieldCheck, Zap, Cpu, History, Briefcase, MapPin
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DbTeamMember } from "../admin/AdminTeam";
import { SEOHead } from '../components/seo/SEOHead';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';

/* ─── Static Fallback & Non-Technical Specs ─── */
const STATIC_TEAM: DbTeamMember[] = [
  {
    id: "1", name: "Rynas Kebdi", sort_order: 0, is_active: true,
    role_fr: "Directeur de l'Agence & Fondateur", role_en: "Agency Director & Founder", role_ar: "مدير الوكالة والمؤسس",
    bio_fr: "Spécialiste de la création de sites web performants et de l'intégration d'outils d'automatisation intelligente pour les entreprises.",
    bio_en: "Specialist in building high-performance websites and integrating intelligent automation tools for businesses.",
    bio_ar: "متخصص في إنشاء مواقع ويب عالية الأداء ودمج أدوات الأتمتة الذكية للمؤسسات.",
    avatar_url: "", github: "https://github.com/sayniir",
    linkedin: "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
    instagram: "https://www.instagram.com/xenon.dz",
  },
  {
    id: "2", name: "Ryan AitBessai", sort_order: 1, is_active: true,
    role_fr: "Directeur Technique & Co-Fondateur", role_en: "Technical Director & Co-Founder", role_ar: "المدير التقني والمؤسس المشارك",
    bio_fr: "Expert en architecture web et en optimisation des bases de données pour garantir des sites rapides et sécurisés.",
    bio_en: "Expert in web architecture and database optimization to guarantee fast and secure websites.",
    bio_ar: "خبير في هندسة الويب وتحسين قواعد البيانات لضمان مواقع سريعة وآمنة.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
  {
    id: "3", name: "Amar Bellabas", sort_order: 2, is_active: true,
    role_fr: "Directeur de Création & Sécurité", role_en: "Creative & Security Director", role_ar: "المدير الإبداعي والأمني",
    bio_fr: "Créateur d'interfaces sur mesure modernes (ergonomie UI/UX) et consultant en protection des données en ligne.",
    bio_en: "Designer of modern custom interfaces (UI/UX ergonomics) and consultant in online data protection.",
    bio_ar: "مصمم واجهات مخصصة وعصرية (UI/UX) ومستشار في حماية البيانات عبر الإنترنت.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
];

interface MemberSpec {
  skills: string[];
  location: string;
}

const MEMBER_SPECS: Record<string, MemberSpec> = {
  "Rynas Kebdi": {
    skills: ["Création de Sites", "Automatisation", "IA & Processus"],
    location: "Béjaïa / Alger"
  },
  "Ryan AitBessai": {
    skills: ["Développement Web", "Performance", "Bases de données"],
    location: "Alger"
  },
  "Amar Bellabas": {
    skills: ["Design UI/UX", "Ergonomie", "Sécurité Web"],
    location: "Béjaïa"
  }
};

const DEFAULT_MEMBER_SPEC: MemberSpec = {
  skills: ["Création de Sites", "Développement"],
  location: "Algérie"
};

/* ─── Local Manifesto Translations (Pure Business Value, No Technical Jargon) ─── */
const MANIFESTO_TRANSLATIONS = {
  fr: {
    title: "Nos Engagements",
    subtitle: "Des résultats concrets et un accompagnement transparent pour votre croissance.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "Technologie sur-mesure ultra-rapide",
        desc: "Nous concevons des sites modernes et fluides sans utiliser de modèles lourds ou obsolètes. Votre site s'affiche instantanément, même sur les connexions mobiles courantes en Algérie."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "Adapté au marché algérien",
        desc: "Nous optimisons vos ventes avec des formulaires simplifiés pour le paiement à la livraison (CoD), et des outils d'envoi automatique de confirmations par SMS ou WhatsApp."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "Respect strict des délais de livraison",
        desc: "Votre temps est précieux. Nous nous engageons contractuellement sur une date de livraison. Si nous dépassons ce délai, une réduction financière est appliquée à votre facture."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "Sécurité et protection des données",
        desc: "Nous protégeons votre site et les informations de vos clients contre le piratage. Chaque projet intègre les meilleures protections de sécurité dès le premier jour."
      }
    ]
  },
  en: {
    title: "Our Commitments",
    subtitle: "Concrete results and transparent partnership for your business growth.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "Ultra-fast custom technology",
        desc: "We build modern, lightweight websites without bloated templates. Your site loads instantly, even on standard mobile networks."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "Built for local Algerian markets",
        desc: "Optimized checkouts for Cash-on-Delivery (CoD) processes, simple one-click forms, and direct SMS or WhatsApp validation tools."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "Strict delivery deadlines",
        desc: "Your time is valuable. We commit to a precise delivery date. In case of delay, a clear financial discount is automatically applied to your bill."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "Security & customer protection",
        desc: "We secure your platform and keep your customer databases protected. Standard security frameworks are active by default on every release."
      }
    ]
  },
  ar: {
    title: "التزاماتنا",
    subtitle: "نتائج ملموسة وشراكة شفافة لتطوير أعمالك.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "تقنية مخصصة وسريعة للغاية",
        desc: "نقوم بتصميم مواقع عصرية وسريعة دون استخدام قوالب ثقيلة. يفتح موقعك فورًا حتى على شبكات الهاتف النقال العادية."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "متوافق مع السوق الجزائرية",
        desc: "تسهيل عمليات الشراء بنماذج مخصصة للدفع عند الاستلام (CoD)، مع إمكانية التأكيد التلقائي عبر رسائل القصيرة أو WhatsApp."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "احترام تام لمواعيد التسليم",
        desc: "نلتزم بموعد تسليم محدد بدقة. في حالة التأخر، يتم تطبيق خصم مالي تلقائي ومباشر من قيمة الفاتورة."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "حماية البيانات وأمن المواقع",
        desc: "نحمي موقعك وقواعد بيانات عملائك ضد الاختراقات الأمنية. الحماية مدمجة بشكل أساسي في كل مشروع."
      }
    ]
  }
};

function useTeam(initialTeam?: DbTeamMember[]) {
  const [team, setTeam] = useState<DbTeamMember[]>(
    initialTeam && initialTeam.length > 0 ? initialTeam : []
  );
  const [loading, setLoading] = useState(initialTeam && initialTeam.length > 0 ? false : true);

  useEffect(() => {
    if (initialTeam && initialTeam.length > 0) {
      setLoading(false);
      return;
    }
    async function fetchTeam() {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });
        
        if (error) throw error;
        setTeam(data && data.length > 0 ? (data as DbTeamMember[]) : STATIC_TEAM);
      } catch (err) {
        setTeam(STATIC_TEAM);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [initialTeam]);

  return { team, loading };
}

export function About({ initialTeam }: { initialTeam?: DbTeamMember[] }) {
  const { t, lang: language } = useLanguage();
  const a = t.about;
  const { team, loading } = useTeam(initialTeam);

  const manifesto = MANIFESTO_TRANSLATIONS[language as "fr" | "en" | "ar"] || MANIFESTO_TRANSLATIONS.fr;

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

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <>
      <SEOHead page="about" />
      <BreadcrumbSchema items={BREADCRUMBS.about} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "À propos de XenonDz — Agence Digitale Algérienne",
            "description": "XenonDz est une agence digitale fondée à Béjaïa, Algérie, spécialisée dans le développement Next.js, l'e-commerce et l'automatisation intelligente.",
            "url": "https://xenondz.vercel.app/about",
            "mainEntity": {
              "@id": "https://xenondz.vercel.app/#organization"
            }
          })
        }}
      />

      <div className="w-full relative overflow-hidden bg-background">
        {/* Ambient Decorative Orbs */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 premium-glow-orb float-orb" />
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/8 premium-glow-orb float-orb-2" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 premium-grid border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto hero-animate-1">
              <span className="section-label" style={{ justifyContent: "center" }}>
                {a.heroLabel}
              </span>
              <h1 className="text-foreground tracking-tight mb-4 font-black">
                {a.heroTitle1} <br />
                <span className="hero-title-gradient">
                  <em>{a.heroTitleEm}</em>
                </span>
              </h1>
              <div className="gold-line gold-line-center" />
              <p className="text-base sm:text-lg text-muted-foreground mt-4 font-light max-w-2xl mx-auto leading-relaxed">
                {a.heroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Clean, Non-Technical Grid for Agency Profile */}
        <section className="py-24 relative border-b border-border/40 bg-background/50 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-label" style={{ justifyContent: "center" }}>
                {a.teamLabel}
              </span>
              <h2 className="text-foreground font-bold tracking-tight">{a.teamTitle}</h2>
              <div className="gold-line gold-line-center" />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 size={32} className="animate-spin text-primary dark:text-accent" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {team.map((member) => {
                  const spec = MEMBER_SPECS[member.name] || DEFAULT_MEMBER_SPEC;
                  return (
                    <div
                      key={member.id}
                      className="bg-card border border-border/80 rounded-2xl shadow-lg p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-accent/40"
                    >
                      <div>
                        {/* Avatar and Location */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-border/50"
                            style={{
                              background: "linear-gradient(135deg, rgba(26,26,110,0.06), rgba(201,168,76,0.06))",
                              color: "var(--primary)"
                            }}
                          >
                            {member.avatar_url ? (
                              <img
                                src={member.avatar_url}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <span>{initials(member.name)}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/30">
                            <MapPin size={12} className="text-accent" />
                            {spec.location}
                          </div>
                        </div>

                        {/* Identity */}
                        <div className="space-y-1 mb-4">
                          <h3 className="text-base font-bold text-foreground font-sans">
                            {member.name}
                          </h3>
                          <p className="text-xs font-medium text-accent font-sans">
                            {getMemberRole(member)}
                          </p>
                        </div>

                        {/* Bio */}
                        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-6 font-light">
                          {getMemberBio(member)}
                        </p>
                      </div>

                      {/* Expertise and Social Networks */}
                      <div>
                        {/* Plain text expertise badges instead of code array */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {spec.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs text-foreground font-medium font-sans border border-border/30"
                            >
                              <Briefcase size={10} className="text-primary dark:text-accent shrink-0" />
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Simple Social Links */}
                        {(member.github || member.linkedin || member.instagram || member.name === "Rynas Kebdi") && (
                          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                            {memberGithub(member) !== "#" && (
                              <a
                                href={memberGithub(member)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/60 bg-background"
                                title="GitHub"
                              >
                                <Github size={14} className="text-muted-foreground hover:text-foreground" />
                              </a>
                            )}
                            {memberLinkedin(member) !== "#" && (
                              <a
                                href={memberLinkedin(member)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/60 bg-background"
                                title="LinkedIn"
                              >
                                <Linkedin size={14} className="text-muted-foreground hover:text-foreground" />
                              </a>
                            )}
                            {memberInstagram(member) !== "#" && (
                              <a
                                href={memberInstagram(member)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/60 bg-background"
                                title="Instagram"
                              >
                                <Instagram size={14} className="text-muted-foreground hover:text-foreground" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Custom Manifesto Bento Section */}
        <section className="py-24 bg-muted/30 relative border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="section-label" style={{ justifyContent: "center" }}>
                {a.valuesLabel}
              </span>
              <h2 className="text-foreground font-bold tracking-tight">{manifesto.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 font-light">
                {manifesto.subtitle}
              </p>
              <div className="gold-line gold-line-center" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {manifesto.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border/85 rounded-2xl p-6 lg:p-8 shadow-sm hover:border-accent/40 transition-colors duration-300 relative group overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/40 group-hover:bg-accent/10 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-foreground font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Call to Action */}
        <section className="cta-section py-24 relative z-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="section-label" style={{ color: "var(--accent-light, #f0d98a)", justifyContent: "center" }}>
              {a.ctaLabel}
            </span>
            <h2 className="text-white mb-4 tracking-tight font-black">
              {a.ctaTitle}
            </h2>
            <div className="gold-line gold-line-center" />
            <p className="text-white/70 text-base sm:text-lg mb-10 mt-4 font-light leading-relaxed">
              {a.ctaDesc}
            </p>
            <Link href="/contact">
              <button
                className="inline-flex items-center px-8 py-3.5 bg-white rounded-lg font-bold text-sm hover:bg-white/95 transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                style={{ color: "var(--primary)", boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }}
              >
                {a.ctaButton}
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* Helper functions for fallback safety */
function memberGithub(m: DbTeamMember) {
  if (m.name === "Rynas Kebdi") return "https://github.com/sayniir";
  return m.github || "#";
}

function memberLinkedin(m: DbTeamMember) {
  if (m.name === "Rynas Kebdi") return "https://www.linkedin.com/in/rynas-kebdi-526b70364/";
  return m.linkedin || "#";
}

function memberInstagram(m: DbTeamMember) {
  if (m.name === "Rynas Kebdi") return "https://www.instagram.com/xenon.dz";
  return m.instagram || "#";
}