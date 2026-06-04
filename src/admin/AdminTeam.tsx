import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { Plus, Pencil, Trash2, Loader2, Save, ArrowLeft, GripVertical, Github, Linkedin, Instagram, User, Upload, X } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "TEAM_ROW";

export type DbTeamMember = {
  id: string;
  name: string;
  role_fr: string; role_en: string; role_ar: string;
  bio_fr: string; bio_en: string; bio_ar: string;
  avatar_url: string;
  github: string;
  linkedin: string;
  instagram: string;
  skills: string[];
  location: string;
  sort_order: number;
  is_active: boolean;
};

type FormState = {
  name: string;
  role_fr: string; role_en: string; role_ar: string;
  bio_fr: string; bio_en: string; bio_ar: string;
  avatar_url: string;
  github: string;
  linkedin: string;
  instagram: string;
  skills: string;
  location: string;
  is_active: boolean;
};

const emptyForm: FormState = {
  name: "",
  role_fr: "", role_en: "", role_ar: "",
  bio_fr: "", bio_en: "", bio_ar: "",
  avatar_url: "",
  github: "", linkedin: "", instagram: "",
  skills: "",
  location: "Béjaïa",
  is_active: true,
};

/* ─── Draggable row ─── */
interface RowProps {
  member: DbTeamMember;
  index: number;
  moveRow: (from: number, to: number) => void;
  onDrop: () => void;
  onEdit: (member: DbTeamMember) => void;
  onDelete: (id: string, name: string) => void;
  onToggle: (id: string, current: boolean) => void;
  deleting: string | null;
}

