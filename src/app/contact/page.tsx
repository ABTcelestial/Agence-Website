import type { Metadata } from "next";
import { Contact } from "@/pages-src/Contact";
import { BreadcrumbSchema, BREADCRUMBS } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Demandez votre Devis Gratuit Création Site Web & Automatisation Algérie | XenonDz",
  description: "Passez à l'action. Demandez un devis gratuit pour votre site e-commerce, vitrine ou solution scraping. Réponse garantie sous 24h par notre équipe à Béjaïa.",
  alternates: { canonical: "https://xenondz.com/contact" },
  openGraph: {
    url: "https://xenondz.com/contact",
    title: "Demandez votre Devis Gratuit Création Site Web & Automatisation Algérie | XenonDz",
    description: "Passez à l'action. Demandez un devis gratuit pour votre site e-commerce, vitrine ou solution scraping. Réponse garantie sous 24h par notre équipe à Béjaïa.",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={BREADCRUMBS.contact} />
      <Contact />
    </>
  );
}
