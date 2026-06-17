import type { Metadata } from "next";
import { Solutions } from "@/pages-src/Solutions";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ secteur: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secteur } = await params;
  const name = secteur.replace(/-/g, " ");
  return {
    title: `Solutions digitales pour le secteur ${name} en Algérie | XenonDz`,
    description: `Découvrez comment XenonDz aide le secteur ${name} avec des sites web, e-commerce et automatisation sur mesure.`,
    alternates: { canonical: `https://xenondz.com/solutions/${secteur}` },
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { secteur } = await params;
  const name = secteur.replace(/-/g, " ");
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Solutions", url: "/services" },
        { name: name, url: `/solutions/${secteur}` },
      ]} />
      <Solutions />
    </>
  );
}
