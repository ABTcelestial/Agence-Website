"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  ExternalLink, 
  Plus, 
  History, 
  Trash2,
  CheckCircle2,
  User,
  Bot
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- UTILS ---
const normalize = (s: string) => 
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const PERSISTENCE_KEY = "xenon_bot_history";

// --- COMPONENT ---
export default function AgencyChatbot() {
  const pathname = usePathname();
  const { t, lang, dir } = useLanguage();
  const c = t.chatbot;
  
  const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH ?? "xn-ctrl-8z";
  const isAdmin = pathname.startsWith(`/${ADMIN_PATH}`) || pathname.startsWith("/admin");

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string; timestamp: number }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history
  useEffect(() => {
    if (isAdmin) return;
    const saved = localStorage.getItem(PERSISTENCE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([{ role: "assistant", content: c.welcome, timestamp: Date.now() }]);
        }
      } catch (e) {
        setMessages([{ role: "assistant", content: c.welcome, timestamp: Date.now() }]);
      }
    } else {
      setMessages([{ role: "assistant", content: c.welcome, timestamp: Date.now() }]);
    }

    const timer = setTimeout(() => setShowGreeting(true), 8000);
    return () => clearTimeout(timer);
  }, [isAdmin, c.welcome]);

  if (isAdmin) return null;

  // Persist history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input
  useEffect(() => {
    if (open) {
      setShowGreeting(false);
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [open]);

  // Matching Logic (Weighted)
  const getReply = (text: string) => {
    const lowerInput = normalize(text);
    const words = lowerInput.split(/\s+/);
    let bestMatch: { answer: string; score: number } = { answer: c.fallback, score: 0 };

    for (const entry of c.kb) {
      let currentScore = 0;
      for (const key of entry.keys) {
        const normKey = normalize(key);
        // Direct match
        if (lowerInput.includes(normKey)) currentScore += 10;
        // Word match
        if (words.includes(normKey)) currentScore += 5;
      }

      if (currentScore > bestMatch.score) {
        bestMatch = { answer: entry.answer, score: currentScore };
      }
    }

    return bestMatch.answer;
  };

  const send = (text?: string) => {
    const content = (text || input).trim();
    if (!content) return;
    
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content, timestamp: Date.now() }]);
    setTyping(true);

    setTimeout(() => {
      const reply = getReply(content);
      setTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, timestamp: Date.now() }]);
    }, 800 + Math.random() * 600);
  };

  const clearChat = () => {
    if (window.confirm(c.confirmClear ?? "Effacer l'historique de discussion ?")) {
      const initial: { role: "assistant" | "user"; content: string; timestamp: number }[] = [
        { role: "assistant", content: c.welcome, timestamp: Date.now() }
      ];
      setMessages(initial);
      localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(initial));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[10000]" dir={dir}>
      {/* Floating Button / FAB */}
      <div className="relative group">
        <AnimatePresence>
          {!open && showGreeting && (
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? -20 : 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setOpen(true)}
              className={`absolute bottom-16 sm:bottom-20 ${dir === "rtl" ? "left-0" : "right-0"} max-w-[85vw] whitespace-normal sm:whitespace-nowrap bg-background border border-border shadow-2xl px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl cursor-pointer hover:bg-secondary transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-foreground">{c.welcome.split('.')[0]}</span>
              </div>
              <div 
                className={`absolute bottom-[-6px] ${dir === "rtl" ? "left-6" : "right-6"} w-3 h-3 bg-background border-r border-b border-border rotate-45 transform`} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 ${
            open ? "bg-red-500 rotate-90 hidden sm:flex" : "bg-primary hover:bg-primary/90 flex"
          }`}
          style={{ background: open ? undefined : "var(--primary)" }}
          aria-label="Toggle Chat"
        >
          {open ? <X size={28} /> : <MessageCircle size={26} className="motion-safe:animate-[bounce_3s_infinite]" />}
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className={`fixed sm:absolute inset-0 sm:inset-auto bottom-0 sm:bottom-20 ${
              dir === "rtl" ? "right-auto left-0 sm:left-0 sm:right-auto" : "left-auto right-0 sm:right-0 sm:left-auto"
            } w-full sm:w-[420px] h-[100dvh] sm:h-[600px] max-h-[100dvh] sm:max-h-[80vh] flex flex-col bg-background border-0 sm:border border-border shadow-[0_32px_80px_rgba(26,26,110,0.22)] rounded-none sm:rounded-[32px] overflow-hidden backdrop-blur-xl z-[10001]`}
          >
            {/* Header */}
            <header className="p-6 bg-primary text-white flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">{c.title}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                    {c.sub}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={clearChat}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  title="Effacer"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Background Glow */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/5 rounded-full blur-3xl pointer-events-none" />
            </header>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 pb-2 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/10 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.timestamp + i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      msg.role === "user" ? "bg-slate-200 dark:bg-slate-800 text-slate-600" : "bg-primary text-white"
                    }`}>
                      {msg.role === "user" ? <User size={14} /> : "X"}
                    </div>
                    <div className={`p-4 rounded-[22px] text-sm leading-relaxed shadow-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white dark:bg-slate-800 text-foreground border border-border/50 rounded-tl-none whitespace-pre-wrap"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center text-xs font-bold uppercase">
                      X
                    </div>
                    <div className="p-4 rounded-[22px] rounded-tl-none bg-white dark:bg-slate-800 border border-border/50 shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions Chips Area */}
            <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar">
              {Object.entries(c.suggestions).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => send(val)}
                  className="flex-shrink-0 px-4 py-2 border border-border bg-background hover:bg-secondary rounded-full text-xs font-medium transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <footer className="p-4 bg-background border-t border-border space-y-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder={c.placeholder}
                  className="flex-1 bg-secondary border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/60"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || typing}
                  className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
                >
                  <Send size={20} className={dir === "rtl" ? "rotate-180" : ""} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <a 
                  href="tel:+213794055836" 
                  className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[11px] font-semibold transition-colors"
                >
                  <Phone size={13} className="text-primary" />
                  {c.call}
                </a>
                <a 
                  href="https://wa.me/213658834848" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl text-[11px] font-semibold text-green-700 dark:text-green-500 transition-colors border border-green-200/50 dark:border-green-900/50"
                >
                  <MessageCircle size={13} fill="currentColor" />
                  {c.whatsapp}
                </a>
                <Link 
                  href="/realisations" 
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-xl text-[11px] font-semibold text-amber-700 dark:text-amber-500 transition-colors border border-amber-200/50 dark:border-amber-900/50"
                >
                  <ExternalLink size={13} />
                  {c.portfolio}
                </Link>
              </div>
            </footer>

            {/* Brand Credit */}
            <div className="pb-3 text-center">
              <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase font-medium">
                Design Studio Algérie
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}