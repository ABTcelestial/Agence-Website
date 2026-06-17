'use client';

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabaseClient";
import { SEOHead } from '../components/seo/SEOHead';
import { BreadcrumbSchema, BREADCRUMBS } from '../components/seo/BreadcrumbSchema';

const CONTACT_EMAIL = "xenondz.inc@gmail.com";
const CONTACT_PHONES = ["+213 0794055836", "+213 0658834848"];

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", service: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // 1. Send via Web3Forms (email notification)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Nouveau projet : ${formData.service || "Contact"}`,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // 2. Save to Supabase for admin panel tracking (best-effort, won't block success)
        supabase.from("contact_requests").insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: formData.service || null,
          budget: formData.budget || null,
          message: formData.message,
          status: "new",
        }]).then(() => {}); // fire-and-forget

        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-2.5 bg-input-background border border-input rounded-lg text-sm focus:outline-none transition-all";

  const infoCards = [
    { icon: <Mail size={20} style={{ color: "var(--primary)" }} />, title: c.emailTitle, lines: [CONTACT_EMAIL, c.emailSub] },
    { icon: <Phone size={20} style={{ color: "var(--primary)" }} />, title: c.phoneTitle, lines: [...CONTACT_PHONES, c.phoneSub] },
    { icon: <MapPin size={20} style={{ color: "var(--primary)" }} />, title: c.addressTitle, lines: ["Akbou, Bejaia, Algerie", c.addressSub] },
  ];

  return (
    <>
      <SEOHead page="contact" />
      <BreadcrumbSchema items={BREADCRUMBS.contact} />
      {/* AEO: ContactPage schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contactez XenonDz — Devis Gratuit Algérie",
        "description": "Demandez un devis gratuit pour votre site web, boutique e-commerce ou solution d'automatisation. Réponse garantie sous 24h par l'équipe XenonDz à Béjaïa.",
        "url": "https://xenondz.com/contact",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://xenondz.com/#organization",
          "name": "XenonDz",
          "telephone": CONTACT_PHONES[0].replace(/\s/g, "-"),
          "email": CONTACT_EMAIL
        }
      })}} />
      <div className="w-full">
      {/* Hero */}
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center hero-animate-1">
            <p className="section-label" style={{ justifyContent: "center" }}>{c.heroLabel}</p>
            <h1 className="text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {c.heroTitle1}<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{c.heroTitleEm}</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-lg text-muted-foreground mt-4 font-light">{c.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="space-y-4 reveal">
              {infoCards.map((info, i) => (
                <div key={i} className="contact-info-card">
                  <div className="contact-icon-wrap">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1" style={{ fontFamily: "var(--font-family)" }}>{info.title}</h3>
                    {info.lines.map((l, j) => {
                      const isLast = j === info.lines.length - 1;
                      const isPhone = l.startsWith("+213");
                      const isEmail = l.includes("@");
                      return isPhone ? (
                        <a key={j} href={`tel:${l.replace(/\s/g, "")}`}
                          className="block text-sm text-foreground hover:text-primary transition-colors">
                          {l}
                        </a>
                      ) : isEmail ? (
                        <a key={j} href={`mailto:${l}`}
                          className="block text-sm text-foreground hover:text-primary transition-colors">
                          {l}
                        </a>
                      ) : (
                        <p key={j} className={`text-sm ${isLast ? "text-muted-foreground mt-0.5 text-xs" : "text-foreground"}`}>{l}</p>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-xl text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-shift))" }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                <h3 className="font-semibold mb-2 text-sm">{c.urgentTitle}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{c.urgentDesc}</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 reveal reveal-delay-2">
              <div className="card-pro" style={{ padding: "2.5rem" }}>
                {status === "success" ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(201,168,76,0.08))" }}>
                      <CheckCircle size={32} style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>{c.successTitle}</h3>
                    <p className="text-muted-foreground text-sm">{c.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formName}</label>
                        <input id="contact-name" type="text" name="name" required value={formData.name} onChange={handleChange}
                          className={inputClass} placeholder="Jean Dupont" />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formEmail}</label>
                        <input id="contact-email" type="email" name="email" required value={formData.email} onChange={handleChange}
                          className={inputClass} placeholder="jean@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formPhone}</label>
                        <input id="contact-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className={inputClass} placeholder="+213 6 12 34 56 78" />
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formCompany}</label>
                        <input id="contact-company" type="text" name="company" value={formData.company} onChange={handleChange}
                          className={inputClass} placeholder="Mon Entreprise" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formService}</label>
                        <select id="contact-service" name="service" required value={formData.service} onChange={handleChange} className={inputClass}>
                          <option value="">{c.selectService}</option>
                          {c.serviceOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-budget" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formBudget}</label>
                        <select id="contact-budget" name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                          <option value="">{c.selectBudget}</option>
                          {c.budgetOptions.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5 tracking-wide uppercase">{c.formMessage}</label>
                      <textarea id="contact-message" name="message" required value={formData.message} onChange={handleChange}
                        rows={5} className={`${inputClass} resize-none`}
                        placeholder={c.formMessagePlaceholder} />
                    </div>

                    {status === "error" && (
                      <div className="text-sm rounded-lg px-4 py-3" style={{ background: "rgba(var(--destructive-rgb, 220,38,38),0.06)", border: "1px solid rgba(var(--destructive-rgb, 220,38,38),0.2)", color: "var(--destructive, #dc2626)" }}>
                        {c.formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary-pro w-full flex items-center justify-center px-6 py-3.5 text-base text-white rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? c.formSending : c.formSubmit}
                      {status !== "loading" && <Send size={17} className="ml-2" />}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">{c.formConsent}</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}