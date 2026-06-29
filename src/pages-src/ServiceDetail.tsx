'use client';

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { SEOHead } from "../components/seo/SEOHead";
import { ServiceDetailSchema } from "../components/seo/ServiceDetailSchema";
import { BreadcrumbSchema } from "../components/seo/BreadcrumbSchema";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Send, CheckCircle,
  Plus, Minus, Calculator, Package, ChevronDown, AlertTriangle,
  Zap, Shield, Clock, ShoppingCart, Users, Database, TrendingUp, Search, Cpu, Wrench,
} from "lucide-react";
import { useState } from "react";
import { useServices, Service, getIconForSlug, services as allServices } from "@/data/services";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabaseClient";

function formatPrice(price: number) {
  return price.toLocaleString("fr-DZ") + " DA";
}

// ─── SEO long-form content (kept for indexation) ─────────────────────────────
const SEO_CONTENT: Record<string, { fr?: React.ReactNode; en?: React.ReactNode; ar?: React.ReactNode }> = {
  "creation-site-web-vitrine": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>En Algérie, plus de 80% des décideurs effectuent une recherche Google avant d'acheter un service ou d'initier une collaboration B2B. Un site vitrine professionnel est un <strong className="font-semibold text-foreground">commercial d'élite ouvert 24h/24</strong>, prêt à capter et convertir chaque visiteur.</p>
        <p>Un site internet lent, mal codé ou non responsive fait fuir près de 90% des internautes en moins de 3 secondes. XenonDz exclut systématiquement les thèmes WordPress préconçus. Nous construisons l'intégralité de nos architectures sur-mesure avec <strong className="font-semibold text-foreground">React et Next.js App Router</strong> — affichage instantané et fluide, même sur 3G/4G.</p>
        <p>Nous intégrons les meilleures pratiques SEO dès la première ligne de code : hiérarchie sémantique rigoureuse, optimisation des métadonnées et du balisage Schema.org. Votre entreprise se positionne devant vos concurrents directs au moment précis où vos prospects recherchent vos services à Béjaïa, Alger, Oran et sur tout le territoire national.</p>
      </div>
    ),
  },
  "creation-boutique-ecommerce": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>Le marché du commerce électronique en Algérie connaît une croissance fulgurante. Si vous continuez à vendre uniquement via Facebook ou Instagram, vous saturez vos équipes et passez à côté d'une clientèle hautement qualifiée. Une <strong className="font-semibold text-foreground">boutique e-commerce structurée</strong> professionnalise votre image et automatise l'intégralité de vos ventes.</p>
        <p>Le marché algérien repose sur le paiement à la livraison (CoD). Nos tunnels de commande sont spécifiquement conçus pour éliminer toute friction : l'acheteur valide son panier en quelques clics rapides, sans renseigner de carte bancaire. Nous intégrons des systèmes de validation automatique par SMS ou WhatsApp pour réduire le taux de retour.</p>
        <p>Vous disposez d'un espace administrateur sécurisé et intuitif pour gérer vos fiches produits, tarifs promotionnels, stocks en temps réel et statistiques de vente. Chaque projet inclut une <strong className="font-semibold text-foreground">formation complète</strong> et 6 mois de maintenance technique.</p>
      </div>
    ),
  },
  "automatisation-generation-leads": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>La prospection commerciale manuelle représente une perte de temps considérable. Si vos équipes passent des heures à copier-coller des coordonnées depuis Google Maps ou des annuaires, XenonDz a la solution. Nos technologies d'<strong className="font-semibold text-foreground">automatisation et de Web Scraping</strong> réinventent votre prospection.</p>
        <p>Grâce à des bots Python programmés sur-mesure, nous extrayons quotidiennement des bases de données qualifiées d'entreprises cibles (nom, téléphone, adresse, email). Nous trions, nettoyons et dédupliquons ces listes pour vous livrer des fichiers Excel prêts à exploiter pour vos campagnes de phoning ou d'emailing.</p>
        <p>En déléguant les tâches répétitives à des scripts automatisés, vos forces de vente se concentrent sur ce qu'elles font de mieux : négocier, conseiller et conclure. Le ROI de nos solutions d'automatisation se mesure en quelques semaines seulement.</p>
      </div>
    ),
  },
  "referencement-naturel-seo": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>Avoir un site moderne est une excellente première étape, mais s'il reste invisible sur Google, il ne générera aucun client. Le <strong className="font-semibold text-foreground">Référencement Naturel (SEO)</strong> représente la stratégie d'acquisition numérique la plus rentable et durable en Algérie.</p>
        <p>Plus de 75% des clics se concentrent sur les trois premiers résultats de recherche organique. Si votre entreprise n'est pas positionnée sur ses mots-clés stratégiques, vos prospects atterrissent chez vos concurrents. Nous ciblons des mots-clés transactionnels précis pour générer du trafic qualifié.</p>
        <p>En 2026, nous ciblons également les standards de <strong className="font-semibold text-foreground">Generative Engine Optimization (GEO)</strong>. Nous structurons vos contenus pour que les intelligences artificielles (ChatGPT, Gemini, Perplexity) citent votre entreprise comme la référence dans votre secteur en Algérie.</p>
      </div>
    ),
  },
  "developpement-application-sur-mesure": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>Les logiciels prêts à l'emploi s'adaptent rarement à 100% à l'organisation unique d'une PME algérienne. Forcer vos employés à modifier leurs méthodes crée des inefficacités. Le <strong className="font-semibold text-foreground">développement d'applications web sur-mesure</strong> vous donne un outil métier conçu exclusivement autour de votre flux opérationnel.</p>
        <p>Nous concevons des portails clients, modules de gestion des stocks, outils de facturation et plateformes SaaS personnalisés. Grâce à <strong className="font-semibold text-foreground">Next.js, Node.js et des bases de données PostgreSQL sécurisées</strong>, vos données restent protégées et accessibles en temps réel par toute votre équipe.</p>
        <p>Nos clients qui remplacent leurs processus manuels par un portail web sur-mesure constatent un gain moyen de <strong className="font-semibold text-foreground">20 heures de gestion administrative par semaine</strong>. Moins d'erreurs de saisie, reporting en temps réel et historique complet de chaque interaction client.</p>
      </div>
    ),
  },
  "audit-optimisation-performance": {
    fr: (
      <div className="space-y-5 text-left text-foreground/80 leading-relaxed font-light text-sm">
        <p>Un site internet lent est une barrière infranchissable pour vos clients et un motif de pénalité direct de Google. Si vos utilisateurs attendent plus de 3 secondes sur mobile, la majorité abandonne. Notre <strong className="font-semibold text-foreground">service d'audit et d'optimisation</strong> redonne une seconde jeunesse à votre site existant.</p>
        <p>Nous analysons en profondeur votre structure technique et intervenons sur les indicateurs de vitesse clés exigés par Google : <strong className="font-semibold text-foreground">INP (Interaction to Next Paint)</strong> et <strong className="font-semibold text-foreground">LCP (Largest Contentful Paint)</strong>. Compression d'images, minification JS/CSS, systèmes de cache ultra-performants.</p>
        <p>Augmenter le trafic coûte cher. Optimiser la vitesse de vos pages existantes améliore immédiatement l'expérience et <strong className="font-semibold text-foreground">augmente vos taux de conversion d'environ 40%</strong>, à trafic égal.</p>
      </div>
    ),
  },
};

