import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { ServiceDetailClient } from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const BASE_URL = "https://xenondz.vercel.app";

  const { data: service } = await supabase
    .from("services")
    .select("title_fr, description_fr")
    .eq("slug", slug)
    .single();

  if (!service) {
    return { title: "Service | XenonDz" };
  }

  return {
    title: `${service.title_fr} | XenonDz`,
    description: service.description_fr,
    alternates: { canonical: `${BASE_URL}/services/${slug}` },
    openGraph: {
      url: `${BASE_URL}/services/${slug}`,
      title: `${service.title_fr} | XenonDz`,
      description: service.description_fr,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  return <ServiceDetailClient />;
}
