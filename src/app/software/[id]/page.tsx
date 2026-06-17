import type { Metadata } from "next";
import { SoftwareDetail } from "@/pages-src/SoftwareDetail";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let title = "Solution Logicielle | XenonDz";
  let description = `Découvrez notre solution logicielle sur mesure pour votre secteur.`;

  try {
    const { data } = await supabase
      .from("realisations")
      .select("title, description_fr")
      .eq("id", id)
      .eq("category", "Software")
      .single();
    if (data) {
      title = `${data.title} - Logiciel sur mesure | XenonDz`;
      description = data.description_fr || description;
    }
  } catch (err) {
    console.error("Error fetching software metadata on server:", err);
  }

  return {
    title,
    description,
    alternates: { canonical: `https://xenondz.com/software/${id}` },
    openGraph: {
      title,
      description,
      url: `https://xenondz.com/software/${id}`,
    },
  };
}

export default async function SoftwareDetailPage({ params }: Props) {
  const { id } = await params;
  let software = null;

  try {
    const { data } = await supabase
      .from("realisations")
      .select("*")
      .eq("id", id)
      .eq("category", "Software")
      .single();
    software = data || null;
  } catch (err) {
    console.error("Error fetching software page on server:", err);
  }

  return <SoftwareDetail initialSoftware={software} />;
}
