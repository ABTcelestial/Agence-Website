'use client';

import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, CheckCircle2, Globe, Cog, Terminal, Cpu, Activity, Code2, Rocket, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function HomeClient() {
  const { t, dir } = useLanguage();
  const h = t.home;

  return (
    <div className="w-full relative bg-background overflow-hidden" dir={dir}>

      {/* PREMIUM MESH DOT GRID */}
      <div className="absolute inset-0 premium-grid opacity-60 pointer-events-none z-0" />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full premium-glow-orb bg-indigo-900/10 dark:bg-primary/5" />
      <div className="absolute top-[40%] left-[-15%] w-[500px] h-[500px] rounded-full premium-glow-orb bg-amber-500/5 dark:bg-accent/5" />
      <div className="absolute bottom-[15%] right-[-5%] w-[550px] h-[550px] rounded-full premium-glow-orb bg-indigo-900/10 dark:bg-primary/5" />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center pt-8 pb-16 sm:py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            {/* Status Ticker Bar — replaces generic badge */}
            <div className="hero-animate-1 flex items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Sites livrés en 7–10 jours
              </div>
              <span className="text-border/60">·</span>
              <div className="text-[11px] font-medium text-muted-foreground/70">
                React &amp; Next.js — zéro WordPress
              </div>
              <span className="text-border/60 hidden sm:block">·</span>
              <div className="hidden sm:block text-[11px] font-medium text-muted-foreground/70">
                Béjaïa, Algérie
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-animate-2 hero-title-gradient mb-7 text-5xl sm:text-7xl font-extrabold text-foreground tracking-tight leading-[1.08]">
              {h.heroTitle1}<br />
              <span className="inline-block relative">
                {h.heroTitle2}{" "}
                <em className="not-italic font-serif font-light text-accent italic relative z-10"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), #e8c870, var(--accent))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {h.heroTitleEm}
                </em>
                <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-accent/15 blur-sm -z-10 rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-animate-3 text-lg sm:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              {h.heroDesc}
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="btn-primary-pro inline-flex items-center justify-center gap-2 px-8 py-4 text-base text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-semibold cursor-pointer w-full sm:w-auto">
                  {h.heroCta}
                  <ArrowRight size={18} className={dir === "rtl" ? "rotate-180" : ""} />
                </button>
              </Link>
              <Link href="/services">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base border border-border bg-card/30 backdrop-blur-md rounded-xl hover:border-accent/40 hover:bg-secondary/80 transition-all duration-300 font-semibold text-foreground cursor-pointer w-full sm:w-auto">
                  {h.heroSecondary}
                </button>
              </Link>
            </div>

            {/* Stats strip — styled as high-end dashboard card */}
            <div className="hero-animate-4 mt-20 p-6 sm:p-8 bg-card/40 dark:bg-slate-900/20 backdrop-blur-xl border border-border/40 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto shadow-2xl shadow-primary/5">
              {h.stats.map((s, i) => (
                <div key={i} className="text-center relative">
                  {i > 0 && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-border/50 hidden sm:block" />
                  )}
                  <div className="stat-number font-extrabold" style={{ fontSize: "1.8rem" }}>{s.value}</div>
                  <div className="text-[10px] text-muted-foreground/60 mt-1 font-extrabold tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── GRADIENT DIVIDER ─────────────────────────────────── */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* ─── AEO TERMINAL WIDGET ──────────────────────────────── */}
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
                XenonDz est une agence digitale basée à Béjaïa, Algérie, spécialisée dans la création de sites web sur mesure, le développement e-commerce et l&apos;automatisation de processus métier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  "Sites vitrines livrés en 7–10 jours, à partir de 20 000 DA",
                  "Boutiques e-commerce adaptées au marché algérien (paiement à la livraison)",
                  "Automatisation Python — scraping, génération de leads, CRM sync",
                  "SEO on-page inclus dans chaque projet · 6 mois de support offerts",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── POURQUOI NOUS — EDITORIAL NUMBERED LAYOUT ─────── */}
      <section className="py-20 sm:py-28 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header — editorial, left-aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20 reveal">
            <div className="lg:col-span-4">
              <p className="section-label">{h.whyLabel}</p>
              <h2 className="text-foreground text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mt-2">
                {h.whyTitle}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-7 flex items-end">
              <div className="border-l-2 border-accent/40 pl-6">
                <p className="text-muted-foreground/70 font-light leading-relaxed text-sm sm:text-base">
                  {h.whyDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Numbered feature rows */}
          <div className="flex flex-col">
            {[
              {
                num: "01",
                icon: <Zap size={18} className="text-accent" />,
                metric: "×5",
                metricLabel: "vitesse chargement",
                ...h.whyCards[0],
              },
              {
                num: "02",
                icon: <TrendingUp size={18} className="text-accent" />,
                metric: "−20h",
                metricLabel: "prospection / semaine",
                ...h.whyCards[1],
              },
              {
                num: "03",
                icon: <Shield size={18} className="text-accent" />,
                metric: "P.1",
                metricLabel: "Google garanti",
                ...h.whyCards[2],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal group grid grid-cols-1 lg:grid-cols-12 items-start gap-6 lg:gap-10 py-10 sm:py-12 border-t border-border/40 hover:border-accent/20 transition-colors duration-500 relative"
              >
                {/* Subtle hover rule */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Number */}
                <div className="lg:col-span-1">
                  <span
                    className="font-black tabular-nums select-none"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      background: "linear-gradient(135deg, var(--border)/80, var(--border)/30)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                    }}
                  >
                    {item.num}
                  </span>
                </div>

                {/* Icon + title */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-foreground text-xl tracking-tight">{item.title}</h3>
                  </div>
                  {/* Animated underline on hover */}
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-accent/60 to-transparent transition-all duration-500 rounded-full mb-4" />
                  <p className="text-muted-foreground/75 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Spacer */}
                <div className="lg:col-span-3" />

                {/* Metric — right side */}
                <div className="lg:col-span-4 flex items-center lg:justify-end">
                  <div className="relative flex items-end gap-3 p-5 rounded-2xl bg-card/60 border border-border/60 group-hover:border-accent/30 transition-colors duration-500 w-full lg:w-auto">
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                    <span
                      className="font-black tabular-nums leading-none"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        background: "linear-gradient(135deg, var(--accent), #e8c870)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.metric}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider leading-tight mb-1 max-w-[80px]">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── BÉNÉFICES — SPLIT WITH LIVE DASHBOARD ───────────── */}
      <section className="py-24 relative z-10" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div className="lg:col-span-5 reveal">
              <p className="section-label">{h.benefitsLabel}</p>
              <h2 className="text-foreground text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                {h.benefitsTitle1}<br />
                <span className="text-accent italic font-serif font-light">{h.benefitsTitle2}</span>
              </h2>
              <div className="gold-line" />
              <div className="space-y-4 mt-8">
                {h.benefitsList.map((b, i) => (
                  <div key={i} className="flex items-start gap-3.5 group">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/20 group-hover:border-accent/50 transition-colors"
                      style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))" }}
                    >
                      <CheckCircle2 size={13} className="text-accent" />
                    </div>
                    <p className="text-foreground/90 text-sm leading-relaxed font-medium">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Live dashboard mockup */}
            <div className="lg:col-span-7 reveal reveal-delay-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl -z-10" />
                <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -z-10" />

                  {/* Live indicator */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                      <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase">live_automation_feed</span>
                    </div>
                    <span className="text-[10px] bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent font-semibold px-2 py-0.5 rounded-full border border-primary/20 dark:border-accent/20">
                      XenonEngine v2.0
                    </span>
                  </div>

                  {/* Metric tiles */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {h.resultsItems.map((stat, i) => {
                      const icons = [
                        <Globe key="globe" size={16} className="text-accent" />,
                        <Cog key="cog" size={16} className="text-accent" />,
                        <TrendingUp key="trend" size={16} className="text-accent" />,
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

                  {/* SVG Growth Curve Chart */}
                  <div className="p-5 rounded-2xl border border-border bg-background/40 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-accent" />
                        <span className="text-xs font-bold text-foreground">Performance & Vitesse</span>
                      </div>
                      <span className="text-xs text-green-500 font-bold">99.8%</span>
                    </div>
                    <div className="h-28 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="5" x2="100" y2="5" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                        <line x1="0" y1="15" x2="100" y2="15" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                        <line x1="0" y1="25" x2="100" y2="25" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1" />
                        <path d="M 0 25 Q 15 24 30 18 T 60 12 T 80 4 T 100 2 L 100 30 L 0 30 Z" fill="url(#chartGradient)" />
                        <path d="M 0 25 Q 15 24 30 18 T 60 12 T 80 4 T 100 2" fill="none" stroke="var(--accent)" strokeWidth="0.85" />
                        <circle cx="30" cy="18" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                        <circle cx="60" cy="12" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                        <circle cx="80" cy="4" r="0.8" fill="var(--primary)" stroke="var(--accent)" strokeWidth="0.3" />
                        <circle cx="100" cy="2" r="1.1" fill="var(--accent)" />
                      </svg>
                    </div>
                  </div>

                  {/* Live log entries */}
                  <div className="space-y-2.5">
                    {[
                      { time: "09:41:02", msg: "Form submission received from Algiers" },
                      { time: "09:41:05", msg: "Automated Python CRM Sync fired" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] p-2.5 rounded-xl bg-background/50 border border-border font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-green-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          [OK]
                        </span>
                        <span className="flex-1 text-center">{log.msg}</span>
                        <span>{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY — BENTO GRID ──────────────────────────── */}
      <section className="py-24 bg-background/40 relative z-10 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{h.philosophyLabel}</p>
            <h2 className="text-foreground text-3xl sm:text-5xl font-bold tracking-tight">{h.philosophyTitle}</h2>
            <div className="gold-line gold-line-center" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main text block */}
            <div className="lg:col-span-7 card-pro relative overflow-hidden flex flex-col justify-between group border-border/50 hover:border-accent/30 transition-all duration-300 reveal">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                  <Code2 size={18} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-snug">Architecture & Qualité</h3>
                <p className="text-muted-foreground/80 leading-relaxed font-light text-sm sm:text-base">{h.philosophyDesc}</p>
              </div>
              {/* Watermark code block */}
              <div className="opacity-10 dark:opacity-[0.06] absolute bottom-[-10%] right-[-10%] w-[300px] h-[200px] pointer-events-none select-none text-[10px] font-mono text-primary dark:text-accent border border-dashed border-border/50 rounded-xl p-4 transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 duration-500 whitespace-pre">
                {"class XenonEngine {\n  constructor() {\n    this.optimized = true;\n    this.cleanCode = true;\n    this.seoReady = true;\n  }\n  launch() {\n    return '🚀 Rentable';\n  }\n}"}
              </div>
            </div>

            {/* Bento stack */}
            <div className="lg:col-span-5 flex flex-col gap-6 reveal reveal-delay-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                <div className="p-6 rounded-3xl border border-border/60 bg-card/60 backdrop-blur-md flex flex-col justify-between hover:border-accent/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Cpu size={15} className="text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1.5">{h.philosophyCode}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">{h.philosophyCodeDesc}</p>
                  </div>
                </div>
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

              {/* Promise card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-accent/30 bg-gradient-to-r from-card to-accent/5 flex flex-col justify-between hover:border-accent/50 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-accent" />
                    {h.philosophyPromise}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light mb-5">{h.philosophyPromiseDesc}</p>
                </div>
                <Link href="/contact">
                  <button className="btn-primary-pro inline-flex items-center justify-center px-6 py-2.5 text-xs text-white rounded-lg font-semibold cursor-pointer">
                    {h.philosophyCta}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="cta-section py-28 relative overflow-hidden z-10 border-t border-white/5">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Focal pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="section-label mb-5" style={{ color: "var(--accent-light, #f0d98a)", justifyContent: "center" }}>
            {h.ctaLabel}
          </p>
          <h2 className="text-white text-3xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {h.ctaTitle1}<br />
            <span className="italic font-serif font-light" style={{ color: "var(--accent-light, #f0d98a)" }}>{h.ctaTitle2}</span>
          </h2>
          <div className="gold-line gold-line-center" />
          <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed mt-6">
            {h.ctaDesc}
          </p>
          <Link href="/contact">
            <button
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white hover:bg-slate-50 rounded-xl font-bold text-base transition-all hover:-translate-y-1 duration-300 active:translate-y-0 cursor-pointer"
              style={{ color: "var(--primary)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
            >
              {h.ctaButton}
              <ArrowRight size={18} className={dir === "rtl" ? "rotate-180" : ""} />
            </button>
          </Link>
          <p className="mt-8 text-[9px] text-white/30 tracking-widest uppercase font-bold">{h.ctaFootnote}</p>
        </div>
      </section>

    </div>
  );
}
