import type { Metadata } from "next";
import { About } from "@/pages-src/About";

export const metadata: Metadata = {
  title: "L'Agence Web N°1 sur le ROI à Béjaïa (Algérie) | XenonDz",
  description: "XenonDz est une agence digitale basée à Béjaïa. Notre but ? Faire décoller votre chiffre d'affaires grâce à un site web ultra-rapide et l'automatisation de vos tâches.",
  alternates: { canonical: "https://xenondz.vercel.app/about" },
  openGraph: {
    url: "https://xenondz.vercel.app/about",
    title: "L'Agence Web N°1 sur le ROI à Béjaïa (Algérie) | XenonDz",
    description: "XenonDz est une agence digitale basée à Béjaïa. Notre but ? Faire décoller votre chiffre d'affaires grâce à un site web ultra-rapide et l'automatisation de vos tâches.",
  },
};

export default function AboutPage() {
  return <About />;
}
