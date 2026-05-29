import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase, type DbAddon } from "./supabaseClient";
import { ArrowLeft, Plus, X, Save, Loader2 } from "lucide-react";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH as string ?? "xn-ctrl-8z";

const ICONS = ["🌐", "🛒", "⚙️", "🔍", "📱", "📊", "🚀", "💡", "🎯", "🔧", "⚡", "🏆"];

type LangKey = "fr" | "en" | "ar";

interface ProcessStep {
  title_fr: string; title_en: string; title_ar: string;
  description_fr: string; description_en: string; description_ar: string;
}

interface FormState {
  slug: string;
  icon: string;
  title_fr: string; title_en: string; title_ar: string;
  description_fr: string; description_en: string; description_ar: string;
  long_description_fr: string; long_description_en: string; long_description_ar: string;
  features_fr: string[]; features_en: string[]; features_ar: string[];
  base_price: string;
  duration_fr: string; duration_en: string; duration_ar: string;
  form_value: string;
  addon_ids: string[];
  process_steps: ProcessStep[];
  sort_order: string;
  is_active: boolean;
}

const emptyStep = (): ProcessStep => ({
  title_fr: "", title_en: "", title_ar: "",
  description_fr: "", description_en: "", description_ar: "",
});

const emptyForm: FormState = {
  slug: "", icon: "⚡",
  title_fr: "", title_en: "", title_ar: "",
  description_fr: "", description_en: "", description_ar: "",
  long_description_fr: "", long_description_en: "", long_description_ar: "",
  features_fr: [""], features_en: [""], features_ar: [""],
  base_price: "",
  duration_fr: "", duration_en: "", duration_ar: "",
  form_value: "",
  addon_ids: [],
  process_steps: [emptyStep(), emptyStep(), emptyStep(), emptyStep()],
  sort_order: "0",
  is_active: true,
};