// ─── Visual benefits (3 per service) ─────────────────────────────────────────
type LucideIcon = React.FC<{ size?: number; className?: string }>;
type Benefit = { icon: LucideIcon; title: string; desc: string };

const SERVICE_BENEFITS: Record<string, Benefit[]> = {
  "creation-site-web-vitrine": [
    { icon: Zap, title: "Performance maximale", desc: "React + Next.js, zéro template WordPress. Chargement instantané même sur 3G/4G algérienne — là où les CMS ralentissent, votre site vole." },
    { icon: Search, title: "SEO local intégré", desc: "Balises optimisées, Schema.org, sitemap XML. Visible sur Google Béjaïa, Alger et toute l'Algérie dès la mise en ligne." },
    { icon: Clock, title: "Livraison en 7 jours", desc: "Maquette validée J+2, développement J+5, déploiement J+7. Processus rodé, délai contractuellement garanti." },
  ],
  "creation-boutique-ecommerce": [
    { icon: ShoppingCart, title: "Optimisé pour le COD", desc: "Tunnel de commande sans carte bancaire — nom, téléphone, adresse. Taux de conversion maximisé pour le marché algérien." },
    { icon: Package, title: "Catalogue illimité", desc: "Ajoutez, modifiez et gérez vos produits, stocks et variantes en temps réel depuis votre téléphone ou PC." },
    { icon: Users, title: "Formation & support", desc: "Vous prenez les rênes dès la livraison. Formation complète incluse + 6 mois de support technique offert." },
  ],
  "automatisation-generation-leads": [
    { icon: Clock, title: "+20h/semaine économisées", desc: "Vos tâches répétitives tournent en arrière-plan pendant que vos équipes se concentrent sur la vente et la négociation." },
    { icon: Database, title: "Données qualifiées livrées", desc: "Bases prospects extraites de Google Maps et annuaires — nettoyées, dédupliquées, prêtes à exploiter en Excel." },
    { icon: Cpu, title: "Python sur mesure", desc: "Des scripts adaptés à vos systèmes existants, pas des outils SaaS génériques. Évolutifs, maintenus, documentés." },
  ],
  "referencement-naturel-seo": [
    { icon: TrendingUp, title: "Trafic qualifié", desc: "Nous ciblons des mots-clés à intention d'achat — des visiteurs qui cherchent exactement ce que vous proposez." },
    { icon: Shield, title: "Résultats durables", desc: "Le SEO travaille 24/7 sans budget publicitaire quotidien. Un investissement qui prend de la valeur avec le temps." },
    { icon: Zap, title: "GEO inclus", desc: "Optimisation pour les IA (ChatGPT, Gemini, Perplexity) en plus de Google — la prochaine frontière du trafic organique." },
  ],
  "developpement-application-sur-mesure": [
    { icon: Wrench, title: "100% sur mesure", desc: "Aucun outil SaaS ne ressemble à votre processus interne. Nous codons exactement ce dont votre métier a besoin." },
    { icon: Users, title: "Multi-utilisateurs & rôles", desc: "Niveaux d'accès distincts, historique complet, reporting temps réel — toute votre équipe sur un même outil." },
    { icon: TrendingUp, title: "+20h/semaine économisées", desc: "Vos fichiers Excel éparpillés remplacés par un portail centralisé. Moins d'erreurs, plus de visibilité." },
  ],
  "audit-optimisation-performance": [
    { icon: TrendingUp, title: "+40% de conversion", desc: "Sans augmenter votre budget publicitaire. Un site plus rapide convertit davantage de visiteurs en clients." },
    { icon: Search, title: "Core Web Vitals", desc: "LCP, INP, CLS : les 3 métriques que Google utilise pour vous classer. Nous les amènons aux seuils 'Bon'." },
    { icon: Shield, title: "Rapport comparatif", desc: "Avant/après documenté avec scores réels. Vous vérifiez chaque progrès accompli, métriques à l'appui." },
  ],
};

