import type { Metadata } from "next";
import { Realisations } from "@/pages-src/Realisations";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio : Ils ont multiplié leurs résultats avec nous | Réalisations XenonDz",
  description: "Découvrez les sites web, boutiques e-commerce et solutions logicielles livrés par XenonDz en Algérie.",
  alternates: { canonical: "https://xenondz.vercel.app/realisations" },
  openGraph: {
    url: "https://xenondz.vercel.app/realisations",
    title: "Portfolio : Ils ont multiplié leurs résultats avec nous | Réalisations XenonDz",
    description: "Découvrez les sites web, boutiques e-commerce et solutions logicielles livrés par XenonDz en Algérie.",
  },
};

export default async function RealisationsPage() {
  let items = [];
  try {
    const { data } = await supabase
      .from("realisations")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    items = data || [];
  } catch (err) {
    console.error("Error fetching realisations on server:", err);
  }

  return <Realisations initialItems={items} />;
}
