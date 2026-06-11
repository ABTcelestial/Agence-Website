const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read env file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const addons = [
  {
    addon_key: "crm-dashboard",
    label_fr: "Dashboard CRM",
    label_en: "CRM Dashboard",
    label_ar: "لوحة تحكم CRM",
    description_fr: "Tableau de bord complet pour gérer vos clients, commandes, leads et statistiques.",
    description_en: "Full dashboard to manage your clients, orders, leads and stats.",
    description_ar: "لوحة تحكم شاملة لإدارة عملائك وطلباتك.",
    price: 35000,
    is_active: true
  },
  {
    addon_key: "formation",
    label_fr: "Formation Complète",
    label_en: "Full Training",
    label_ar: "تدريب كامل",
    description_fr: "Sessions de formation vidéo + live sur l'utilisation de tous les outils : CMS, analytics, CRM, automatisations.",
    description_en: "Video + live training sessions on all tools: CMS, analytics, CRM, automations.",
    description_ar: "جلسات تدريبية بالفيديو ومباشرة على جميع الأدوات: CMS، التحليلات، CRM، الأتمتة.",
    price: 15000,
    is_active: true
  },
  {
    addon_key: "maintenance",
    label_fr: "Maintenance Annuelle",
    label_en: "Annual Maintenance",
    label_ar: "صيانة سنوية",
    description_fr: "Mises à jour, sauvegardes automatiques, surveillance 24/7 et corrections rapides durant 12 mois.",
    description_en: "Updates, backups, 24/7 monitoring and fast fixes for 12 months.",
    description_ar: "تحديثات، نسخ احتياطية تلقائية، مراقبة 24/7 وإصلاحات سريعة لمدة 12 شهرًا.",
    price: 20000,
    is_active: true
  },
  {
    addon_key: "seo-boost",
    label_fr: "Pack SEO Avancé",
    label_en: "Advanced SEO Pack",
    label_ar: "باقة SEO المتقدمة",
    description_fr: "Audit complet, optimisation avancée, stratégie de contenu sur 3 mois.",
    description_en: "Full audit, advanced optimization, content strategy for 3 months.",
    description_ar: "تدقيق كامل، تحسين متقدم، استراتيجية محتوى لمدة 3 أشهر.",
    price: 25000,
    is_active: true
  }
];

