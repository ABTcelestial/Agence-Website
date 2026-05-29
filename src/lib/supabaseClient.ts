import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy Supabase singleton.
 *
 * `createClient` throws when `supabaseUrl` is an empty string, which happens
 * during Vercel's "collect page configuration" phase before env vars are
 * available. Wrapping it in a getter ensures the client is only instantiated
 * at request-time, not at module-evaluation time.
 *
 * If env vars are missing (e.g. not set in Vercel project settings), we return
 * a no-op stub so pages render instead of crashing. Data calls will silently
 * fail — configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * in your Vercel project settings to restore full functionality.
 */
let _supabase: SupabaseClient | null = null;

function createNoOpStub(): SupabaseClient {
  const warn = (method: string) => {
    console.warn(
      `[supabaseClient] ${method}() called but NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. ` +
      "Add them in Vercel → Project Settings → Environment Variables."
    );
  };
  // Minimal stub — returns objects that resolve to empty data, never throw.
  const chainable: any = new Proxy(
    { data: null, error: null },
    {
      get(target, prop) {
        if (prop === "then" || prop === "catch" || prop === "finally") return undefined;
        if (prop in target) return target[prop as keyof typeof target];
        return (..._args: any[]) => {
          warn(String(prop));
          return Promise.resolve({ data: null, error: { message: "Supabase not configured" } });
        };
      },
    }
  );
  return new Proxy({} as SupabaseClient, {
    get(_t, prop) {
      if (prop === "from" || prop === "rpc" || prop === "storage") {
        return (..._args: any[]) => chainable;
      }
      return (..._args: any[]) => {
        warn(String(prop));
        return Promise.resolve({ data: null, error: { message: "Supabase not configured" } });
      };
    },
  });
}

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.warn(
        "[supabaseClient] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. " +
        "Using no-op stub. Add the env vars in Vercel → Project Settings → Environment Variables."
      );
      _supabase = createNoOpStub();
    } else {
      _supabase = createClient(url, key);
    }
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