// ─── Process steps (4 per service) ───────────────────────────────────────────
type Step = { num: string; title: string; desc: string };

const SERVICE_STEPS: Record<string, Step[]> = {
  "creation-site-web-vitrine": [
    { num: "01", title: "Découverte", desc: "Brief détaillé, objectifs business, références visuelles et contenu." },
    { num: "02", title: "Maquette", desc: "Design UI validé avant toute ligne de code — vous approuvez chaque écran." },
    { num: "03", title: "Développement", desc: "Codage React/Next.js, intégration SEO, responsive et tests multi-devices." },
    { num: "04", title: "Livraison", desc: "Déploiement, formation admin, support activé pour 6 mois." },
  ],
  "creation-boutique-ecommerce": [
    { num: "01", title: "Architecture", desc: "Structure catalogue, catégories, variantes produits et parcours client." },
    { num: "02", title: "Design & Tunnel", desc: "Fiches produit + checkout COD optimisé pour le marché algérien." },
    { num: "03", title: "Tests complets", desc: "Parcours commande validé, stocks, notifications SMS/WhatsApp." },
    { num: "04", title: "Mise en ligne", desc: "Déploiement, formation tableau de bord, support 6 mois inclus." },
  ],
  "automatisation-generation-leads": [
    { num: "01", title: "Analyse", desc: "Cartographie de vos processus manuels et identification des gains rapides." },
    { num: "02", title: "Développement", desc: "Script Python sur mesure, tests avec données réelles de production." },
    { num: "03", title: "Déploiement", desc: "Mise en production, monitoring automatique, gestion des erreurs." },
    { num: "04", title: "Documentation", desc: "Livraison du rapport, formation équipe et 3 mois de maintenance." },
  ],
  "referencement-naturel-seo": [
    { num: "01", title: "Audit", desc: "Analyse technique, mots-clés et cartographie concurrentielle complète." },
    { num: "02", title: "Stratégie", desc: "Plan de contenu ciblé, mots-clés transactionnels locaux identifiés." },
    { num: "03", title: "Optimisation", desc: "On-page, technique, schema.org et cocon sémantique déployés." },
    { num: "04", title: "Suivi mensuel", desc: "Rapport positions + trafic, ajustements continus sur 6 mois." },
  ],
  "developpement-application-sur-mesure": [
    { num: "01", title: "Brief métier", desc: "Cartographie des besoins, flux de travail et contraintes techniques." },
    { num: "02", title: "Prototype", desc: "Maquette UI validée avec vos équipes avant tout développement." },
    { num: "03", title: "Développement", desc: "Next.js + PostgreSQL sécurisé, accès par rôles, tests QA." },
    { num: "04", title: "Formation", desc: "Mise en production, formation utilisateurs, maintenance mensuelle." },
  ],
  "audit-optimisation-performance": [
    { num: "01", title: "Mesure initiale", desc: "Scores PageSpeed, Core Web Vitals et analyse du code existant." },
    { num: "02", title: "Diagnostic", desc: "Identification des goulots : images, scripts, cache, structure DOM." },
    { num: "03", title: "Optimisation", desc: "Compression, lazy loading, refactoring ciblé, CDN configuration." },
    { num: "04", title: "Validation", desc: "Rapport comparatif avant/après avec métriques réelles documentées." },
  ],
};

