'use client';

import React, { useEffect, useState } from "react";
import { Globe, ShoppingCart, Cog, Search, Smartphone, BarChart } from "lucide-react";
import { supabase, type DbService, type DbAddon } from "../admin/supabaseClient";
import { type Service, type ServiceAddon, mapService, mapAddon } from "./services-mapping";

export * from "./services-mapping";

export function useServices(initialServices?: Service[]) {
  const [services, setServices] = useState<Service[]>(
    initialServices && initialServices.length > 0 ? initialServices : []
  );
  const [addons, setAddons] = useState<ServiceAddon[]>([]);
  const [loading, setLoading] = useState(initialServices && initialServices.length > 0 ? false : true);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setLoading(false);
      return;
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    if (!supabaseUrl || !supabaseKey) {
      setServices(STATIC_SERVICES);
      setAddons(STATIC_ADDONS);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const [{ data: svcData }, { data: addonData }] = await Promise.all([
          supabase.from("services").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
          supabase.from("addons").select("*").eq("is_active", true).order("created_at"),
        ]);
        const dbAddons: DbAddon[] = addonData || [];
        const mapped = (svcData || []).map(s => mapService(s as DbService, dbAddons));
        setServices(mapped.length > 0 ? mapped : STATIC_SERVICES);
        setAddons(dbAddons.length > 0 ? dbAddons.map(mapAddon) : STATIC_ADDONS);
      } catch {
        setServices(STATIC_SERVICES);
        setAddons(STATIC_ADDONS);
      } finally {
        setLoading(false);
      }
    })();
  }, [initialServices]);

  return { services, addons, loading };
}

export const globalAddons: ServiceAddon[] = [
  { id: "crm-dashboard", label: "Dashboard CRM", labelEn: "CRM Dashboard", labelAr: "لوحة تحكم CRM", price: 35000, description: "Tableau de bord complet pour gérer vos clients, commandes, leads et statistiques.", descriptionEn: "Full dashboard to manage your clients, orders, leads and stats.", descriptionAr: "لوحة تحكم شاملة لإدارة عملائك وطلباتك." },
  { id: "formation", label: "Formation Complète", labelEn: "Full Training", labelAr: "تدريب complet", price: 15000, description: "Sessions de formation vidéo + live sur tous les outils : CMS, analytics, CRM.", descriptionEn: "Video + live training sessions on all tools: CMS, analytics, CRM.", descriptionAr: "جلسات تدريبية بالفيديو ومباشرة على جميع الأدوات." },
  { id: "maintenance", label: "Maintenance Annuelle", labelEn: "Annual Maintenance", labelAr: "صيانة سنوية", price: 20000, description: "Mises à jour, sauvegardes, surveillance 24/7 pendant 12 mois.", descriptionEn: "Updates, backups, 24/7 monitoring for 12 months.", descriptionAr: "تحديثات, نسخ احتياطية, مراقبة 24/7 لمدة 12 شهرًا." },
  { id: "seo-boost", label: "Pack SEO Avancé", labelEn: "Advanced SEO Pack", labelAr: "باقة SEO المتقدمة", price: 25000, description: "Audit complet, optimisation avancée, stratégie de contenu sur 3 mois.", descriptionEn: "Full audit, advanced optimization, content strategy for 3 months.", descriptionAr: "تدقيق كامل، تحسين متقدم، استراتيجية محتوى لمدة 3 أشهر." },
];

const STATIC_ADDONS = globalAddons;

