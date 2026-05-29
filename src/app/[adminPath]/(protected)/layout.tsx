import { ProtectedRoute } from "@/admin/ProtectedRoute";
import { AdminLayout } from "@/admin/AdminLayout";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
