import type { Metadata } from "next";
import { FAQ } from "@/pages-src/FAQ";

export const metadata: Metadata = {
  title: "Questions sur la création de site web en Algérie & Prix | XenonDz FAQ",
  description: "Quel est le prix d'un site web en Algérie ? Toutes les réponses sur les délais, tarifs et processus collaboratifs chez XenonDz.",
  alternates: { canonical: "https://xenondz.vercel.app/faq" },
  openGraph: {
    url: "https://xenondz.vercel.app/faq",
    title: "Questions sur la création de site web en Algérie & Prix | XenonDz FAQ",
    description: "Quel est le prix d'un site web en Algérie ? Toutes les réponses sur les délais, tarifs et processus collaboratifs chez XenonDz.",
  },
};

export default function FAQPage() {
  return <FAQ />;
}
