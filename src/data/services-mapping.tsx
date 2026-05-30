import React from "react";
import { Globe, ShoppingCart, Cog, Search, Smartphone, BarChart } from "lucide-react";
import { type DbService, type DbAddon } from "../admin/supabaseClient";

export interface ServiceAddon {
  id: string;
  label: string; labelEn: string; labelAr: string;
  price: number;
  description: string; descriptionEn: string; descriptionAr: string;
}

export interface Service {
  slug: string;
  icon: React.ReactNode;
  title: string; titleEn: string; titleAr: string;
  description: string; descriptionEn: string; descriptionAr: string;
  longDescription: string; longDescriptionEn: string; longDescriptionAr: string;
  features: string[]; featuresEn: string[]; featuresAr: string[];
  basePrice: number;
  priceSuffix?: string;
  duration: string; durationEn: string; durationAr: string;
  formValue: string;
  addons: ServiceAddon[];
  process: { step: string; title: string; titleEn: string; titleAr: string; description: string; descriptionEn: string; descriptionAr: string }[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "creation-site-web-vitrine": <Globe size={36} style={{ color: "var(--primary)" }} />,
  "creation-boutique-ecommerce": <ShoppingCart size={36} style={{ color: "var(--primary)" }} />,
  "automatisation-generation-leads": <Cog size={36} style={{ color: "var(--primary)" }} />,
  "referencement-naturel-seo": <Search size={36} style={{ color: "var(--primary)" }} />,
  "developpement-application-sur-mesure": <Smartphone size={36} style={{ color: "var(--primary)" }} />,
  "audit-optimisation-performance": <BarChart size={36} style={{ color: "var(--primary)" }} />,
};

function getIcon(slug: string, emoji: string): React.ReactNode {
  if (ICON_MAP[slug]) return ICON_MAP[slug];
  return <span style={{ fontSize: 32 }}>{emoji || "⚡"}</span>;
}

export function mapAddon(db: DbAddon): ServiceAddon {
  return {
    id: db.addon_key,
    label: db.label_fr, labelEn: db.label_en, labelAr: db.label_ar,
    price: db.price,
    description: db.description_fr, descriptionEn: db.description_en, descriptionAr: db.description_ar,
  };
}

export function mapService(db: DbService, allAddons: DbAddon[]): Service {
  const addonMap = Object.fromEntries(allAddons.map(a => [a.addon_key, a]));
  const addons: ServiceAddon[] = (db.addon_ids || []).map(k => addonMap[k]).filter(Boolean).map(mapAddon);
  const process = (db.process_steps || []).map((s, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: s.title_fr, titleEn: s.title_en, titleAr: s.title_ar,
    description: s.description_fr, descriptionEn: s.description_en, descriptionAr: s.description_ar,
  }));
  return {
    slug: db.slug,
    icon: getIcon(db.slug, db.icon),
    title: db.title_fr, titleEn: db.title_en, titleAr: db.title_ar,
    description: db.description_fr, descriptionEn: db.description_en, descriptionAr: db.description_ar,
    longDescription: db.long_description_fr, longDescriptionEn: db.long_description_en, longDescriptionAr: db.long_description_ar,
    features: db.features_fr || [], featuresEn: db.features_en || [], featuresAr: db.features_ar || [],
    basePrice: db.base_price,
    priceSuffix: db.base_price === 0 ? "Sur devis" : undefined,
    duration: db.duration_fr, durationEn: db.duration_en, durationAr: db.duration_ar,
    formValue: db.form_value || db.slug,
    addons,
    process,
  };
}