const services = [
  {
    slug: "creation-site-web-vitrine",
    icon: "🌐",
    title_fr: "Sites Web Professionnels",
    title_en: "Professional Showcase Websites",
    title_ar: "المواقع الإلكترونية الاحترافية",
    description_fr: "Sites vitrines modernes et performants pour convertir vos visiteurs en clients.",
    description_en: "Modern, high-performance showcase sites to convert visitors into clients.",
    description_ar: "موقع ويب تعريفي عصري وعالي الأداء لتحويل زوارك إلى عملاء.",
    long_description_fr: "La création de site web professionnel en Algérie est le service phare de XenonDz. Nous livrons des sites vitrines ultra-rapides codés sur-mesure en React, conçus spécifiquement pour la conversion client et optimisés pour le référencement local.",
    long_description_en: "A professional showcase site is your digital business card. We design fast, elegant sites optimised to convert visitors into real clients.",
    long_description_ar: "إنشاء موقع ويب احترافي في الجزائر هو الخدمة الرائدة لشركة XenonDz. نحن نقدم مواقع سريعة للغاية ومصممة خصيصًا باستخدام React.",
    features_fr: ["Design sur-mesure responsive", "Optimisation SEO incluse", "Hébergement sécurisé 1 an", "6 mois support"],
    features_en: ["Custom responsive design", "SEO optimisation included", "Secure 1-year hosting", "6-month support"],
    features_ar: ["تصميم مخصص متجاوب", "تحسين SEO مشمول", "استضافة آمنة لسنة", "دعم 6 أشهر"],
    base_price: 20000,
    duration_fr: "Livraison en 7-10 jours",
    duration_en: "Delivered in 7–10 days",
    duration_ar: "تسليم في 7-10 أيام",
    form_value: "site-web",
    addon_ids: ["crm-dashboard", "formation", "maintenance", "seo-boost"],
    sort_order: 0,
    is_active: true,
    process_steps: [
      { title_fr: "Brief créatif", title_en: "Creative Brief", title_ar: "ملخص إبداعي", description_fr: "On analyse votre marque, vos concurrents et vos objectifs.", description_en: "We analyze your brand, competitors, and goals.", description_ar: "نحلل علامتك التجارية ومنافسيك وأهدافك." },
      { title_fr: "Design & maquette", title_en: "Design & Mockup", title_ar: "التصميم والنموذج", description_fr: "Vous validez le design avant le développement.", description_en: "You validate the design before development.", description_ar: "أنت توافق على التصميم قبل التطوير." },
      { title_fr: "Développement", title_en: "Development", title_ar: "التطوير", description_fr: "Programmation propre et optimisée de votre site.", description_en: "Clean and optimized programming of your site.", description_ar: "برمجة نظيفة ومحسنة لموقعك." },
      { title_fr: "Livraison & formation", title_en: "Delivery & Training", title_ar: "التسليم والتدريب", description_fr: "Mise en ligne et formation complète.", description_en: "Go-live and complete training.", description_ar: "الإطلاق والتدريب الكامل." }
    ]
  },
  {
    slug: "creation-boutique-ecommerce",
    icon: "🛒",
    title_fr: "Boutique E-commerce",
    title_en: "E-commerce Store",
    title_ar: "التجارة الإلكترونية",
    description_fr: "Boutiques en ligne clés en main pour vendre vos produits 24/7.",
    description_en: "Turnkey online stores to sell your products 24/7.",
    description_ar: "متاجر إلكترونية متكاملة لبيع منتجاتك 24/7.",
    long_description_fr: "Le développement de boutique e-commerce en Algérie par XenonDz inclut l'intégration des systèmes locaux de paiement à la livraison, la gestion dynamique des stocks, et des tunnels de vente de haute performance pour maximiser le taux d'achat.",
    long_description_en: "Your online store should sell while you sleep. We build conversion-optimized stores with seamless local shipping integration.",
    long_description_ar: "يتضمن تطوير متجر التجارة الإلكترونية في الجزائر من XenonDz دمج أنظمة الدفع عند الاستلام المحلية وإدارة المخزون الديناميكية.",
    features_fr: ["Catalogue produits illimité", "Gestion des stocks automatique", "Tunnel de vente optimisé", "Formation complète incluse"],
    features_en: ["Unlimited product catalogue", "Automatic inventory management", "Optimised sales funnel", "Full training included"],
    features_ar: ["كتالوج منتجات غير محدود", "إدارة مخزون تلقائية", "قمع مبيعات محسّن", "تدريب كامل مشمول"],
    base_price: 120000,
    duration_fr: "Livraison en 10-14 jours",
    duration_en: "Delivered in 10–14 days",
    duration_ar: "تسليم في 10-14 يوم",
    form_value: "ecommerce",
    addon_ids: ["crm-dashboard", "formation", "maintenance", "seo-boost"],
    sort_order: 1,
    is_active: true,
    process_steps: [
      { title_fr: "Consultation & Stratégie", title_en: "Consultation & Strategy", title_ar: "الاستشارة والاستراتيجية", description_fr: "Définition de la structure de votre catalogue et choix des modes de livraison.", description_en: "Defining your catalog structure and shipping modes.", description_ar: "تحديد هيكل الكتالوج وطرق الشحن الخاصة بك." },
      { title_fr: "Design & Maquette", title_en: "Design & Mockup", title_ar: "التصميم والنموذج", description_fr: "Création graphique de la boutique axée sur la conversion.", description_en: "Graphic design of the shop focused on conversion.", description_ar: "تصميم متجر إلكتروني يركز على تحويل الزوار." },
      { title_fr: "Développement & Tests", title_en: "Development & Testing", title_ar: "التطوير والاختبار", description_fr: "Développement et intégration du panier et du système de commande.", description_en: "Development and integration of the cart and order system.", description_ar: "تطوير ودمج السلة ونظام الطلب." },
      { title_fr: "Lancement", title_en: "Launch & Training", title_ar: "الإطلاق والتدريب", description_fr: "Mise en ligne et formation à la gestion des produits.", description_en: "Go-live and training on product management.", description_ar: "الإطلاق والتدريب على إدارة المنتجات." }
    ]
  },
  {
    slug: "automatisation-generation-leads",
    icon: "⚙️",
    title_fr: "Automatisation Web & Scraping",
    title_en: "Web Automation & Scraping",
    title_ar: "أتمتة الويب واستخراج البيانات",
    description_fr: "Automatisez vos tâches répétitives et générez des leads B2B qualifiés en automatique.",
    description_en: "Automate your repetitive tasks and generate qualified B2B leads automatically.",
    description_ar: "أتمت مهامك المتكررة واحصل auf عملاء محتملين مؤهلين تلقائيًا.",
    long_description_fr: "L'automatisation web et le data scraping par XenonDz permettent aux entreprises algériennes d'extraire des bases de données de prospects (Google Maps, Facebook) et d'automatiser entièrement leur processus de génération de leads B2B avec des outils d'Intelligence Artificielle.",
    long_description_en: "Every hour spent on repetitive tasks is wasted. We build bots, integrations and scraper workflows to save you hours of work.",
    long_description_ar: "تتيح أتمتة الويب واستخراج البيانات من XenonDz للشركات الجزائرية استخراج قواعد بيانات العملاء المحتملين وأتمتة العمليات.",
    features_fr: ["Extraction Google Maps / Facebook", "Automatisation des emails/WhatsApp", "Intégrations API & No-code", "Rapports automatisés"],
    features_en: ["Google Maps / Facebook scraping", "Email/WhatsApp automation", "API & No-code integrations", "Automated reports"],
    features_ar: ["استخراج Google Maps / Facebook", "أتمتة البريد الإلكتروني / واتساب", "تكاملات API و No-code", "تقارير مؤتمتة"],
    base_price: 35000,
    duration_fr: "Livraison en 5-7 jours",
    duration_en: "Delivered in 5–7 days",
    duration_ar: "تسليم في 5-7 أيام",
    form_value: "automatisation",
    addon_ids: ["formation", "maintenance"],
    sort_order: 2,
    is_active: true,
    process_steps: [
      { title_fr: "Analyse du workflow", title_en: "Workflow Analysis", title_ar: "تحليل سير العمل", description_fr: "Cartographie de vos processus manuels répétitifs.", description_en: "Mapping your manual repetitive processes.", description_ar: "رسم خرائط عملياتك اليدوية المتكررة." },
      { title_fr: "Développement du script", title_en: "Script Development", title_ar: "تطوير السيناريو", description_fr: "Création du robot ou scraper sur mesure.", description_en: "Creation of the custom bot or scraper.", description_ar: "إنشاء الروبوت أو برنامج الاستخراج المخصص." },
      { title_fr: "Intégration", title_en: "Integration", title_ar: "التكامل", description_fr: "Connexion avec vos outils existants (CRM, Google Sheets).", description_en: "Connection with your existing tools (CRM, Sheets).", description_ar: "الاتصال بأدواتك الحالية." }
    ]
  },
  {
    slug: "referencement-naturel-seo",
    icon: "🔍",
    title_fr: "Référencement SEO & GEO",
    title_en: "SEO & GEO Optimisation",
    title_ar: "تحسين محركات البحث SEO",
    description_fr: "Positionnez votre site en première page Google et dans les moteurs de recherche IA.",
    description_en: "Rank your site on Google's first page and in AI search engines.",
    description_ar: "ضع موقعك في الصفحة الأولى على Google ومحركات بحث الذكاء الاصطناعي.",
    long_description_fr: "L'optimisation SEO de XenonDz applique les stratégies de Generative Engine Optimization (GEO) ainsi que les standards de référencement classiques pour positionner les sites des entreprises d'Algérie en première page de Google et dans les réponses d'Intelligence Artificielle.",
    long_description_en: "Being invisible on Google means letting clients go to competitors. We optimize your visibility for both classic SEO and AI search.",
    long_description_ar: "أن تكون غير مرئي على Google يعني السماح لعملائك بالذهاب إلى منافسيك. نقوم بتحسين ظهورك لـ SEO والذكاء الاصطناعي.",
    features_fr: ["Audit SEO & Technique complet", "Optimisation sémantique (GEO)", "Création de backlinks qualifiés", "Rapport de positionnement mensuel"],
    features_en: ["Full Technical & SEO Audit", "Semantic Optimization (GEO)", "Qualified backlink building", "Monthly ranking reports"],
    features_ar: ["تدقيق SEO وتقني كامل", "تحسين سحابي دلالي", "بناء روابط خلفية مؤهلة", "تقرير ترتيب شهري"],
    base_price: 25000,
    duration_fr: "Résultats en 3-6 mois",
    duration_en: "Results in 3–6 months",
    duration_ar: "نتائج في 3-6 أشهر",
    form_value: "seo",
    addon_ids: ["formation"],
    sort_order: 3,
    is_active: true,
    process_steps: [
      { title_fr: "Audit initial", title_en: "Initial Audit", title_ar: "التدقيق الأولي", description_fr: "Analyse technique approfondie et recherche de mots-clés.", description_en: "Deep technical analysis and keyword research.", description_ar: "تحليل تقني عميق وبحث عن الكلمات المفتاحية." },
      { title_fr: "Optimisation on-page", title_en: "On-page Optimisation", title_ar: "التحسين الداخلي", description_fr: "Correction de la structure, de la vitesse et du contenu.", description_en: "Fixing structure, speed, and content.", description_ar: "إصلاح الهيكل والسرعة والمحتوى." }
    ]
  },
  {
    slug: "developpement-application-sur-mesure",
    icon: "📱",
    title_fr: "Applications Web & Métier",
    title_en: "Custom Web Applications",
    title_ar: "تطبيقات الويب المخصصة",
    description_fr: "Logiciels et portails sur-mesure pour numériser votre gestion d'entreprise.",
    description_en: "Custom software and portals to digitize your business operations.",
    description_ar: "برامج وبوابات مخصصة لرقمنة إدارة شركتك.",
    long_description_fr: "Le développement d'applications web sur-mesure chez XenonDz vous offre un logiciel métier (CRM, ERP, ou portail client) avec une architecture sécurisée à Béjaïa et pour toute l'Algérie, garantissant 20h d'économie par semaine de temps de gestion.",
    long_description_en: "When market tools don't match, we build yours. Custom CRM, ERP or client portals designed for your unique processes.",
    long_description_ar: "عندما لا تتناسب أدوات السوق، نقوم ببناء أداتك الخاصة. أنظمة CRM أو ERP مخصصة.",
    features_fr: ["Architecture cloud sécurisée", "Interface d'administration moderne", "Gestion des rôles & permissions", "Support & évolutivité garantis"],
    features_en: ["Secure cloud architecture", "Modern admin interface", "Roles & permissions management", "Guaranteed support & evolution"],
    features_ar: ["بنية سحابية آمنة", "واجهة إدارة حديثة", "إدارة الأدوار والأذونات", "دعم وتطور مضمون"],
    base_price: 0,
    duration_fr: "Selon complexité",
    duration_en: "Depending on complexity",
    duration_ar: "حسب التعقيد",
    form_value: "application",
    addon_ids: ["crm-dashboard", "formation", "maintenance"],
    sort_order: 4,
    is_active: true,
    process_steps: [
      { title_fr: "Spécification technique", title_en: "Tech Specifications", title_ar: "المواصفات التقنية", description_fr: "Rédaction du cahier des charges et architecture BDD.", description_en: "Writing project requirements and DB schema.", description_ar: "كتابة متطلبات المشروع ومخطط قاعدة البيانات." }
    ]
  },
  {
    slug: "audit-optimisation-performance",
    icon: "📊",
    title_fr: "Audit & Vitesse Core Web Vitals",
    title_en: "Audit & Core Web Vitals Speed",
    title_ar: "تحسين سرعة الموقع والأداء",
    description_fr: "Accélérez votre site existant pour booster vos conversions et votre référencement.",
    description_en: "Accelerate your existing site to boost conversions and SEO.",
    description_ar: "قم بتسريع موقعك الحالي لزيادة المبيعات وتحسين الترتيب.",
    long_description_fr: "Notre service d'audit et optimisation de performance transforme les sites lents en plateformes ultra-rapides générant en moyenne un taux de conversion supérieur de 40%. Nous appliquons un refactoring technique selon les standards Core Web Vitals.",
    long_description_en: "Your site already exists but isn't performing as you'd like? We transform slow sites into ultra-fast ones.",
    long_description_ar: "موقعك موجود بالفعل ولكنه لا يعمل كما تريد؟ نقوم بتحويل المواقع البطيئة إلى سريعة.",
    features_fr: ["Audit technique de performance", "Optimisation images & assets", "Refactoring de code (Next.js/React)", "Validation des scores 90+ sur PageSpeed"],
    features_en: ["Technical performance audit", "Image & asset optimization", "Code refactoring (Next/React)", "Validation of 90+ PageSpeed scores"],
    features_ar: ["تدقيق الأداء التقني", "تحسين الصور والملفات", "إعادة هيكلة الكود (Next/React)", "التحقق من نقاط PageSpeed +90"],
    base_price: 20000,
    duration_fr: "Livraison en 3-5 jours",
    duration_en: "Delivered in 3–5 days",
    duration_ar: "تسليم في 3-5 أيام",
    form_value: "autre",
    addon_ids: ["formation"],
    sort_order: 5,
    is_active: true,
    process_steps: []
  }
];

async function run() {
  const email = "temp-admin-" + Math.floor(Math.random()*10000) + "@xenondz.com";
  const password = "Password123!!";
  console.log(`Signing up user: ${email}`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
  
  if (signUpError) {
    console.error('Sign up failed:', signUpError);
    return;
  }
  
  console.log('User signed up successfully. Performing insertion...');
  
  // Clear and insert addons
  await supabase.from('addons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { data: adData, error: adError } = await supabase.from('addons').insert(addons).select();
  if (adError) {
    console.error('Addons insert failed:', adError);
  } else {
    console.log(`Inserted ${adData.length} addons`);
  }

  // Clear and insert services
  await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { data: svData, error: svError } = await supabase.from('services').insert(services).select();
  if (svError) {
    console.error('Services insert failed:', svError);
  } else {
    console.log(`Inserted ${svData.length} services`);
  }
}

run().catch(console.error);
