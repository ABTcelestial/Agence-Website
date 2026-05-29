import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase, type DbAddon } from "./supabaseClient";
import { Plus, Pencil, Trash2, Loader2, Save, ArrowLeft } from "lucide-react";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH as string ?? "xn-ctrl-8z";

/* ─── List ─── */
export function AdminAddons() {
  const [addons, setAddons] = useState<DbAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAddons = async () => {
    const { data } = await supabase.from("addons").select("*").order("created_at");
    setAddons(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAddons(); }, []);

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Supprimer "${label}" ?`)) return;
    await supabase.from("addons").delete().eq("id", id);
    await fetchAddons();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("addons").update({ is_active: !current }).eq("id", id);
    setAddons(prev => prev.map(a => a.id === id ? { ...a, is_active: !current } : a));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight">Options globales</h1>
          <p className="text-white/40 text-sm mt-1">{addons.length} option{addons.length !== 1 ? "s" : ""} configurée{addons.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => router.push(`/${ADMIN_PATH}/addons/new`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
          <Plus size={16} />
          Nouvelle option
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-white/40" />
        </div>
      ) : addons.length === 0 ? (
        <div className="text-center py-20">
          <Plus size={40} className="mx-auto mb-4 text-white/20" />
          <div className="text-white/50 text-sm">Aucune option — créez la première !</div>
        </div>
      ) : (
        <div className="space-y-3">
          {addons.map(addon => (
            <div key={addon.id}
              className="flex items-start gap-4 rounded-2xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-semibold">{addon.label_fr}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}>
                    +{(addon.price || 0).toLocaleString("fr-DZ")} DA
                  </span>
                  {!addon.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
                      Inactif
                    </span>
                  )}
                </div>
                <div className="text-white/40 text-xs mt-1 truncate">{addon.description_fr}</div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-white/25">
                  <span>EN: {addon.label_en || "—"}</span>
                  <span>AR: {addon.label_ar || "—"}</span>
                  <span className="font-mono text-white/20">{addon.addon_key}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <button onClick={() => toggleActive(addon.id, addon.is_active)}
                  className="w-10 h-6 rounded-full transition-all relative"
                  style={{ background: addon.is_active ? "rgba(26,26,110,0.7)" : "rgba(255,255,255,0.1)" }}>
                  <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: addon.is_active ? "auto" : 2, right: addon.is_active ? 2 : "auto" }} />
                </button>

                <button onClick={() => router.push(`/${ADMIN_PATH}/addons/${addon.id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Pencil size={12} /> Modifier
                </button>
                <button onClick={() => handleDelete(addon.id, addon.label_fr)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Form ─── */
export function AdminAddonForm() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const isNew = !id || id === "new";

  type FormState = {
    addon_key: string; price: string;
    label_fr: string; label_en: string; label_ar: string;
    description_fr: string; description_en: string; description_ar: string;
    is_active: boolean;
  };

  const [form, setForm] = useState<FormState>({
    addon_key: "", price: "",
    label_fr: "", label_en: "", label_ar: "",
    description_fr: "", description_en: "", description_ar: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew) {
      supabase.from("addons").select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({
          addon_key: data.addon_key || "",
          price: String(data.price || ""),
          label_fr: data.label_fr || "", label_en: data.label_en || "", label_ar: data.label_ar || "",
          description_fr: data.description_fr || "", description_en: data.description_en || "", description_ar: data.description_ar || "",
          is_active: data.is_active !== false,
        });
        setLoading(false);
      });
    }
  }, [id]);

  const set = (key: keyof FormState, val: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (key === "label_fr") {
      const slug = (val as string).toLowerCase()
        .replace(/[àâä]/g, "a").replace(/[éèêë]/g, "e").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setForm(prev => ({ ...prev, label_fr: val as string, addon_key: slug }));
    }
  };

  const handleSave = async () => {
    if (!form.addon_key || !form.label_fr) { setError("Clé et nom FR requis"); return; }
    setSaving(true);
    setError(null);
    const payload = {
      addon_key: form.addon_key,
      price: parseInt(form.price) || 0,
      label_fr: form.label_fr, label_en: form.label_en, label_ar: form.label_ar,
      description_fr: form.description_fr, description_en: form.description_en, description_ar: form.description_ar,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };
    let err;
    if (isNew) ({ error: err } = await supabase.from("addons").insert([payload]));
    else ({ error: err } = await supabase.from("addons").update(payload).eq("id", id));
    if (err) { setError(err.message); setSaving(false); return; }
    router.push(`/${ADMIN_PATH}/addons`);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/8 focus:border-white/25";
  const labelCls = "block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest";

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-white/40" /></div>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push(`/${ADMIN_PATH}/addons`)} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} /> Options
        </button>
        <span className="text-white/20">/</span>
        <span className="text-white/60 text-sm">{isNew ? "Nouvelle option" : form.label_fr || "Modifier"}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-bold">{isNew ? "Nouvelle option" : "Modifier l'option"}</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-white/40 text-xs">Actif</span>
            <button onClick={() => set("is_active", !form.is_active)} className="w-10 h-6 rounded-full transition-all relative"
              style={{ background: form.is_active ? "rgba(26,26,110,0.8)" : "rgba(255,255,255,0.1)" }}>
              <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: form.is_active ? "auto" : 2, right: form.is_active ? 2 : "auto" }} />
            </button>
          </label>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-6" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>{error}</div>
      )}

      <div className="space-y-6">
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Clé unique (ID)</label><input className={inputCls} value={form.addon_key} onChange={e => set("addon_key", e.target.value)} placeholder="crm-dashboard" /></div>
            <div><label className={labelCls}>Prix (DA)</label><input className={inputCls} value={form.price} onChange={e => set("price", e.target.value)} type="number" placeholder="35000" /></div>
          </div>
        </div>

        {(["fr", "en", "ar"] as const).map(lang => (
          <div key={lang} className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              {lang === "fr" ? "🇫🇷 Français" : lang === "en" ? "🇬🇧 English" : "🇩🇿 العربية"}
            </h2>
            <div><label className={labelCls}>Nom</label>
              <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`label_${lang}`]} onChange={e => set(`label_${lang}` as keyof FormState, e.target.value)} />
            </div>
            <div><label className={labelCls}>Description</label>
              <textarea className={`${inputCls} resize-none`} rows={3} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`description_${lang}`]} onChange={e => set(`description_${lang}` as keyof FormState, e.target.value)} />
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <button onClick={() => router.push(`/${ADMIN_PATH}/addons`)} className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>Annuler</button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer l'option"}
          </button>
        </div>
      </div>
    </div>
  );
}
