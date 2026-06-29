import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://xenondz.com";

const STATIC_SERVICE_SLUGS = [
  "creation-site-web-vitrine",
  "creation-boutique-ecommerce",
  "automatisation-generation-leads",
  "referencement-naturel-seo",
  "developpement-application-sur-mesure",
  "audit-optimisation-performance",
];

const BLOG_CATEGORY_SLUGS = [
  "tarifs-devis",
  "e-commerce",
  "seo-geo",
  "automatisation",
  "conseils",
];

const SOLUTION_SLUGS = [
  "creation-site-web-immobilier",
  "creation-site-web-medical",
  "creation-site-web-restaurant",
  "creation-site-web-ecommerce-vetements",
  "creation-site-web-avocat",
  "creation-site-web-btp-construction",
  "automatisation-scraping-google-maps",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let serviceSlugs = STATIC_SERVICE_SLUGS;
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const supabase = createClient(url, key);
      const { data } = await supabase
        .from("services")
        .select("slug")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) {
        serviceSlugs = (data as { slug: string }[]).map((s) => s.slug);
      }
    }
  } catch {
    // fallback to static list
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/services`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/tarifs`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/blog`,              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/realisations`,      lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/faq`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const solutionPages: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = BLOG_CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/categorie/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...solutionPages, ...blogCategoryPages];
}
