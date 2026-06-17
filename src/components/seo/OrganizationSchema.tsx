const BASE_URL = "https://xenondz.com";

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "XenonDz",
      "alternateName": ["Xenon Agency", "Xenon Digital Agency", "XenonDz Algérie"],
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logos/logo-long-dark.svg`,
        "width": 250,
        "height": 60,
      },
      "image": `${BASE_URL}/og-image.jpg`,
      "description": "XenonDz est une agence digitale algérienne spécialisée dans la création de sites web sur mesure, le développement e-commerce, le référencement naturel (SEO) et l'automatisation de processus métier en Algérie.",
      "telephone": "+213-0794055836",
      "email": "xenondz.inc@gmail.com",
      "foundingDate": "2024",
      "numberOfEmployees": { "@type": "QuantitativeValue", "value": 3 },
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
      "areaServed": [
        { "@type": "Country", "name": "Algeria" },
        { "@type": "State", "name": "Béjaïa" },
        { "@type": "State", "name": "Alger" },
        { "@type": "State", "name": "Oran" },
      ],
      "knowsAbout": [
        "Création de sites web",
        "Développement React",
        "Développement Next.js",
        "E-commerce Algérie",
        "Automatisation Python",
        "SEO Algérie",
        "Web Scraping",
        "Lead Generation",
        "Solutions digitales PME",
      ],
      "sameAs": [
        "https://www.instagram.com/xenon.dz",
        "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
        "https://github.com/sayniir",
      ],
      "priceRange": "$$",
      "currenciesAccepted": "DZD",
      "paymentAccepted": "Virement bancaire, CCP",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "09:00",
        "closes": "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "XenonDz",
      "description": "Agence digitale algérienne — Création de sites web, e-commerce et automatisation.",
      "publisher": { "@id": `${BASE_URL}/#organization` },
      "inLanguage": ["fr-DZ", "ar-DZ", "en"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/services?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/**
 * OrganizationSchema — Server Component.
 * Injects Organization + WebSite JSON-LD directly into the HTML for Google and AI search engines.
 */
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  );
}
