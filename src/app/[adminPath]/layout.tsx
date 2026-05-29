import { notFound } from "next/navigation";
import { AuthProvider } from "@/admin/AuthContext";

interface Props {
  children: React.ReactNode;
  params: Promise<{ adminPath: string }>;
}

export default async function AdminPathLayout({ children, params }: Props) {
  const { adminPath } = await params;
  const configuredAdminPath = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";

  if (adminPath !== configuredAdminPath) {
    notFound();
  }

  return <AuthProvider>{children}</AuthProvider>;
}
