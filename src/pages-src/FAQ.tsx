'use client';

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEOHead } from '../components/seo/SEOHead';
import { FAQSchema } from '../components/seo/FAQSchema';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';

// Vraies questions/réponses de la page — synchronisées avec les translations FR
const FAQ_SCHEMA_ITEMS = [
  { question: "Combien coûte la création d'un site web en Algérie ?", answer: "Chez XenonDz, un site vitrine professionnel commence à partir de 20 000 DZD et une boutique e-commerce à partir de 60 000 DZD. Le prix final dépend de vos besoins spécifiques. Nous proposons des devis gratuits et transparents sous 24h." },
  { question: "Combien coûte une boutique e-commerce en Algérie ?", answer: "Notre offre e-commerce complète démarre à 60 000 DZD. Elle inclut le catalogue produits, la gestion des stocks, l'intégration des livraisons (Yalidine, Maystro), le paiement à la livraison et une formation complète à la gestion." },
  { question: "Quel est le délai moyen pour un projet ?", answer: "Un site vitrine standard est livré en 7-10 jours, un e-commerce en 10-14 jours. Les délais exacts dépendent de la complexité de votre projet et de la rapidité de vos retours." },
  { question: "Comment se déroule un projet de A à Z ?", answer: "Le processus est simple : consultation gratuite → devis détaillé → validation → développement avec points réguliers → livraison + formation. Vous êtes impliqué à chaque étape." },
  { question: "Comment se déroule le paiement ?", answer: "50% à la signature du devis, 50% à la livraison. Nous acceptons les paiements par virement bancaire et CCP. Des facilités de paiement sont possibles pour les projets importants." },
  { question: "Y a-t-il des frais cachés après la livraison ?", answer: "Non. Le devis que vous signez est un prix fixe et définitif. Les seuls coûts récurrents sont l'hébergement et le nom de domaine, clairement indiqués dans votre devis." },
  { question: "Proposez-vous des tarifs pour les startups ou associations ?", answer: "Oui, nous avons des offres adaptées aux structures en démarrage. Contactez-nous pour en discuter, nous trouverons une solution adaptée à votre budget." },
  { question: "Proposez-vous un accompagnement après la livraison ?", answer: "Oui, tous nos projets incluent 6 mois de support et maintenance. Nous assurons également une formation complète pour vous rendre totalement autonome dans la gestion de votre site." },
  { question: "Que se passe-t-il si mon site tombe en panne ?", answer: "Vous nous contactez et nous intervenons sous 4h en jours ouvrés. Pour les clients avec contrat de maintenance, nous disposons d'une surveillance automatique 24/7." },
  { question: "Est-ce que mon site sera bien référencé sur Google ?", answer: "Oui, le SEO on-page est inclus dans tous nos projets : structure sémantique, balises optimisées, performance de chargement, sitemap et robots.txt. Pour un référencement avancé, nous proposons également notre service SEO & GEO." },
  { question: "Mon site sera-t-il adapté aux mobiles ?", answer: "Toujours. Tous nos sites sont 100% responsive et optimisés pour mobile, tablette et desktop. Nous testons sur de nombreux appareils avant chaque livraison." },
  { question: "Travaillez-vous avec des entreprises hors de Béjaïa ?", answer: "Oui, XenonDz travaille avec des entreprises dans toute l'Algérie — Alger, Oran, Constantine, Tizi Ouzou, Sétif et au-delà. Nos collaborations se déroulent 100% en ligne via visioconférence et WhatsApp." },
  { question: "Qu'est-ce que le GEO (Generative Engine Optimization) ?", answer: "Le GEO est l'art d'optimiser votre site pour être cité par les IA génératives comme ChatGPT, Perplexity, Gemini et Google AI Overviews. Concrètement : structurer votre contenu, enrichir vos données Schema.org et créer un fichier llms.txt pour que les IA comprennent et citent votre entreprise dans leurs réponses." },
  { question: "Quelle est la différence entre WordPress et React/Next.js ?", answer: "WordPress est un CMS généraliste basé sur des templates. React/Next.js est un framework moderne qui génère des pages ultra-rapides (LCP < 1s vs 3-5s pour WordPress), sans plugins inutiles, entièrement sur mesure. Nos sites affichent 5x plus vite, ce qui améliore directement votre taux de conversion et votre référencement." },
  { question: "Puis-je gérer moi-même mon site après livraison ?", answer: "Oui. Tous nos projets incluent un panneau d'administration sur mesure et une formation complète. Vous pouvez modifier vos textes, images, produits et prix sans toucher au code. Notre support de 6 mois est là si vous avez besoin d'aide." },
  { question: "Comment XenonDz peut-il aider mon entreprise à générer des leads ?", answer: "Grâce à notre service d'automatisation, nous créons des scripts Python qui extraient des prospects qualifiés depuis Google Maps, les annuaires professionnels et les réseaux sociaux. Ensuite, ces leads sont intégrés automatiquement dans votre CRM (HubSpot, Google Sheets) avec des campagnes d'emails automatiques." },
  { question: "Proposez-vous des solutions pour secteurs spécifiques (immobilier, médical, restaurant) ?", answer: "Oui, nous avons des offres sectorielles dédiées : immobilier, médecins/cliniques, restaurants, avocats, e-commerce de vêtements et BTP/construction. Chaque solution est pensée pour les contraintes et attentes clients de votre secteur. Consultez notre page Solutions pour les détails." },
  { question: "Comment être visible sur ChatGPT, Perplexity ou Google AI Overviews ?", answer: "Pour être cité par les IA : 1) Structurer vos données avec Schema.org (Organisation, Service, FAQ), 2) Créer un fichier llms.txt décrivant votre entité, 3) Autoriser les robots IA dans votre robots.txt (GPTBot, PerplexityBot, ClaudeBot), 4) Publier des contenus qui répondent directement aux questions de vos clients. C'est exactement ce que nous faisons chez XenonDz." },
];

