'use client';

import Link from "next/link";
import { 
  Target, Users, Lightbulb, Award, Github, Linkedin, Instagram, Loader2, 
  Eye, ShieldCheck, Zap, Cpu, History
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DbTeamMember } from "../admin/AdminTeam";
import { SEOHead } from '../components/seo/SEOHead';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';

/* ─── Static Fallback & Local Specs ─── */
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
    bio_fr: "Spécialiste Backend & Base de données.", bio_en: "Backend & Database specialist.", bio_ar: "متخصص في الواجهة الخلفية وقواعد البيانات.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
  {
    id: "3", name: "Amar Bellabas", sort_order: 2, is_active: true,
    role_fr: "Directeur Créatif & Cybersécurité", role_en: "Creative Director & Cybersecurity", role_ar: "المدير الإبداعي والأمن السيبراني",
    bio_fr: "Spécialiste UI/UX, consultant cybersécurité.", bio_en: "UI/UX specialist, cybersecurity consultant.", bio_ar: "متخصص في UI/UX واستشاري أمن سيبراني.",
    avatar_url: "", github: "", linkedin: "", instagram: "",
  },
];

interface MemberSpec {
  stack: string[];
  location: string;
}

const MEMBER_SPECS: Record<string, MemberSpec> = {
  "Rynas Kebdi": {
    stack: ["React", "Next.js", "TypeScript", "Python", "n8n", "AI API"],
    location: "Béjaïa / Alger"
  },
  "Ryan AitBessai": {
    stack: ["Node.js", "PostgreSQL", "Supabase", "Docker", "REST API"],
    location: "Alger"
  },
  "Amar Bellabas": {
    stack: ["Figma", "UI/UX Design", "Pentesting", "Security Audit"],
    location: "Béjaïa"
  }
};

const DEFAULT_MEMBER_SPEC: MemberSpec = {
  stack: ["Next.js", "React", "Tailwind"],
  location: "Algérie"
};

/* ─── Local Manifesto Translations (No Clichés) ─── */
const MANIFESTO_TRANSLATIONS = {
  fr: {
    title: "Le Manifeste Xenon",
    subtitle: "Zéro bla-bla, du code et des performances mesurables.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "0% Bloatware, 100% Core Code",
        desc: "Nous rejetons WordPress, Shopify et les templates pré-conçus. Chaque ligne de code est écrite sur mesure en React et Next.js. Vitesse brute et performances maximales sur les réseaux mobiles algériens (3G/4G/ADSL)."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "Optimisé Réalités E-commerce",
        desc: "Le marché algérien a ses particularités. Nous concevons nos tunnels de commande pour le paiement à la livraison (CoD), avec des formulaires d'achat ultra-rapides et des intégrations de validation SMS/WhatsApp."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "Délais garantis ou pénalité",
        desc: "Le respect des délais est un engagement contractuel chez nous. Si nous livrons votre projet en retard, une pénalité financière automatique est appliquée et déduite de votre facture finale."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "Sécurité & Audits intégrés",
        desc: "La cybersécurité n'est pas une option ajoutée à la fin. Elle est implémentée dès la conception : anti-DDoS, chiffrement des données, et audits de vulnérabilité complets avant chaque mise en ligne."
      }
    ]
  },
  en: {
    title: "The Xenon Manifesto",
    subtitle: "No fluff, pure code, and measurable performance.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "0% Bloatware, 100% Core Code",
        desc: "We reject heavy CMS, WordPress templates, and page builders. Every single website is built line-by-line using Next.js and React. Pure loading speed even on slow mobile networks."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "Designed for Local Realities",
        desc: "Native Cash-on-Delivery (CoD) checkout forms, optimized local mobile responsiveness, one-click ordering systems, and SMS/WhatsApp confirmation workflows."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "Guaranteed Deadlines",
        desc: "We respect your time. If we miss the agreed delivery deadline by even a single day, a financial penalty is automatically applied and deducted from your final invoice."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "Secure by Architecture",
        desc: "Security is built directly into our frameworks. Encrypted databases, protection against common web vulnerabilities, and security auditing before production launch."
      }
    ]
  },
  ar: {
    title: "بيان كسينون البرمجي",
    subtitle: "بدون تعقيد، شيفرة برمجية نقية وأداء قابل للقياس.",
    items: [
      {
        icon: <Cpu size={22} className="text-primary dark:text-accent" />,
        title: "0% ووردبريس، 100% برمجة نقية",
        desc: "نرفض استخدام القوالب الجاهزة والأنظمة الثقيلة. نكتب كل سطر برمجي باستخدام React و Next.js لضمان سرعة فائقة على شبكات الاتصال الجزائرية."
      },
      {
        icon: <Zap size={22} className="text-primary dark:text-accent" />,
        title: "مطور لواقع التجارة المحلية",
        desc: "تسهيل عمليات الدفع عند الاستلام (CoD) بنماذج سريعة بضغطة واحدة، وتكامل أنظمة التوصيل والتحقق عبر SMS أو WhatsApp."
      },
      {
        icon: <History size={22} className="text-primary dark:text-accent" />,
        title: "احترام تام للمواعيد أو خصم مالي",
        desc: "الوقت ذو قيمة عالية. إذا تأخرنا في تسليم المشروع ولو ليوم واحد، يتم تطبيق خصم مالي تلقائي ومباشر من الفاتورة النهائية."
      },
      {
        icon: <ShieldCheck size={22} className="text-primary dark:text-accent" />,
        title: "أمن مدمج وحماية متكاملة",
        desc: "الحماية السيبرانية ليست مجرد خيار إضافي. نقوم بتأمين المواقع في صلب البنية التحتية البرمجية مع تشفير البيانات وفحص الثغرات قبل الإطلاق."
      }
    ]
  }
};

