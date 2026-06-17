const BASE_URL = "https://xenondz.com";

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "XenonDz",
  "alternateName": ["Xenon Agency", "XenonDz Algérie", "Agence Web Béjaïa"],
  "description": "XenonDz est une agence web professionnelle à Béjaïa, Algérie. Spécialisée en création de sites web sur mesure React/Next.js, e-commerce, automatisation et SEO pour les PME algériennes.",
  "url": BASE_URL,
  "telephone": "+213-0794055836",
  "email": "xenondz.inc@gmail.com",
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/logos/logo-long-dark.svg`,
    "width": 250,
    "height": 60,
  },
  "image": `${BASE_URL}/og-image.jpg`,
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Akbou",
    "addressLocality": "Béjaïa",
    "addressRegion": "Béjaïa",
    "postalCode": "06000",
    "addressCountry": "DZ",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.7509,
    "longitude": 5.0560,
  },
  "hasMap": "https://maps.google.com/?q=Akbou,+B%C3%A9ja%C3%AFa,+Alg%C3%A9rie",
  "areaServed": [
    { "@type": "Country", "name": "Algeria" },
    { "@type": "State", "name": "Béjaïa" },
    { "@type": "State", "name": "Alger" },
    { "@type": "State", "name": "Oran" },
    { "@type": "State", "name": "Tizi Ouzou" },
    { "@type": "State", "name": "Sétif" },
    { "@type": "State", "name": "Constantine" },
  ],
  "priceRange": "$$",
  "currenciesAccepted": "DZD",
  "paymentAccepted": "Virement bancaire, CCP",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "09:00",
      "closes": "18:00",
    },
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+213-0794055836",
    "contactType": "customer service",
    "email": "xenondz.inc@gmail.com",
    "availableLanguage": ["French", "Arabic", "English"],
    "areaServed": "DZ",
  },
  "sameAs": [
    "https://www.instagram.com/xenon.dz",
    "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
    "https://github.com/sayniir",
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Agence Web XenonDz",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création Site Web Vitrine",
          "description": "Sites vitrines React/Next.js sur mesure, livrés en 7-10 jours à partir de 20 000 DZD",
          "url": `${BASE_URL}/services/creation-site-web-vitrine`,
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Développement Boutique E-commerce",
          "description": "Boutiques en ligne clés en main avec paiement à la livraison, à partir de 120 000 DZD",
          "url": `${BASE_URL}/services/creation-boutique-ecommerce`,
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Automatisation Web & Génération de Leads",
          "description": "Scripts Python pour scraping et génération de leads qualifiés, à partir de 35 000 DZD",
          "url": `${BASE_URL}/services/automatisation-generation-leads`,
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Référencement SEO & GEO",
          "description": "Optimisation pour Google et moteurs IA (ChatGPT, Perplexity, Gemini), à partir de 25 000 DZD",
          "url": `${BASE_URL}/services/referencement-naturel-seo`,
        },
      },
    ],
  },
  "parentOrganization": { "@id": `${BASE_URL}/#organization` },
};

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
