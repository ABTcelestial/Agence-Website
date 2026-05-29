import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { supabase, type DbService } from "./supabaseClient";
import { Plus, Pencil, Trash2, Zap, GripVertical, Loader2 } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH as string ?? "xn-ctrl-8z";
const ITEM_TYPE = "SERVICE_ROW";

interface RowProps {
  svc: DbService;
  index: number;
  moveRow: (from: number, to: number) => void;
  onDrop: () => void;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string, title: string) => void;
  deleting: string | null;
}

function ServiceRow({ svc, index, moveRow, onDrop, onToggle, onDelete, deleting }: RowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<{ index: number }, void, { handlerId: string | symbol | null }>({
    accept: ITEM_TYPE,
    collect: monitor => ({ handlerId: monitor.getHandlerId() }),
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => ({ id: svc.id, index }),
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    end: () => onDrop(),
  });

  preview(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="flex items-center gap-4 rounded-2xl px-5 py-4 select-none"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${isDragging ? "rgba(26,26,110,0.6)" : "rgba(255,255,255,0.06)"}`,
        opacity: isDragging ? 0.45 : 1,
        transform: isDragging ? "scale(1.01)" : "scale(1)",
        boxShadow: isDragging ? "0 8px 32px rgba(26,26,110,0.3)" : "none",
        transition: isDragging ? "none" : "border-color 0.15s ease, box-shadow 0.15s ease",
      }}>

      <div ref={drag as any} className="cursor-grab active:cursor-grabbing flex-shrink-0 p-1 -ml-1 touch-none"
        style={{ color: "rgba(255,255,255,0.2)" }}>
        <GripVertical size={16} />
      </div>

      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: "rgba(26,26,110,0.3)", border: "1px solid rgba(26,26,110,0.4)" }}>
        {svc.icon || "⚡"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">{svc.title_fr}</span>
          <span className="text-xs px-2 py-0.5 rounded-full text-white/50"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {svc.slug}
          </span>
          {!svc.is_active && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
              Inactif
            </span>
          )}
        </div>
        <div className="text-white/40 text-xs mt-0.5 truncate">{svc.description_fr}</div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
            {svc.base_price === 0 ? "Sur devis" : svc.base_price.toLocaleString("fr-DZ") + " DA"}
          </span>
          <span className="text-xs text-white/30">{svc.duration_fr}</span>
          {svc.addon_ids && svc.addon_ids.length > 0 && (
            <span className="text-xs text-white/30">{svc.addon_ids.length} option{svc.addon_ids.length > 1 ? "s" : ""}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggle(svc.id, svc.is_active)}
          className="w-10 h-6 rounded-full transition-all flex-shrink-0 relative"
          style={{ background: svc.is_active ? "rgba(26,26,110,0.7)" : "rgba(255,255,255,0.1)" }}
          title={svc.is_active ? "Désactiver" : "Activer"}>
          <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
            style={{ left: svc.is_active ? "auto" : 2, right: svc.is_active ? 2 : "auto" }} />
        </button>

        <Link href={`/${ADMIN_PATH}/services/${svc.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Pencil size={12} /> Modifier
        </Link>

        <button
          onClick={() => onDelete(svc.id, svc.title_fr)}
          disabled={deleting === svc.id}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
          style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5" }}>
          {deleting === svc.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}

export function AdminServices() {
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const moveRow = useCallback((from: number, to: number) => {
    setServices(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleDrop = useCallback(async () => {
    setSaving(true);
    await Promise.all(
      services.map((svc, i) => supabase.from("services").update({ sort_order: i }).eq("id", svc.id))
    );
    setSaving(false);
  }, [services]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ?`)) return;
    setDeleting(id);
    await supabase.from("services").delete().eq("id", id);
    await fetchServices();
    setDeleting(null);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("services").update({ is_active: !current }).eq("id", id);
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !current } : s));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Services</h1>
            <p className="text-white/40 text-sm mt-1">
              {services.length} service{services.length !== 1 ? "s" : ""} configuré{services.length !== 1 ? "s" : ""}
              {saving && <span className="ml-2" style={{ color: "rgba(201,168,76,0.7)" }}>· Sauvegarde…</span>}
            </p>
          </div>
          <Link href={`/${ADMIN_PATH}/services/new`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 16px rgba(26,26,110,0.4)" }}>
            <Plus size={16} /> Nouveau service
          </Link>
        </div>

        {services.length > 1 && (
          <div className="flex items-center gap-2 mb-4 px-1" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            <GripVertical size={12} />
            Glissez pour réordonner — ordre sauvegardé automatiquement
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <Zap size={40} className="mx-auto mb-4 text-white/20" />
            <div className="text-white/50 text-sm">Aucun service — créez le premier !</div>
            <Link href={`/${ADMIN_PATH}/services/new`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm text-white"
              style={{ background: "rgba(26,26,110,0.4)", border: "1px solid rgba(26,26,110,0.6)" }}>
              <Plus size={14} /> Nouveau service
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((svc, index) => (
              <ServiceRow
                key={svc.id}
                svc={svc}
                index={index}
                moveRow={moveRow}
                onDrop={handleDrop}
                onToggle={toggleActive}
                onDelete={handleDelete}
                deleting={deleting}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}
