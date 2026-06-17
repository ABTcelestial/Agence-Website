import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { ServiceDetailClient } from "./ServiceDetailClient";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const BASE_URL = "https://xenondz.com";

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
  const { slug } = await params;
  let service = null;

  try {
    const [{ data: svcData }, { data: addonData }] = await Promise.all([
      supabase.from("services").select("*").eq("slug", slug).eq("is_active", true).single(),
      supabase.from("addons").select("*").eq("is_active", true),
    ]);
    if (svcData) {
      const { mapService } = await import("@/data/services-mapping");
      const dbAddons = (addonData || []) as any[];
      service = mapService(svcData as any, dbAddons);
    }
  } catch (err) {
    console.error("Error fetching service details on server:", err);
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Services", url: "/services" },
        { name: service?.title || slug, url: `/services/${slug}` },
      ]} />
      <ServiceDetailClient initialService={service} />
    </>
  );
}