const STATIC_SERVICES: Service[] = [
  { slug: "creation-site-web-vitrine", icon: <Globe size={36} style={{ color: "var(--primary)" }} />, title: "Sites Web Professionnels", titleEn: "Professional Websites", titleAr: "المواقع الإلكترونية الاحترافية", description: "Sites vitrines modernes et performants.", descriptionEn: "Modern, high-performance showcase sites.", descriptionAr: "مواقع عرض عصرية وعالية الأداء.", longDescription: "La création de site web professionnel en Algérie est le service phare de XenonDz. Nous livrons des sites vitrines ultra-rapides codés sur-mesure en React, conçus spécifiquement pour la conversion client et optimisés pour le référencement local.", longDescriptionEn: "A professional showcase site is your digital business card.", longDescriptionAr: "الموقع الاحترافي هو بطاقتك الرقمية.", features: ["Design sur-mesure responsive", "Optimisation SEO incluse", "Hébergement sécurisé 1 an", "6 mois support"], featuresEn: ["Custom responsive design", "SEO optimisation included", "Secure 1-year hosting", "6-month support"], featuresAr: ["تصميم مخصص متجاوب", "تحسين SEO مشمول", "استضافة آمنة لسنة", "دعم 6 أشهر"], basePrice: 20000, duration: "Livraison en 7-10 jours", durationEn: "Delivered in 7–10 days", durationAr: "تسليم في 7-10 أيام", formValue: "site-web", addons: globalAddons, process: [] },
  { slug: "creation-boutique-ecommerce", icon: <ShoppingCart size={36} style={{ color: "var(--primary)" }} />, title: "E-commerce", titleEn: "E-commerce", titleAr: "التجارة الإلكترونية", description: "Boutiques en ligne clés en main pour vendre vos produits 24/7.", descriptionEn: "Turnkey online stores to sell your products 24/7.", descriptionAr: "متاجر إلكترونية متكاملة.", longDescription: "Le développement de boutique e-commerce en Algérie par XenonDz inclut l'intégration des systèmes locaux de paiement à la livraison, la gestion dynamique des stocks, et des tunnels de vente de haute performance pour maximiser le taux d'achat.", longDescriptionEn: "Your online store should sell while you sleep.", longDescriptionAr: "متجرك الإلكتروني يجب أن يبيع وأنت نائم.", features: ["Catalogue produits illimité", "Gestion des stocks automatique", "Tunnel de vente optimisé", "Formation complète incluse"], featuresEn: ["Unlimited product catalogue", "Automatic inventory management", "Optimised sales funnel", "Full training included"], featuresAr: ["كتالوج منتجات غير محدود", "إدارة مخزون تلقائية", "قمع مبيعات محسّن", "تدريب كامل مشمول"], basePrice: 120000, duration: "Livraison en 10-14 jours", durationEn: "Delivered in 10–14 days", durationAr: "تسليم في 10-14 يوم", formValue: "ecommerce", addons: globalAddons, process: [] },
  { slug: "automatisation-generation-leads", icon: <Cog size={36} style={{ color: "var(--primary)" }} />, title: "Automatisation Web", titleEn: "Web Automation", titleAr: "أتمتة الويب", description: "Automatisez vos tâches répétitives.", descriptionEn: "Automate your repetitive tasks.", descriptionAr: "أتمت مهامك المتكررة.", longDescription: "L'automatisation web et le data scraping par XenonDz permettent aux entreprises algériennes d'extraire des bases de données de prospects (Google Maps, Facebook) et d'automatiser entièrement leur processus de génération de leads B2B avec des outils d'Intelligence Artificielle.", longDescriptionEn: "Every hour spent on repetitive tasks is wasted.", longDescriptionAr: "كل ساعة تقضيها in المهام المتكررة هي ساعة ضائعة.", features: ["Automatisation des réservations", "Emails automatiques", "Intégrations API", "Monitoring"], featuresEn: ["Booking automation", "Automatic emails", "API integrations", "Monitoring"], featuresAr: ["أتمتة الحجوزات", "إيميلات تلقائية", "تكاملات API", "مراقبة"], basePrice: 35000, duration: "Livraison en 5-7 jours", durationEn: "Delivered in 5–7 days", durationAr: "تسليم في 5-7 أيام", formValue: "automatisation", addons: globalAddons.filter(a => ["formation","maintenance"].includes(a.id)), process: [] },
  { slug: "referencement-naturel-seo", icon: <Search size={36} style={{ color: "var(--primary)" }} />, title: "Référencement SEO", titleEn: "SEO", titleAr: "تحسين محركات البحث", description: "Positionnez votre site en première page Google.", descriptionEn: "Rank your site on Google's first page.", descriptionAr: "ضع موقعك في الصفحة الأولى.", longDescription: "L'optimisation SEO de XenonDz applique les stratégies de Generative Engine Optimization (GEO) ainsi que les standards de référencement classiques pour positionner les sites des entreprises d'Algérie en première page de Google et dans les réponses d'Intelligence Artificielle.", longDescriptionEn: "Being invisible on Google means letting clients go to competitors.", longDescriptionAr: "أن تكون غير مرئي على Google يعني السماح لعملائك بالذهاب إلى منافسيك.", features: ["Audit SEO complet", "Optimisation technique", "Stratégie contenu", "Suivi mensuel"], featuresEn: ["Full SEO audit", "Technical optimisation", "Content strategy", "Monthly tracking"], featuresAr: ["تدقيق SEO كامل", "تحسين تقني", "استراتيجية محتوى", "تتبع شهري"], basePrice: 25000, duration: "Résultats en 3-6 mois", durationEn: "Results in 3–6 months", durationAr: "نتائج في 3-6 أشهر", formValue: "seo", addons: globalAddons.filter(a => a.id === "formation"), process: [] },
  { slug: "developpement-application-sur-mesure", icon: <Smartphone size={36} style={{ color: "var(--primary)" }} />, title: "Applications Web", titleEn: "Web Applications", titleAr: "تطبيقات الويب", description: "Applications métier sur-mesure.", descriptionEn: "Custom business applications.", descriptionAr: "تطبيقات أعمال مخصصة.", longDescription: "Le développement d'applications web sur-mesure chez XenonDz vous offre un logiciel métier (CRM, ERP, ou portail client) avec une architecture sécurisée à Béjaïa et pour toute l'Algérie, garantissant 20h d'économie par semaine de temps de gestion.", longDescriptionEn: "When market tools don't match, we build yours.", longDescriptionAr: "عندما لا تتناسب أدوات السوق، نبني أداتك.", features: ["Interface intuitive", "Multi-utilisateurs", "BDD sécurisée", "Support inclus"], featuresEn: ["Intuitive interface", "Multi-user", "Secure database", "Support included"], featuresAr: ["واجهة بديهية", "متعدد المستخدمين", "قاعدة بيانات آمنة", "دعم مشمول"], basePrice: 0, priceSuffix: "Sur devis", duration: "Selon complexité", durationEn: "Depending on complexity", durationAr: "حسب التعقيد", formValue: "application", addons: globalAddons.filter(a => ["crm-dashboard","formation","maintenance"].includes(a.id)), process: [] },
  { slug: "audit-optimisation-performance", icon: <BarChart size={36} style={{ color: "var(--primary)" }} />, title: "Analyse & Optimisation", titleEn: "Analysis & Optimisation", titleAr: "التحليل والتحسين", description: "Améliorez les performances de votre site existant.", descriptionEn: "Improve the performance of your existing site.", descriptionAr: "حسّn أداء موقعك الحالي.", longDescription: "Notre service d'audit et optimisation de performance transforme les sites lents en plateformes ultra-rapides générant en moyenne un taux de conversion supérieur de 40%. Nous appliquons un refactoring technique selon les standards Core Web Vitals.", longDescriptionEn: "Your site already exists but isn't performing as you'd like?", longDescriptionAr: "موقعك موجود بالفعل لكنه لا يؤدي كما تريد؟", features: ["Audit performance", "Optimisation vitesse", "A/B testing", "Rapport résultats"], featuresEn: ["Performance audit", "Speed optimisation", "A/B testing", "Results report"], featuresAr: ["تدقيق الأداء", "تحسين السرعة", "اختبار A/B", "تقرير النتائج"], basePrice: 20000, duration: "Livraison en 3-5 jours", durationEn: "Delivered in 3–5 days", durationAr: "تسليم في 3-5 أيام", formValue: "autre", addons: globalAddons.filter(a => a.id === "formation"), process: [] },
];

export const services = STATIC_SERVICES;