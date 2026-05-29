'use client';

import Link from "next/link";
import { 
  Target, Users, Lightbulb, Award, Github, Linkedin, Instagram, Loader2, 
  Terminal as TerminalIcon, FileCode2, Eye, ShieldCheck, Zap, Cpu, History
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DbTeamMember } from "../admin/AdminTeam";
import { SEOHead } from '../components/seo/SEOHead';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';
import { motion, AnimatePresence } from "framer-motion";

/* ─── Static Fallback & Local High-Fidelity Specs ─── */
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

interface MemberDetails {
  stack: string[];
  uptime: string;
  commits: string;
  location: string;
  status: string;
  jsonConfig: Record<string, any>;
}

const MEMBER_DETAILS: Record<string, MemberDetails> = {
  "Rynas Kebdi": {
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "n8n", "OpenAI API"],
    uptime: "99.9%",
    commits: "1,240+",
    location: "Béjaïa / Alger, DZ",
    status: "Active",
    jsonConfig: {
      "focus": "Front-end Engineering & AI Automation Architect",
      "core_skills": ["React/Next.js", "AI Integration", "Process Automation"],
      "tools": ["n8n", "VS Code", "Figma", "Git"],
      "operating_since": 2020,
      "philosophy": "Zero-bloat, performance-obsessed interfaces."
    }
  },
  "Ryan AitBessai": {
    stack: ["Node.js", "Express", "PostgreSQL", "Supabase", "Docker", "REST/GraphQL APIs", "Linux"],
    uptime: "100%",
    commits: "980+",
    location: "Alger, DZ",
    status: "Active",
    jsonConfig: {
      "focus": "Backend Architecture & Database Optimization",
      "core_skills": ["PostgreSQL/Supabase", "API Security", "Server Orchestration"],
      "tools": ["Docker", "Postman", "DBeaver", "Terminal"],
      "operating_since": 2021,
      "philosophy": "Scalable systems built on clean schemas."
    }
  },
  "Amar Bellabas": {
    stack: ["Figma", "UI/UX Design", "Wireframing", "Web Security Audit", "Penetration Testing"],
    uptime: "99.8%",
    commits: "430+",
    location: "Béjaïa, DZ",
    status: "Active",
    jsonConfig: {
      "focus": "Creative Direction & Defensive CyberSecurity",
      "core_skills": ["UI/UX Design Systems", "Vulnerability Auditing", "Social Engineering Analysis"],
      "tools": ["Figma", "Burp Suite", "Nmap", "Wireshark"],
      "operating_since": 2021,
      "philosophy": "Bespoke design meets bulletproof protection."
    }
  }
};