function TeamRow({ member, index, moveRow, onDrop, onEdit, onDelete, onToggle, deleting }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<{ index: number }, void, { handlerId: string | symbol | null }>({
    accept: ITEM_TYPE,
    collect: m => ({ handlerId: m.getHandlerId() }),
    hover(item, monitor) {
      if (!ref.current) return;
      const from = item.index, to = index;
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
    item: () => ({ id: member.id, index }),
    collect: m => ({ isDragging: m.isDragging() }),
    end: () => onDrop(),
  });

  preview(drop(ref));

  const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

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

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.4), rgba(201,168,76,0.2))" }}>
        {member.avatar_url ? (
          <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-xs font-bold">{initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{member.name}</span>
          {!member.is_active && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
              Inactif
            </span>
          )}
        </div>
        <div className="text-white/40 text-xs mt-0.5">{member.role_fr || "—"}</div>
        <div className="flex items-center gap-3 mt-1">
          {member.github && <Github size={11} style={{ color: "rgba(255,255,255,0.25)" }} />}
          {member.linkedin && <Linkedin size={11} style={{ color: "rgba(255,255,255,0.25)" }} />}
          {member.instagram && <Instagram size={11} style={{ color: "rgba(255,255,255,0.25)" }} />}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => onToggle(member.id, member.is_active)}
          className="w-10 h-6 rounded-full transition-all relative"
          style={{ background: member.is_active ? "rgba(26,26,110,0.7)" : "rgba(255,255,255,0.1)" }}>
          <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
            style={{ left: member.is_active ? "auto" : 2, right: member.is_active ? 2 : "auto" }} />
        </button>

        <button onClick={() => onEdit(member)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Pencil size={12} /> Modifier
        </button>

        <button onClick={() => onDelete(member.id, member.name)} disabled={deleting === member.id}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
          {deleting === member.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}

/* ─── Form ─── */
function MemberForm({ initial, onSave, onCancel }: {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormState, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

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
    const path = `avatars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("team-avatars").upload(path, file, { upsert: true });
    if (error) {
      setUploadError("Erreur d'upload. Vérifie que le bucket 'team-avatars' existe dans Supabase Storage.");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("team-avatars").getPublicUrl(path);
    set("avatar_url", data.publicUrl);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none transition-all bg-white/5 border border-white/8 focus:border-white/25";
  const labelCls = "block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
          <ArrowLeft size={16} /> Équipe
        </button>
        <span className="text-white/20">/</span>
        <span className="text-white/60 text-sm">{initial.id ? form.name || "Modifier" : "Nouveau membre"}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-bold">{initial.id ? "Modifier le membre" : "Nouveau membre"}</h1>
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
          <button onClick={handleSave} disabled={saving || !form.name}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 16px rgba(26,26,110,0.4)" }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Identité */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Identité</h2>
          <div>
            <label className={labelCls}>Nom complet *</label>
            <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Prénom Nom" />
          </div>
          <div>
            <label className={labelCls}>Photo de profil</label>

            {/* Drop zone */}
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {form.avatar_url ? (
                /* Preview when image is set */
                <div className="flex items-center gap-4">
                  <img
                    src={form.avatar_url}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-xs">Photo sélectionnée</p>
                    <p className="text-white/25 text-xs mt-0.5 truncate">{form.avatar_url.split("/").pop()}</p>
                    <p className="text-white/30 text-xs mt-1">Glissez une nouvelle image ou cliquez pour changer</p>
                  </div>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); set("avatar_url", ""); }}
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-red-500/20"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    <X size={14} />
                  </button>
                </div>
              ) : uploading ? (
                /* Upload in progress */
                <div className="flex flex-col items-center gap-2 py-2">
                  <Loader2 size={22} className="animate-spin" style={{ color: "rgba(201,168,76,0.7)" }} />
                  <span className="text-white/40 text-xs">Upload en cours…</span>
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <Upload size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <p className="text-white/50 text-sm font-medium">
                    {isDragOver ? "Déposez l'image ici" : "Glissez une photo ou cliquez"}
                  </p>
                  <p className="text-white/25 text-xs">JPG, PNG, WebP — 5 Mo max</p>
                </div>
              )}
            </div>

            {/* Error */}
            {uploadError && (
              <p className="mt-2 text-xs px-3 py-2 rounded-lg"
                style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5" }}>
                {uploadError}
              </p>
            )}

            {/* Manual URL fallback */}
            <div className="mt-3">
              <label className="block text-xs text-white/25 mb-1.5">Ou coller une URL directement</label>
              <input
                className={inputCls}
                value={form.avatar_url}
                onChange={e => set("avatar_url", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Localisation & Compétences */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Profil public</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Ville / Localisation</label>
              <input className={inputCls} value={form.location} onChange={e => set("location", e.target.value)}
                placeholder="Béjaïa" />
            </div>
            <div>
              <label className={labelCls}>Compétences (séparées par virgule)</label>
              <input className={inputCls} value={form.skills} onChange={e => set("skills", e.target.value)}
                placeholder="Création de Sites, Automatisation, IA" />
              <p className="text-white/25 text-xs mt-1">Ex: Design UI/UX, Ergonomie, Sécurité Web</p>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest">Réseaux sociaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}><Github size={10} className="inline mr-1" />GitHub</label>
              <input className={inputCls} value={form.github} onChange={e => set("github", e.target.value)}
                placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelCls}><Linkedin size={10} className="inline mr-1" />LinkedIn</label>
              <input className={inputCls} value={form.linkedin} onChange={e => set("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className={labelCls}><Instagram size={10} className="inline mr-1" />Instagram</label>
              <input className={inputCls} value={form.instagram} onChange={e => set("instagram", e.target.value)}
                placeholder="https://instagram.com/..." />
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
            Contenu — {activeLang === "fr" ? "Français" : activeLang === "en" ? "English" : "العربية"}
          </h2>
          <div>
            <label className={labelCls}>Rôle / Titre</label>
            <input className={inputCls} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`role_${activeLang}`]}
              onChange={e => set(`role_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={activeLang === "fr" ? "CEO & Fondateur" : activeLang === "en" ? "CEO & Founder" : "المدير التنفيذي"} />
          </div>
          <div>
            <label className={labelCls}>Bio</label>
            <textarea className={`${inputCls} resize-none`} rows={3} dir={activeLang === "ar" ? "rtl" : "ltr"}
              value={form[`bio_${activeLang}`]}
              onChange={e => set(`bio_${activeLang}` as keyof FormState, e.target.value)}
              placeholder={activeLang === "fr" ? "Quelques mots sur ce membre…" : activeLang === "en" ? "A few words about this member…" : "بضع كلمات عن هذا العضو…"} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export function AdminTeam() {
  const [members, setMembers] = useState<DbTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editing, setEditing] = useState<(FormState & { id?: string }) | null>(null);

  const fetchMembers = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const moveRow = useCallback((from: number, to: number) => {
    setMembers(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleDrop = useCallback(async () => {
    setSaving(true);
    await Promise.all(members.map((m, i) => supabase.from("team_members").update({ sort_order: i }).eq("id", m.id)));
    setSaving(false);
  }, [members]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    setDeleting(id);
    await supabase.from("team_members").delete().eq("id", id);
    await fetchMembers();
    setDeleting(null);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("team_members").update({ is_active: !current }).eq("id", id);
    setMembers(prev => prev.map(m => m.id === id ? { ...m, is_active: !current } : m));
  };

  const handleSave = async (data: FormState & { id?: string }) => {
    const payload = {
      name: data.name,
      role_fr: data.role_fr, role_en: data.role_en, role_ar: data.role_ar,
      bio_fr: data.bio_fr, bio_en: data.bio_en, bio_ar: data.bio_ar,
      avatar_url: data.avatar_url,
      github: data.github, linkedin: data.linkedin, instagram: data.instagram,
      skills: data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
      location: data.location || "Algérie",
      is_active: data.is_active,
      updated_at: new Date().toISOString(),
    };
    if (data.id) {
      await supabase.from("team_members").update(payload).eq("id", data.id);
    } else {
      await supabase.from("team_members").insert([{ ...payload, sort_order: members.length }]);
    }
    setEditing(null);
    await fetchMembers();
  };

  if (editing) {
    return (
      <MemberForm
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
            <h1 className="text-white text-2xl font-bold tracking-tight">Équipe</h1>
            <p className="text-white/40 text-sm mt-1">
              {members.length} membre{members.length !== 1 ? "s" : ""}
              {saving && <span className="ml-2" style={{ color: "rgba(201,168,76,0.7)" }}>· Sauvegarde…</span>}
            </p>
          </div>
          <button
            onClick={() => setEditing({ ...emptyForm })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", boxShadow: "0 4px 16px rgba(201,168,76,0.3)" }}>
            <Plus size={16} /> Nouveau membre
          </button>
        </div>

        {members.length > 1 && (
          <div className="flex items-center gap-2 mb-4 px-1" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            <GripVertical size={12} />
            Glissez pour réordonner
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-white/40" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-20">
            <User size={40} className="mx-auto mb-4 text-white/20" />
            <div className="text-white/50 text-sm">Aucun membre — ajoutez le premier !</div>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map((m, i) => (
              <TeamRow
                key={m.id}
                member={m}
                index={i}
                moveRow={moveRow}
                onDrop={handleDrop}
                onEdit={mem => setEditing({ ...mem, skills: Array.isArray(mem.skills) ? mem.skills.join(", ") : (mem.skills || "") })}
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