// ─── FAQ (per service) ────────────────────────────────────────────────────────
type FAQEntry = { q: string; a: string };

const SERVICE_FAQ: Record<string, FAQEntry[]> = {
  "creation-site-web-vitrine": [
    { q: "Pourquoi ne pas utiliser WordPress ?", a: "WordPress concentre 90% des sites hackés et ralentit significativement les pages. React/Next.js offre des performances 3-5× supérieures, une sécurité nettement renforcée et un score Google Vitals optimal dès la livraison." },
    { q: "Mon site sera-t-il visible sur Google dès la mise en ligne ?", a: "Oui. Chaque projet inclut le SEO on-page complet : balises title, meta descriptions, Schema.org, sitemap XML et optimisation des images. L'indexation Google démarre dans les 48-72h suivant la mise en ligne." },
    { q: "Je peux modifier mon site seul après livraison ?", a: "Oui. Chaque projet est livré avec une interface d'administration et une formation complète pour gérer vos textes, images et pages en totale autonomie." },
    { q: "Le délai de 7 jours est vraiment garanti ?", a: "Pour un site vitrine standard. Le délai inclut design + développement + déploiement. En cas de dépassement de notre fait, nous offrons une réduction de 20% sur la facture finale." },
  ],
  "creation-boutique-ecommerce": [
    { q: "Comment fonctionne le paiement à la livraison ?", a: "Notre tunnel de commande ne demande aucune carte bancaire. Le client saisit nom, téléphone et adresse — votre équipe confirme la commande et le coursier collecte le paiement à la livraison." },
    { q: "Puis-je gérer le catalogue seul après livraison ?", a: "Oui, entièrement. Vous avez accès à un dashboard admin pour ajouter produits, modifier prix, gérer stocks et consulter vos statistiques de vente en temps réel." },
    { q: "Combien de produits peut contenir la boutique ?", a: "Illimité. L'architecture est pensée pour scaler — que vous ayez 10 ou 10 000 références, les performances restent identiques grâce à la pagination et au lazy loading." },
  ],
  "automatisation-generation-leads": [
    { q: "Le scraping de données est-il légal ?", a: "Oui, dès lors que vous scrapez des données publiques (Google Maps, annuaires, LinkedIn public) sans contourner de protection technique. Nos scripts respectent les limites légales algériennes et européennes." },
    { q: "Dans combien de temps j'ai mes premiers résultats ?", a: "Le premier livrable (base prospects Excel ou rapport automatisé) est généralement disponible 3 à 7 jours après la validation du brief et des cibles." },
    { q: "Et si les pages sources changent et cassent le script ?", a: "Les scripts sont maintenus par nos soins. En cas de modification des sources, nous adaptons le code sans frais supplémentaires pendant 3 mois suivant la livraison." },
  ],
  "referencement-naturel-seo": [
    { q: "Combien de temps avant de voir des résultats ?", a: "Les premiers mouvements sont visibles à 4-8 semaines. Des résultats solides apparaissent entre 3 et 6 mois selon la compétitivité de vos mots-clés cibles." },
    { q: "Le SEO fonctionne vraiment en Algérie ?", a: "Absolument. La majorité des recherches locales n'ont que 2-3 concurrents réellement optimisés — se positionner est souvent plus facile qu'en France ou aux USA. C'est une opportunité majeure." },
    { q: "Je dois avoir un site existant pour commencer ?", a: "Non. Nous pouvons intégrer le SEO dès la création du site, ce qui est l'approche la plus efficace. Mais nous pouvons aussi optimiser un site existant." },
  ],
  "developpement-application-sur-mesure": [
    { q: "Combien de temps pour développer mon application ?", a: "De 3 à 8 semaines selon la complexité. Une application de gestion simple (stocks, commandes) prend 3-4 semaines. Un ERP complet peut aller jusqu'à 3 mois avec des phases itératives." },
    { q: "Mes données d'entreprise sont-elles sécurisées ?", a: "Oui. Nous utilisons PostgreSQL chiffré, des accès par rôles (chaque utilisateur ne voit que ce qu'il doit voir), des sauvegardes automatiques quotidiennes et un hébergement sur serveurs certifiés." },
    { q: "Puis-je ajouter des fonctionnalités plus tard ?", a: "L'application est conçue pour évoluer. Nous livrons avec une documentation technique complète et une formule de maintenance mensuelle pour accompagner votre croissance." },
  ],
  "audit-optimisation-performance": [
    { q: "Qu'est-ce que le LCP et pourquoi c'est important ?", a: "Le LCP (Largest Contentful Paint) mesure le délai avant que votre page soit visuellement complète. Google pénalise les LCP > 2.5 secondes en les positionnant moins bien dans les résultats de recherche." },
    { q: "Mon site WordPress peut-il être optimisé ?", a: "Oui. Nous travaillons sur tous les types de sites : WordPress, PrestaShop, Shopify et sites custom. L'audit identifie les optimisations compatibles avec votre technologie existante." },
    { q: "+40% de conversions, c'est réaliste ?", a: "+40% est une moyenne constatée sur nos projets d'optimisation. Les résultats varient selon l'état initial. Nous fournissons un rapport avant/après avec les métriques réelles — vous vérifiez tout." },
  ],
};

