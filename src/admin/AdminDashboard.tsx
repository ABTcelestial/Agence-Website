import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "./supabaseClient";
import { Zap, Plus, ArrowRight, TrendingUp, Inbox, Package } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH as string ?? "xn-ctrl-8z";

/* ─── Types ─── */
interface StatsState {
  services: number;
  addons: number;
  avgPrice: number;
  newOrders: number;
  totalOrders: number;
  contacted: number;
  closed: number;
}

interface PriceRow { base_price: number }
interface OrderRow { status: string; created_at: string }

/* ─── Custom tooltip ─── */
const DarkTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(14,14,30,0.97)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 12,
      color: "rgba(255,255,255,0.8)",
    }}>
      {label && <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.name === "DA" ? "#c9a84c" : "#a5b4fc" }}>
          {p.name === "DA" ? p.value.toLocaleString("fr-DZ") + " DA" : p.value}
        </p>
      ))}
    </div>
  );
};

export function AdminDashboard() {
  const [stats, setStats] = useState<StatsState>({ services: 0, addons: 0, avgPrice: 0, newOrders: 0, totalOrders: 0, contacted: 0, closed: 0 });
  const [priceData, setPriceData] = useState<{ name: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState<{ day: string; demandes: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [
        { count: svcCount, data: svcData },
        { count: addCount },
        { data: orders },
      ] = await Promise.all([
        supabase.from("services").select("base_price", { count: "exact" }).eq("is_active", true),
        supabase.from("addons").select("*", { count: "exact" }).eq("is_active", true),
        supabase.from("contact_requests").select("status, created_at").order("created_at", { ascending: false }).limit(200),
      ]);

      /* Stats */
      const priced = (svcData as PriceRow[] || []).filter(s => s.base_price > 0);
      const avg = priced.length > 0
        ? Math.round(priced.reduce((a, s) => a + s.base_price, 0) / priced.length)
        : 0;

      const allOrders = (orders as OrderRow[] || []);
      const newCount = allOrders.filter(o => o.status === "new").length;
      const contactedCount = allOrders.filter(o => o.status === "contacted").length;
      const closedCount = allOrders.filter(o => o.status === "closed").length;

      setStats({
        services: svcCount || 0,
        addons: addCount || 0,
        avgPrice: avg,
        newOrders: newCount,
        totalOrders: allOrders.length,
        contacted: contactedCount,
        closed: closedCount,
      });

      /* Price distribution chart */
      const brackets = [
        { name: "5 000–20 000 DA",   min: 0,      max: 20000 },
        { name: "20 000–50 000 DA",  min: 20000,  max: 50000 },
        { name: "50 000–100 000 DA", min: 50000,  max: 100000 },
        { name: "100–150 000 DA",    min: 100000, max: 150000 },
        { name: "+ 150 000 DA",      min: 150000, max: Infinity },
      ];
      const pData = brackets.map(b => ({
        name: b.name,
        value: priced.filter(s => s.base_price >= b.min && s.base_price < b.max).length,
      }));
      setPriceData(pData);

      /* Status donut */
      setStatusData([
        { name: "Nouveaux",  value: newCount,       color: "#3b82f6" },
        { name: "Contactés", value: contactedCount,  color: "#c9a84c" },
        { name: "Fermés",    value: closedCount,     color: "#6b7280" },
      ].filter(d => d.value > 0));

      /* 7-day trend */
      const days: { day: string; demandes: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" });
        const dayStr = d.toISOString().slice(0, 10);
        const count = allOrders.filter(o => o.created_at?.slice(0, 10) === dayStr).length;
        days.push({ day: label, demandes: count });
      }
      setTrendData(days);

      setLoading(false);
    };
    fetchAll();
  }, []);

  const statCards = [
    { label: "Services actifs",    value: loading ? "—" : stats.services,  icon: Zap,        color: "#6366f1" },
    { label: "Options disponibles",value: loading ? "—" : stats.addons,    icon: Package,    color: "#c9a84c" },
    { label: "Nouvelles demandes", value: loading ? "—" : stats.newOrders, icon: Inbox,      color: "#3b82f6", pulse: !loading && stats.newOrders > 0 },
    { label: "Prix moyen",         value: loading ? "—" : stats.avgPrice > 0 ? stats.avgPrice.toLocaleString("fr-DZ") + " DA" : "—", icon: TrendingUp, color: "#10b981" },
  ];

  const quickActions = [
    { to: `/${ADMIN_PATH}/services/new`, label: "Nouveau service",   desc: "Ajouter un service au catalogue",     icon: Zap },
    { to: `/${ADMIN_PATH}/addons/new`,   label: "Nouvelle option",   desc: "Ajouter une option globale",          icon: Package },
    { to: `/${ADMIN_PATH}/orders`,       label: "Voir les demandes", desc: "Consulter et gérer les leads reçus",  icon: Inbox },
  ];

  const hasOrderData = stats.totalOrders > 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-white/40 text-sm mt-1">Bienvenue dans l'interface de gestion XenonDz</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Glow accent */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: 80, height: 80,
              borderRadius: "0 16px 0 100%",
              background: `${s.color}18`,
              pointerEvents: "none",
            }} />
            <div className="flex items-center justify-between mb-4">
              <div className="text-white/40 text-xs font-medium uppercase tracking-wider leading-tight">{s.label}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}22` }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-white text-2xl font-bold">{s.value}</div>
            {(s as { pulse?: boolean }).pulse && (
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#3b82f6" }} />
            )}
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

        {/* Trend area chart — 2/3 width */}
        <div className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-white text-sm font-semibold">Demandes — 7 derniers jours</div>
              <div className="text-white/30 text-xs mt-0.5">
                {hasOrderData ? `${stats.totalOrders} demande${stats.totalOrders > 1 ? "s" : ""} au total` : "En attente de données"}
              </div>
            </div>
            <Link href={`/${ADMIN_PATH}/orders`} className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              Voir tout <ArrowRight size={11} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<DarkTooltip />} />
              <Area type="monotone" dataKey="demandes" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#a5b4fc" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status donut — 1/3 width */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-white text-sm font-semibold mb-1">Statuts des demandes</div>
          <div className="text-white/30 text-xs mb-5">Répartition globale</div>

          {hasOrderData ? (
            <>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.9} />
                    ))}
                  </Pie>
                  <Tooltip content={<DarkTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {statusData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{d.name}</span>
                    </div>
                    <span className="font-semibold text-white">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Inbox size={28} className="mb-3 text-white/15" />
              <span className="text-white/25 text-xs">Aucune demande encore</span>
            </div>
          )}
        </div>
      </div>

      {/* Price distribution bar chart */}
      {stats.services > 0 && (
        <div className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-white text-sm font-semibold mb-1">Répartition des services par tranche de prix</div>
          <div className="text-white/30 text-xs mb-5">Services avec prix fixe uniquement</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={priceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="value" name="services" radius={[6, 6, 0, 0]}>
                {priceData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${235 + i * 18}, 65%, ${55 + i * 4}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick actions */}
      <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((a, i) => (
          <Link key={i} href={a.to}
            className="group rounded-2xl p-5 flex items-center gap-4 transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(26,26,110,0.5)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(26,26,110,0.3)" }}>
              <a.icon size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">{a.label}</div>
              <div className="text-white/40 text-xs mt-0.5">{a.desc}</div>
            </div>
            <ArrowRight size={16} className="text-white/20 group-hover:text-white/50 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Setup reminder */}
      <div className="rounded-2xl p-5"
        style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(201,168,76,0.2)" }}>
            <span style={{ fontSize: 10, color: "#c9a84c" }}>!</span>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: "#c9a84c" }}>Première utilisation ?</div>
            <div className="text-white/40 text-xs leading-relaxed">
              Exécutez <code className="text-white/60">SUPABASE_SETUP.sql</code> dans votre projet Supabase, puis configurez{" "}
              <code className="text-white/60">VITE_SUPABASE_URL</code> et <code className="text-white/60">VITE_SUPABASE_ANON_KEY</code>{" "}
              dans le fichier <code className="text-white/60">.env</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
