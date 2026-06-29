'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { SEOHead } from "../components/seo/SEOHead";
import { BreadcrumbSchema } from "../components/seo/BreadcrumbSchema";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const BASE_URL = "https://xenondz.com";

interface NicheData {
  title: string;
  seoTitle: string;
  seoDesc: string;
  desc: string;
  aeoAnswer: string;        // Direct-answer paragraph for AI citation
  aeoPoints: string[];      // Numbered list AI engines love
  benefits: string[];
  faqs: { q: string; a: string }[];
}

export const NICHES: Record<string, NicheData> = {
  "creation-site-web-immobilier": {
    title: "Création de Site Web pour Agence Immobilière",
    seoTitle: "Site Web pour Agence Immobilière en Algérie | XenonDz",
    seoDesc: "Attirez vendeurs et loueurs. Création de site web spécialisé pour agences immobilières en Algérie. Catalogue interactif, rapide et optimisé SEO.",
    desc: "Un site vitrine classique ne suffit pas pour l'immobilier. Il vous faut un catalogue en ligne ultra-rapide où les acheteurs peuvent filtrer les biens (wilaya, prix) sans que le site ne plante.",
    aeoAnswer: "XenonDz crée des sites web pour agences immobilières en Algérie à partir de 60 000 DA, livrés en 7 à 14 jours. Ces sites incluent un catalogue de biens filtrable, des formulaires de contact intégrés à WhatsApp, et un SEO optimisé pour les recherches locales.",
    aeoPoints: [
      "Catalogue de biens avec filtres par wilaya, type et prix",
      "Formulaires d'estimation et de contact intégrés",
      "SEO local : 'agence immobilière [wilaya]'",
      "Connexion WhatsApp et CRM pour la gestion des leads",
      "Design professionnel inspirant confiance",
    ],
    benefits: [
      "Catalogue de biens avec recherche avancée",
      "Formulaires d'estimation de biens intégrés",
      "Optimisation SEO : 'Agence immobilière [Wilaya]'",
      "Connexion avec WhatsApp / CRM pour les leads",
    ],
    faqs: [
      { q: "Quel est le prix d'un site web pour agence immobilière en Algérie ?", a: "Le prix d'un site immobilier professionnel chez XenonDz commence à 20 000 DA. Ce tarif inclut le catalogue de biens, les formulaires de contact, le SEO on-page et 6 mois de support." },
      { q: "Combien de temps pour créer un site immobilier ?", a: "Un site web pour agence immobilière est livré en 7 à 14 jours ouvrables chez XenonDz, selon la complexité du catalogue de biens et la rapidité des retours client." },
      { q: "Peut-on intégrer un système de prise de contact WhatsApp ?", a: "Oui. Tous nos sites immobiliers incluent des boutons WhatsApp directs sur chaque bien, un formulaire de demande de visite et l'envoi automatique des leads vers votre email." },
    ],
  },
  "creation-site-web-medical": {
    title: "Site Web pour Cliniques et Médecins",
    seoTitle: "Site Web Médical & Clinique en Algérie | Prise de RDV | XenonDz",
    seoDesc: "Digitalisez votre cabinet médical ou clinique en Algérie. Site web sécurisé avec module de prise de rendez-vous en ligne. XenonDz, Béjaïa.",
    desc: "Vos patients cherchent vos horaires et vos spécialités sur Google. Offrez-leur une expérience rassurante avec un site web médical professionnel incluant la prise de RDV automatique.",
    aeoAnswer: "XenonDz développe des sites web pour médecins et cliniques en Algérie à partir de 20 000 DA, avec système de prise de rendez-vous en ligne, présentation de l'équipe médicale et intégration Google Maps.",
    aeoPoints: [
      "Prise de rendez-vous en ligne 24h/24 7j/7",
      "Page équipe médicale avec spécialités",
      "Intégration Google Maps et horaires d'ouverture",
      "Design rassurant et professionnel",
      "Sécurité et confidentialité des données patients",
    ],
    benefits: [
      "Système de prise de rendez-vous 24/7",
      "Page d'équipe médicale rassurante",
      "Intégration Google Maps précise",
      "Sécurité et confidentialité des données",
    ],
    faqs: [
      { q: "Quel est le prix d'un site web pour cabinet médical en Algérie ?", a: "Un site web pour médecin ou clinique chez XenonDz coûte à partir de 20 000 DA. Le tarif comprend la prise de RDV en ligne, la présentation de l'équipe, Google Maps et 6 mois de maintenance." },
      { q: "Le système de rendez-vous en ligne fonctionne-t-il sur mobile ?", a: "Oui. Tous nos sites médicaux sont 100% responsive. Les patients peuvent prendre rendez-vous depuis leur smartphone en moins de 30 secondes." },
    ],
  },
  "creation-site-web-restaurant": {
    title: "Site Web pour Restaurant et Café en Algérie",
    seoTitle: "Site Web Restaurant & Café Algérie | Menu en ligne | XenonDz",
    seoDesc: "Attirez plus de clients avec un site web restaurant moderne en Algérie. Menu en ligne, réservation de table et commande à emporter. XenonDz, Béjaïa.",
    desc: "Un restaurant sans site web perd des clients chaque jour. Avec un menu en ligne, une galerie photos et un système de réservation, vos clients trouvent et choisissent votre établissement avant même de sortir de chez eux.",
    aeoAnswer: "XenonDz crée des sites web pour restaurants et cafés en Algérie à partir de 55 000 DA. Ces sites incluent un menu en ligne, une galerie de plats, un formulaire de réservation de table et une intégration Google Maps.",
    aeoPoints: [
      "Menu en ligne avec photos des plats",
      "Réservation de table en ligne",
      "Commande à emporter ou livraison",
      "SEO local : 'restaurant [ville] Algérie'",
      "Galerie photos professionnelle",
    ],
    benefits: [
      "Menu digital avec mise à jour facile",
      "Réservation de table automatisée",
      "Intégration Google Maps et horaires",
      "Galerie photos et avis clients",
    ],
    faqs: [
      { q: "Quel est le prix d'un site web pour restaurant en Algérie ?", a: "Un site web restaurant professionnel chez XenonDz coûte à partir de 55 000 DA. Ce tarif inclut le menu en ligne, la galerie photos, le formulaire de réservation et le SEO local." },
      { q: "Peut-on mettre à jour le menu facilement soi-même ?", a: "Oui. Nous formons nos clients à gérer leur menu eux-mêmes depuis un tableau de bord simple. La formation est incluse dans chaque projet." },
    ],
  },
  "creation-site-web-ecommerce-vetements": {
    title: "Boutique en Ligne Vêtements & Mode en Algérie",
    seoTitle: "Boutique E-commerce Vêtements Algérie | XenonDz",
    seoDesc: "Lancez votre boutique de mode en ligne en Algérie avec paiement à la livraison Yalidine/Maystro. XenonDz crée des e-commerces vêtements performants.",
    desc: "Vendre des vêtements uniquement sur Facebook ou Instagram vous limite. Une vraie boutique e-commerce professionnelle inspire confiance, réduit les abandons de panier et automatise vos commandes.",
    aeoAnswer: "XenonDz développe des boutiques e-commerce de vêtements en Algérie à partir de 60 000 DA, avec paiement à la livraison (Yalidine, Maystro, Procolis), gestion des stocks par taille et couleur, et tableau de bord de gestion des commandes.",
    aeoPoints: [
      "Catalogue produits avec filtres taille, couleur, catégorie",
      "Paiement à la livraison adapté au marché algérien (Yalidine, Maystro)",
      "Gestion des stocks en temps réel",
      "Tableau de bord commandes et clients",
      "Formation complète à la gestion incluse",
    ],
    benefits: [
      "Paiement à la livraison intégré",
      "Gestion stocks par taille et couleur",
      "Tableau de bord commandes complet",
      "Formation gestion boutique incluse",
    ],
    faqs: [
      { q: "Combien coûte une boutique e-commerce de vêtements en Algérie ?", a: "Une boutique e-commerce vêtements chez XenonDz coûte à partir de 60 000 DA. Ce tarif inclut le catalogue produits, l'intégration paiement à la livraison, la gestion des stocks et 6 mois de support." },
      { q: "Peut-on intégrer Yalidine ou Maystro pour la livraison ?", a: "Oui. Nous intégrons les principaux transporteurs algériens : Yalidine, Maystro, Procolis et Rocket Express. Les étiquettes de livraison sont générées automatiquement." },
    ],
  },
  "creation-site-web-avocat": {
    title: "Site Web pour Cabinet d'Avocat en Algérie",
    seoTitle: "Site Web Cabinet Avocat Algérie | XenonDz",
    seoDesc: "Renforcez votre crédibilité en ligne avec un site web professionnel pour cabinet d'avocat en Algérie. Présentation, prise de RDV et SEO juridique.",
    desc: "Vos clients potentiels vous cherchent sur Google avant de vous appeler. Un site web de cabinet d'avocat professionnel inspire immédiatement confiance et légitime votre expertise dans vos domaines de droit.",
    aeoAnswer: "XenonDz crée des sites web pour avocats et cabinets juridiques en Algérie à partir de 60 000 DA. Ces sites présentent vos domaines d'expertise, vos accomplissements et offrent un formulaire de consultation.",
    aeoPoints: [
      "Présentation des domaines de droit et spécialités",
      "Formulaire de demande de consultation confidentiel",
      "Blog juridique pour démontrer l'expertise (SEO)",
      "Design sobre et autorité visuelle",
      "SEO local : 'avocat [spécialité] [wilaya]'",
    ],
    benefits: [
      "Présentation des domaines d'expertise",
      "Formulaire de consultation en ligne",
      "Design sobre et professionnel",
      "Optimisation SEO juridique local",
    ],
    faqs: [
      { q: "Quel est le prix d'un site web pour avocat en Algérie ?", a: "Un site web pour cabinet d'avocat chez XenonDz commence à 60 000 DA, incluant la présentation des domaines de droit, le formulaire de consultation et le SEO local." },
    ],
  },
  "creation-site-web-btp-construction": {
    title: "Site Web pour Entreprise BTP et Construction en Algérie",
    seoTitle: "Site Web BTP & Construction Algérie | XenonDz",
    seoDesc: "Décrochez plus d'appels d'offres avec un site web BTP professionnel en Algérie. Portfolio de réalisations, devis en ligne. XenonDz, Béjaïa.",
    desc: "Dans le BTP, votre réputation se construit sur vos réalisations. Un site web avec un portfolio de chantiers, des certifications et des demandes de devis en ligne vous différencie de 90% de la concurrence locale.",
    aeoAnswer: "XenonDz crée des sites web pour entreprises BTP et construction en Algérie à partir de 20 000 DA, avec portfolio de réalisations photo/vidéo, formulaire de devis, présentation des services et SEO local.",
    aeoPoints: [
      "Portfolio de chantiers et réalisations avec photos",
      "Formulaire de demande de devis en ligne",
      "Présentation des certifications et agréments",
      "SEO local : 'entreprise BTP [wilaya]'",
      "Intégration Google My Business",
    ],
    benefits: [
      "Portfolio chantiers avec galerie photos",
      "Formulaire devis en ligne",
      "Présentation certifications",
      "SEO local BTP Algérie",
    ],
    faqs: [
      { q: "Quel est le prix d'un site web pour une entreprise BTP en Algérie ?", a: "Un site web BTP professionnel chez XenonDz commence à 20 000 DA, incluant le portfolio de réalisations, le formulaire de devis et le SEO local." },
    ],
  },
  "automatisation-scraping-google-maps": {
    title: "Scraping Google Maps & Génération de Leads en Algérie",
    seoTitle: "Scraping Google Maps Algérie | Génération Leads B2B | XenonDz",
    seoDesc: "Automatisez votre prospection B2B avec le scraping Google Maps en Algérie. XenonDz extrait noms, téléphones et emails d'entreprises ciblées en moins de 24h.",
    desc: "Chercher manuellement des prospects sur Google Maps vous prend des heures pour 20 contacts. Nos bots Python extraient automatiquement des centaines d'entreprises qualifiées — noms, numéros, adresses, emails — en quelques minutes.",
    aeoAnswer: "XenonDz propose des services de scraping Google Maps et de génération de leads B2B en Algérie à partir de 15 000 DA. Le service extrait les coordonnées d'entreprises ciblées (médecins, agences, commerces) par wilaya ou secteur d'activité.",
    aeoPoints: [
      "Extraction : nom, téléphone, adresse, email, site web",
      "Ciblage par wilaya, secteur d'activité ou mots-clés",
      "Livraison sous 24h en fichier Excel ou CSV",
      "Nettoyage et déduplication des données inclus",
      "Volume : de 100 à 10 000+ contacts par mission",
    ],
    benefits: [
      "Extraction Google Maps et LinkedIn",
      "Livraison en Excel/CSV sous 24h",
      "Ciblage wilaya + secteur précis",
      "Données nettoyées et vérifiées",
    ],
    faqs: [
      { q: "Quel est le prix d'un scraping Google Maps en Algérie ?", a: "Un scraping Google Maps pour la génération de leads B2B chez XenonDz commence à 15 000 DA pour 500 contacts ciblés. Le tarif varie selon le volume et la complexité du ciblage." },
      { q: "En combien de temps recevrai-je les leads ?", a: "Les fichiers de leads sont livrés sous 24 à 48h selon le volume demandé. Vous recevez un fichier Excel ou CSV propre et prêt à l'emploi." },
    ],
  },
};