const DEFAULT_MEMBER_DETAILS: MemberDetails = {
  stack: ["HTML", "CSS", "JavaScript"],
  uptime: "99.5%",
  commits: "100+",
  location: "Algérie",
  status: "Active",
  jsonConfig: {
    "focus": "Fullstack Web Solutions",
    "core_skills": ["Responsive Web", "Integrations"],
    "tools": ["Git", "Editor"],
    "operating_since": 2022,
    "philosophy": "Quality digital solutions."
  }
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

  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"config" | "terminal" | "bio">("config");

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

  const activeMember = team[activeMemberIndex] || team[0] || STATIC_TEAM[0];
  const activeDetails = MEMBER_DETAILS[activeMember?.name] || DEFAULT_MEMBER_DETAILS;

  return (
    <>
      <SEOHead page="about" />
      <BreadcrumbSchema items={BREADCRUMBS.about} />
      
      {/* Schema Markup for Page */}
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

        {/* Dynamic Studio Console Section (Team) */}
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Sidebar: Team selector */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-1">
                    System Nodes / Developers
                  </div>
                  {team.map((member, idx) => {
                    const isSelected = activeMemberIndex === idx;
                    return (
                      <button
                        key={member.id}
                        onClick={() => setActiveMemberIndex(idx)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
                          isSelected
                            ? "bg-card border-accent/60 shadow-md translate-x-1"
                            : "bg-card/40 border-border/50 hover:bg-card/85 hover:border-border"
                        }`}
                      >
                        {/* Selector indicator */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                        )}
                        
                        {/* Initial Circle */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                            isSelected ? "scale-105" : ""
                          }`}
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

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-foreground truncate">
                            {member.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {getMemberRole(member)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Workspace Console */}
                <div className="lg:col-span-8 bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[460px]">
                  {/* Console Header */}
                  <div className="bg-muted/70 px-4 py-3 border-b border-border/80 flex items-center justify-between flex-wrap gap-3">
                    {/* Window Controls Decorator */}
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="text-xs text-muted-foreground font-mono ml-2 shrink-0">
                        {activeMember?.name.toLowerCase().replace(/\s+/g, '-')}.workspace
                      </span>
                    </div>

                    {/* Console Tab Selectors */}
                    <div className="flex items-center gap-1.5 bg-background/50 p-1 rounded-lg border border-border/50">
                      <button
                        onClick={() => setActiveConsoleTab("config")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                          activeConsoleTab === "config"
                            ? "bg-card text-accent font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <FileCode2 size={13} />
                        config.json
                      </button>
                      <button
                        onClick={() => setActiveConsoleTab("terminal")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                          activeConsoleTab === "terminal"
                            ? "bg-card text-accent font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <TerminalIcon size={13} />
                        terminal.sh
                      </button>
                      <button
                        onClick={() => setActiveConsoleTab("bio")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                          activeConsoleTab === "bio"
                            ? "bg-card text-accent font-bold"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Eye size={13} />
                        vision.md
                      </button>
                    </div>
                  </div>

                  {/* Console Body Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between font-mono text-sm leading-relaxed min-h-[360px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeMember?.name}-${activeConsoleTab}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1"
                      >
                        {/* TAB 1: Config JSON Viewer */}
                        {activeConsoleTab === "config" && (
                          <div className="text-left select-all overflow-x-auto text-xs sm:text-sm">
                            <span className="text-[#a78bfa]">{`{`}</span>
                            <div className="pl-6 space-y-1">
                              <div>
                                <span className="text-[#f472b6]">"focus"</span>: <span className="text-[#34d399]">"{activeDetails.jsonConfig.focus}"</span>,
                              </div>
                              <div>
                                <span className="text-[#f472b6]">"skills"</span>: <span className="text-[#cbd5e1]">[</span>
                                {activeDetails.jsonConfig.core_skills.map((skill: string, i: number) => (
                                  <span key={skill}>
                                    <span className="text-[#34d399]">"{skill}"</span>
                                    {i < activeDetails.jsonConfig.core_skills.length - 1 && <span className="text-[#cbd5e1]">, </span>}
                                  </span>
                                ))}
                                <span className="text-[#cbd5e1]">]</span>,
                              </div>
                              <div>
                                <span className="text-[#f472b6]">"tools"</span>: <span className="text-[#cbd5e1]">[</span>
                                {activeDetails.jsonConfig.tools.map((tool: string, i: number) => (
                                  <span key={tool}>
                                    <span className="text-[#34d399]">"{tool}"</span>
                                    {i < activeDetails.jsonConfig.tools.length - 1 && <span className="text-[#cbd5e1]">, </span>}
                                  </span>
                                ))}
                                <span className="text-[#cbd5e1]">]</span>,
                              </div>
                              <div>
                                <span className="text-[#f472b6]">"operating_since"</span>: <span className="text-[#fb923c]">{activeDetails.jsonConfig.operating_since}</span>,
                              </div>
                              <div>
                                <span className="text-[#f472b6]">"philosophy"</span>: <span className="text-[#34d399]">"{activeDetails.jsonConfig.philosophy}"</span>
                              </div>
                            </div>
                            <span className="text-[#a78bfa]">{`}`}</span>
                          </div>
                        )}

                        {/* TAB 2: Interactive Terminal Shell */}
                        {activeConsoleTab === "terminal" && (
                          <div className="space-y-3 text-left font-mono text-xs sm:text-sm">
                            <div className="text-muted-foreground">
                              $ xenon-dz --node {activeMember?.name.toLowerCase().replace(/\s+/g, '-')}
                            </div>
                            <div className="space-y-1">
                              <div>
                                <span className="text-accent font-semibold">[STATUS]</span> Connection stable
                              </div>
                              <div>
                                <span className="text-accent font-semibold">[UPTIME]</span> {activeDetails.uptime} operational efficiency
                              </div>
                              <div>
                                <span className="text-accent font-semibold">[COMMITS]</span> {activeDetails.commits} contributions this year
                              </div>
                              <div>
                                <span className="text-accent font-semibold">[LOCATION]</span> {activeDetails.location}
                              </div>
                            </div>
                            <div className="pt-2">
                              <span className="text-muted-foreground">$</span> <span className="text-[#34d399]">cat stack.config</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {activeDetails.stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="bg-muted px-2.5 py-1 rounded text-xs text-foreground font-mono border border-border/40"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-4">
                              <span className="w-1.5 h-4 bg-accent animate-pulse" />
                            </div>
                          </div>
                        )}

                        {/* TAB 3: Humans bio & social links */}
                        {activeConsoleTab === "bio" && (
                          <div className="flex flex-col h-full justify-between text-left font-sans">
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold text-foreground">
                                {getMemberRole(activeMember)}
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                {getMemberBio(activeMember)}
                              </p>
                            </div>

                            {/* Custom Member Socials */}
                            {(activeMember.github || activeMember.linkedin || activeMember.instagram) && (
                              <div className="flex items-center gap-3 pt-6 border-t border-border mt-8">
                                {activeMember.github && (
                                  <a
                                    href={memberGithub(activeMember)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/80 bg-background"
                                    title="GitHub"
                                  >
                                    <Github size={16} />
                                  </a>
                                )}
                                {activeMember.linkedin && (
                                  <a
                                    href={memberLinkedin(activeMember)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/80 bg-background"
                                    title="LinkedIn"
                                  >
                                    <Linkedin size={16} />
                                  </a>
                                )}
                                {activeMember.instagram && (
                                  <a
                                    href={memberInstagram(activeMember)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-primary/10 hover:-translate-y-0.5 border border-border/80 bg-background"
                                    title="Instagram"
                                  >
                                    <Instagram size={16} />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
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