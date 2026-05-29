'use client';

import { SEOHead } from "../components/seo/SEOHead";
import { BreadcrumbSchema, BREADCRUMBS } from "../components/seo/BreadcrumbSchema";
import { OfferCatalogSchema } from "../components/seo/OfferCatalogSchema";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Tarifs() {
  return (
    <>
      <SEOHead
        title="Prix de création de site web en Algérie & Tarifs Agence | XenonDz"
        description="Découvrez nos tarifs transparents pour la création de site vitrine, e-commerce et automatisation web en Algérie. Demandez un devis gratuit."
        canonical="https://xenondz.vercel.app/tarifs"
      />
      <OfferCatalogSchema />
      <BreadcrumbSchema items={BREADCRUMBS.tarifs} />
      <div className="w-full">
        {/* Hero */}
        <section className="hero-bg pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="section-label mx-auto" style={{ justifyContent: "center" }}>Transparence Totale</p>
            <h1 className="text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Combien coûte vraiment la croissance ?
            </h1>
            <div className="gold-line gold-line-center mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Chez XenonDz, pas de coûts cachés. Nous croyons que la transparence est la base de toute collaboration B2B réussie en Algérie.
            </p>
          </div>
        </section>

        {/* AEO: Direct-answer definition block — cited by AI engines */}
        <section className="py-10 bg-background border-b border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote
              className="card-pro"
              style={{
                borderLeft: "4px solid var(--primary)",
                padding: "1.5rem 2rem",
                background: "linear-gradient(135deg, rgba(26,26,110,0.04), rgba(26,26,110,0.01))",
              }}
            >
              <p className="text-foreground font-semibold leading-relaxed mb-2" style={{ fontSize: "1rem" }}>
                Le prix d'un site web professionnel en Algérie varie de <strong>35 000 DA</strong> à <strong>120 000 DA</strong> selon le type de projet.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                Un site vitrine coûte à partir de 20 000 DA, une boutique e-commerce à partir de 120 000 DA, et les solutions d'automatisation démarrent à 35 000 DA. Chaque devis est fixe et sans surprise.
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                Devis gratuit répondu sous 24h · Livraison 7–14 jours selon le projet.
              </p>
            </blockquote>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Site Vitrine */}
              <div className="card-pro flex flex-col p-8">
                <h3 className="text-xl font-bold text-foreground mb-2">Site Vitrine Pro</h3>
                <p className="text-sm text-muted-foreground mb-6">Pour les entreprises qui veulent convertir.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>20 000 DA</span>
                  <span className="text-sm text-muted-foreground"> / projet</span>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {["Design sur-mesure", "Ultra-rapide (React/Tailwind)", "Optimisation SEO Technique", "Hébergement 1 an offert"].map((ft, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-foreground">{ft}</span>
                    </div>
                  ))}
                </div>
                <Link href="/services/creation-site-web-vitrine" className="btn-primary-pro text-center w-full py-3 rounded-lg text-sm text-white transition-opacity hover:opacity-90">
                  Voir les détails
                </Link>
              </div>

              {/* E-commerce */}
              <div className="card-pro flex flex-col p-8 relative" style={{ borderColor: "var(--primary)", borderStyle: "solid", borderWidth: "2px" }}>
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Le plus populaire</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Boutique E-commerce</h3>
                <p className="text-sm text-muted-foreground mb-6">Vendez partout en Algérie, H24.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>120 000 DA</span>
                  <span className="text-sm text-muted-foreground"> / projet</span>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {["Paiement à la livraison optimisé", "Gestion de stocks automatique", "Vitesse de chargement optimale", "Formation gestion incluse", "Hébergement 1 an offert"].map((ft, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-foreground">{ft}</span>
                    </div>
                  ))}
                </div>
                <Link href="/services/creation-boutique-ecommerce" className="btn-primary-pro text-center w-full py-3 rounded-lg text-sm text-white transition-opacity hover:opacity-90">
                  Générer des ventes
                </Link>
              </div>

              {/* Automatisation */}
              <div className="card-pro flex flex-col p-8">
                <h3 className="text-xl font-bold text-foreground mb-2">Automatisation & IA</h3>
                <p className="text-sm text-muted-foreground mb-6">Ne cherchez plus vos clients, scrapez-les.</p>
                <div className="mb-6">
                  <span className="text-3xl font-black text-primary" style={{ fontFamily: "var(--font-display)" }}>Dès 35 000 DA</span>
                  <span className="text-sm text-muted-foreground"> / mission</span>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {["Scraping Google Maps / LinkedIn", "Envoi d'emails automatiques", "Automatisation des rendez-vous", "Bots sur mesure (Discord, Telegram)"].map((ft, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-foreground">{ft}</span>
                    </div>
                  ))}
                </div>
                <Link href="/services/automatisation-generation-leads" className="btn-primary-pro text-center w-full py-3 rounded-lg text-sm text-white transition-opacity hover:opacity-90">
                  Gagner du temps
                </Link>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