function useTeam() {
  const [team, setTeam] = useState<DbTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return { team, loading };
}

export function About() {
  const { t, lang: language } = useLanguage();
  const a = t.about;
  const { team, loading } = useTeam();

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

        {/* Clean, Non-Interactive developer-themed team section */}
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
                      {/* Top section: header & status */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          {/* Profile Circle */}
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                            style={{
                              background: "linear-gradient(135deg, rgba(26,26,110,0.1), rgba(201,168,76,0.1))",
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

                          {/* Node status dot decorator */}
                          <div className="flex items-center gap-1.5 bg-muted/60 px-2 py-1 rounded-md text-[10px] font-mono text-muted-foreground border border-border/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
                            Active
                          </div>
                        </div>

                        {/* Name & Role */}
                        <div className="space-y-1 mb-4">
                          <h3 className="text-base font-bold text-foreground font-sans">
                            {member.name}
                          </h3>
                          <p className="text-xs font-semibold text-accent font-sans">
                            {getMemberRole(member)}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            // Based in {spec.location}, DZ
                          </p>
                        </div>

                        {/* Bio */}
                        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-6 font-light">
                          {getMemberBio(member)}
                        </p>
                      </div>

                      {/* Bottom section: Core Stack config & Socials */}
                      <div>
                        {/* Custom Code Block look for Stack */}
                        <div className="bg-muted/50 border border-border/40 rounded-xl p-3 mb-4 font-mono text-[11px]">
                          <span className="text-[#a78bfa]">stack</span>: <span className="text-[#cbd5e1]">[</span>
                          <div className="flex flex-wrap gap-x-1.5 gap-y-1 mt-1 pl-3">
                            {spec.stack.map((tech, i) => (
                              <span key={tech}>
                                <span className="text-[#34d399]">"{tech}"</span>
                                {i < spec.stack.length - 1 && <span className="text-[#cbd5e1]">,</span>}
                              </span>
                            ))}
                          </div>
                          <span className="text-[#cbd5e1] ml-3">]</span>
                        </div>

                        {/* Social Networks Row */}
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