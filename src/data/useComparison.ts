import { useEffect, useState } from "react";
import { supabase, DbComparison } from "../admin/supabaseClient";

export function useComparison() {
  const [comparisons, setComparisons] = useState<DbComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComparisons() {
      try {
        const { data, error } = await supabase
          .from("service_comparisons")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) {
          throw error;
        }

        setComparisons(data || []);
      } catch (err: any) {
        console.error("Error fetching comparisons:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComparisons();
  }, []);

  return { comparisons, loading, error };
}
