import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, CheckCircle2, Sparkles, Globe, Cog, Terminal, Cpu, Database, Activity, Code2, Rocket } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { SEOHead } from '../components/seo/SEOHead';

export function Home() {
  const { t, dir } = useLanguage();
  const h = t.home;

  return (
    <>
      <SEOHead page="home" />
      <div className="w-full relative bg-background overflow-hidden" dir={dir}>
        
        {/* PREMIUM MESH & GRID BACKGROUND ACCENTS */}
        <div className="absolute inset-0 premium-grid opacity-60 pointer-events-none z-0" />
        
        {/* Floating Ambient Glow Orbs */}
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full premium-glow-orb bg-indigo-900/10 dark:bg-primary/5" />
        <div className="absolute top-[40%] left-[-15%] w-[500px] h-[500px] rounded-full premium-glow-orb bg-amber-500/5 dark:bg-accent/5" />
        <div className="absolute bottom-[15%] right-[-5%] w-[550px] h-[550px] rounded-full premium-glow-orb bg-indigo-900/10 dark:bg-primary/5" />

        {/* HERO SECTION */}
        <section className="relative overflow-hidden min-h-[92vh] flex items-center pt-8 pb-16 sm:py-24 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              
              {/* Premium Luxury Badge */}
              <div className="hero-animate-1 inline-flex items-center gap-2 px-4 py-2 bg-primary/[0.04] dark:bg-white/[0.02] border border-primary/10 dark:border-white/5 backdrop-blur-md rounded-full mb-8 text-xs font-semibold tracking-wider text-primary dark:text-accent shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-accent/30 transition-all duration-300">
                <Sparkles size={12} className="text-accent animate-pulse" />
                <span className="uppercase">{h.heroBadge}</span>
              </div>

              {/* Title with Bodoni Moda / DM Sans mix */}
              <h1 className="hero-animate-2 hero-title-gradient mb-7 text-5xl sm:text-7xl font-extrabold text-foreground tracking-tight leading-[1.08]">
                {h.heroTitle1}<br />
                <span className="inline-block relative">
                  {h.heroTitle2}{" "}
                  <em className="not-italic font-serif font-light text-accent bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent italic relative z-10">
                    {h.heroTitleEm}
                  </em>
                  {/* Subtle underline blur */}
                  <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-accent/15 blur-sm -z-10 rounded-full" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-animate-3 text-lg sm:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                {h.heroDesc}
              </p>

              {/* Primary / Secondary luxury action buttons */}
              <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <button className="btn-primary-pro inline-flex items-center justify-center gap-2 px-8 py-4 text-base text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-semibold cursor-pointer w-full sm:w-auto">
                    {h.heroCta}
                    <ArrowRight size={18} className={`${dir === "rtl" ? "rotate-180" : ""}`} />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base border border-border bg-card/30 backdrop-blur-md rounded-xl hover:border-accent/40 hover:bg-secondary/80 transition-all duration-300 font-semibold text-foreground cursor-pointer w-full sm:w-auto">
                    {h.heroSecondary}
                  </button>
                </Link>
              </div>

              {/* Dynamic Stats Panel - Styled as high-end dashboard strip */}
              <div className="hero-animate-4 mt-20 p-6 sm:p-8 bg-card/40 dark:bg-slate-900/20 backdrop-blur-xl border border-border/40 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto shadow-2xl shadow-primary/5">
                {h.stats.map((s, i) => (
                  <div key={i} className="text-center relative group">
                    {/* Vertical Divider */}
                    {i > 0 && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-border/50 hidden sm:block" />
                    )}
                    <div className="stat-number text-2xl sm:text-3xl font-extrabold" style={{ fontSize: "1.8rem" }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground/60 mt-1 font-extrabold tracking-widest uppercase">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* MESH GRADIENT DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* AEO: DIRECT ANSWER TERMINAL WIDGET */}
        <section className="py-12 bg-background/30 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal glass-panel border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
              {/* Terminal top bar */}
              <div className="px-5 py-3 border-b border-border/40 bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-accent" />
                  <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">
                    xenon.engine // direct_index_status
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
              </div>
              <blockquote className="p-6 sm:p-8 bg-card/10">
                <p className="text-foreground font-medium leading-relaxed mb-4 text-base sm:text-lg">
                  XenonDz est une agence digitale basée à Béjaïa, Algérie, spécialisée dans la création de sites web sur mesure, le développement e-commerce et l’automatisation de processus métier.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">Sites vitrines livrés en <strong>7–10 jours</strong>, à partir de <strong>20 000 DA</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">Boutiques e-commerce adaptées au marché algérien (livraison & cash-on-delivery)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">Automatisation Python — scraping, génération de leads, CRM sync</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">SEO on-page inclus dans chaque projet & 6 mois de support offerts</span>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* POURQUOI NOUS (Why Us) SECTION - ASYMMETRIC GRID */}
        <section className="py-24 bg-background/20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <p className="section-label" style={{ justifyContent: "center" }}>{h.whyLabel}</p>
              <h2 className="text-foreground text-3xl sm:text-5xl font-bold tracking-tight">{h.whyTitle}</h2>
              <div className="gold-line gold-line-center" />
              <p className="text-muted-foreground font-light mt-3">{h.whyDesc}</p>
            </div>

            {/* Asymmetric Luxury Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {h.whyCards.map((item, index) => {
                const icons = [
                  <Zap size={24} className="text-accent" />,
                  <Shield size={24} className="text-accent" />,
                  <TrendingUp size={24} className="text-accent" />,
                ];
                // Highlight middle card for premium feel
                const isMiddle = index === 1;
                return (
                  <div 
                    key={index} 
                    className={`card-pro relative overflow-hidden transition-all duration-300 group cursor-default ${
                      isMiddle 
                        ? "border-accent/40 shadow-xl shadow-accent/5 md:-translate-y-2 bg-gradient-to-b from-card to-secondary/30" 
                        : "border-border/50 hover:border-primary/30"
                    }`}
                  >
                    {/* Interior glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}
                      style={{ 
                        background: isMiddle 
                          ? "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))" 
                          : "linear-gradient(135deg, rgba(26,26,110,0.06), rgba(26,26,110,0.02))"
                      }}>
                      {icons[index]}
                    </div>
                    
                    <h3 className="font-bold text-foreground text-lg mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* BÉNÉFICES SECTION - WITH PREMIUM ACTIVE VISUAL PREVIEW */}
        <section className="py-24 relative z-10" style={{ background: "var(--muted)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Side text */}
              <div className="lg:col-span-5 reveal">
                <p className="section-label">{h.benefitsLabel}</p>
                <h2 className="text-foreground text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                  {h.benefitsTitle1}<br />
                  <span className="text-accent italic font-serif font-light">{h.benefitsTitle2}</span>
                </h2>
                <div className="gold-line" />
                
                <div className="space-y-4.5 mt-8">
                  {h.benefitsList.map((b, i) => (
                    <div key={i} className="flex items-start gap-3.5 group">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/20 group-hover:border-accent/50 transition-colors"
                        style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))" }}>
                        <CheckCircle2 size={13} className="text-accent" />
                      </div>
                      <p className="text-foreground/90 text-sm leading-relaxed font-medium">{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Interactive mockup widget dashboard (Highly original) */}
              <div className="lg:col-span-7 reveal reveal-delay-2">
                <div className="relative">
                  {/* Decorative mesh back shadow */}
                  <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl -z-10" />
                  
                  {/* Real visual dashboard mockup */}
                  <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -z-10" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">
                          live_automation_feed
                        </span>
                      </div>
                      <span className="text-[10px] bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent font-semibold px-2 py-0.5 rounded-full border border-primary/20 dark:border-accent/20">
                        XenonEngine v2.0
                      </span>
                    </div>

                    {/* Stats & Charts mockup */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {h.resultsItems.map((stat, i) => {
                        const icons = [
                          <Globe size={16} className="text-accent" />,
                          <Cog size={16} className="text-accent" />,
                          <TrendingUp size={16} className="text-accent" />,
                        ];
                        return (
                          <div key={i} className="p-4 rounded-2xl border border-border bg-background/50 hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-8 h-8 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-3">
                              {icons[i]}
                            </div>
                            <div className="text-[10px] text-muted-foreground truncate">{stat.label}</div>
                            <div className="text-xl font-bold text-foreground mt-1">{stat.value}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Unified Live Interactive Graphic (SVG curve of grow metrics) */}
                    <div className="p-5 rounded-2xl border border-border bg-background/40 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-accent" />
                          <span className="text-xs font-bold text-foreground">Performance & Vitesse</span>
                        </div>
                        <span className="text-xs text-green-500 font-bold">99.8%</span>
                      </div>
                      {/* Responsive Golden Line Chart */}
                      <div className="h-28 w-full relative mt-2">
                        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line x1="0" y1="5" x2="100" y2="5" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                          <line x1="0" y1="15" x2="100" y2="15" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                          <line x1="0" y1="25" x2="100" y2="25" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                          {/* Curved path */}
                          <path d="M 0 25 Q 15 24 30 18 T 60 12 T 80 4 T 100 2 L 100 30 L 0 30 Z" fill="url(#chartGradient)" />
                          <path d="M 0 25 Q 15 24 30 18 T 60 12 T 80 4 T 100 2" fill="none" stroke="var(--accent)" strokeWidth="0.85" />
                          {/* Dots */}
                          <circle cx="30" cy="18" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                          <circle cx="60" cy="12" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                          <circle cx="80" cy="4" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                          <circle cx="100" cy="2" r="1.1" fill="var(--accent)" className="animate-pulse" />
                        </svg>
                      </div>
                    </div>

                    {/* Live log entries */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl bg-background/50 border border-border font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-green-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          [OK]
                        </span>
                        <span>Form submission received from Algiers</span>
                        <span>09:41:02</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl bg-background/50 border border-border font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-green-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          [OK]
                        </span>
                        <span>Automated Python CRM Sync fired</span>
                        <span>09:41:05</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* OUR PHILOSOPHY - RESTYLED AS STATE-OF-THE-ART BENTO GRID */}
        <section className="py-24 bg-background/40 relative z-10 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Intro Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <p className="section-label" style={{ justifyContent: "center" }}>{h.philosophyLabel}</p>
              <h2 className="text-foreground text-3xl sm:text-5xl font-bold tracking-tight">{h.philosophyTitle}</h2>
              <div className="gold-line gold-line-center" />
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Bento Card 1 - Main Philosophy Description (Col-Span 7) */}
              <div className="lg:col-span-7 card-pro relative overflow-hidden flex flex-col justify-between group border-border/50 hover:border-accent/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                    <Code2 size={18} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 leading-snug">
                    Architecture & Qualité
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed font-light text-sm sm:text-base">
                    {h.philosophyDesc}
                  </p>
                </div>
                {/* SVG Code illustration accent in background */}
                <div className="opacity-15 dark:opacity-10 absolute bottom-[-10%] right-[-10%] w-[300px] h-[200px] pointer-events-none select-none text-[10px] font-mono text-primary dark:text-accent border border-dashed border-border/50 rounded-xl p-4 transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 duration-500">
                  {"class XenonEngine {\n  constructor() {\n    this.optimized = true;\n    this.cleanCode = true;\n    this.seoReady = true;\n  }\n  launch() {\n    return '🚀 Rentable';\n  }\n}"}
                </div>
              </div>

              {/* Bento Card 2 - Bento Cells Stack (Col-Span 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Grid of Code & Speed cells */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                  
                  {/* Code Proper cell */}
                  <div className="p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md flex flex-col justify-between hover:border-accent/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                      <Cpu size={15} className="text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1.5">{h.philosophyCode}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">{h.philosophyCodeDesc}</p>
                    </div>
                  </div>

                  {/* Vitesse cell */}
                  <div className="p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md flex flex-col justify-between hover:border-accent/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                      <Rocket size={15} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1.5">{h.philosophySpeed}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-light">{h.philosophySpeedDesc}</p>
                    </div>
                  </div>

                </div>

                {/* Promise wide cell */}
                <div className="p-6 sm:p-8 rounded-3xl border border-accent/30 bg-gradient-to-r from-card to-accent/5 backdrop-blur-md flex flex-col justify-between hover:border-accent/50 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-accent" />
                      {h.philosophyPromise}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light mb-5">
                      {h.philosophyPromiseDesc}
                    </p>
                  </div>
                  <div>
                    <Link href="/contact">
                      <button className="btn-primary-pro inline-flex items-center justify-center px-6 py-2.5 text-xs text-white rounded-lg font-semibold cursor-pointer">
                        {h.philosophyCta}
                      </button>
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* CTA SECTION - RESTYLED WITH DEEP DIGITAL LUXURY */}
        <section className="cta-section py-28 relative overflow-hidden z-10 border-t border-white/5">
          {/* Subtle overlay grid lines */}
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none select-none z-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Pulsing focal light in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px] pointer-events-none animate-pulse duration-5000" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="section-label mb-5" style={{ color: "var(--accent-light, #f0d98a)", justifyContent: "center" }}>
              {h.ctaLabel}
            </p>
            
            <h2 className="text-white text-3xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {h.ctaTitle1}<br />
              <span className="text-accent-light italic font-serif font-light">{h.ctaTitle2}</span>
            </h2>
            
            <div className="gold-line gold-line-center" />
            
            <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
              {h.ctaDesc}
            </p>
            
            <Link href="/contact">
              <button 
                className="inline-flex items-center justify-center gap-2 px-9 py-4.5 bg-white hover:bg-slate-100 rounded-xl font-bold text-base transition-all hover:-translate-y-1 duration-300 active:translate-y-0 cursor-pointer shadow-2xl"
                style={{ color: "var(--primary)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
              >
                {h.ctaButton}
                <ArrowRight size={18} className={`ml-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </button>
            </Link>
            
            <p className="mt-8 text-[9px] text-white/30 tracking-widest uppercase font-bold">
              {h.ctaFootnote}
            </p>
          </div>
        </section>

      </div>
    </>
  );
}