import type { Metadata } from "next";
import { MentionsLegales } from "@/pages-src/MentionsLegales";

export const metadata: Metadata = {
  title: "Mentions Légales | XenonDz",
  description: "Mentions légales de XenonDz, agence digitale algérienne.",
  alternates: { canonical: "https://xenondz.vercel.app/mentions-legales" },
  openGraph: {
    url: "https://xenondz.vercel.app/mentions-legales",
    title: "Mentions Légales | XenonDz",
    description: "Mentions légales de XenonDz, agence digitale algérienne.",
  },
};

export default function MentionsLegalesPage() {
  return <MentionsLegales />;
}
