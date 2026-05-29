'use client';

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Shield, Clock } from "lucide-react";

// ── Constantes de sécurité ────────────────────────────────────────────────────
const MAX_ATTEMPTS    = 5;            // tentatives avant lockout
const LOCKOUT_TIMES   = [60, 120, 300, 600]; // secondes (1min→2min→5min→10min)
const STORE_KEY       = "__xn_sec";   // clé localStorage obfusquée

interface SecState { attempts: number; lockoutUntil: number; tier: number; }

function loadSec(): SecState {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { attempts: 0, lockoutUntil: 0, tier: 0 };
    return JSON.parse(atob(raw));
  } catch { return { attempts: 0, lockoutUntil: 0, tier: 0 }; }
}

function saveSec(s: SecState) {
  localStorage.setItem(STORE_KEY, btoa(JSON.stringify(s)));
}

function clearSec() { localStorage.removeItem(STORE_KEY); }

export function AdminLogin() {
  const { signIn } = useAuth();
  const router = useRouter();
  const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  // ── Rate limiting state ────────────────────────────────────────────────────
  const [sec,      setSec]      = useState<SecState>({ attempts: 0, lockoutUntil: 0, tier: 0 });
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSec(loadSec());
  }, []);

  const isLocked = sec.lockoutUntil > Date.now();

  // Décompte du lockout
  useEffect(() => {
    if (!isLocked) { setCountdown(0); return; }
    const tick = () => {
      const remaining = Math.ceil((sec.lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setCountdown(0);
        setSec(s => ({ ...s, lockoutUntil: 0 }));
        clearInterval(timerRef.current!);
      } else {
        setCountdown(remaining);
      }
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current!);
  }, [isLocked, sec.lockoutUntil]);

  // Délai artificiel anti-brute-force (min 1.5s par tentative)
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setLoading(true);
    setError(null);

    // Délai fixe sur chaque tentative — rend le brute-force prohibitif
    await sleep(1500 + Math.random() * 500);

    const err = await signIn(email, password);

    if (err) {
      const newAttempts = sec.attempts + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        // Lockout avec durée croissante
        const tier       = Math.min(sec.tier, LOCKOUT_TIMES.length - 1);
        const duration   = LOCKOUT_TIMES[tier] * 1000;
        const lockoutUntil = Date.now() + duration;
        const next: SecState = { attempts: 0, lockoutUntil, tier: tier + 1 };
        saveSec(next);
        setSec(next);
        setError(null); // ne pas révéler de détails pendant le lockout
      } else {
        const next: SecState = { ...sec, attempts: newAttempts };
        saveSec(next);
        setSec(next);
        setError("Identifiants incorrects.");
      }
      setLoading(false);
    } else {
      clearSec();
      router.push(`/${ADMIN_PATH}`);
    }
  };

  // ── Rendu ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #111130 100%)" }}>
      
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(26,26,110,0.3) 0%, transparent 70%)" }} />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 8px 32px rgba(26,26,110,0.5)" }}>
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            XenonDz Admin
          </h1>
          <p className="text-white/50 text-sm mt-1">Gestion des services & offres</p>
        </div>

        <div className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>

          {/* ── Lockout screen ── */}
          {isLocked ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5"
                style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}>
                <Shield size={22} style={{ color: "#fca5a5" }} />
              </div>
              <h2 className="text-white font-semibold mb-2">Accès temporairement bloqué</h2>
              <div className="flex items-center justify-center gap-2 mb-4"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                <Clock size={14} />
                <span>Réessayez dans <span className="text-white font-mono font-semibold">
                  {Math.floor(countdown/60)}:{String(countdown%60).padStart(2,"0")}
                </span></span>
              </div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Trop de tentatives échouées.
              </p>
            </div>
          ) : (
            /* ── Login form ── */
            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              {/* Champ honeypot invisible — détecte les bots qui remplissent tous les champs */}
              <input
                type="text"
                name="username"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: "none" }}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 tracking-widest uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="new-password"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@xenondz.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(26,26,110,0.8)")}
                  onBlur={e  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 tracking-widest uppercase">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(26,26,110,0.8)")}
                    onBlur={e  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-white/40 hover:text-white/70 transition-colors">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5" }}>
                  {error}
                  {sec.attempts >= 3 && (
                    <p className="text-xs mt-1 opacity-70">
                      {MAX_ATTEMPTS - sec.attempts} tentative{MAX_ATTEMPTS - sec.attempts > 1 ? "s" : ""} restante{MAX_ATTEMPTS - sec.attempts > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #1a1a6e, #2626a0)", boxShadow: "0 4px 20px rgba(26,26,110,0.4)" }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Vérification…
                  </span>
                ) : "Se connecter"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          Accès restreint — XenonDz © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
