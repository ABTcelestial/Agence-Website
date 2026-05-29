import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ServicesClient } from "./ServicesClient";

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

export default function ServicesPage() {
  return <ServicesClient />;
}