// ─── Main component ───────────────────────────────────────────────────────────
export function ServiceDetail({ initialService }: { initialService?: Service }) {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang: language } = useLanguage();
  const { services, loading: servicesLoading } = useServices(initialService ? [initialService] : undefined);
  const service = initialService || services.find((s) => s.slug === slug)!;

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ctaAnimating, setCtaAnimating] = useState(false);

  const loading = !service && servicesLoading;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
  if (!service) { notFound(); return null; }

  function toggleAddon(id: string) {
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  }

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const a = service.addons.find((ad) => ad.id === id);
    return sum + (a?.price || 0);
  }, 0);
  const total = service.basePrice + addonsTotal;

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
  function getServiceDescription() {
    if (language === "en") return service.descriptionEn;
    if (language === "ar") return service.descriptionAr;
    return service.description;
  }
  function getSEOContent() {
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

  const L = {
    fr: {
      back: "Tous les services",
      ourService: "Notre service",
      included: "Ce qui est inclus",
      whyXenon: "Ce qui fait la différence",
      howItWorks: "Comment ça se passe",
      howTitle: "Notre processus en 4 étapes",
      detailsLabel: "En profondeur",
      detailsTitle: "À propos de ce service",
      faqLabel: "Vos questions",
      faqTitle: "Questions fréquentes",
      orderLabel: "Demander un devis",
      orderTitle: "Commander ce service",
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
      messagePlaceholder: (title: string) => `Parlez-nous de votre projet "${title}" : contexte, objectifs, contraintes…`,
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
      whyXenon: "What makes the difference",
      howItWorks: "How it works",
      howTitle: "Our 4-step process",
      detailsLabel: "In depth",
      detailsTitle: "About this service",
      faqLabel: "Your questions",
      faqTitle: "Frequently asked questions",
      orderLabel: "Request a quote",
      orderTitle: "Order this service",
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
      whyXenon: "ما يجعلنا مختلفين",
      howItWorks: "كيف يسير الأمر",
      howTitle: "عمليتنا في 4 خطوات",
      detailsLabel: "بالتفصيل",
      detailsTitle: "حول هذه الخدمة",
      faqLabel: "أسئلتك",
      faqTitle: "الأسئلة الشائعة",
      orderLabel: "طلب عرض سعر",
      orderTitle: "اطلب هذه الخدمة",
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
  const seoTitle = `${getServiceTitle()} en Algérie | XenonDz`;
  const seoDesc = `Ne laissez plus vos concurrents prendre l'avantage. Service de ${getServiceTitle()} professionnel en Algérie. Devis gratuit et livraison rapide.`;

  const benefits = SERVICE_BENEFITS[service.slug] || [];
  const steps = SERVICE_STEPS[service.slug] || [];
  const faqs = SERVICE_FAQ[service.slug] || [];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical={`https://xenondz.com/services/${slug}`}
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

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section className="hero-bg pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 hero-animate-1">
              <ArrowLeft size={16} />
              {lx.back}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left */}
              <div className="hero-animate-2">
                <p className="section-label">{lx.ourService}</p>
                <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {getServiceTitle()}
                </h1>
                <div className="gold-line" />
                <p className="text-lg text-muted-foreground mt-5 mb-8 leading-relaxed font-light">
                  {getServiceDescription()}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <div className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.09), rgba(26,26,110,0.04))", color: "var(--primary)", border: "1px solid rgba(26,26,110,0.15)" }}>
                    {service.priceSuffix ? lx.basePrice + " : Sur devis" : lx.basePrice + " : " + formatPrice(service.basePrice)}
                  </div>
                  <div className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))", color: "#7a5a0a", border: "1px solid rgba(201,168,76,0.25)" }}>
                    {getDuration()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCtaAnimating(true);
                    setTimeout(() => setCtaAnimating(false), 500);
                    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="btn-primary-pro inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer"
                  style={{
                    transform: ctaAnimating ? "scale(0.95)" : "scale(1)",
                    boxShadow: ctaAnimating ? "0 0 0 5px rgba(26,26,110,0.18), 0 0 20px rgba(26,26,110,0.25)" : "",
                    transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                  }}>
                  {lx.orderLabel}
                  <ArrowRight size={18} className={ctaAnimating ? "translate-x-1" : ""} style={{ transition: "transform 0.2s ease" }} />
                </button>
              </div>

              {/* Right: features */}
              <div className="hero-animate-3">
                <div className="card-pro">
                  <p className="section-label mb-5">{lx.included}</p>
                  <div className="space-y-3.5">
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

        {/* ── 2. BENEFITS ──────────────────────────────────────────────────── */}
        {benefits.length > 0 && (
          <section className="py-20" style={{ background: "var(--muted)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14 reveal">
                <p className="section-label" style={{ justifyContent: "center" }}>{lx.whyXenon}</p>
                <h2 className="text-foreground">Pourquoi XenonDz pour ce service</h2>
                <div className="gold-line gold-line-center" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className={`card-pro reveal reveal-delay-${i + 1} flex flex-col gap-5`} style={{ padding: "2rem" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift-light))" }}>
                      <b.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. PROCESS ───────────────────────────────────────────────────── */}
        {steps.length > 0 && (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14 reveal">
                <p className="section-label" style={{ justifyContent: "center" }}>{lx.howItWorks}</p>
                <h2 className="text-foreground">{lx.howTitle}</h2>
                <div className="gold-line gold-line-center" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {steps.map((step, i) => (
                  <div key={i} className={`step-item text-center reveal reveal-delay-${i + 1}`}>
                    <div className="step-number">{step.num}</div>
                    <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-family)", fontSize: "1rem" }}>{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 4. DETAILS (SEO text) ─────────────────────────────────────────── */}
        <section className="py-20" style={{ background: "var(--muted)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 reveal">
              <p className="section-label" style={{ justifyContent: "center" }}>{lx.detailsLabel}</p>
              <h2 className="text-foreground">{lx.detailsTitle}</h2>
              <div className="gold-line gold-line-center" />
            </div>
            <div className="card-pro reveal reveal-delay-1" style={{ padding: "2.5rem" }}>
              {getSEOContent()}
            </div>
          </div>
        </section>

        {/* ── 5. FAQ ───────────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section className="py-20 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 reveal">
                <p className="section-label" style={{ justifyContent: "center" }}>{lx.faqLabel}</p>
                <h2 className="text-foreground">{lx.faqTitle}</h2>
                <div className="gold-line gold-line-center" />
              </div>
              <div className="space-y-3 reveal reveal-delay-1">
                {faqs.map((faq, i) => (
                  <div key={i}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ border: openFaq === i ? "1px solid rgba(26,26,110,0.2)" : "1px solid rgba(26,26,110,0.08)", background: openFaq === i ? "linear-gradient(135deg, rgba(26,26,110,0.04), rgba(201,168,76,0.02))" : "var(--card)" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer">
                      <span className="font-semibold text-foreground text-sm leading-snug">{faq.q}</span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ background: openFaq === i ? "var(--primary)" : "rgba(26,26,110,0.08)" }}>
                        <ChevronDown size={14}
                          className={`transition-transform duration-200 ${openFaq === i ? "rotate-180 text-white" : ""}`}
                          style={{ color: openFaq === i ? "white" : "var(--primary)" }} />
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 6. ORDER FORM ────────────────────────────────────────────────── */}
        <section id="order-form" className="py-20" style={{ background: "var(--muted)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 reveal">
              <p className="section-label" style={{ justifyContent: "center" }}>Passons à l'action</p>
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

              {/* Add-ons */}
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
                        <div key={addon.id} onClick={() => toggleAddon(addon.id)}
                          className="flex items-start justify-between gap-3 rounded-xl p-3.5 cursor-pointer transition-all"
                          style={{
                            background: isSelected ? "linear-gradient(135deg, rgba(26,26,110,0.07), rgba(201,168,76,0.04))" : "rgba(26,26,110,0.02)",
                            border: isSelected ? "1px solid rgba(26,26,110,0.22)" : "1px solid rgba(26,26,110,0.07)",
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
                          <button type="button"
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                            style={{ background: isSelected ? "var(--primary)" : "rgba(26,26,110,0.08)" }}>
                            {isSelected
                              ? <Minus size={13} className="text-white" />
                              : <Plus size={13} style={{ color: "var(--primary)" }} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Warning: maintenance not selected */}
                  {service.addons.some(a => a.id === "maintenance") && !selectedAddons.includes("maintenance") && (
                    <div className="mt-3 rounded-xl p-4 flex gap-3" style={{ background: "rgba(220,120,0,0.05)", border: "1px solid rgba(220,120,0,0.2)" }}>
                      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#c47a00" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "#8a5500" }}>
                        <strong className="font-semibold">À noter :</strong> Sans <strong className="font-semibold">Maintenance Annuelle</strong> ni renouvellement de nom de domaine, votre site perdra progressivement ses positions Google et s'exposera à des failles de sécurité. Nous le recommandons vivement pour rester compétitif dans la durée.
                      </p>
                    </div>
                  )}

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
                        className={inputClass} placeholder="Ahmed Meziane" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{lx.email}</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className={inputClass} placeholder="ahmed@monentreprise.dz" />
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

        {/* ── 7. OTHER SERVICES ────────────────────────────────────────────── */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 reveal">
              <p className="section-label" style={{ justifyContent: "center" }}>{lx.seeAlso}</p>
              <h2 className="text-foreground" style={{ fontSize: "1.75rem" }}>{lx.otherServices}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allServices
                .filter((s) => s.slug !== service.slug)
                .slice(0, 3)
                .map((s, i) => {
                  const sTitle = language === "en" ? s.titleEn : language === "ar" ? s.titleAr : s.title;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className={`card-pro reveal reveal-delay-${i + 1} flex items-center gap-4 group`}
                      style={{ padding: "1.25rem" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(26,26,110,0.03))" }}>
                        {getIconForSlug(s.slug)}
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
