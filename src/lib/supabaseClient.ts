import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || ""
);

export type DbService = {
  id: string;
  slug: string;
  icon: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  long_description_fr: string;
  long_description_en: string;
  long_description_ar: string;
  features_fr: string[];
  features_en: string[];
  features_ar: string[];
  base_price: number;
  duration_fr: string;
  duration_en: string;
  duration_ar: string;
  form_value: string;
  addon_ids: string[];
  process_steps: {
    title_fr: string; title_en: string; title_ar: string;
    description_fr: string; description_en: string; description_ar: string;
  }[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbAddon = {
  id: string;
  addon_key: string;
  label_fr: string;
  label_en: string;
  label_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbComparison = {
  id: string;
  feature_fr: string;
  feature_en: string;
  feature_ar: string;
  vitrine_fr: string;
  vitrine_en: string;
  vitrine_ar: string;
  ecom_fr: string;
  ecom_en: string;
  ecom_ar: string;
  auto_fr: string;
  auto_en: string;
  auto_ar: string;
  seo_fr: string;
  seo_en: string;
  seo_ar: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
