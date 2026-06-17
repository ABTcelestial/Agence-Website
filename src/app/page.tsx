import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

const BASE_URL = "https://xenondz.com";

export const metadata: Metadata = {
  title: "Agence Digitale en Algérie : Sites Web & Automatisation Rentables | XenonDz",
  description:
    "Transformez votre présence en ligne en une machine à clients. XenonDz : Création de sites e-commerce, vitrines et automatisation PME en Algérie. Devis sous 24h.",
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/`,
    title: "Agence Digitale en Algérie : Sites Web & Automatisation Rentables | XenonDz",
    description:
      "Transformez votre présence en ligne en une machine à clients. XenonDz : Création de sites e-commerce, vitrines et automatisation PME en Algérie. Devis sous 24h.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
