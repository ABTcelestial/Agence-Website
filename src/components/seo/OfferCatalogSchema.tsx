/**
 * OfferCatalogSchema — Données structurées OfferCatalog pour la page Tarifs
 * Permet aux IA de répondre directement à : "Quel est le prix d'un site web en Algérie ?"
 */

const BASE_URL = "https://xenondz.com";

export function OfferCatalogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Tarifs XenonDz — Agence Web Algérie",
    "description": "Grille tarifaire transparente de XenonDz pour la création de sites web, boutiques e-commerce et automatisation en Algérie.",
    "url": `${BASE_URL}/tarifs`,
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "XenonDz",
    },
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Site Vitrine Pro",
        "description": "Création de site vitrine professionnel sur mesure pour entreprises algériennes. Design moderne, ultra-rapide, SEO on-page inclus, hébergement 1 an offert.",
        "price": 20000,
        "priceCurrency": "DZD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": 20000,
          "priceCurrency": "DZD",
          "unitText": "projet",
        },
        "availability": "https://schema.org/InStock",
        "url": `${BASE_URL}/services/creation-site-web-vitrine`,
        "seller": { "@type": "Organization", "name": "XenonDz" },
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site vitrine",
          "description": "Site vitrine professionnel avec React/Tailwind CSS, SEO technique, hébergement sécurisé.",
        },
      },
      {
        "@type": "Offer",
        "name": "Boutique E-commerce",
        "description": "Boutique e-commerce complète adaptée au marché algérien avec paiement à la livraison (Yalidine, Maystro), gestion des stocks et formation incluse.",
        "price": 120000,
        "priceCurrency": "DZD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": 120000,
          "priceCurrency": "DZD",
          "unitText": "projet",
        },
        "availability": "https://schema.org/InStock",
        "url": `${BASE_URL}/services/creation-boutique-ecommerce`,
        "seller": { "@type": "Organization", "name": "XenonDz" },
        "itemOffered": {
          "@type": "Service",
          "name": "Développement e-commerce",
          "description": "Boutique en ligne avec catalogue produits, tunnel de commande optimisé et tableau de bord de gestion.",
        },
      },
      {
        "@type": "Offer",
        "name": "Automatisation & Génération de Leads",
        "description": "Scripts d'automatisation Python, scraping Google Maps et LinkedIn, génération automatique de leads B2B pour entreprises algériennes.",
        "price": 35000,
        "priceCurrency": "DZD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": 35000,
          "priceCurrency": "DZD",
          "unitText": "mission",
          "description": "À partir de 35 000 DA",
        },
        "availability": "https://schema.org/InStock",
        "url": `${BASE_URL}/services/automatisation-generation-leads`,
        "seller": { "@type": "Organization", "name": "XenonDz" },
        "itemOffered": {
          "@type": "Service",
          "name": "Automatisation et scraping",
          "description": "Bots Python de génération de leads, scraping, et automatisation des tâches répétitives.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
