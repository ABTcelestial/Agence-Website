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
  "description": "XenonDz est une agence digitale fondée à Béjaïa, Algérie, spécialisée dans le développement Next.js, l'e-commerce et l'automatisation intelligente.",
  "url": "https://xenondz.com/about",
  "mainEntity": {
    "@id": "https://xenondz.com/#organization"
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
