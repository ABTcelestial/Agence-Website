/**
 * ServiceDetailSchema — Données structurées Service Schema.org par page de détail
 * Injecté sur chaque /services/:slug pour que les IA puissent citer le prix,
 * le délai et la description du service directement en réponse.
 */

const BASE_URL = "https://xenondz.vercel.app";

interface ServiceDetailSchemaProps {
  name: string;
  description: string;
  slug: string;
  basePrice: number | null;
  priceSuffix?: string;
  duration: string;
  features: string[];
}

export function ServiceDetailSchema({
  name,
  description,
  slug,
  basePrice,
  priceSuffix,
  duration,
  features,
}: ServiceDetailSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${slug}#service`,
    "name": name,
    "description": description,
    "url": `${BASE_URL}/services/${slug}`,
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "XenonDz",
    },
    "areaServed": [
      { "@type": "Country", "name": "Algeria" },
      { "@type": "State", "name": "Béjaïa" },
    ],
    "serviceType": name,
    "termsOfService": `${BASE_URL}/mentions-legales`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Offres — ${name}`,
      "itemListElement": features.map((feat, i) => ({
        "@type": "Offer",
        "position": i + 1,
        "description": feat,
      })),
    },
  };

  // Prix uniquement si disponible
  if (basePrice && basePrice > 0) {
    schema["offers"] = {
      "@type": "Offer",
      "price": basePrice,
      "priceCurrency": "DZD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": basePrice,
        "priceCurrency": "DZD",
        "unitText": "projet",
        "description": `À partir de ${basePrice.toLocaleString("fr-DZ")} DA — ${duration}`,
      },
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "XenonDz",
        "url": BASE_URL,
      },
    };
    schema["additionalProperty"] = {
      "@type": "PropertyValue",
      "name": "Délai de livraison",
      "value": duration,
    };
  } else if (priceSuffix) {
    schema["offers"] = {
      "@type": "Offer",
      "description": priceSuffix,
      "priceCurrency": "DZD",
      "availability": "https://schema.org/InStock",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
