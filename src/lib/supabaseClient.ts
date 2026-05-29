import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy Supabase singleton.
 *
 * `createClient` throws when `supabaseUrl` is an empty string, which happens
 * during Vercel's "collect page configuration" phase before env vars are
 * available. Wrapping it in a getter ensures the client is only instantiated
 * at request-time, not at module-evaluation time.
 */
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "[supabaseClient] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

/** @deprecated Use `getSupabase()` instead. */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop];
  },
});

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