export function AdminServiceForm() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const isNew = !id || id === "new";

  const [form, setForm] = useState<FormState>(emptyForm);
  const [surDevis, setSurDevis] = useState(false);
  const [activeLang, setActiveLang] = useState<LangKey>("fr");
  const [allAddons, setAllAddons] = useState<DbAddon[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: addons } = await supabase.from("addons").select("*").eq("is_active", true).order("created_at");
      setAllAddons(addons || []);

      if (!isNew) {
        const { data } = await supabase.from("services").select("*").eq("id", id).single();
        if (data) {
          setForm({
            slug: data.slug || "",
            icon: data.icon || "⚡",
            title_fr: data.title_fr || "", title_en: data.title_en || "", title_ar: data.title_ar || "",
            description_fr: data.description_fr || "", description_en: data.description_en || "", description_ar: data.description_ar || "",
            long_description_fr: data.long_description_fr || "", long_description_en: data.long_description_en || "", long_description_ar: data.long_description_ar || "",
            features_fr: data.features_fr?.length ? data.features_fr : [""],
            features_en: data.features_en?.length ? data.features_en : [""],
            features_ar: data.features_ar?.length ? data.features_ar : [""],
            base_price: data.base_price ? String(data.base_price) : "",
            duration_fr: data.duration_fr || "", duration_en: data.duration_en || "", duration_ar: data.duration_ar || "",
            form_value: data.form_value || "",
            addon_ids: data.addon_ids || [],
            process_steps: data.process_steps?.length ? data.process_steps : [emptyStep(), emptyStep(), emptyStep(), emptyStep()],
            sort_order: String(data.sort_order || 0),
            is_active: data.is_active !== false,
          });
          setSurDevis(data.base_price === 0);
        }
        setLoading(false);
      }
    };
    init();
  }, [id]);

  const set = (key: keyof FormState, value: FormState[keyof FormState]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key === "title_fr") {
      const slug = (value as string).toLowerCase()
        .replace(/[àâä]/g, "a").replace(/[éèêë]/g, "e").replace(/[îï]/g, "i")
        .replace(/[ôö]/g, "o").replace(/[ùûü]/g, "u")
        .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").substring(0, 40);
      setForm(prev => ({ ...prev, title_fr: value as string, slug, form_value: slug }));
    }
  };

  const setFeature = (lang: LangKey, idx: number, val: string) => {
    setForm(prev => {
      const key = `features_${lang}` as keyof FormState;
      const arr = [...(prev[key] as string[])];
      arr[idx] = val;
      return { ...prev, [key]: arr };
    });
  };

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features_fr: [...prev.features_fr, ""],
      features_en: [...prev.features_en, ""],
      features_ar: [...prev.features_ar, ""],
    }));
  };

  const removeFeature = (idx: number) => {
    setForm(prev => ({
      ...prev,
      features_fr: prev.features_fr.filter((_, i) => i !== idx),
      features_en: prev.features_en.filter((_, i) => i !== idx),
      features_ar: prev.features_ar.filter((_, i) => i !== idx),
    }));
  };

  const toggleAddon = (addonKey: string) => {
    setForm(prev => ({
      ...prev,
      addon_ids: prev.addon_ids.includes(addonKey)
        ? prev.addon_ids.filter(a => a !== addonKey)
        : [...prev.addon_ids, addonKey],
    }));
  };


  const handleSave = async () => {
    if (!form.slug || !form.title_fr) { setError("Slug et titre FR requis"); return; }
    setSaving(true);
    setError(null);
    const payload = {
      slug: form.slug,
      icon: form.icon,
      title_fr: form.title_fr, title_en: form.title_en, title_ar: form.title_ar,
      description_fr: form.description_fr, description_en: form.description_en, description_ar: form.description_ar,
      long_description_fr: form.long_description_fr, long_description_en: form.long_description_en, long_description_ar: form.long_description_ar,
      features_fr: form.features_fr.filter(Boolean),
      features_en: form.features_en.filter(Boolean),
      features_ar: form.features_ar.filter(Boolean),
      base_price: surDevis ? 0 : (parseInt(form.base_price) || 0),
      duration_fr: form.duration_fr, duration_en: form.duration_en, duration_ar: form.duration_ar,
      form_value: form.form_value || form.slug,
      addon_ids: form.addon_ids,
      process_steps: form.process_steps.filter(s => s.title_fr),
      sort_order: parseInt(form.sort_order) || 0,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };
    let err;
    if (isNew) {
      ({ error: err } = await supabase.from("services").insert([payload]));
    } else {
      ({ error: err } = await supabase.from("services").update(payload).eq("id", id));
    }
    if (err) { setError(err.message); setSaving(false); return; }
    router.push(`/${ADMIN_PATH}/services`);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/8 focus:border-white/25";
  const labelCls = "block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest";

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={24} className="animate-spin text-white/40" />
    </div>
  );

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push(`/${ADMIN_PATH}/services`)}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} />
          Services
        </button>
        <span className="text-white/20">/</span>
        <span className="text-white/60 text-sm">{isNew ? "Nouveau service" : form.title_fr || "Modifier"}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-bold">{isNew ? "Nouveau service" : "Modifier le service"}</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-white/40 text-xs">Actif</span>
            <button onClick={() => set("is_active", !form.is_active)}
              className="w-10 h-6 rounded-full transition-all relative"
              style={{ background: form.is_active ? "rgba(26,26,110,0.8)" : "rgba(255,255,255,0.1)" }}>
              <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                style={{ left: form.is_active ? "auto" : 2, right: form.is_active ? 2 : "auto" }} />
            </button>
          </label>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 16px rgba(26,26,110,0.4)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-6"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* Slug & icon */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Identifiant</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Slug (URL)</label>
              <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="mon-service" />
            </div>
            <div>
              <label className={labelCls}>Icône</label>
              <div className="flex gap-2 flex-wrap">
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => set("icon", ic)}
                    className="w-9 h-9 rounded-lg text-lg transition-all"
                    style={{ background: form.icon === ic ? "rgba(26,26,110,0.6)" : "rgba(255,255,255,0.05)", border: form.icon === ic ? "1px solid rgba(26,26,110,0.8)" : "1px solid rgba(255,255,255,0.08)" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>À partir de (DA)</label>
              <div className="space-y-2">
                {/* Sur devis toggle */}
                <button
                  type="button"
                  onClick={() => { setSurDevis(v => !v); if (!surDevis) set("base_price", ""); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={surDevis
                    ? { background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: surDevis ? "#c9a84c" : "rgba(255,255,255,0.2)", background: surDevis ? "#c9a84c" : "transparent" }}>
                    {surDevis && <span className="text-black text-xs font-bold">✓</span>}
                  </span>
                  Sur devis
                </button>
                {!surDevis && (
                  <input className={inputCls} value={form.base_price} onChange={e => set("base_price", e.target.value)} type="number" placeholder="65000" />
                )}
                {surDevis && (
                  <div className="px-3 py-2.5 rounded-xl text-sm font-semibold text-center"
                    style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c" }}>
                    Prix sur devis uniquement
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={labelCls}>Ordre d'affichage</label>
              <input className={inputCls} value={form.sort_order} onChange={e => set("sort_order", e.target.value)} type="number" placeholder="0" />
            </div>
          </div>
        </div>

        {/* Lang tabs */}
        <div className="flex gap-2">
          {(["fr", "en", "ar"] as LangKey[]).map(lang => (
            <button key={lang} onClick={() => setActiveLang(lang)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={activeLang === lang
                ? { background: "rgba(26,26,110,0.6)", border: "1px solid rgba(26,26,110,0.8)", color: "#fff" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              {lang === "fr" ? "🇫🇷 Français" : lang === "en" ? "🇬🇧 English" : "🇩🇿 العربية"}
            </button>
          ))}
        </div>

        {/* Content fields */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
            Contenu — {activeLang === "fr" ? "Français" : activeLang === "en" ? "English" : "العربية"}
          </h2>

          <div>
            <label className={labelCls}>Titre</label>
            <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`title_${activeLang}`]}
              onChange={e => { set(`title_${activeLang}` as keyof FormState, e.target.value); }}
              placeholder={activeLang === "fr" ? "Sites Web Professionnels" : activeLang === "en" ? "Professional Websites" : "المواقع الإلكترونية"} />
          </div>

          <div>
            <label className={labelCls}>Description courte</label>
            <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`description_${activeLang}`]}
              onChange={e => set(`description_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={activeLang === "fr" ? "Une phrase accrocheuse…" : activeLang === "en" ? "A catchy sentence…" : "جملة جذابة…"} />
          </div>

          <div>
            <label className={labelCls}>Description longue</label>
            <textarea className={`${inputCls} resize-none`} rows={3} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`long_description_${activeLang}`]}
              onChange={e => set(`long_description_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={activeLang === "fr" ? "Description détaillée…" : activeLang === "en" ? "Detailed description…" : "وصف مفصل…"} />
          </div>

          <div>
            <label className={labelCls}>Durée de livraison</label>
            <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`duration_${activeLang}`]}
              onChange={e => set(`duration_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={activeLang === "fr" ? "Livraison en 7-10 jours" : activeLang === "en" ? "Delivered in 7–10 days" : "تسليم في 7-10 أيام"} />
          </div>

          {/* Features */}
          <div>
            <label className={labelCls}>Fonctionnalités incluses</label>
            <div className="space-y-2">
              {form.features_fr.map((_, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
                    value={form[`features_${activeLang}`][idx] || ""}
                    onChange={e => setFeature(activeLang, idx, e.target.value)}
                    placeholder={activeLang === "fr" ? `Feature ${idx + 1}` : activeLang === "en" ? `Feature ${idx + 1}` : `ميزة ${idx + 1}`} />
                  {form.features_fr.length > 1 && (
                    <button onClick={() => removeFeature(idx)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white/30 hover:text-red-400 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addFeature}
              className="mt-2 flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors">
              <Plus size={12} /> Ajouter une feature
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              Étapes du processus — {activeLang === "fr" ? "Français" : activeLang === "en" ? "English" : "العربية"}
            </h2>
            <span className="text-white/25 text-xs">4 étapes max</span>
          </div>
          <div className="space-y-4">
            {form.process_steps.map((step, idx) => (
              <div key={idx} className="rounded-xl p-4 space-y-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "rgba(26,26,110,0.6)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <span className="text-white/40 text-xs">Étape {idx + 1}</span>
                </div>
                <div>
                  <label className={labelCls}>Titre</label>
                  <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
                    value={(step as unknown as Record<string, string>)[`title_${activeLang}`] || ""}
                    onChange={e => {
                      const key = `title_${activeLang}`;
                      setForm(prev => {
                        const steps = [...prev.process_steps];
                        steps[idx] = { ...steps[idx], [key]: e.target.value };
                        return { ...prev, process_steps: steps };
                      });
                    }}
                    placeholder={activeLang === "fr" ? `Ex: Brief & Analyse` : activeLang === "en" ? `Ex: Brief & Analysis` : `مثال: الموجز والتحليل`} />
                </div>
                <div>
                  <label className={labelCls}>Description</label>
                  <textarea className={`${inputCls} resize-none`} rows={2} dir={activeLang === "ar" ? "rtl" : "ltr"}
                    value={(step as unknown as Record<string, string>)[`description_${activeLang}`] || ""}
                    onChange={e => {
                      const key = `description_${activeLang}`;
                      setForm(prev => {
                        const steps = [...prev.process_steps];
                        steps[idx] = { ...steps[idx], [key]: e.target.value };
                        return { ...prev, process_steps: steps };
                      });
                    }}
                    placeholder={activeLang === "fr" ? "Décrivez cette étape…" : activeLang === "en" ? "Describe this step…" : "صف هذه الخطوة…"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Addons */}
        {allAddons.length > 0 && (
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Options associées</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allAddons.map(a => {
                const selected = form.addon_ids.includes(a.addon_key);
                return (
                  <button key={a.id} onClick={() => toggleAddon(a.addon_key)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      background: selected ? "rgba(26,26,110,0.25)" : "rgba(255,255,255,0.03)",
                      border: selected ? "1px solid rgba(26,26,110,0.6)" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: selected ? "rgba(26,26,110,0.8)" : "rgba(255,255,255,0.1)" }}>
                      {selected && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate">{a.label_fr}</div>
                      <div className="text-white/40 text-xs">+{(a.price || 0).toLocaleString("fr-DZ")} DA</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Save */}
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => router.push(`/${ADMIN_PATH}/services`)}
            className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Annuler
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 16px rgba(26,26,110,0.4)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer le service"}
          </button>
        </div>
      </div>
    </div>
  );
}
