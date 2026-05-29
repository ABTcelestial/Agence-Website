import type { Metadata } from "next";
import { SoftwareDetail } from "@/pages-src/SoftwareDetail";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Solution Logicielle | XenonDz`,
    description: `Découvrez notre solution logicielle ${id} sur mesure pour votre secteur.`,
    alternates: { canonical: `https://xenondz.vercel.app/software/${id}` },
  };
}

export default function SoftwareDetailPage() {
  return <SoftwareDetail />;
}
