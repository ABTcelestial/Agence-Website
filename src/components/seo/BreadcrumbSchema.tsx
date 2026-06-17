/**
 * BreadcrumbSchema — Données structurées BreadcrumbList Schema.org
 * Signal fort pour les moteurs IA : établit la hiérarchie de la page.
 */

const BASE_URL = "https://xenondz.com";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Breadcrumbs prédéfinis par page ──────────────────────────────────────────
export const BREADCRUMBS = {
  services: [
    { name: "Accueil", url: "/" },
    { name: "Services", url: "/services" },
  ],
  faq: [
    { name: "Accueil", url: "/" },
    { name: "FAQ", url: "/faq" },
  ],
  about: [
    { name: "Accueil", url: "/" },
    { name: "À propos", url: "/about" },
  ],
  contact: [
    { name: "Accueil", url: "/" },
    { name: "Contact", url: "/contact" },
  ],
  tarifs: [
    { name: "Accueil", url: "/" },
    { name: "Tarifs", url: "/tarifs" },
  ],
  realisations: [
    { name: "Accueil", url: "/" },
    { name: "Réalisations", url: "/realisations" },
  ],
  blog: [
    { name: "Accueil", url: "/" },
    { name: "Blog", url: "/blog" },
  ],
};
