'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { supabase } from "./supabaseClient";
import {
  Zap, Plus, LogOut, Globe,
  ChevronRight, LayoutDashboard, Settings, Menu, Inbox, Users, Briefcase,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";

const navItems = [
  { to: `/${ADMIN_PATH}`, icon: LayoutDashboard, label: "Dashboard", end: true, badge: false },
  { to: `/${ADMIN_PATH}/services`, icon: Zap, label: "Services", badge: false },
  { to: `/${ADMIN_PATH}/addons`, icon: Plus, label: "Options globales", badge: false },
  { to: `/${ADMIN_PATH}/comparison`, icon: Zap, label: "Comparatif", badge: false },
  { to: `/${ADMIN_PATH}/team`, icon: Users, label: "Équipe", badge: false },
  { to: `/${ADMIN_PATH}/realisations`, icon: Briefcase, label: "Réalisations", badge: false },
  { to: `/${ADMIN_PATH}/orders`, icon: Inbox, label: "Demandes", badge: true },
];

const bottomNavItems = [
  { to: `/${ADMIN_PATH}/settings`, icon: Settings, label: "Paramètres" },
];

interface SidebarProps {
  user: User | null;
  newOrdersCount: number;
  handleSignOut: () => void;
  setMobileOpen: (v: boolean) => void;
}

function SidebarContent({ user, newOrdersCount, handleSignOut, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <title>Admin — XenonDz</title>
      <meta name="robots" content="noindex, nofollow" />
      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)" }}>
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-bold tracking-tight">XenonDz</div>
            <div className="text-white/40 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 mb-3">Gestion</div>
        {navItems.map(({ to, icon: Icon, label, end, badge }) => {
          const isActive = end ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              href={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                isActive
                  ? "text-white font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
              style={isActive ? { background: "rgba(26,26,110,0.6)", border: "1px solid rgba(26,26,110,0.8)" } : {}}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-white/40 group-hover:text-white/60"} />
              <span className="flex-1">{label}</span>
              {badge && newOrdersCount > 0 && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={{ background: "#3b82f6", color: "#fff", fontSize: 10 }}>
                  {newOrdersCount}
                </span>
              )}
              {isActive && !badge && <ChevronRight size={14} className="ml-auto text-white/50" />}
            </Link>
          );
        })}

        <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 mb-3 mt-6">Site</div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
        >
          <Globe size={16} className="text-white/40" />
          Voir le site
        </a>

        <div className="text-xs font-semibold text-white/30 uppercase tracking-widest px-3 mb-3 mt-6">Compte</div>
        {bottomNavItems.map(({ to, icon: Icon, label }) => {
          const isActive = pathname.startsWith(to);
          return (
            <Link
              key={to}
              href={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                isActive ? "text-white font-medium" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
              style={isActive ? { background: "rgba(26,26,110,0.6)", border: "1px solid rgba(26,26,110,0.8)" } : {}}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-white/40 group-hover:text-white/60"} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto text-white/50" />}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)" }}>
            {user?.email?.[0].toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{user?.email || "Admin"}</div>
            <div className="text-white/40 text-xs">Administrateur</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const fetchBadge = async () => {
      const { count } = await supabase
        .from("contact_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setNewOrdersCount(count || 0);
    };
    fetchBadge();
    const interval = setInterval(fetchBadge, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace(`/${ADMIN_PATH}/auth`);
  };

  const sidebarProps: SidebarProps = { user, newOrdersCount, handleSignOut, setMobileOpen };

  return (
    <div className="min-h-screen flex" style={{ background: "#0e0e1e" }}>

      {/* Desktop sidebar */}
      <aside className="w-60 flex-col hidden lg:flex"
        style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 flex flex-col"
            style={{ background: "#0e0e1e", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <SidebarContent {...sidebarProps} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar (mobile) */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <button onClick={() => setMobileOpen(true)} className="text-white/60 hover:text-white">
            <Menu size={20} />
          </button>
          <div className="text-white text-sm font-semibold">XenonDz Admin</div>
          <div className="w-8" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
