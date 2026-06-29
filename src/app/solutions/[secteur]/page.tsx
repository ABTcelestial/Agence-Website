import type { Metadata } from "next";
import { Solutions, NICHES } from "@/pages-src/Solutions";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

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
  const niche = NICHES[secteur];
  const faqItems = niche?.faqs.map((f) => ({ question: f.q, answer: f.a })) ?? [];

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Solutions", url: "/services" },
        { name: name, url: `/solutions/${secteur}` },
      ]} />
      {faqItems.length > 0 && <FAQSchema items={faqItems} />}
      <Solutions />
    </>
  );
}
