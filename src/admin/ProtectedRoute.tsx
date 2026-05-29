'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/admin/AuthContext";
import { Loader2 } from "lucide-react";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e1e]">
        <Loader2 size={28} className="animate-spin text-white/30" />
      </div>
    );
  }

  if (!user) {
    router.replace(`/${ADMIN_PATH}/auth`);
    return null;
  }

  return <>{children}</>;
}