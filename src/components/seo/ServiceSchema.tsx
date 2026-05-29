/**
 * ServiceSchema — Données structurées Schema.org pour la page Services
 * Améliore la visibilité dans les résultats enrichis Google.
 */

export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services XenonDz",
    description: "Services digitaux proposés par XenonDz en Algérie",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Création de site vitrine",
          description:
            "Conception et développement de sites vitrines modernes et performants pour entreprises algériennes.",
          provider: { "@type": "Organization", name: "XenonDz" },
          areaServed: { "@type": "Country", name: "Algeria" },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Développement E-commerce",
          description:
            "Création de boutiques en ligne complètes avec gestion de commandes et paiement adapté au marché algérien.",
          provider: { "@type": "Organization", name: "XenonDz" },
          areaServed: { "@type": "Country", name: "Algeria" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Automatisation de processus (Python)",
          description:
            "Scripts Python et solutions d'automatisation pour optimiser les tâches répétitives de votre entreprise.",
          provider: { "@type": "Organization", name: "XenonDz" },
          areaServed: { "@type": "Country", name: "Algeria" },
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
