'use client';
import { ServiceDetail } from "@/pages-src/ServiceDetail";

export function ServiceDetailClient({ initialService }: { initialService?: any }) {
  return <ServiceDetail initialService={initialService} />;
}
