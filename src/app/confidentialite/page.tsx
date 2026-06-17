import type { Metadata } from "next";
import { Confidentialite } from "@/pages-src/Confidentialite";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | XenonDz",
  description: "Politique de confidentialité et protection des données personnelles de XenonDz.",
  alternates: { canonical: "https://xenondz.com/confidentialite" },
  openGraph: {
    url: "https://xenondz.com/confidentialite",
    title: "Politique de Confidentialité | XenonDz",
    description: "Politique de confidentialité et protection des données personnelles de XenonDz.",
  },
};

export default function ConfidentialitePage() {
  return <Confidentialite />;
}
