import type { Metadata } from "next";
import { Contact } from "@/pages-src/Contact";

export const metadata: Metadata = {
  title: "Demandez votre Devis Gratuit Création Site Web & Automatisation Algérie | XenonDz",
  description: "Passez à l'action. Demandez un devis gratuit pour votre site e-commerce, vitrine ou solution scraping. Réponse garantie sous 24h par notre équipe à Béjaïa.",
  alternates: { canonical: "https://xenondz.vercel.app/contact" },
  openGraph: {
    url: "https://xenondz.vercel.app/contact",
    title: "Demandez votre Devis Gratuit Création Site Web & Automatisation Algérie | XenonDz",
    description: "Passez à l'action. Demandez un devis gratuit pour votre site e-commerce, vitrine ou solution scraping. Réponse garantie sous 24h par notre équipe à Béjaïa.",
  },
};

export default function ContactPage() {
  return <Contact />;
}
