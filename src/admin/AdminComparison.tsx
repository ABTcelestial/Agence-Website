import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase, type DbComparison } from "./supabaseClient";
import { Plus, Pencil, Trash2, Loader2, Save, ArrowLeft, GripVertical } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH as string ?? "xn-ctrl-8z";

const ITEM_TYPE = "COMPARISON_ROW";

/* ─── Draggable Row ─── */
interface RowProps {
  row: DbComparison;
  index: number;
  moveRow: (from: number, to: number) => void;
  onDrop: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, label: string) => void;
}

function ComparisonRow({ row, index, moveRow, onDrop, onEdit, onDelete }: RowProps) {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ handlerId }, drop] = useDrop<{ index: number }, void, { handlerId: string | symbol | null }>({
    accept: ITEM_TYPE,
    collect: m => ({ handlerId: m.getHandlerId() }),
    hover(item, monitor) {
      if (!ref.current) return;
      const from = item.index;
      const to = index;
      if (from === to) return;
      const rect = ref.current.getBoundingClientRect();
      const mid = (rect.bottom - rect.top) / 2;
      const client = monitor.getClientOffset();
      if (!client) return;
      const y = client.y - rect.top;
      if (from < to && y < mid) return;
      if (from > to && y > mid) return;
      moveRow(from, to);
      item.index = to;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => ({ id: row.id, index }),
    collect: m => ({ isDragging: m.isDragging() }),
    end: () => onDrop(),
  });

  preview(drop(ref));

  return (
    <tr
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity: isDragging ? 0.4 : 1,
        background: index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
      }}
      className="group transition-colors hover:bg-white/5"
    >
      <td className="px-4 py-3" style={{ width: 40 }}>
        <div ref={drag as any} className="cursor-grab active:cursor-grabbing text-white/20 hover:text-white/50 transition-colors">
          <GripVertical size={16} />
        </div>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-white">{row.feature_fr}</td>
      <td className="px-4 py-3 text-sm text-white/70">{row.vitrine_fr}</td>
      <td className="px-4 py-3 text-sm text-white/70">{row.ecom_fr}</td>
      <td className="px-4 py-3 text-sm text-white/70">{row.auto_fr}</td>
      <td className="px-4 py-3 text-sm text-white/70">{row.seo_fr}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(row.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Pencil size={12} /> Modifier
          </button>
          <button onClick={() => onDelete(row.id, row.feature_fr)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─── List ─── */
export function AdminComparison() {
  const [comparisons, setComparisons] = useState<DbComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchComparisons = async () => {
    const { data } = await supabase.from("service_comparisons").select("*").order("sort_order", { ascending: true });
    setComparisons(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchComparisons(); }, []);

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Supprimer la ligne "${label}" ?`)) return;
    await supabase.from("service_comparisons").delete().eq("id", id);
    await fetchComparisons();
  };

  const moveRow = useCallback((from: number, to: number) => {
    setComparisons(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleDrop = useCallback(async () => {
    setSaving(true);
    await Promise.all(comparisons.map((c, i) => supabase.from("service_comparisons").update({ sort_order: i + 1 }).eq("id", c.id)));
    setSaving(false);
  }, [comparisons]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Comparatif des services</h1>
            <p className="text-white/40 text-sm mt-1">
              {comparisons.length} ligne{comparisons.length !== 1 ? "s" : ""} dans le tableau
              {saving && <span className="ml-2" style={{ color: "rgba(201,168,76,0.7)" }}>· Sauvegarde…</span>}
            </p>
          </div>
          <button onClick={() => router.push(`/${ADMIN_PATH}/comparison/new`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
            <Plus size={16} />
            Nouvelle ligne
          </button>
        </div>

        {comparisons.length > 1 && (
          <div className="flex items-center gap-2 mb-4 px-1" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            <GripVertical size={12} />
            Glissez les lignes pour réordonner
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-white/40" />
          </div>
        ) : comparisons.length === 0 ? (
          <div className="text-center py-20">
            <Plus size={40} className="mx-auto mb-4 text-white/20" />
            <div className="text-white/50 text-sm">Aucune ligne de comparaison — créez la première !</div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider" style={{ width: 40 }}></th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Caractéristique</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Vitrine</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">E-commerce</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Auto</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">SEO</th>
                  <th className="px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisons.map((row, index) => (
                  <ComparisonRow
                    key={row.id}
                    row={row}
                    index={index}
                    moveRow={moveRow}
                    onDrop={handleDrop}
                    onEdit={(id) => router.push(`/${ADMIN_PATH}/comparison/${id}`)}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

/* ─── Form ─── */
export function AdminComparisonForm() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const isNew = !id || id === "new";

  const [form, setForm] = useState<Partial<DbComparison>>({
    feature_fr: "", feature_en: "", feature_ar: "",
    vitrine_fr: "✅", vitrine_en: "✅", vitrine_ar: "✅",
    ecom_fr: "✅", ecom_en: "✅", ecom_ar: "✅",
    auto_fr: "—", auto_en: "—", auto_ar: "—",
    seo_fr: "—", seo_en: "—", seo_ar: "—",
    sort_order: 99
  });
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBooleanMode, setIsBooleanMode] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      supabase.from("service_comparisons").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm(data);
          const isBool = ["vitrine", "ecom", "auto", "seo"].every(field => 
            (["fr", "en", "ar"] as const).every(lang => {
              const val = data[`${field}_${lang}`];
              return !val || val === "✅" || val === "—";
            })
          );
          setIsBooleanMode(isBool);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const set = (key: keyof DbComparison, val: string | number) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const toggleBoolField = (field: "vitrine" | "ecom" | "auto" | "seo") => {
    const current = form[`${field}_fr`];
    const nextVal = current === "✅" ? "—" : "✅";
    setForm(prev => ({
      ...prev,
      [`${field}_fr`]: nextVal,
      [`${field}_en`]: nextVal,
      [`${field}_ar`]: nextVal,
    }));
  };

  const handleSave = async () => {
    if (!form.feature_fr) { setError("Le nom de la caractéristique en français est requis"); return; }
    setSaving(true);
    setError(null);
    
    const payload = {
      ...form,
      updated_at: new Date().toISOString(),
    };
    
    let err;
    if (isNew) {
      const { data } = await supabase.from("service_comparisons").select("sort_order").order("sort_order", { ascending: false }).limit(1);
      const maxOrder = data?.[0]?.sort_order || 0;
      payload.sort_order = maxOrder + 1;
      
      ({ error: err } = await supabase.from("service_comparisons").insert([payload]));
    } else {
      ({ error: err } = await supabase.from("service_comparisons").update(payload).eq("id", id));
    }
    
    if (err) { setError(err.message); setSaving(false); return; }
    router.push(`/${ADMIN_PATH}/comparison`);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/8 focus:border-white/25";
  const labelCls = "block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest";

  const fieldLabels = {
    vitrine: "Site Vitrine",
    ecom: "E-commerce",
    auto: "Automatisation",
    seo: "SEO"
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-white/40" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push(`/${ADMIN_PATH}/comparison`)} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} /> Comparatif
        </button>
        <span className="text-white/20">/</span>
        <span className="text-white/60 text-sm">{isNew ? "Nouvelle ligne" : form.feature_fr || "Modifier"}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-bold">{isNew ? "Nouvelle ligne de comparaison" : "Modifier la ligne"}</h1>
        <div className="flex items-center gap-3">
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

      <div className="flex justify-end mb-4">
        <button onClick={() => setIsBooleanMode(!isBooleanMode)}
          className="text-xs px-3 py-1.5 rounded-lg border transition-all font-medium"
          style={{ 
            borderColor: isBooleanMode ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.1)",
            color: isBooleanMode ? "#c9a84c" : "rgba(255,255,255,0.5)",
            background: isBooleanMode ? "rgba(201,168,76,0.05)" : "transparent"
          }}>
          {isBooleanMode ? "Mode Oui/Non Actif" : "Activer le Mode Oui/Non"}
        </button>
      </div>

      <div className="space-y-6">
        {isBooleanMode && (
          <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(201,168,76,0.02)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h2 className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-4">Valeurs (Appliqué à toutes les langues)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(["vitrine", "ecom", "auto", "seo"] as const).map(field => (
                <div key={field} onClick={() => toggleBoolField(field)} className="flex flex-col items-center justify-center gap-3 cursor-pointer p-4 rounded-xl transition-all select-none" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <button type="button" className="w-10 h-6 rounded-full transition-all relative flex-shrink-0"
                    style={{ background: form[`${field}_fr`] === "✅" ? "rgba(201,168,76,0.8)" : "rgba(255,255,255,0.1)" }}>
                    <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                      style={{ left: form[`${field}_fr`] === "✅" ? "auto" : 2, right: form[`${field}_fr`] === "✅" ? 2 : "auto" }} />
                  </button>
                  <span className="text-sm font-medium" style={{ color: form[`${field}_fr`] === "✅" ? "#fff" : "rgba(255,255,255,0.4)" }}>
                    {fieldLabels[field]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(["fr", "en", "ar"] as const).map(lang => (
          <div key={lang} className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              {lang === "fr" ? "🇫🇷 Français" : lang === "en" ? "🇬🇧 English" : "🇩🇿 العربية"}
            </h2>
            
            <div className="mb-4">
              <label className={labelCls}>Caractéristique</label>
              <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`feature_${lang}`] || ""} onChange={e => set(`feature_${lang}`, e.target.value)} placeholder={lang === "fr" ? "Ex: Délai de livraison" : ""} />
            </div>
            
            {!isBooleanMode && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Site Vitrine</label>
                  <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`vitrine_${lang}`] || ""} onChange={e => set(`vitrine_${lang}`, e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>E-commerce</label>
                  <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`ecom_${lang}`] || ""} onChange={e => set(`ecom_${lang}`, e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Automatisation</label>
                  <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`auto_${lang}`] || ""} onChange={e => set(`auto_${lang}`, e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>SEO</label>
                  <input className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={form[`seo_${lang}`] || ""} onChange={e => set(`seo_${lang}`, e.target.value)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
