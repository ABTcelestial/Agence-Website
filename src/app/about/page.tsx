import type { Metadata } from "next";
import { About } from "@/pages-src/About";
import { getSupabase } from "@/lib/supabaseClient";
import type { DbTeamMember } from "@/admin/AdminTeam";
import { BreadcrumbSchema, BREADCRUMBS } from "@/components/seo/BreadcrumbSchema";
import { PersonSchema } from "@/components/seo/PersonSchema";

// Toujours rendu à la demande — aucun cache Next.js entre l'admin et le site
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "L'Agence Web N°1 sur le ROI à Béjaïa (Algérie) | XenonDz",
  description: "XenonDz est une agence digitale basée à Béjaïa. Notre but ? Faire décoller votre chiffre d'affaires grâce à un site web ultra-rapide et l'automatisation de vos tâches.",
  alternates: { canonical: "https://xenondz.com/about" },
  openGraph: {
    url: "https://xenondz.com/about",
    title: "L'Agence Web N°1 sur le ROI à Béjaïa (Algérie) | XenonDz",
    description: "XenonDz est une agence digitale basée à Béjaïa. Notre but ? Faire décoller votre chiffre d'affaires grâce à un site web ultra-rapide et l'automatisation de vos tâches.",
  },
};

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "À propos de XenonDz — Agence Digitale Algérienne",
  "description": "XenonDz est une agence digitale algérienne fondée en 2024 à Akbou (Béjaïa) par Rynas Kebdi, développeur web autodidacte de 17 ans. Spécialisée dans la création de sites web sur mesure React/Next.js, l'automatisation sur demande et le développement d'applications pour les PME algériennes.",
  "url": "https://xenondz.com/about",
  "mainEntity": {
    "@id": "https://xenondz.com/#organization"
  },
  "about": {
    "@type": "Person",
    "@id": "https://xenondz.com/#rynas-kebdi",
    "name": "Rynas Kebdi",
    "jobTitle": "Fondateur & Développeur Web",
    "description": "Rynas Kebdi est un développeur web algérien autodidacte de 17 ans, fondateur de XenonDz. Formé exclusivement via des ressources en ligne, il maîtrise Next.js, React, Python et l'automatisation de processus métier. Il a fondé XenonDz à Akbou (Béjaïa, Algérie) avec la conviction que les PME algériennes méritent des outils digitaux de niveau mondial.",
    "url": "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
    "sameAs": [
      "https://www.linkedin.com/in/rynas-kebdi-526b70364/",
      "https://github.com/sayniir"
    ]
  }
};

export default async function AboutPage() {
  let team: DbTeamMember[] = [];
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      team = data as DbTeamMember[];
    }
  } catch (err) {
    console.error("[AboutPage] Erreur fetch équipe Supabase:", err);
  }

  const personMembers = team.map((m) => ({
    name: m.name,
    role: m.role_fr,
    bio: m.bio_fr,
    avatar_url: m.avatar_url,
    linkedin: m.linkedin,
    github: m.github,
    instagram: m.instagram,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <BreadcrumbSchema items={BREADCRUMBS.about} />
      <PersonSchema members={personMembers} />
      <About initialTeam={team} />
    </>
  );
}
