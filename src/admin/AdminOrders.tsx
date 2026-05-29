import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Inbox, Mail, Phone, RefreshCw, Clock, XCircle, ChevronDown, ChevronUp, Loader2, CheckCircle} from "lucide-react";

type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
};

const STATUS_CONFIG = {
  new:       { label: "Nouveau",    color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  icon: Clock },
  contacted: { label: "Contacté",   color: "#c9a84c", bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.3)",  icon: CheckCircle },
  closed:    { label: "Fermé",      color: "#6b7280", bg: "rgba(107,114,128,0.12)",border: "rgba(107,114,128,0.3)", icon: XCircle },
};

export function AdminOrders() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    const { data } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id: string, status: ContactRequest["status"]) => {
    await supabase.from("contact_requests").update({ status }).eq("id", id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);
  const counts = {
    all: requests.length,
    new: requests.filter(r => r.status === "new").length,
    contacted: requests.filter(r => r.status === "contacted").length,
    closed: requests.filter(r => r.status === "closed").length,
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-DZ", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Demandes reçues</h1>
          <p className="text-white/40 text-sm mt-1">{counts.new} nouvelle{counts.new !== 1 ? "s" : ""} demande{counts.new !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => fetchRequests(true)} disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Rafraîchir
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "new", "contacted", "closed"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={filter === f
              ? { background: "rgba(26,26,110,0.5)", border: "1px solid rgba(26,26,110,0.7)", color: "#fff" }
              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
            {f === "all" ? "Toutes" : STATUS_CONFIG[f].label}
            <span className="text-xs px-1.5 py-0.5 rounded-md"
              style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Info banner if table doesn't exist yet */}
      <div className="rounded-2xl p-4 mb-6 flex items-start gap-3"
        style={{ background: "rgba(26,26,110,0.1)", border: "1px solid rgba(26,26,110,0.25)" }}>
        <Inbox size={16} className="text-white/40 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-white/40 leading-relaxed">
          Cette section affiche les demandes stockées dans la table <code className="text-white/60">contact_requests</code> de Supabase.
          Ajoutez le bloc SQL de la section <span className="text-white/60">SUPABASE_SETUP.sql</span> pour activer le suivi des leads.
          En attendant, les demandes arrivent par email via Web3Forms.
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-white/40" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Inbox size={40} className="mx-auto mb-4 text-white/20" />
          <div className="text-white/50 text-sm">Aucune demande{filter !== "all" ? ` avec ce statut` : ""}</div>
          <div className="text-white/25 text-xs mt-2">Les demandes du formulaire de contact apparaîtront ici</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(req => {
            const st = STATUS_CONFIG[req.status];
            const isExpanded = expanded === req.id;
            return (
              <div key={req.id} className="rounded-2xl overflow-hidden transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>

                {/* Row header */}
                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : req.id)}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: "rgba(26,26,110,0.5)" }}>
                    {req.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm font-semibold">{req.name}</span>
                      {req.company && <span className="text-white/40 text-xs">{req.company}</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-white/40 text-xs truncate">{req.email}</span>
                      {req.service && <span className="text-white/30 text-xs">· {req.service}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                      {st.label}
                    </span>
                    <span className="text-white/25 text-xs hidden sm:block">{formatDate(req.created_at)}</span>
                    {isExpanded ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-white/30" />
                        <a href={`mailto:${req.email}`} className="text-white/60 text-xs hover:text-white transition-colors">{req.email}</a>
                      </div>
                      {req.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-white/30" />
                          <a href={`tel:${req.phone}`} className="text-white/60 text-xs hover:text-white transition-colors">{req.phone}</a>
                        </div>
                      )}
                      {req.budget && (
                        <div className="text-xs text-white/40">Budget : <span className="text-white/60">{req.budget}</span></div>
                      )}
                    </div>

                    <div className="rounded-xl p-4 mb-4"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-white/30 text-xs font-medium uppercase tracking-wider mb-2">Message</div>
                      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{req.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {(["new", "contacted", "closed"] as const).map(s => (
                          <button key={s} onClick={() => updateStatus(req.id, s)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={req.status === s
                              ? { background: STATUS_CONFIG[s].bg, color: STATUS_CONFIG[s].color, border: `1px solid ${STATUS_CONFIG[s].border}` }
                              : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {STATUS_CONFIG[s].label}
                          </button>
                        ))}
                      </div>
                      <a href={`mailto:${req.email}?subject=Re: Votre demande XenonDz`}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                        style={{ background: "rgba(26,26,110,0.5)", border: "1px solid rgba(26,26,110,0.7)" }}>
                        <Mail size={12} /> Répondre
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
