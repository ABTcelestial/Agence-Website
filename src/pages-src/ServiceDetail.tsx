'use client';

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { SEOHead } from "../components/seo/SEOHead";
import { ServiceDetailSchema } from "../components/seo/ServiceDetailSchema";
import { BreadcrumbSchema } from "../components/seo/BreadcrumbSchema";
import { ArrowLeft, CheckCircle2, Send, CheckCircle, Plus, Minus, Calculator, Package } from "lucide-react";
import { useState } from "react";
import { useServices } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabaseClient";

function formatPrice(price: number) {
  return price.toLocaleString("fr-DZ") + " DA";
}

const SEO_CONTENT: Record<string, { fr?: React.ReactNode; en?: React.ReactNode; ar?: React.ReactNode }> = {
  "creation-site-web-vitrine": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>En Algérie, plus de 80% des décideurs et des clients finaux effectuent une recherche approfondie sur Google avant d'acheter un produit, de louer un service ou d'initier une collaboration B2B. Un site vitrine professionnel n'est pas qu'une simple carte de visite esthétique égarée dans le web ; c'est un <strong>commercial d'élite ouvert 24h/24</strong>, prêt à capter et convertir chaque visiteur.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Pourquoi devez-vous absolument éviter les sites web Low-Cost ?</h3>
        <p>Un site internet lent, mal codé ou non responsive fait fuir près de 90% des internautes en moins de 3 secondes. C'est pour cette raison cruciale que XenonDz exclut systématiquement les thèmes WordPress préconçus et lourds. Nous construisons l'intégralité de nos architectures sur-mesure avec les technologies les plus modernes du marché : <strong>React et Next.js App Router</strong>. Cela garantit un affichage instantané et fluide, même sur les connexions mobiles algériennes (3G/4G et ADSL limité).</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Acquisition Client, SEO Local et Visibilité Algérie</h3>
        <p>Nous intégrons les meilleures pratiques de référencement naturel (SEO) dès la première ligne de code. De la hiérarchie sémantique rigoureuse (balises H1 à H6) à l'optimisation des métadonnées et du balisage Schema.org, nous faisons en sorte que votre entreprise se positionne tout en haut des recherches géolocalisées à Béjaïa, Alger, Oran et sur tout le territoire national. Vous apparaissez ainsi devant vos concurrents directs au moment précis où vos prospects recherchent vos services.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Notre Processus de Conception en 4 Étapes</h3>
        <p>De la phase de maquettage UI/UX centré sur la conversion, jusqu'au déploiement final sécurisé sur un CDN mondial (Vercel/Supabase), XenonDz collabore main dans la main avec vos équipes. Chaque projet inclut un nom de domaine en .dz ou .com, un certificat SSL de sécurité chiffré, un hébergement ultra-rapide gratuit pendant 1 an et un support technique réactif offert durant 6 mois pour assurer votre sérénité totale.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>In Algeria, over 80% of business managers and end customers search on Google before purchasing or starting a collaboration. A professional showcase website is not just a digital business card; it is a **24/7 high-performing sales agent** designed to attract, qualify, and convert local leads.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Why Avoid Heavy, Cheap CMS Platforms?</h3>
        <p>Slow or unresponsive websites turn away 90% of visitors in under 3 seconds. To prevent this, XenonDz builds all layouts from scratch using **React and Next.js**. We avoid heavy WordPress templates to guarantee immediate page load speeds, even on standard mobile networks.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Local SEO and AI Search (GEO) Optimisation</h3>
        <p>We implement professional technical SEO rules from day one. By optimizing structured data (JSON-LD), titles, and responsive layouts, we position your agency on the first page of Google and within AI engine search answers (ChatGPT, Gemini, Perplexity).</p>
      </div>
    )
  },
  "creation-boutique-ecommerce": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Le marché du commerce électronique en Algérie connaît une croissance fulgurante. Si vous continuez à vendre vos produits uniquement via des messageries privées sur Facebook, Instagram ou TikTok, vous passez à côté d'une clientèle hautement qualifiée et vous saturez vos équipes de gestion. Une <strong>boutique e-commerce moderne et structurée</strong> professionnalise votre image de marque, rassure vos acheteurs et automatise l'intégralité de vos ventes.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Optimisé pour le Paiement à la Livraison (Cash-on-Delivery)</h3>
        <p>Le marché algérien possède ses propres spécificités. La quasi-totalité des transactions repose sur le paiement à la livraison (CoD). Nos tunnels de commande (checkout) sont spécifiquement conçus pour éliminer toute friction inutile. L'acheteur valide son panier en quelques clics rapides, sans obligation de renseigner des cartes de paiement compliquées. Nous intégrons également des systèmes de validation automatique par SMS ou WhatsApp pour réduire le taux de retour de vos colis.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Intégration Logistique (Yalidine, Maystro, Procolis)</h3>
        <p>Pour vous faire gagner un temps précieux chaque jour, nos e-commerces Next.js sont connectés aux APIs des principaux transporteurs d'Algérie. Dès qu'un client passe une commande sur votre site, les informations sont instantanément transmises à votre livreur (Yalidine, Maystro, ZR Express, etc.). Les étiquettes d'expédition (bordereaux) sont générées en un clic, et le suivi de livraison se met à jour automatiquement.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Tableau de Bord Administratif & Autonomie Totale</h3>
        <p>Vous disposez d'un espace administrateur sécurisé et intuitif pour gérer vos fiches produits, vos tarifs promotionnels, vos stocks en temps réel par taille ou couleur, et analyser vos statistiques de vente. Chaque projet de boutique en ligne comprend une formation complète d'utilisation pour vous et vos collaborateurs, ainsi que 6 mois de maintenance technique et de sauvegardes hebdomadaires automatiques.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>The e-commerce market in Algeria is expanding rapidly. Transitioning from social media sales to a structured **Next.js online store** establishes solid trust, streamlines order workflows, and automates your business growth.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Tailored for the Cash-on-Delivery (CoD) Market</h3>
        <p>Since the local market operates mainly on Cash-on-Delivery, we optimize checkout funnels for quick forms. We eliminate unnecessary registration steps, and integrate local shipping APIs like **Yalidine and Maystro** for automatic shipping label generation.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Inventory Management & Complete Training</h3>
        <p>Track your orders, stock levels, variations (sizes/colors), and sales statistics through an easy-to-use admin dashboard. All our setups come with live training sessions and 6 months of secure maintenance support.</p>
      </div>
    )
  },
  "automatisation-generation-leads": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>La prospection commerciale manuelle et l'envoi de messages génériques individuels représentent une perte de temps considérable pour vos commerciaux B2B. Si vos équipes passent des heures quotidiennes à copier-coller des coordonnées d'entreprises à partir de Google Maps, d'annuaires ou de réseaux professionnels, XenonDz a la solution. Nos technologies d'<strong>automatisation de processus métier et de Web Scraping</strong> réinventent votre prospection.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Un Flux Continu de Prospects Chauds dans votre Boîte Mail</h3>
        <p>Grâce à des bots Python programmés sur-mesure, nous extrayons quotidiennement des bases de données qualifiées d'entreprises cibles en Algérie (nom de l'établissement, numéro de téléphone, adresse exacte, site web, email de contact). Nous trions, nettoyons et dédupliquons ces listes pour vous livrer des fichiers Excel prêts à être exploités pour vos campagnes de phoning ou d'emailing.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Synchronisation CRM et Automatisation des Rapports</h3>
        <p>Ne saisissez plus jamais un prospect manuellement. Nous connectons vos formulaires de contact et vos sources de données directement à vos CRM (HubSpot, Salesforce, Notion ou de simples fichiers Google Sheets partagés). Nos scripts de synchronisation éliminent les erreurs humaines et garantissent qu'aucun lead B2B ne se perde dans la nature.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Des Gains de Temps Estimés à plus de 20 heures par Semaine</h3>
        <p>En déléguant les tâches répétitives et l'extraction de données à des scripts automatisés exécutés en arrière-plan, vos forces de vente se concentrent uniquement sur ce qu'elles font de mieux : négocier, conseiller et conclure des contrats de vente. Le retour sur investissement (ROI) de nos solutions d'automatisation se mesure en quelques semaines seulement.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Manual B2B prospecting is slow and inefficient. XenonDz builds custom **Python web scrapers and B2B automation scripts** to feed your sales pipeline with fresh, qualified leads every day.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Highly Targeted B2B Contact Databases</h3>
        <p>We extract public data from directories, Google Maps, and LinkedIn to generate verified business lists (emails, phone numbers, addresses) matching your criteria, delivered directly in clean Excel or CSV formats.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>CRM Synchronization & Mass Outreach Tools</h3>
        <p>Sync all your lead sources directly with CRM tools like HubSpot or Google Sheets, and automate initial email or message outreach campaigns. Save over 20 hours per week of manual data entry.</p>
      </div>
    )
  },
  "referencement-naturel-seo": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Avoir un site internet moderne et rapide est une excellente première étape, mais s'il reste invisible sur Google, il ne générera aucun client. Le <strong>Référencement Naturel (SEO)</strong> représente la stratégie d'acquisition numérique la plus rentable et durable à moyen et long terme en Algérie. Être présent en première page de recherche Google, c'est capter une intention d'achat immédiate.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>L'Importance Capitale d'apparaître dans les 3 Premiers Résultats</h3>
        <p>Plus de 75% des clics sur Google se concentrent sur les trois premiers résultats de recherche organique. Si votre entreprise n'est pas positionnée sur ses mots-clés stratégiques (par exemple "grossiste agroalimentaire Alger" ou "agence immobilière Béjaïa"), vos prospects atterrissent systématiquement chez vos concurrents directs. Nous ciblons des mots-clés transactionnels précis pour générer du trafic qualifié, pas seulement des visites futiles.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>GEO : L'Optimisation pour les Moteurs de Recherche par Intelligence Artificielle</h3>
        <p>En 2026, la recherche en ligne a évolué. Les internautes interrogent de plus en plus des outils comme ChatGPT, Gemini ou Perplexity pour obtenir des recommandations d'achat. Chez XenonDz, nous ciblons également les standards de <strong>Generative Engine Optimization (GEO)</strong>. Nous structurons vos contenus avec des balises ciblées, des réponses directes et des fichiers médata pour que les intelligences artificielles citent votre entreprise comme la référence absolue dans votre secteur en Algérie.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Audit, Analyse Sémantique, Technique et Netlinking</h3>
        <p>Notre accompagnement SEO mensuel englobe : l'optimisation technique continue de votre site (temps de chargement, balisage schema.org), la création de cocons sémantiques complets (articles informatifs répondant aux questions réelles des utilisateurs) et l'acquisition de liens de confiance (netlinking local) pour asseoir l'autorité de votre domaine aux yeux des moteurs de recherche.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>A beautiful website is useless if nobody can find it. **Search Engine Optimization (SEO)** is the most cost-effective B2B client acquisition strategy in the Algerian digital market.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Targeting High-Intent Transactional Keywords</h3>
        <p>We audit your market, research competitors, and target keywords that drive high-intent commercial buyers. We ensure your web page ranks among the top Google search results to maximize visibility.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>GEO: Preparing for AI Search Results</h3>
        <p>We implement modern Generative Engine Optimization rules, creating rich schemas and data nodes, enabling search tools like Gemini, ChatGPT, and AI Overviews to easily cite and recommend your brand.</p>
      </div>
    )
  },
  "developpement-application-sur-mesure": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Les logiciels prêts à l'emploi du marché s'adaptent rarement à 100% à l'organisation unique d'une PME ou d'une entreprise industrielle en Algérie. Forcer vos employés à modifier leurs méthodes de travail pour s'adapter à un outil rigide crée des inefficacités. Le <strong>développement d'applications web sur-mesure</strong> chez XenonDz vous permet d'obtenir un outil métier (CRM, ERP, portail client ou extranet) conçu exclusivement autour de votre flux opérationnel existant.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Des Logiciels Métiers Performants et Sécurisés</h3>
        <p>Nous concevons des portails clients, des modules de gestion des stocks, des outils de facturation interne et des plateformes SaaS hautement personnalisés. Grâce à une architecture centralisée reposant sur <strong>Next.js, Node.js et des bases de données PostgreSQL sécurisées</strong>, vos informations d'entreprise restent protégées, rapides d'accès et exploitables en temps réel par plusieurs collaborateurs disposant de niveaux d'autorisation différents.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Économisez des dizaines d'heures de Gestion Hebdomadaire</h3>
        <p>Nos clients qui remplacent leurs processus manuels (fichiers Excel éparpillés, documents papier, relances manuelles) par un portail web sur-mesure constatent un gain moyen de 20 heures de gestion administrative par semaine. Moins d'erreurs de saisie, reporting en temps réel de votre chiffre d'affaires et historique complet de chaque interaction client.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Formation, Accompagnement et Maintenance Évolutive</h3>
        <p>Le développement d'un logiciel métier sur-mesure inclut une phase rigoureuse de recueil des besoins, le prototypage UI/UX, le codage sécurisé, la formation active de vos collaborateurs sur site ou à distance, et une formule de maintenance mensuelle pour adapter l'application au fur et à mesure que votre entreprise grandit.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Generic market software rarely matches your custom business workflows. XenonDz builds **custom secure web applications** (CRMs, ERPs, customer portals, custom dashboards) crafted around your specific internal process.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Next.js and PostgreSQL Secure Architectures</h3>
        <p>We leverage modern databases and multi-user frameworks to keep your B2B enterprise data safe, offering real-time analytics, automatic backup configurations, and multi-tier access level profiles.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Massive Team Efficiency Gains</h3>
        <p>Say goodbye to thousands of disconnected spreadsheets. Consolidate your sales, inventory, and billing workflows into a single interface. Expect over 20 hours of administrative time saved weekly.</p>
      </div>
    )
  },
  "audit-optimisation-performance": {
    fr: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>Un site internet lent est une barrière infranchissable pour vos clients et un motif de pénalité direct de la part de Google. Si vos utilisateurs attendent plus de 3 secondes avant de voir s'afficher vos produits ou vos tarifs sur mobile, la majorité abandonne et retourne sur les résultats de recherche. Notre service d'<strong>audit et d'optimisation de performance technique</strong> redonne une seconde jeunesse à votre site existant.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Refactoring de Code et Standards Core Web Vitals</h3>
        <p>Nous analysons en profondeur la structure technique de votre site (WordPress lourd, site custom mal configuré, scripts tiers intrusifs). Nous intervenons sur les indicateurs de vitesse clés exigés par Google, notamment l'<strong>INP (Interaction to Next Paint)</strong> et le <strong>LCP (Largest Contentful Paint)</strong>. Nous compressons vos images sans perte de qualité, minifions les scripts JS/CSS et mettons en place des systèmes de mise en cache ultra-performants.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Augmentez vos Ventes en conservant le même Trafic (+40% de conversion)</h3>
        <p>Augmenter le nombre de visites sur son site web coûte cher en publicité ou en temps. Optimiser la vitesse de chargement de vos pages existantes permet d'améliorer immédiatement l'expérience utilisateur et donc d'<strong>augmenter vos taux de conversion d'environ 40%</strong>, à trafic égal. C'est l'optimisation technique avec le meilleur retour sur investissement disponible.</p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Rapport Comparatif Avant/Après Détaillé</h3>
        <p>Chaque audit de performance s'accompagne d'une mesure scientifique de la vitesse de vos pages et d'un rapport de livraison technique comparatif. Nous assurons la pérennité des optimisations pour que votre site conserve son excellente réactivité sur la durée, pour le confort de vos visiteurs.</p>
      </div>
    ),
    en: (
      <div className="space-y-6 text-left text-foreground/90 leading-relaxed font-light">
        <p>A slow loading website is a massive sales killer. XenonDz audits, restructures, and optimizes your existing platform to meet Google's **Core Web Vitals** performance requirements.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Optimizing LCP, CLS, and Interaction to Next Paint (INP)</h3>
        <p>We reduce code bloat, compress media assets, optimize database calls, and clean up heavy CMS structures to bring your page load speed under 1.5 seconds, even on standard local mobile 4G.</p>
        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>Increase Orders by 40% Without Paying for New Traffic</h3>
        <p>A faster site naturally converts more visitors into paying leads. Accelerate your existing infrastructure for a direct and quick boost in client conversion and organic search rankings.</p>
      </div>
    )
  }
};

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang: language } = useLanguage();
  const { services, loading } = useServices();
  const service = services.find((s) => s.slug === slug)!;

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
  if (!service) {
    notFound();
    return null;
  }

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = service.addons.find((ad) => ad.id === id);
    return sum + (a?.price || 0);
  }, 0);
  const total = service.basePrice + addonsTotal;

  // i18n helpers
  function getAddonLabel(addon: typeof service.addons[0]) {
    if (language === "en") return addon.labelEn;
    if (language === "ar") return addon.labelAr;
    return addon.label;
  }
  function getAddonDesc(addon: typeof service.addons[0]) {
    if (language === "en") return addon.descriptionEn;
    if (language === "ar") return addon.descriptionAr;
    return addon.description;
  }
  function getServiceTitle() {
    if (language === "en") return service.titleEn;
    if (language === "ar") return service.titleAr;
    return service.title;
  }
  function getLongDesc() {
    if (SEO_CONTENT[service!.slug]) {
       const content = SEO_CONTENT[service!.slug];
       if (language === "en" && content.en) return content.en;
       if (language === "ar" && content.ar) return content.ar;
       if (content.fr) return content.fr;
    }
    if (language === "en") return service!.longDescriptionEn;
    if (language === "ar") return service!.longDescriptionAr;
    return service!.longDescription;
  }
  function getFeature(i: number) {
    if (language === "en") return service.featuresEn[i];
    if (language === "ar") return service.featuresAr[i];
    return service.features[i];
  }
  function getDuration() {
    if (language === "en") return service.durationEn;
    if (language === "ar") return service.durationAr;
    return service.duration;
  }
  function getStepTitle(step: typeof service.process[0]) {
    if (language === "en") return step.titleEn;
    if (language === "ar") return step.titleAr;
    return step.title;
  }
  function getStepDesc(step: typeof service.process[0]) {
    if (language === "en") return step.descriptionEn;
    if (language === "ar") return step.descriptionAr;
    return step.description;
  }

  // Labels
  const L = {
    fr: {
      back: "Tous les services",
      ourService: "Notre service",
      included: "Ce qui est inclus",
      howItWorks: "Comment ça se passe",
      processTitle: "Notre processus pour ce service",
      orderTitle: "Commander ce service",
      orderLabel: "Passons à l'action",
      orderDesc: "Remplissez le formulaire — nous vous répondons sous 24h avec un devis détaillé.",
      selectedService: "Service sélectionné",
      addonsTitle: "Options à ajouter",
      addonsDesc: "Enrichissez votre commande avec des options sur-mesure.",
      basePrice: "À partir de",
      totalEstimate: "Total estimé",
      noAddons: "À partir de",
      name: "Nom complet *",
      email: "Email *",
      phone: "Téléphone",
      company: "Entreprise",
      budget: "Budget estimé",
      message: "Décrivez votre projet *",
      messagePlaceholder: (title: string) => `Parlez-nous de votre projet "${title}" : contexte, objectifs, contraintes particulières…`,
      submit: "Envoyer ma demande",
      sending: "Envoi en cours…",
      footnote: "Réponse garantie sous 24h · Devis gratuit et sans engagement",
      successTitle: "Demande envoyée !",
      successDesc: "Nous vous répondrons dans les 24h avec un devis personnalisé.",
      backServices: "Retour aux services",
      error: "Une erreur s'est produite. Vérifiez votre clé Web3Forms et réessayez.",
      seeAlso: "Voir aussi",
      otherServices: "Nos autres services",
      selectBudget: "Sélectionnez une tranche",
      budgetOptions: [
        { value: "500-2000", label: "5 000DA – 20 000DA" },
        { value: "2000-5000", label: "20 000DA – 50 000DA" },
        { value: "5000-10000", label: "50 000DA – 100 000DA" },
        { value: "10000-15000", label: "100 000DA – 150 000DA" },
        { value: "10000+", label: "Plus de 150 000DA" },
      ],
      addedOptions: (n: number) => n > 0 ? `${n} option${n > 1 ? "s" : ""} ajoutée${n > 1 ? "s" : ""}` : "",
      orderSummary: "Récapitulatif de commande",
    },
    en: {
      back: "All services",
      ourService: "Our service",
      included: "What's included",
      howItWorks: "How it works",
      processTitle: "Our process for this service",
      orderTitle: "Order this service",
      orderLabel: "Let's get started",
      orderDesc: "Fill in the form — we'll reply within 24h with a detailed quote.",
      selectedService: "Selected service",
      addonsTitle: "Available add-ons",
      addonsDesc: "Enhance your order with custom options.",
      basePrice: "Starting from",
      totalEstimate: "Estimated total",
      noAddons: "Starting from",
      name: "Full name *",
      email: "Email *",
      phone: "Phone",
      company: "Company",
      budget: "Estimated budget",
      message: "Describe your project *",
      messagePlaceholder: (title: string) => `Tell us about your "${title}" project: context, goals, constraints…`,
      submit: "Send my request",
      sending: "Sending…",
      footnote: "Guaranteed reply within 24h · Free quote · No commitment",
      successTitle: "Request sent!",
      successDesc: "We'll reply within 24h with a personalised quote.",
      backServices: "Back to services",
      error: "An error occurred. Check your Web3Forms key and try again.",
      seeAlso: "See also",
      otherServices: "Our other services",
      selectBudget: "Select a range",
      budgetOptions: [
        { value: "500-2000", label: "5,000DA – 20,000DA" },
        { value: "2000-5000", label: "20,000DA – 50,000DA" },
        { value: "5000-10000", label: "50,000DA – 100,000DA" },
        { value: "10000-15000", label: "100,000DA – 150,000DA" },
        { value: "10000+", label: "Over 150,000DA" },
      ],
      addedOptions: (n: number) => n > 0 ? `${n} option${n > 1 ? "s" : ""} added` : "",
      orderSummary: "Order summary",
    },
    ar: {
      back: "جميع الخدمات",
      ourService: "خدمتنا",
      included: "ما هو مشمول",
      howItWorks: "كيف يسير الأمر",
      processTitle: "عمليتنا لهذه الخدمة",
      orderTitle: "اطلب هذه الخدمة",
      orderLabel: "لنبدأ",
      orderDesc: "املأ النموذج — سنرد عليك خلال 24 ساعة بعرض مفصل.",
      selectedService: "الخدمة المختارة",
      addonsTitle: "الإضافات المتاحة",
      addonsDesc: "عزز طلبك بخيارات مخصصة.",
      basePrice: "ابتداءً من",
      totalEstimate: "الإجمالي التقديري",
      noAddons: "ابتداءً من",
      name: "الاسم الكامل *",
      email: "البريد الإلكتروني *",
      phone: "الهاتف",
      company: "الشركة",
      budget: "الميزانية التقريبية",
      message: "صف مشروعك *",
      messagePlaceholder: (title: string) => `أخبرنا عن مشروع "${title}": السياق، الأهداف، القيود…`,
      submit: "إرسال طلبي",
      sending: "جارٍ الإرسال...",
      footnote: "رد مضمون خلال 24 ساعة · عرض مجاني · بدون التزام",
      successTitle: "تم إرسال الطلب!",
      successDesc: "سنرد عليك خلال 24 ساعة بعرض مخصص.",
      backServices: "العودة إلى الخدمات",
      error: "حدث خطأ. تحقق من مفتاح Web3Forms وأعد المحاولة.",
      seeAlso: "انظر أيضاً",
      otherServices: "خدماتنا الأخرى",
      selectBudget: "اختر نطاقاً",
      budgetOptions: [
        { value: "500-2000", label: "5,000 – 20,000 دج" },
        { value: "2000-5000", label: "20,000 – 50,000 دج" },
        { value: "5000-10000", label: "50,000 – 100,000 دج" },
        { value: "10000-15000", label: "100,000 – 150,000 دج" },
        { value: "10000+", label: "أكثر من 150,000 دج" },
      ],
      addedOptions: (n: number) => n > 0 ? `تمت إضافة ${n} خيار` : "",
      orderSummary: "ملخص الطلب",
    },
  };
  const lx = L[language] || L.fr;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const addonsInfo = selectedAddons.length > 0
      ? "\n\nOptions sélectionnées:\n" + selectedAddons.map(id => {
          const a = service.addons.find(ad => ad.id === id);
          return a ? `- ${a.label} (+${formatPrice(a.price)})` : "";
        }).filter(Boolean).join("\n") + `\n\nTotal estimé: ${formatPrice(total)}`
      : `\n\nPrix de base: ${formatPrice(service.basePrice)}`;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Commande : ${getServiceTitle()} — ${formatPrice(total)}`,
          service: getServiceTitle(),
          options: selectedAddons.join(", ") || "Aucune",
          total: formatPrice(total),
          ...formData,
          message: formData.message + addonsInfo,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Save to Supabase for admin tracking (fire-and-forget)
        supabase.from("contact_requests").insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: `${getServiceTitle()}${selectedAddons.length > 0 ? ` + ${selectedAddons.length} option(s)` : ""}`,
          budget: formData.budget || null,
          message: formData.message + addonsInfo,
          status: "new",
        }]).then(() => {});

        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
        setSelectedAddons([]);
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputClass = "w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-sm focus:outline-none transition-all";

  // SEO dynamique basé sur le service
  const seoTitle = `${getServiceTitle()} en Algérie | XenonDz`;
  const seoDesc = `Ne laissez plus vos concurrents prendre l'avantage. Service de ${getServiceTitle()} professionnel en Algérie. Devis gratuit et livraison rapide.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`https://xenondz.vercel.app/services/${slug}`}
      />
      <ServiceDetailSchema
        name={getServiceTitle()}
        description={seoDesc}
        slug={slug!}
        basePrice={service.priceSuffix ? null : service.basePrice}
        priceSuffix={service.priceSuffix}
        duration={getDuration()}
        features={service.features}
      />
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Services", url: "/services" },
        { name: getServiceTitle(), url: `/services/${slug}` },
      ]} />
      <div className="w-full">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 hero-animate-1">
            <ArrowLeft size={16} />
            {lx.back}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-animate-2">
              <p className="section-label">{lx.ourService}</p>
              <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {getServiceTitle()}
              </h1>
              <div className="gold-line" />
              <div className="text-lg text-muted-foreground mt-4 mb-8 leading-relaxed font-light">
                {getLongDesc()}
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(26,26,110,0.04))", color: "var(--primary)", border: "1px solid rgba(26,26,110,0.12)" }}>
                  {service.priceSuffix ? lx.basePrice + " : Sur devis" : lx.basePrice + " : " + formatPrice(service.basePrice)}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))", color: "#7a5a0a", border: "1px solid rgba(201,168,76,0.25)" }}>
                  {getDuration()}
                </div>
              </div>
            </div>

            <div className="hero-animate-3">
              <div className="card-pro" style={{ transform: "none" }}>
                <p className="section-label mb-4">{lx.included}</p>
                <div className="space-y-3">
                  {service.features.map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}>
                        <CheckCircle2 size={11} className="text-white" />
                      </div>
                      <span className="text-sm text-foreground leading-relaxed">{getFeature(i)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process — only show if steps exist */}
      {service.process.length > 0 && (
      <section className="py-20" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{lx.howItWorks}</p>
            <h2 className="text-foreground">{lx.processTitle}</h2>
            <div className="gold-line gold-line-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 cursor-default">
            {service.process.map((step, i) => (
              <div key={i} className={`step-item text-center reveal reveal-delay-${i + 1}`}>
                <div className="step-number">{step.step}</div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-family)", fontSize: "1rem" }}>{getStepTitle(step)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{getStepDesc(step)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Order Form */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{lx.orderLabel}</p>
            <h2 className="text-foreground">{lx.orderTitle}</h2>
            <div className="gold-line gold-line-center" />
            <p className="text-muted-foreground mt-3 font-light">{lx.orderDesc}</p>
          </div>

          <div className="card-pro reveal reveal-delay-1" style={{ padding: "2.5rem" }}>

            {/* Service badge */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl"
              style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.05), rgba(201,168,76,0.04))", border: "1px solid rgba(26,26,110,0.1)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift))" }}>
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{lx.selectedService}</p>
                <p className="text-sm font-semibold text-foreground">{getServiceTitle()}</p>
              </div>
              {!service.priceSuffix && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{lx.basePrice}</p>
                  <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>{formatPrice(service.basePrice)}</p>
                </div>
              )}
            </div>

            {/* ── Add-ons section ── */}
            {service.addons.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Package size={15} style={{ color: "var(--primary)" }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                    {lx.addonsTitle}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{lx.addonsDesc}</p>

                <div className="space-y-2">
                  {service.addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className="flex items-start justify-between gap-3 rounded-xl p-3.5 cursor-pointer transition-all"
                        style={{
                          background: isSelected
                            ? "linear-gradient(135deg, rgba(26,26,110,0.07), rgba(201,168,76,0.04))"
                            : "rgba(26,26,110,0.02)",
                          border: isSelected
                            ? "1px solid rgba(26,26,110,0.22)"
                            : "1px solid rgba(26,26,110,0.07)",
                        }}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-foreground">{getAddonLabel(addon)}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(201,168,76,0.12)", color: "#7a5a0a", border: "1px solid rgba(201,168,76,0.25)" }}>
                              +{formatPrice(addon.price)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{getAddonDesc(addon)}</p>
                        </div>
                        <button
                          type="button"
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                          style={{
                            background: isSelected ? "var(--primary)" : "rgba(26,26,110,0.08)",
                          }}>
                          {isSelected
                            ? <Minus size={13} className="text-white" />
                            : <Plus size={13} style={{ color: "var(--primary)" }} />}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Running total */}
                {!service.priceSuffix && (
                  <div className="mt-4 rounded-xl p-3.5 flex items-center justify-between"
                    style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.06), rgba(26,26,110,0.02))", border: "1px solid rgba(26,26,110,0.12)" }}>
                    <div className="flex items-center gap-2">
                      <Calculator size={15} style={{ color: "var(--primary)" }} />
                      <span className="text-sm font-semibold text-foreground">
                        {selectedAddons.length > 0 ? lx.totalEstimate : lx.noAddons}
                      </span>
                      {selectedAddons.length > 0 && (
                        <span className="text-xs text-muted-foreground">({lx.addedOptions(selectedAddons.length)})</span>
                      )}
                    </div>
                    <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Separator */}
            <div className="border-t border-border mb-6" />

            {/* Form */}
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(201,168,76,0.08))" }}>
                  <CheckCircle size={32} style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>{lx.successTitle}</h3>
                <p className="text-muted-foreground text-sm mb-6">{lx.successDesc}</p>
                <Link href="/services">
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    <ArrowLeft size={14} />
                    {lx.backServices}
                  </button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.name}</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                      className={inputClass} placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.email}</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className={inputClass} placeholder="jean@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.phone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className={inputClass} placeholder="+213 6 12 34 56 78" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.company}</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      className={inputClass} placeholder="Mon Entreprise" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.budget}</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                    <option value="">{lx.selectBudget}</option>
                    {lx.budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.message}</label>
                  <textarea name="message" required value={formData.message} onChange={handleChange}
                    rows={5} className={`${inputClass} resize-none`}
                    placeholder={lx.messagePlaceholder(getServiceTitle())} />
                </div>

                {/* Order summary before submit */}
                {!service.priceSuffix && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(26,26,110,0.03)", border: "1px solid rgba(26,26,110,0.08)" }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--primary)" }}>{lx.orderSummary}</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{getServiceTitle()}</span>
                        <span>{formatPrice(service.basePrice)}</span>
                      </div>
                      {selectedAddons.map((id) => {
                        const a = service.addons.find((ad) => ad.id === id);
                        if (!a) return null;
                        return (
                          <div key={id} className="flex justify-between text-xs text-muted-foreground">
                            <span>+ {getAddonLabel(a)}</span>
                            <span>+{formatPrice(a.price)}</span>
                          </div>
                        );
                      })}
                      <div className="border-t border-border pt-2 mt-2 flex justify-between">
                        <span className="text-sm font-bold text-foreground">{lx.totalEstimate}</span>
                        <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="text-sm rounded-lg px-4 py-3"
                    style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", color: "#dc2626" }}>
                    {lx.error}
                  </div>
                )}

                <button type="submit" disabled={status === "loading"}
                  className="btn-primary-pro w-full flex items-center justify-center px-6 py-3.5 text-base text-white rounded-lg disabled:opacity-60 cursor-pointer">
                  {status === "loading" ? lx.sending : lx.submit}
                  {status !== "loading" && <Send size={17} className="ml-2" />}
                </button>
                <p className="text-xs text-muted-foreground text-center">{lx.footnote}</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16" style={{ background: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <p className="section-label" style={{ justifyContent: "center" }}>{lx.seeAlso}</p>
            <h2 className="text-foreground" style={{ fontSize: "1.75rem" }}>{lx.otherServices}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((s) => s.slug !== slug)
              .slice(0, 3)
              .map((s, i) => {
                const sTitle = language === "en" ? s.titleEn : language === "ar" ? s.titleAr : s.title;
                return (
                  <Link key={s.slug} href={`/services/${s.slug}`}
                    className={`card-pro reveal reveal-delay-${i + 1} flex items-center gap-4 group`}
                    style={{ padding: "1.25rem" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(26,26,110,0.03))" }}>
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{sTitle}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {s.priceSuffix ? s.priceSuffix : formatPrice(s.basePrice)}
                      </p>
                    </div>
                    <ArrowLeft size={14} className="text-muted-foreground group-hover:text-primary transition-colors rotate-180 flex-shrink-0" />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}