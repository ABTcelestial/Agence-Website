'use client';
import { Services } from "@/pages-src/Services";

export function ServicesClient({ initialServices, initialComparisons }: { initialServices?: any[], initialComparisons?: any[] }) {
  return <Services initialServices={initialServices} initialComparisons={initialComparisons} />;
}
