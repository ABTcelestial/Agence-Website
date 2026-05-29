import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";
import { Save, Loader2, Eye, EyeOff, Key, User, Shield, ExternalLink } from "lucide-react";

export function AdminSettings() {
  const { user } = useAuth();
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwdStatus, setPwdStatus] = useState<"idle" | "ok" | "error">("idle");
  const [pwdError, setPwdError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) { setPwdError("Les mots de passe ne correspondent pas"); setPwdStatus("error"); return; }
    if (newPwd.length < 8) { setPwdError("Le mot de passe doit contenir au moins 8 caractères"); setPwdStatus("error"); return; }
    setSaving(true);
    setPwdStatus("idle");
    setPwdError("");
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    if (error) { setPwdError(error.message); setPwdStatus("error"); }
    else { setPwdStatus("ok"); setNewPwd(""); setConfirmPwd(""); }
    setSaving(false);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/10 focus:border-white/30";
  const labelCls = "block text-xs font-medium text-white/40 mb-2 uppercase tracking-widest";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-white/40 text-sm mt-1">Gérez votre compte et la configuration</p>
      </div>

      {/* Account info */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <User size={15} className="text-white/40" />
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Compte</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)" }}>
            {user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <div className="text-white text-sm font-semibold">{user?.email}</div>
            <div className="text-white/40 text-xs mt-0.5">Administrateur · Compte actif</div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <Shield size={15} className="text-white/40" />
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Changer le mot de passe</h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className={labelCls}>Nouveau mot de passe</label>
            <div className="relative">
              <input type={showNew ? "text" : "password"} value={newPwd} onChange={e => setNewPwd(e.target.value)}
                className={`${inputCls} pr-12`} placeholder="Minimum 8 caractères" required minLength={8} />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className={labelCls}>Confirmer le mot de passe</label>
            <div className="relative">
              <input type={showCurrent ? "text" : "password"} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                className={inputCls} placeholder="Répétez le mot de passe" required minLength={8} />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {pwdStatus === "ok" && (
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}>
              ✓ Mot de passe mis à jour avec succès
            </div>
          )}
          {pwdStatus === "error" && (
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
              {pwdError}
            </div>
          )}

          <button type="submit" disabled={saving || !newPwd || !confirmPwd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Mise à jour…" : "Mettre à jour"}
          </button>
        </form>
      </div>

      {/* API Keys info */}
      <div className="rounded-2xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <Key size={15} className="text-white/40" />
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Clés API</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              name: "Supabase URL",
              env: "NEXT_PUBLIC_SUPABASE_URL",
              value: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Configuré" : "⚠ Manquant",
              ok: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
              link: "https://app.supabase.com",
            },
            {
              name: "Supabase Anon Key",
              env: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
              value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Configuré" : "⚠ Manquant",
              ok: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              link: "https://app.supabase.com",
            },
            {
              name: "Web3Forms Key",
              env: "NEXT_PUBLIC_WEB3FORMS_KEY",
              value: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ? "✓ Configuré" : "⚠ Manquant",
              ok: !!process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
              link: "https://web3forms.com",
            },
          ].map(k => (
            <div key={k.env} className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div className="text-white/70 text-xs font-medium">{k.name}</div>
                <div className="text-white/30 text-xs font-mono mt-0.5">{k.env}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: k.ok ? "#86efac" : "#fca5a5" }}>{k.value}</span>
                <a href={k.link} target="_blank" rel="noopener noreferrer"
                  className="text-white/25 hover:text-white/50 transition-colors">
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/25 text-xs mt-4">
          Modifiez ces valeurs dans le fichier <code className="text-white/40">.env</code> à la racine du projet.
        </p>
      </div>

      {/* Supabase SQL patch */}
      <div className="rounded-2xl p-5"
        style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(201,168,76,0.2)" }}>
            <span style={{ fontSize: 10, color: "#c9a84c" }}>!</span>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: "#c9a84c" }}>Migration SQL requise</div>
            <div className="text-white/40 text-xs leading-relaxed">
              Pour activer le suivi des demandes, exécutez le bloc <code className="text-white/60">CONTACT_REQUESTS</code> du fichier <code className="text-white/60">SUPABASE_SETUP.sql</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