export function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;

  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(openKey === key ? null : key);

  return (
    <>
      <SEOHead page="faq" />
      <FAQSchema items={FAQ_SCHEMA_ITEMS} />
      <BreadcrumbSchema items={BREADCRUMBS.faq} />
      <div className="w-full">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center hero-animate-1">
            <p className="section-label" style={{ justifyContent: "center" }}>{f.heroLabel}</p>
            <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {f.heroTitle1}<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{f.heroTitleEm}</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-lg text-muted-foreground mt-4 font-light">{f.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {f.categories.map((category, ci) => (
              <div key={ci} className="reveal">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}>
                    <span className="text-white text-xs font-bold">{String(ci + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="text-foreground" style={{ fontSize: "1.3rem", fontFamily: "var(--font-display)" }}>
                    {category.label}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.faqs.map((faq, fi) => {
                    const key = `${ci}-${fi}`;
                    const isOpen = openKey === key;
                    return (
                      <div key={fi} className="card-pro overflow-hidden"
                        style={{ padding: 0, transition: "box-shadow 0.2s ease" }}>
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="font-medium text-foreground text-sm pr-4 leading-relaxed">{faq.question}</span>
                          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              background: isOpen ? "var(--primary)" : "rgba(26,26,110,0.06)",
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            }}>
                            <Plus size={14} style={{ color: isOpen ? "white" : "var(--primary)" }} />
                          </div>
                        </button>
                        <div style={{
                          display: "grid",
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}>
                          <div style={{ overflow: "hidden" }}>
                            <div className="px-6 pb-5">
                              <div className="h-px mb-4" style={{ background: "var(--border)" }} />
                              <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>{f.ctaTitle}</h2>
          <div className="gold-line gold-line-center" />
          <p className="text-white/70 text-lg mb-8 mt-4 font-light">{f.ctaDesc}</p>
          <Link href="/contact">
            <button className="inline-flex items-center px-8 py-4 bg-white rounded-lg font-semibold text-base hover:bg-white/92 transition-all hover:-translate-y-1 cursor-pointer"
              style={{ color: "var(--primary)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
              {f.ctaButton}
            </button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}