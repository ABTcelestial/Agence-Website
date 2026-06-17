const BASE_URL = "https://xenondz.com";

export interface Review {
  author: string;
  date: string;
  rating: number;
  body: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  ratingValue?: string;
  ratingCount?: number;
}

export function ReviewSchema({ reviews, ratingValue = "4.9", ratingCount }: ReviewSchemaProps) {
  const count = ratingCount ?? reviews.length;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "XenonDz",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": count,
      "reviewCount": count,
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author },
      "datePublished": r.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(r.rating),
        "bestRating": "5",
      },
      "reviewBody": r.body,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Remplace ces données par les vrais témoignages clients avant de déployer
export const XENONDZ_REVIEWS: Review[] = [
  {
    author: "Tarek B.",
    date: "2026-03-15",
    rating: 5,
    body: "XenonDz a transformé notre activité. Notre site vitrine est ultra-rapide et nos demandes de devis ont triplé en 2 mois. Équipe professionnelle et réactive.",
  },
  {
    author: "Lina K.",
    date: "2026-04-02",
    rating: 5,
    body: "Notre boutique e-commerce a été livrée en 12 jours, parfaitement intégrée avec Yalidine. Les ventes ont démarré dès la première semaine.",
  },
  {
    author: "Ramzi A.",
    date: "2026-02-20",
    rating: 5,
    body: "Le script de scraping Google Maps a généré plus de 400 prospects qualifiés en 48h. Un investissement rentabilisé en une semaine.",
  },
];
