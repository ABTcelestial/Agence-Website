import type { Metadata } from "next";
import { FAQ } from "@/pages-src/FAQ";
import { FAQSchema, EXAMPLE_FAQ_ITEMS } from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: "Questions sur la création de site web en Algérie & Prix | XenonDz FAQ",
  description: "Quel est le prix d'un site web en Algérie ? Toutes les réponses sur les délais, tarifs et processus collaboratifs chez XenonDz.",
  alternates: { canonical: "https://xenondz.com/faq" },
  openGraph: {
    url: "https://xenondz.com/faq",
    title: "Questions sur la création de site web en Algérie & Prix | XenonDz FAQ",
    description: "Quel est le prix d'un site web en Algérie ? Toutes les réponses sur les délais, tarifs et processus collaboratifs chez XenonDz.",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQSchema items={EXAMPLE_FAQ_ITEMS} />
      <FAQ />
    </>
  );
}
