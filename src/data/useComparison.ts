import { useEffect, useState } from "react";
import { supabase, DbComparison } from "../admin/supabaseClient";

export function useComparison(initialComparisons?: DbComparison[]) {
  const [comparisons, setComparisons] = useState<DbComparison[]>(
    initialComparisons && initialComparisons.length > 0 ? initialComparisons : []
  );
  const [loading, setLoading] = useState(initialComparisons && initialComparisons.length > 0 ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialComparisons && initialComparisons.length > 0) {
      setLoading(false);
      return;
    }
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
