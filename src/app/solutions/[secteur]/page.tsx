import type { Metadata } from "next";
import { Solutions } from "@/pages-src/Solutions";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ secteur: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secteur } = await params;
  const name = secteur.replace(/-/g, " ");
  return {
    title: `Solutions digitales pour le secteur ${name} en Algérie | XenonDz`,
    description: `Découvrez comment XenonDz aide le secteur ${name} avec des sites web, e-commerce et automatisation sur mesure.`,
    alternates: { canonical: `https://xenondz.vercel.app/solutions/${secteur}` },
  };
}

export default function SolutionsPage() {
  return <Solutions />;
}