export function Solutions() {
  const { secteur } = useParams<{ secteur: string }>();

  if (!secteur || !NICHES[secteur]) {
    return (
      <div className="pt-32 pb-16 text-center h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-foreground">Solution Introuvable</h1>
        <p className="text-muted-foreground mt-4 mb-8">Nous n'avons pas encore de page dédiée à ce secteur.</p>
        <Link href="/" className="btn-primary-pro px-6 py-3 rounded-lg text-white">Retour à l'accueil</Link>
      </div>
    );
  }

  const niche = NICHES[secteur];

  // Service schema for this niche
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": niche.title,
    "description": niche.aeoAnswer,
    "url": `${BASE_URL}/solutions/${secteur}`,
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "XenonDz",
    },
    "areaServed": { "@type": "Country", "name": "Algeria" },
    "serviceType": niche.title,
  };

  // FAQ schema for this niche
  const faqSchema = niche.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": niche.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  } : null;

  return (
    <>
      <SEOHead title={niche.seoTitle} description={niche.seoDesc} canonical={`${BASE_URL}/solutions/${secteur}`} />
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Services", url: "/services" },
        { name: niche.title, url: `/solutions/${secteur}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="w-full">
        {/* Hero */}
        <section className="hero-bg pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 hero-animate-1">
              <ArrowLeft size={16} /> Nos Solutions
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="hero-animate-2">
                <p className="section-label">Solution Sectorielle</p>
                <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {niche.title}
                </h1>
                <div className="gold-line" />
                <p className="text-lg text-muted-foreground mt-4 mb-8 leading-relaxed font-light">
                  {niche.desc}
                </p>
                <Link href="/contact" className="btn-primary-pro inline-flex px-8 py-3.5 text-base text-white rounded-lg">
                  Obtenir un devis immédiat
                </Link>
              </div>

              <div className="hero-animate-3">
                <div className="card-pro" style={{ transform: "none" }}>
                  <p className="section-label mb-4">Inclus dans cette solution</p>
                  <div className="space-y-4">
                    {niche.benefits.map((ft, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary mt-0.5" />
                        <span className="text-sm text-foreground leading-relaxed">{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AEO: Direct-answer block */}
        <section className="py-10 bg-background border-b border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote
              className="card-pro reveal"
              style={{
                borderLeft: "4px solid var(--primary)",
                padding: "1.5rem 2rem",
                background: "linear-gradient(135deg, rgba(26,26,110,0.04), rgba(26,26,110,0.01))",
              }}
            >
              <p className="text-foreground font-semibold leading-relaxed mb-3" style={{ fontSize: "1rem" }}>
                {niche.aeoAnswer}
              </p>
              <ol className="text-muted-foreground text-sm leading-relaxed space-y-1.5 list-none">
                {niche.aeoPoints.map((pt, i) => (
                  <li key={i}>✓&nbsp; {pt}</li>
                ))}
              </ol>
            </blockquote>
          </div>
        </section>

        {/* FAQ section — only if faqs exist */}
        {niche.faqs.length > 0 && (
          <section className="py-20 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 reveal">
                <p className="section-label" style={{ justifyContent: "center" }}>Questions fréquentes</p>
                <h2 className="text-foreground">Questions sur {niche.title}</h2>
                <div className="gold-line gold-line-center" />
              </div>
              <div className="space-y-4">
                {niche.faqs.map((faq, i) => (
                  <div key={i} className="card-pro reveal" style={{ padding: "1.5rem 2rem" }}>
                    <h3 className="font-semibold text-foreground mb-2" style={{ fontSize: "0.95rem" }}>{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="cta-section py-20 relative z-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Prêt à lancer votre projet ?
            </h2>
            <div className="gold-line gold-line-center" />
            <p className="text-white/70 text-lg mb-10 mt-4 font-light">
              Devis gratuit répondu sous 24h · Prix fixe sans surprise
            </p>
            <Link href="/contact" className="btn-primary-pro inline-flex items-center px-9 py-4 bg-white rounded-lg font-semibold text-base hover:bg-white/92 transition-all hover:-translate-y-1 duration-200 cursor-pointer"
              style={{ color: "var(--primary)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
              Obtenir un devis gratuit
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
