import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient";
import {
  Plus, Pencil, Trash2, Loader2, Save, ArrowLeft,
  GripVertical, ExternalLink, Globe, Star, X, Upload, Eye, EyeOff,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "REALISATION_ROW";

/* ─── Types ─── */
export type SoftwareVersion = {
  version: string;
  os: "Windows" | "macOS" | "Linux" | string;
  file_url: string;
};

export type DbRealisation = {
  id: string;
  title: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  url: string;
  preview_url: string;
  tags: string[];
  client_name: string;
  featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  category: "Standard" | "Software";
  software_versions: SoftwareVersion[];
  gallery: string[];
};

type FormState = {
  title: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  url: string;
  preview_url: string;
  tags: string;
  client_name: string;
  featured: boolean;
  is_active: boolean;
  category: "Standard" | "Software";
  software_versions: SoftwareVersion[];
  gallery: string[];
};

const emptyForm: FormState = {
  title: "",
  description_fr: "",
  description_en: "",
  description_ar: "",
  url: "",
  preview_url: "",
  tags: "",
  client_name: "",
  featured: false,
  is_active: true,
  category: "Standard",
  software_versions: [],
  gallery: [],
};

/* ─── Screenshot preview helper ─── */
function PreviewImage({ url, preview_url, size = "sm" }: { url: string; preview_url?: string; size?: "sm" | "lg" }) {
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");
  const dim = size === "sm" ? { w: 80, h: 50 } : { w: 300, h: 188 };

  const src = preview_url && preview_url.trim()
  ? preview_url
  : url
    ? `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&waitForTimeout=3000`
    : null;
    
  if (!src) return (
    <div className="flex items-center justify-center rounded-lg"
      style={{ width: dim.w, height: dim.h, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <Globe size={size === "sm" ? 16 : 28} style={{ color: "rgba(255,255,255,0.15)" }} />
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-lg flex-shrink-0"
      style={{ width: dim.w, height: dim.h, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={size === "sm" ? 12 : 20} className="animate-spin" style={{ color: "rgba(255,255,255,0.2)" }} />
        </div>
      )}
      <img
        src={src}
        alt={url}
        className="w-full h-full object-cover object-top"
        style={{ display: status === "err" ? "none" : "block" }}
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("err")}
      />
      {status === "err" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe size={size === "sm" ? 16 : 24} style={{ color: "rgba(255,255,255,0.15)" }} />
        </div>
      )}
    </div>
  );
}

/* ─── Draggable Row ─── */
interface RowProps {
  item: DbRealisation;
  index: number;
  moveRow: (from: number, to: number) => void;
  onDrop: () => void;
  onEdit: (item: DbRealisation) => void;
  onDelete: (id: string, title: string) => void;
  onToggle: (id: string, current: boolean) => void;
  deleting: string | null;
}

function RealisationRow({ item, index, moveRow, onDrop, onEdit, onDelete, onToggle, deleting }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<{ index: number }, void, { handlerId: string | symbol | null }>({
    accept: ITEM_TYPE,
    collect: m => ({ handlerId: m.getHandlerId() }),
    hover(dragItem, monitor) {
      if (!ref.current) return;
      const from = dragItem.index, to = index;
      if (from === to) return;
      const rect = ref.current.getBoundingClientRect();
      const mid = (rect.bottom - rect.top) / 2;
      const client = monitor.getClientOffset();
      if (!client) return;
      const y = client.y - rect.top;
      if (from < to && y < mid) return;
      if (from > to && y > mid) return;
      moveRow(from, to);
      dragItem.index = to;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => ({ id: item.id, index }),
    collect: m => ({ isDragging: m.isDragging() }),
    end: () => onDrop(),
  });

  preview(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId}
      className="flex items-center gap-4 rounded-2xl px-5 py-4 select-none"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${isDragging ? "rgba(26,26,110,0.6)" : "rgba(255,255,255,0.06)"}`,
        opacity: isDragging ? 0.45 : 1,
        transition: isDragging ? "none" : "border-color 0.15s ease",
      }}>

      <div ref={drag as any} className="cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
        style={{ color: "rgba(255,255,255,0.2)" }}>
        <GripVertical size={16} />
      </div>

      {/* Screenshot preview */}
      <PreviewImage url={item.url} preview_url={item.preview_url} size="sm" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{item.title}</span>
          {item.featured && (
            <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}>
              <Star size={9} /> Vedette
            </span>
          )}
          {!item.is_active && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
              Inactif
            </span>
          )}
        </div>
        {item.client_name && (
          <div className="text-white/40 text-xs mt-0.5">{item.client_name}</div>
        )}
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            className="text-white/25 text-xs hover:text-white/50 transition-colors flex items-center gap-1 mt-0.5">
            <ExternalLink size={9} />{item.url.replace(/^https?:\/\//, "").split("/")[0]}
          </a>
        )}
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(26,26,110,0.2)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(26,26,110,0.3)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => onToggle(item.id, item.is_active)}
          className="w-10 h-6 rounded-full transition-all relative"
          style={{ background: item.is_active ? "rgba(26,26,110,0.7)" : "rgba(255,255,255,0.1)" }}>
          <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
            style={{ left: item.is_active ? "auto" : 2, right: item.is_active ? 2 : "auto" }} />
        </button>

        <button onClick={() => onEdit(item)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Pencil size={12} /> Modifier
        </button>

        <button onClick={() => onDelete(item.id, item.title)} disabled={deleting === item.id}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
          {deleting === item.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}

/* ─── Form ─── */
function RealisationForm({ initial, onSave, onCancel }: {
  initial: FormState & { id?: string };
  onSave: (data: FormState & { id?: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<"fr" | "en" | "ar">("fr");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormState, v: FormState[keyof FormState]) => setForm(p => ({ ...p, [k]: v }));

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Fichier invalide — images uniquement (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Fichier trop lourd — 5 Mo maximum");
      return;
    }
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `previews/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("realisations-previews").upload(path, file, { upsert: true });
    if (error) {
      setUploadError("Erreur d'upload. Vérifie que le bucket 'realisations-previews' existe dans Supabase Storage.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("realisations-previews").getPublicUrl(path);
    set("preview_url", data.publicUrl);
    setUploading(false);
  };

  const uploadGalleryFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Fichier invalide — images uniquement");
      return;
    }
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("realisations-previews").upload(path, file, { upsert: true });
    if (error) {
      setUploadError("Erreur d'upload.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("realisations-previews").getPublicUrl(path);
    set("gallery", [...(form.gallery || []), data.publicUrl]);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleSave = async () => {
    if (!form.title) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/8 focus:border-white/25";
  const labelCls = "block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest";

  // Live URL for preview
  const previewSrc = form.preview_url?.trim()
  ? form.preview_url
  : form.url?.trim()
    ? `https://api.microlink.io/?url=${encodeURIComponent(form.url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&waitForTimeout=3000`
    : null;

  return (
    <div className="max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} /> Réalisations
        </button>
        <span className="text-white/20">/</span>
        <span className="text-white/60 text-sm">{initial.id ? form.title || "Modifier" : "Nouvelle réalisation"}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-bold">{initial.id ? "Modifier la réalisation" : "Nouvelle réalisation"}</h1>
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
          <button onClick={handleSave} disabled={saving || !form.title}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 16px rgba(26,26,110,0.4)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Infos générales */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Informations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Titre *</label>
              <input className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Mon super projet" />
            </div>
            <div>
              <label className={labelCls}>Client (optionnel)</label>
              <input className={inputCls} value={form.client_name} onChange={e => set("client_name", e.target.value)} placeholder="Entreprise XYZ" />
            </div>
          </div>

          <div>
            <label className={labelCls}>URL du site</label>
            <input className={inputCls} value={form.url} onChange={e => set("url", e.target.value)} placeholder="https://exemple.com" />
          </div>

          <div>
            <label className={labelCls}>Tags (séparés par des virgules)</label>
            <input className={inputCls} value={form.tags} onChange={e => set("tags", e.target.value)}
              placeholder="E-commerce, React, Tailwind CSS" />
            <p className="text-white/25 text-xs mt-1.5">Ex: E-commerce, WordPress, React, SEO, Landing Page…</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Catégorie</label>
              <select className={inputCls} value={form.category} onChange={e => set("category", e.target.value as "Standard" | "Software")}>
                <option value="Standard" className="bg-[#1a1a2e]">Projet Standard</option>
                <option value="Software" className="bg-[#1a1a2e]">Logiciel (Téléchargeable)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <button onClick={() => set("featured", !form.featured)}
                className="w-10 h-6 rounded-full transition-all relative"
                style={{ background: form.featured ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.1)" }}>
                <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                  style={{ left: form.featured ? "auto" : 2, right: form.featured ? 2 : "auto" }} />
              </button>
              <span className="text-white/50 text-sm flex items-center gap-1.5">
                <Star size={13} style={{ color: form.featured ? "#c9a84c" : "rgba(255,255,255,0.3)" }} />
                Mettre en vedette
              </span>
            </label>
          </div>
        </div>

        {form.category === "Software" && (
          <div className="rounded-2xl p-6 space-y-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Versions du Logiciel</h2>
            
            {form.software_versions?.map((ver, idx) => (
              <div key={idx} className="flex flex-wrap items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <input className={`${inputCls} flex-1 min-w-[120px]`} placeholder="Version (ex: v1.0)" value={ver.version} onChange={e => {
                  const n = [...(form.software_versions || [])]; n[idx].version = e.target.value; set("software_versions", n);
                }} />
                <select className={`${inputCls} flex-1 min-w-[120px]`} value={ver.os} onChange={e => {
                  const n = [...(form.software_versions || [])]; n[idx].os = e.target.value; set("software_versions", n);
                }}>
                  <option value="Windows" className="bg-[#1a1a2e]">Windows</option>
                  <option value="macOS" className="bg-[#1a1a2e]">macOS</option>
                  <option value="Linux" className="bg-[#1a1a2e]">Linux</option>
                </select>
                <input className={`${inputCls} flex-[2] min-w-[200px]`} placeholder="URL de téléchargement" value={ver.file_url} onChange={e => {
                  const n = [...(form.software_versions || [])]; n[idx].file_url = e.target.value; set("software_versions", n);
                }} />
                <button type="button" onClick={() => {
                  const n = form.software_versions.filter((_, i) => i !== idx); set("software_versions", n);
                }} className="p-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            <button type="button" onClick={() => set("software_versions", [...(form.software_versions || []), { version: "", os: "Windows", file_url: "" }])}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.15)" }}>
              <Plus size={14} /> Ajouter une version
            </button>
          </div>
        )}

        {/* Screenshot preview */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Aperçu / Screenshot</h2>
            {previewSrc && (
              <button onClick={() => setShowPreview(p => !p)}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
                {showPreview ? <EyeOff size={12} /> : <Eye size={12} />}
                {showPreview ? "Masquer" : "Voir l'aperçu"}
              </button>
            )}
          </div>

          {/* Auto-screenshot info */}
          {!form.preview_url && form.url && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{ background: "rgba(26,26,110,0.15)", border: "1px solid rgba(26,26,110,0.3)", color: "rgba(255,255,255,0.5)" }}>
              <Globe size={12} />
              Screenshot automatique depuis <strong style={{ color: "rgba(255,255,255,0.7)" }}>{form.url}</strong>
            </div>
          )}

          {/* Preview */}
          {showPreview && previewSrc && (
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Browser bar mockup */}
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(220,38,38,0.5)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(251,191,36,0.5)" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "rgba(34,197,94,0.5)" }} />
                </div>
                <div className="flex-1 px-3 py-1 rounded-md text-xs text-white/30 truncate"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  {form.url || "https://..."}
                </div>
              </div>
              <div style={{ height: 200, overflow: "hidden", background: "#f1f5f9" }}>
                <img src={previewSrc} alt="Preview" className="w-full h-full object-cover object-top"
                  style={{ display: "block" }} />
              </div>
            </div>
          )}

          {/* Upload custom screenshot */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-widest">Screenshot personnalisé (optionnel)</label>
            <div
              onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-xl transition-all duration-200"
              style={{
                border: `2px dashed ${isDragOver ? "rgba(201,168,76,0.7)" : "rgba(255,255,255,0.12)"}`,
                background: isDragOver ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)",
                padding: "1.25rem",
              }}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} className="hidden" />

              {form.preview_url ? (
                <div className="flex items-center gap-4">
                  <img src={form.preview_url} alt="preview" className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs">Screenshot personnalisé</p>
                    <p className="text-white/25 text-xs mt-0.5 truncate">{form.preview_url.split("/").pop()}</p>
                    <p className="text-white/30 text-xs mt-1">Glissez ou cliquez pour changer</p>
                  </div>
                  <button type="button" onClick={e => { e.stopPropagation(); set("preview_url", ""); }}
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-red-500/20 transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    <X size={14} />
                  </button>
                </div>
              ) : uploading ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 size={22} className="animate-spin" style={{ color: "rgba(201,168,76,0.7)" }} />
                  <span className="text-white/40 text-xs">Upload en cours…</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <Upload size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <p className="text-white/50 text-sm font-medium">
                    {isDragOver ? "Déposez l'image ici" : "Glissez un screenshot ou cliquez"}
                  </p>
                  <p className="text-white/25 text-xs">JPG, PNG, WebP — 5 Mo max</p>
                </div>
              )}
            </div>

            {uploadError && (
              <p className="mt-2 text-xs px-3 py-2 rounded-lg"
                style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5" }}>
                {uploadError}
              </p>
            )}

            {/* URL manuelle */}
            <div className="mt-3">
              <label className="block text-xs text-white/25 mb-1.5">Ou coller une URL directement</label>
              <input className={inputCls} value={form.preview_url} onChange={e => set("preview_url", e.target.value)} placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Galerie (Screenshots supplémentaires)</h2>
          
          {form.gallery && form.gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {form.gallery.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden" style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => set("gallery", form.gallery.filter((_, i) => i !== idx))}
                      className="w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-widest">Ajouter une image à la galerie</label>
            <div
              onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={e => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadGalleryFile(f); }}
              className="relative cursor-pointer rounded-xl transition-all duration-200"
              style={{
                border: `2px dashed rgba(255,255,255,0.12)`,
                background: "rgba(255,255,255,0.02)",
                padding: "1rem",
              }}>
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadGalleryFile(f); e.target.value = ''; }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex items-center justify-center gap-2">
                <Upload size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                <span className="text-white/50 text-sm">Glissez ou cliquez pour ajouter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu multilingue */}
        <div className="flex gap-2">
          {(["fr", "en", "ar"] as const).map(l => (
            <button key={l} onClick={() => setActiveLang(l)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={activeLang === l
                ? { background: "rgba(26,26,110,0.6)", border: "1px solid rgba(26,26,110,0.8)", color: "#fff" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
              {l === "fr" ? "🇫🇷 Français" : l === "en" ? "🇬🇧 English" : "🇩🇿 العربية"}
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
            Description — {activeLang === "fr" ? "Français" : activeLang === "en" ? "English" : "العربية"}
          </h2>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`description_${activeLang}` as keyof FormState] as string}
              onChange={e => set(`description_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={
                activeLang === "fr" ? "Décrivez ce projet en quelques mots…"
                  : activeLang === "en" ? "Describe this project in a few words…"
                    : "اوصف هذا المشروع ببضع كلمات…"
              } />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export function AdminRealisations() {
  const [items, setItems] = useState<DbRealisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<(FormState & { id?: string }) | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from("realisations").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const moveRow = useCallback((from: number, to: number) => {
    setItems(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleDrop = useCallback(async () => {
    setSaving(true);
    await Promise.all(items.map((m, i) => supabase.from("realisations").update({ sort_order: i }).eq("id", m.id)));
    setSaving(false);
  }, [items]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ?`)) return;
    setDeleting(id);
    await supabase.from("realisations").delete().eq("id", id);
    await fetchItems();
    setDeleting(null);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("realisations").update({ is_active: !current }).eq("id", id);
    setItems(prev => prev.map(m => m.id === id ? { ...m, is_active: !current } : m));
  };

  const handleSave = async (data: FormState & { id?: string }) => {
    const tagsArr = data.tags
      ? data.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: data.title,
      description_fr: data.description_fr,
      description_en: data.description_en,
      description_ar: data.description_ar,
      url: data.url,
      preview_url: data.preview_url,
      tags: tagsArr,
      client_name: data.client_name,
      featured: data.featured,
      is_active: data.is_active,
      category: data.category,
      software_versions: data.software_versions,
      gallery: data.gallery,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      await supabase.from("realisations").update(payload).eq("id", data.id);
    } else {
      await supabase.from("realisations").insert([{ ...payload, sort_order: items.length }]);
    }
    setEditing(null);
    await fetchItems();
  };

  if (editing) {
    return (
      <RealisationForm
        initial={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Réalisations</h1>
            <p className="text-white/40 text-sm mt-1">
              {items.length} projet{items.length !== 1 ? "s" : ""}
              {saving && <span className="ml-2" style={{ color: "rgba(201,168,76,0.7)" }}>· Sauvegarde…</span>}
            </p>
          </div>
          <button
            onClick={() => setEditing({ ...emptyForm })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
            <Plus size={16} /> Nouveau projet
          </button>
        </div>

        {items.length > 1 && (
          <div className="flex items-center gap-2 mb-4 px-1" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            <GripVertical size={12} />
            Glissez pour réordonner
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-white/40" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <Globe size={40} className="mx-auto mb-4 text-white/20" />
            <div className="text-white/50 text-sm">Aucune réalisation — ajoutez votre premier projet !</div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <RealisationRow
                key={item.id}
                item={item}
                index={i}
                moveRow={moveRow}
                onDrop={handleDrop}
                onEdit={r => setEditing({
                  ...r,
                  tags: r.tags?.join(", ") || "",
                  category: r.category || "Standard",
                  software_versions: r.software_versions || [],
                  gallery: r.gallery || [],
                })}
                onDelete={handleDelete}
                onToggle={toggleActive}
                deleting={deleting}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}
