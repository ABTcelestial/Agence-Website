import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { ServicesClient } from "./ServicesClient";
import { mapService } from "@/data/services-mapping";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos Solutions : Création de Site Web, E-commerce, Scraping en Algérie | XenonDz",
  description:
    "Ne laissez plus vos concurrents prendre vos clients sur Google. Découvrez nos solutions de création de sites rapides, e-commerce et automatisation en Algérie.",
  alternates: { canonical: "https://xenondz.vercel.app/services" },
  openGraph: {
    url: "https://xenondz.vercel.app/services",
    title: "Nos Solutions : Création de Site Web, E-commerce, Scraping en Algérie | XenonDz",
    description: "Ne laissez plus vos concurrents prendre vos clients sur Google.",
  },
};

export default async function ServicesPage() {
  let services: any[] = [];
  let comparisons: any[] = [];
  try {
    const [{ data: svcData }, { data: addonData }, { data: compData }] = await Promise.all([
      supabase.from("services").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("addons").select("*").eq("is_active", true),
      supabase.from("service_comparisons").select("*").order("sort_order", { ascending: true }),
    ]);
    if (svcData) {
      const dbAddons = addonData || [];
      services = svcData.map(s => mapService(s as any, dbAddons as any[]));
    }
    comparisons = compData || [];
  } catch (err) {
    console.error("Error fetching services page on server:", err);
  }

  return <ServicesClient initialServices={services} initialComparisons={comparisons} />;
}
