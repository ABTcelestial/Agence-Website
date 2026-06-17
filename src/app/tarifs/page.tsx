import type { Metadata } from "next";
import { Tarifs } from "@/pages-src/Tarifs";
import { BreadcrumbSchema, BREADCRUMBS } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Tarifs Création Site Web & Automatisation en Algérie | XenonDz",
  description: "Découvrez nos tarifs transparents pour la création de sites web, e-commerce et automatisation en Algérie. Devis gratuit sous 24h.",
  alternates: { canonical: "https://xenondz.com/tarifs" },
  openGraph: {
    url: "https://xenondz.com/tarifs",
    title: "Tarifs Création Site Web & Automatisation en Algérie | XenonDz",
    description: "Découvrez nos tarifs transparents pour la création de sites web, e-commerce et automatisation en Algérie. Devis gratuit sous 24h.",
  },
};

export default function TarifsPage() {
  return (
    <>
      <BreadcrumbSchema items={BREADCRUMBS.tarifs} />
      <Tarifs />
    </>
  );
}
