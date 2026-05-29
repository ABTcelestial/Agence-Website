import type { Metadata } from "next";
import { Realisations } from "@/pages-src/Realisations";

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

export default function RealisationsPage() {
  return <Realisations />;
}
