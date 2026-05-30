'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Plus } from "lucide-react";
import { useServices, Service } from "@/data/services";
import { useComparison } from "@/data/useComparison";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEOHead } from '../components/seo/SEOHead';
import { ServiceSchema } from '../components/seo/ServiceSchema';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';
import { Skeleton } from "@/components/ui/skeleton";

function formatPrice(price: number) {
  return price.toLocaleString("fr-DZ") + " DA";
}

export function Services({ initialServices, initialComparisons }: { initialServices?: Service[], initialComparisons?: any[] }) {
  const { t, lang: language } = useLanguage();
  const s = t.services;
  const { services, loading } = useServices(initialServices);
  const { comparisons, loading: compLoading } = useComparison(initialComparisons);

  function getServiceTitle(service: typeof services[0]) {
    if (language === "en") return service.titleEn;
    if (language === "ar") return service.titleAr;
    return service.title;
  }
  function getServiceDesc(service: typeof services[0]) {
    if (language === "en") return service.descriptionEn;
    if (language === "ar") return service.descriptionAr;
    return service.description;
  }
  function getFeature(service: typeof services[0], i: number) {
    if (language === "en") return service.featuresEn[i];
    if (language === "ar") return service.featuresAr[i];
    return service.features[i];
  }
  function getDuration(service: typeof services[0]) {
    if (language === "en") return service.durationEn;
    if (language === "ar") return service.durationAr;
    return service.duration;
  }

  // AEO: TL;DR definition block copy
  const tldrDef: Record<string, string> = {
    fr: "Xenon Agency est une agence digitale algérienne spécialisée dans la création de sites web sur mesure, le développement e-commerce et l'automatisation B2B.",
    en: "Xenon Agency is an Algerian digital agency specialising in custom website creation, e-commerce development, and B2B automation.",
    ar: "وكالة Xenon هي وكالة رقمية جزائرية متخصصة في إنشاء المواقع الإلكترونية المخصصة وتطوير التجارة الإلكترونية وأتمتة الأعمال.",
  };
  const tldrSummary: Record<string, string> = {
    fr: "Nos services couvrent les sites vitrines, les boutiques e-commerce, l'automatisation et le SEO — livrés avec du code 100 % personnalisé et 6 mois de support inclus.",
    en: "Our services cover showcase sites, e-commerce shops, automation, and SEO — delivered with 100% custom code and 6 months of support included.",
    ar: "تشمل خدماتنا المواقع التعريفية، المتاجر الإلكترونية، الأتمتة والسيو — مع كود مخصص 100٪ و6 أشهر دعم مجاني.",
  };
  const tldrContact: Record<string, string> = {
    fr: "Devis gratuit en moins de 24 heures.",
    en: "Free quote in less than 24 hours.",
    ar: "عرض سعر مجاني خلال 24 ساعة.",
  };

  // AEO: Comparison table
  const compLabel: Record<string, string> = { fr: "Comparez nos offres", en: "Compare our offers", ar: "قارن عروضنا" };
  const compTitle: Record<string, string> = { fr: "Quel service vous convient ?", en: "Which service fits your needs?", ar: "أي خدمة تناسبك؟" };
  type CompRow = { feature: string; vitrine: string; ecom: string; auto: string; seo: string };
  const compHeaders: Record<string, { feature: string; vitrine: string; ecom: string; auto: string; seo: string }> = {
    fr: { feature: "Caractéristique", vitrine: "Site Vitrine", ecom: "E-commerce", auto: "Automatisation", seo: "SEO" },
    en: { feature: "Feature", vitrine: "Showcase Site", ecom: "E-commerce", auto: "Automation", seo: "SEO" },
    ar: { feature: "الميزة", vitrine: "موقع تعريفي", ecom: "تجارة إلكترونية", auto: "أتمتة", seo: "تحسين محركات البحث" },
  };
  const compRows: Record<string, CompRow[]> = {
    fr: [
      { feature: "Délai de livraison", vitrine: "7–10 jours", ecom: "10–14 jours", auto: "3–5 jours", seo: "15–30 jours" },
      { feature: "Prix de départ", vitrine: "30 000 DA", ecom: "60 000 DA", auto: "15 000 DA", seo: "Sur devis" },
      { feature: "Code sur mesure", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "SEO on-page inclus", vitrine: "✅", ecom: "✅", auto: "—", seo: "✅" },
      { feature: "Support 6 mois", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "Formation incluse", vitrine: "✅", ecom: "✅", auto: "—", seo: "—" },
    ],
    en: [
      { feature: "Delivery time", vitrine: "7–10 days", ecom: "10–14 days", auto: "3–5 days", seo: "15–30 days" },
      { feature: "Starting price", vitrine: "30,000 DA", ecom: "60,000 DA", auto: "15,000 DA", seo: "On request" },
      { feature: "Custom code", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "On-page SEO included", vitrine: "✅", ecom: "✅", auto: "—", seo: "✅" },
      { feature: "6-month support", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "Training included", vitrine: "✅", ecom: "✅", auto: "—", seo: "—" },
    ],
    ar: [
      { feature: "مدة التسليم", vitrine: "7–10 أيام", ecom: "10–14 يومًا", auto: "3–5 أيام", seo: "15–30 يومًا" },
      { feature: "السعر الابتدائي", vitrine: "30,000 دج", ecom: "60,000 دج", auto: "15,000 دج", seo: "عند الطلب" },
      { feature: "كود مخصص", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "سيو داخلي مشمول", vitrine: "✅", ecom: "✅", auto: "—", seo: "✅" },
      { feature: "دعم 6 أشهر", vitrine: "✅", ecom: "✅", auto: "✅", seo: "✅" },
      { feature: "تدريب مشمول", vitrine: "✅", ecom: "✅", auto: "—", seo: "—" },
    ],
  };

  // AEO: On-page FAQ
  const faqLabel: Record<string, string> = { fr: "Questions fréquentes", en: "Common questions", ar: "أسئلة شائعة" };
  const faqTitle: Record<string, string> = {
    fr: "Questions fréquentes sur nos services",
    en: "Frequently asked questions about our services",
    ar: "أسئلة شائعة حول خدماتنا",
  };
  type FaqEntry = { q: string; a: string };
  const faqEntries: Record<string, FaqEntry[]> = {
    fr: [
      { q: "Quel est le délai moyen pour un site web ?", a: "Un site vitrine est livré en 7–10 jours. Une boutique e-commerce prend 10–14 jours. Le délai exact dépend de votre retour sur les maquettes." },
      { q: "Quel est le prix d'un site web professionnel ?", a: "Nos sites vitrines démarrent à 30 000 DA, les e-commerces à 60 000 DA. Chaque devis est fixe — sans surprise." },
      { q: "Le SEO est-il inclus dans la création du site ?", a: "Oui. Tous nos projets incluent le SEO on-page : balises, structure sémantique H1/H2, sitemap, robots.txt et performances de chargement." },
      { q: "Qu'est-ce qui est inclus après la livraison ?", a: "6 mois de support et maintenance, une formation complète à la gestion du site et un hébergement ultra-sécurisé la première année." },
    ],
    en: [
      { q: "What is the average timeline for a website?", a: "A showcase site is delivered in 7–10 days. An e-commerce store takes 10–14 days. The exact timeline depends on how quickly you approve the mockups." },
      { q: "How much does a professional website cost?", a: "Our showcase sites start at 30,000 DA, e-commerce stores at 60,000 DA. Every quote is fixed — no surprises." },
      { q: "Is SEO included in the website build?", a: "Yes. All our projects include on-page SEO: tags, semantic H1/H2 structure, sitemap, robots.txt, and load performance optimisation." },
      { q: "What is included after delivery?", a: "6 months of support and maintenance, full training on site management, and ultra-secure hosting for the first year." },
    ],
    ar: [
      { q: "ما هو متوسط وقت إنجاز الموقع؟", a: "يتم تسليم الموقع التعريفي خلال 7–10 أيام. المتجر الإلكتروني يستغرق 10–14 يومًا. يعتمد التوقيت على سرعة موافقتك على التصاميم." },
      { q: "كم تكلفة الموقع الإلكتروني الاحترافي؟", a: "تبدأ أسعار المواقع التعريفية من 30,000 دج، والمتاجر الإلكترونية من 60,000 دج. كل عرض سعر ثابت — بدون مفاجآت." },
      { q: "هل تحسين محركات البحث مشمول في إنشاء الموقع؟", a: "نعم. جميع مشاريعنا تشمل السيو الداخلي: العلامات، الهيكل الدلالي، خريطة الموقع، robots.txt وتحسين سرعة التحميل." },
      { q: "ماذا يُقدَّم بعد التسليم؟", a: "6 أشهر من الدعم والصيانة، تدريب كامل على إدارة الموقع، واستضافة فائقة الأمان للسنة الأولى." },
    ],
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const processLabels: Record<string, string> = { fr: "Comment ça marche", en: "How it works", ar: "كيف يعمل" };
  const processTitle: Record<string, string> = {
    fr: "Comment se déroule un projet web avec Xenon ?",
    en: "How does a web project with Xenon work?",
    ar: "كيف يسير مشروع الويب مع Xenon؟",
  };
  const processSteps: Record<string, { step: string; title: string; description: string }[]> = {
    fr: [
      { step: "01", title: "Consultation", description: "Échange gratuit pour comprendre vos besoins et objectifs." },
      { step: "02", title: "Devis & Planning", description: "Proposition détaillée avec prix fixe et délais précis." },
      { step: "03", title: "Développement", description: "Création de votre projet avec points réguliers d'avancement." },
      { step: "04", title: "Livraison & Formation", description: "Mise en ligne et formation pour vous rendre autonome." },
    ],
    en: [
      { step: "01", title: "Consultation", description: "Free exchange to understand your needs and goals." },
      { step: "02", title: "Quote & Planning", description: "Detailed proposal with fixed price and precise timelines." },
      { step: "03", title: "Development", description: "Building your project with regular progress check-ins." },
      { step: "04", title: "Delivery & Training", description: "Go-live and training to make you fully autonomous." },
    ],
    ar: [
      { step: "01", title: "استشارة", description: "تبادل مجاني لفهم احتياجاتك وأهدافك." },
      { step: "02", title: "العرض والتخطيط", description: "اقتراح مفصل بسعر ثابت ومواعيد دقيقة." },
      { step: "03", title: "التطوير", description: "إنشاء مشروعك مع نقاط تقدم منتظمة." },
      { step: "04", title: "التسليم والتدريب", description: "الإطلاق والتدريب لتصبح مستقلاً تمامًا." },
    ],
  };
  const techLabel: Record<string, string> = { fr: "Notre stack", en: "Our stack", ar: "تقنياتنا" };
  const techTitle: Record<string, string> = { fr: "Technologies modernes", en: "Modern technologies", ar: "تقنيات حديثة" };
  const addonHint: Record<string, string> = {
    fr: "options disponibles",
    en: "available add-ons",
    ar: "إضافات متاحة",
  };

  const steps = processSteps[language] || processSteps.fr;

  return (
    <>
      <SEOHead page="services" />
      <ServiceSchema />
      <BreadcrumbSchema items={BREADCRUMBS.services} />
      <div className="w-full">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center hero-animate-1">
            <p className="section-label" style={{ justifyContent: "center" }}>{s.heroLabel}</p>
            <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {s.heroTitle1}<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{s.heroTitleEm}</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-lg text-muted-foreground mt-4 font-light">{s.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* AEO: TL;DR Definition Block */}
      <section className="py-10 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <blockquote
            className="card-pro reveal"
            style={{
              borderLeft: "4px solid var(--primary)",
              padding: "1.5rem 2rem",
              background: "linear-gradient(135deg, rgba(26,26,110,0.04), rgba(26,26,110,0.01))",
            }}
          >
            <p className="text-foreground font-semibold leading-relaxed mb-2" style={{ fontSize: "1rem" }}>
              {tldrDef[language] || tldrDef.fr}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-1">
              {tldrSummary[language] || tldrSummary.fr}
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
              {tldrContact[language] || tldrContact.fr}
            </p>
          </blockquote>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card-pro flex flex-col h-[380px]">
                  <div className="flex items-start gap-4 mb-5">
                    <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
                    <div className="w-full">
                      <Skeleton className="w-2/3 h-6 rounded mb-2" />
                      <Skeleton className="w-full h-4 rounded mb-1" />
                      <Skeleton className="w-4/5 h-4 rounded" />
                    </div>
                  </div>
                  <div className="space-y-3 mb-5 flex-grow">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                      <Skeleton className="w-3/4 h-4 rounded" />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                      <Skeleton className="w-5/6 h-4 rounded" />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                      <Skeleton className="w-2/3 h-4 rounded" />
                    </div>
                  </div>
                  <div className="pt-5 mt-auto border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Skeleton className="w-24 h-7 rounded mb-1" />
                        <Skeleton className="w-16 h-3 rounded" />
                      </div>
                    </div>
                    <Skeleton className="w-full h-11 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={service.slug} className={`card-pro reveal reveal-delay-${(index % 3) + 1} flex flex-col`}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(26,26,110,0.03))" }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="cursor-default font-bold text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                      {getServiceTitle(service)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-1">{getServiceDesc(service)}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5 flex-grow">
                  {service.features.map((_, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}>
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                      <span className="text-sm text-foreground">{getFeature(service, i)}</span>
                    </div>
                  ))}
                </div>

                {/* Addon hint pill */}
                {service.addons.length > 0 && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: "rgba(201,168,76,0.1)", color: "#7a5a0a", border: "1px solid rgba(201,168,76,0.25)" }}>
                      <span>+{service.addons.length} {addonHint[language] || addonHint.fr}</span>
                    </span>
                  </div>
                )}

                <div className="pt-5 mt-auto border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}>
                        {service.priceSuffix ? service.priceSuffix : `${s.from} ${formatPrice(service.basePrice)}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{getDuration(service)}</p>
                    </div>
                  </div>
                  <Link href={`/services/${service.slug}`} className="block">
                    <button className="btn-primary-pro w-full flex items-center justify-center gap-2 px-5 py-3 text-sm text-white rounded-lg cursor-pointer">
                      {s.discover}
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
      {/* AEO: Comparison Table */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{compLabel[language] || compLabel.fr}</p>
            <h2 className="text-foreground">{compTitle[language] || compTitle.fr}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="reveal overflow-x-auto">
            <table
              className="w-full text-sm"
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}>
                  {Object.values(compHeaders[language] || compHeaders.fr).map((h, i) => (
                    <th key={i} className="px-5 py-4 text-left font-semibold text-white" style={{ fontSize: "0.85rem" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(comparisons.length > 0 ? comparisons.map(c => ({
                  feature: (c as any)[`feature_${language}`] || c.feature_fr,
                  vitrine: (c as any)[`vitrine_${language}`] || c.vitrine_fr,
                  ecom: (c as any)[`ecom_${language}`] || c.ecom_fr,
                  auto: (c as any)[`auto_${language}`] || c.auto_fr,
                  seo: (c as any)[`seo_${language}`] || c.seo_fr,
                })) : (compRows[language] || compRows.fr)).map((row, ri) => (
                  <tr
                    key={ri}
                    style={{
                      background: ri % 2 === 0 ? "var(--background)" : "rgba(26,26,110,0.025)",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.vitrine}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.ecom}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.auto}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.seo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{processLabels[language] || processLabels.fr}</p>
            <h2 className="text-foreground">{processTitle[language] || processTitle.fr}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 cursor-default">
            {steps.map((item, i) => (
              <div key={i} className={`step-item text-center reveal reveal-delay-${i + 1}`}>
                <div className="step-number">{item.step}</div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-family)", fontSize: "1rem" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{techLabel[language] || techLabel.fr}</p>
            <h2 className="text-foreground">{techTitle[language] || techTitle.fr}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "Supabase", "Vercel", "Stripe", "WordPress", "Shopify", "Google Analytics", "GitHub"].map((tech, i) => (
              <div key={i} className="tech-pill">{tech}</div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO: On-page FAQ */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{faqLabel[language] || faqLabel.fr}</p>
            <h2 className="text-foreground">{faqTitle[language] || faqTitle.fr}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="space-y-3">
            {(faqEntries[language] || faqEntries.fr).map((entry, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="card-pro reveal overflow-hidden" style={{ padding: 0 }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-foreground text-sm pr-4 leading-relaxed">{entry.q}</span>
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isOpen ? "var(--primary)" : "rgba(26,26,110,0.06)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <Plus size={14} style={{ color: isOpen ? "white" : "var(--primary)" }} />
                    </div>
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div className="px-6 pb-5">
                        <div className="h-px mb-4" style={{ background: "var(--border)" }} />
                        <p className="text-muted-foreground text-sm leading-relaxed">{entry.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-20 relative z-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="section-label" style={{ color: "var(--accent-light, #f0d98a)", justifyContent: "center" }}>{s.ctaLabel}</p>
          <h2 className="text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>{s.ctaTitle}</h2>
          <div className="gold-line gold-line-center" />
          <p className="text-white/70 text-lg mb-10 font-light mt-4">{s.ctaDesc}</p>
          <Link href="/contact">
            <button className="inline-flex items-center px-8 py-4 bg-white rounded-lg font-semibold text-base hover:bg-white/92 transition-all hover:-translate-y-1 cursor-pointer"
              style={{ color: "var(--primary)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
              {s.ctaButton}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}