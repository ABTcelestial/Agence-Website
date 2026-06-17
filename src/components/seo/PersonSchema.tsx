const BASE_URL = "https://xenondz.com";

export interface PersonSchemaItem {
  name: string;
  role: string;
  bio: string;
  avatar_url?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

interface PersonSchemaProps {
  members: PersonSchemaItem[];
}

export function PersonSchema({ members }: PersonSchemaProps) {
  if (!members.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Équipe XenonDz",
    "itemListElement": members.map((m, i) => {
      const sameAs = [m.linkedin, m.github, m.instagram].filter(Boolean);
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Person",
          "name": m.name,
          "jobTitle": m.role,
          "description": m.bio,
          "image": m.avatar_url || `${BASE_URL}/og-image.jpg`,
          "worksFor": { "@id": `${BASE_URL}/#organization` },
          "url": `${BASE_URL}/about`,
          ...(sameAs.length ? { "sameAs": sameAs } : {}),
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
