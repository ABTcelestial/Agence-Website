export type Language = "fr" | "en" | "ar";

export const translations = {
  fr: {
    dir: "ltr" as const,
    lang: "fr",

    // Header / Nav
    nav: {
      home: "Accueil",
      services: "Services",
      realisations: "Réalisations",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      cta: "Obtenir mon devis",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      skipToContent: "Aller au contenu",
      toggleTheme: "Changer le thème",
    },

    // Footer
    footer: {
      tagline: "Créons ensemble votre présence digitale de demain.",
      navigation: "Navigation",
      services: "Services",
      contact: "Contact",
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      servicesList: ["Sites Web", "E-commerce", "Automatisation", "SEO"],
    },

    // Home
    home: {
      heroBadge: "Votre partenaire digital orienté ROI",
      heroTitle1: "Agence Digitale en Algérie :",
      heroTitle2: "Création de sites web &",
      heroTitleEm: "Automatisation",
      tickerDelivery: "Sites livrés en 7–10 jours",
      tickerTech: "React & Next.js — zéro WordPress",
      tickerLocation: "Béjaïa, Algérie",
      heroDesc:
        "Agence web spécialisée en Algérie. Sites web ultra-rapides, e-commerce rentable et automatisation B2B pour trouver vos clients à votre place. L'excellence accessible aux entreprises algériennes ambitieuses.",
      heroCta: "Démarrer l'acquisition",
      heroSecondary: "Voir nos solutions",
      stats: [
        { value: "100%", label: "Code Custom" },
        { value: "0.2s", label: "Latence" },
        { value: "24h", label: "Réponse" },
        { value: "6 mois", label: "Support inclus" },
      ],
      whyLabel: "Notre différence",
      whyTitle: "Pourquoi perdre des clients avec un site lent ou invisible ?",
      whyDesc:
        "Nous transformons l'incertitude digitale en flux de prospects prédictible.",
      whyCards: [
        {
          title: "Vitesse extrème, Zéro friction",
          description:
            "Le développement web par XenonDz utilise React (zéro WordPress) pour créer des sites ultra-rapides. Nos clients observent une vitesse de chargement multipliée par 5, augmentant le taux de conversion instantanément.",
        },
        {
          title: "Automatisation de vos leads",
          description:
            "L'automatisation web et le data scraping par XenonDz extraient et contactent vos prospects qualifiés B2B. Nos robots IA vous garantissent un gain moyen de 20 heures de prospection manuelle par semaine.",
        },
        {
          title: "Croissance SEO garantie",
          description:
            "L'optimisation SEO et AEO de XenonDz en Algérie positionne votre entreprise en première page de Google. Nos structures techniques assurent que les intelligences artificielles (ChatGPT, Perplexity) citent directement votre marque.",
        },
      ],
      benefitsLabel: "Ce que vous gagnez",
      benefitsTitle1: "Des résultats concrets qui",
      benefitsTitle2: "développent votre CA",
      benefitsList: [
        "Site web pensé pour la conversion (formulaires stratégiques)",
        "Référencement naturel (SEO) optimisé pour l'Algérie",
        "Automatisation de vos tâches répétitives (gain de temps de 20h/semaine)",
        "Boutique e-commerce adaptée au paiement à la livraison",
        "Formation complète pour être autonome (plus de dépendance technique)",
        "Hébergement ultra-sécurisé inclus 1 an",
      ],
      resultsLabel: "Notre Engagement",
      resultsItems: [
        { label: "Sur-mesure", value: "100%" },
        { label: "Vitesse Boostée", value: "x5" },
        { label: "Transparence", value: "100%" },
      ],
      ctaLabel: "Sortez du lot",
      ctaTitle1: "Prêt à dominer",
      ctaTitle2: "votre marché ?",
      ctaDesc:
        "Chaque jour sans site optimisé est un jour où vous envoyez vos clients chez la concurrence. Parlons de votre croissance.",
      ctaButton: "Obtenir mon devis gratuit",
      ctaFootnote: "Réponse < 24h · Devis SEO complet · Sans engagement",
      philosophyLabel: "L'avantage XenonDz",
      philosophyTitle: "Pourquoi nous confier votre premier (ou prochain) projet ?",
      philosophyDesc:
        "Nous ne sommes pas une agence qui se repose sur ses acquis. Nous sommes une équipe de développeurs passionnés qui utilisent les dernières technologies du web (React, AI, Cloud) pour livrer des résultats qu'un CMS classique ne pourra jamais atteindre.",
      philosophyCode: "Code 100% Custom",
      philosophyCodeDesc: "Aucun thème pré-acheté ou limité. Votre site est unique.",
      philosophySpeed: "Vitesse Brute",
      philosophySpeedDesc: "Optimisation au millième de seconde pour le SEO.",
      philosophyPromise: 'Notre promesse "Zéro Risque"',
      philosophyPromiseDesc:
        "Pour bâtir notre réputation, nous mettons la barre plus haut : accompagnement ultra-personnalisé, transparence totale sur les tarifs et support technique réactif sous 24h.",
      philosophyCta: "Discuter de votre vision",
    },

    // About
    about: {
      heroLabel: "Notre histoire",
      heroTitle1: "Notre mission :",
      heroTitleEm: "votre succès digital",
      heroDesc:
        "Une agence digitale passionnée par l'innovation et dédiée à transformer les entreprises grâce au web.",
      teamLabel: "L'équipe",
      teamTitle: "Une équipe passionnée",
      team: [
        {
          name: "Rynas Kebdi",
          role: "CEO & Fondateur",
          bio: "Specialiste Front-end et Automatisation IA, Passionné par l'entrepreneuriat digital.",
        },
        {
          name: "Ryan AitBessai",
          role: "Lead Dev & Co-Fondateur",
          bio: "Specialiste Backend.",
        },
        {
          name: "Amar Bellabas",
          role: "Directeur Créatif et Cybersecurité",
          bio: "Specialise UI/UX, consultant cybersecurité",
        },
      ],
      valuesLabel: "Ce qui nous guide",
      valuesTitle: "Nos valeurs",
      values: [
        {
          title: "Excellence",
          description:
            "Nous visons toujours la plus haute qualité dans chaque projet, grand ou petit.",
        },
        {
          title: "Collaboration",
          description:
            "Votre succès est notre succès. Nous travaillons main dans la main avec vous.",
        },
        {
          title: "Innovation",
          description:
            "Nous utilisons les technologies les plus récentes pour vous donner un avantage.",
        },
        {
          title: "Transparence",
          description:
            "Des prix clairs, des délais respectés, une communication honnête.",
        },
      ],
      ctaLabel: "Travaillons ensemble",
      ctaTitle: "Prêt à démarrer votre projet ?",
      ctaDesc:
        "Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous aider.",
      ctaButton: "Prendre contact",
    },

    // Services
    services: {
      heroLabel: "Ce que nous faisons",
      heroTitle1: "Création de Sites Web &",
      heroTitleEm: "Automatisation",
      heroDesc:
        "Solutions complètes pour développer votre présence en ligne et automatiser votre croissance.",
      discover: "Découvrir",
      from: "À partir de",
      ctaLabel: "Projet sur mesure ?",
      ctaTitle: "Vous avez un besoin spécifique ?",
      ctaDesc:
        "Chaque projet est unique. Parlons de vos besoins pour trouver la solution idéale.",
      ctaButton: "Discuter de mon projet",
    },

    // Contact
    contact: {
      heroLabel: "Démarrons ensemble",
      heroTitle1: "Parlons de",
      heroTitleEm: "votre projet",
      heroDesc: "Obtenez un devis gratuit et personnalisé en moins de 24h.",
      emailTitle: "Email",
      emailSub: "Réponse en moins de 24h",
      phoneTitle: "Téléphone",
      phoneSub: "Numero professionelle coming soon",
      addressTitle: "Adresse",
      addressSub: "Adresse officiel non disponible",
      urgentTitle: "Urgence ?",
      urgentDesc:
        "Pour les demandes urgentes, appelez-nous directement ou envoyez-nous un email avec [URGENT] dans l'objet.",
      formName: "Nom complet *",
      formEmail: "Email *",
      formPhone: "Téléphone",
      formCompany: "Entreprise",
      formService: "Service souhaité *",
      formBudget: "Budget estimé",
      formMessage: "Décrivez votre projet *",
      formMessagePlaceholder:
        "Parlez-nous de votre projet, vos objectifs, vos contraintes...",
      formSubmit: "Envoyer ma demande",
      formSending: "Envoi en cours…",
      formConsent:
        "En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.",
      formError:
        "Une erreur s'est produite. Vérifiez votre clé Web3Forms et réessayez.",
      successTitle: "Message envoyé !",
      successDesc:
        "Nous vous répondrons dans les 24h. Vérifiez votre boîte email.",
      selectService: "Sélectionnez un service",
      selectBudget: "Sélectionnez une tranche",
      serviceOptions: [
        { value: "site-web", label: "Site Web Professionnel" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "automatisation", label: "Automatisation Web" },
        { value: "seo", label: "Référencement SEO" },
        { value: "application", label: "Application Web" },
        { value: "autre", label: "Autre" },
      ],
      budgetOptions: [
        { value: "500-2000", label: "5 000DA – 20 000DA" },
        { value: "2000-5000", label: "20 000DA – 50 000DA" },
        { value: "5000-10000", label: "50 000DA – 100 000DA" },
        { value: "10000-5000", label: "100 000DA – 150 000DA"},
        { value: "10000+", label: "Plus de 150 000DA" },
      ],
    },

    // FAQ
    faq: {
      heroLabel: "On répond à tout",
      heroTitle1: "Questions",
      heroTitleEm: "fréquentes",
      heroDesc:
        "Tout ce que vous avez besoin de savoir avant de démarrer votre projet avec nous.",
      ctaTitle: "Vous avez d'autres questions ?",
      ctaDesc: "Notre équipe est disponible pour répondre à toutes vos questions.",
      ctaButton: "Nous contacter",
      categories: [
        {
          label: "Délais & Processus",
          faqs: [
            {
              question: "Quel est le délai moyen pour un projet ?",
              answer:
                "Un site vitrine standard est livré en 7-10 jours, un e-commerce en 10-14 jours. Les délais exacts dépendent de la complexité de votre projet et de la rapidité de vos retours.",
            },
            {
              question: "Comment se déroule un projet de A à Z ?",
              answer:
                "Le processus est simple : consultation gratuite → devis détaillé → validation → développement avec points réguliers → livraison + formation. Vous êtes impliqué à chaque étape.",
            },
            {
              question: "Puis-je modifier le design en cours de projet ?",
              answer:
                "Oui, nous incluons 2 cycles de révisions dans nos tarifs. Des modifications supplémentaires sont possibles moyennant un supplément défini à l'avance et validé ensemble.",
            },
          ],
        },
        {
          label: "Tarifs & Paiement",
          faqs: [
            {
              question: "Comment se déroule le paiement ?",
              answer:
                "50% à la signature du devis, 50% à la livraison. Nous acceptons les paiements par virement bancaire et carte bancaire. Des facilités de paiement sont possibles pour les projets importants.",
            },
            {
              question: "Y a-t-il des frais cachés après la livraison ?",
              answer:
                "Non. Le devis que vous signez est un prix fixe et définitif. Les seuls coûts récurrents sont l'hébergement et le nom de domaine, clairement indiqués dans votre devis.",
            },
            {
              question:
                "Proposez-vous des tarifs pour les startups ou associations ?",
              answer:
                "Oui, nous avons des offres adaptées aux structures en démarrage. Contactez-nous pour en discuter, nous trouverons une solution adaptée à votre budget.",
            },
          ],
        },
        {
          label: "Support & Maintenance",
          faqs: [
            {
              question: "Proposez-vous un accompagnement après la livraison ?",
              answer:
                "Oui, tous nos projets incluent 6 mois de support et maintenance. Nous assurons également une formation complète pour vous rendre totalement autonome dans la gestion de votre site.",
            },
            {
              question: "Que se passe-t-il si mon site tombe en panne ?",
              answer:
                "Vous nous contactez et nous intervenons sous 4h en jours ouvrés. Pour les clients avec contrat de maintenance, nous disposons d'une surveillance automatique.",
            },
            {
              question:
                "Puis-je gérer mon site moi-même après la livraison ?",
              answer:
                "Absolument. Nous vous formons à la gestion de votre site lors de la livraison. Vous pouvez modifier vos textes, images et produits en toute autonomie.",
            },
          ],
        },
        {
          label: "Technique & SEO",
          faqs: [
            {
              question:
                "Est-ce que mon site sera bien référencé sur Google ?",
              answer:
                "Oui, le SEO on-page est inclus dans tous nos projets : structure sémantique, balises optimisées, performance de chargement, sitemap et robots.txt.",
            },
            {
              question: "Mon site sera-t-il adapté aux mobiles ?",
              answer:
                "Toujours. Tous nos sites sont 100% responsive et optimisés pour mobile, tablette et desktop. Nous testons sur de nombreux appareils avant chaque livraison.",
            },
            {
              question:
                "Travaillez-vous avec des entreprises hors de l'Algérie ?",
              answer:
                "Pour l'instant, nous travaillons exclusivement en Algérie, sauf rare exception. Nous concentrons nos efforts sur le marché local — mais l'expansion à l'international est en cours de préparation et arrivera bientôt.",
            },
          ],
        },
      ],
    },

    // 404
    notFound: {
      title: "Page introuvable",
      desc: "La page que vous cherchez n'existe pas ou a été déplacée.",
      back: "Retour à l'accueil",
    },

    // Realisations
    realisations: {
      badge: "Nos projets",
      title: "Nos <em>réalisations</em>",
      description: "Découvrez les sites web et solutions digitales que nous avons conçus pour nos clients.",
      featured: "En vedette",
      all: "Tous",
      fullPortfolio: "Portfolio complet",
      allProjects: "Tous nos projets",
      loading: "Chargement des réalisations…",
      empty: "Aucune réalisation pour cette catégorie.",
      ctaTitle: "Votre projet est le prochain ?",
      ctaDesc: "Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.",
      ctaButton: "Démarrer votre projet",
      visite: "Visiter le site",
      preview: "Chargement du preview…",
      notAvailable: "Aperçu non disponible",
      noUrl: "Aucune URL renseignée",
      vedette: "Vedette",
    },

    // Chatbot
    chatbot: {
      title: "Xenon Agent",
      sub: "En ligne",
      welcome: "Bonjour ! Je suis l'assistant Xenon. Comment puis-je vous aider aujourd'hui ?",
      placeholder: "Écrivez un message...",
      send: "Envoyer",
      close: "Fermer",
      call: "Appeler",
      whatsapp: "WhatsApp",
      portfolio: "Voir réalisations",
      fallback: "Désolé, je n'ai pas la réponse exacte. Cependant, notre équipe vous répond en moins de 24h.\n\nSouhaitez-vous que l'on vous recontacte ?",
      confirmClear: "Effacer tout l'historique de la conversation ?",
      suggestions: {
        services: "Quels services proposez-vous ?",
        pricing: "Vos tarifs & délais ?",
        automation: "Expertise Automation & Scraping",
        team: "Qui compose l'équipe ?",
      },
      kb: [
        {
          keys: ["bonjour", "salut", "hello", "hi", "bonsoir", "hey"],
          answer: "Bonjour ! Bienvenue chez Xenon.\n\nNous sommes une agence digitale. Je peux vous renseigner sur nos services (sites web, e-commerce, automatisation), nos tarifs ou notre équipe. Par quoi souhaitez-vous commencer ?",
        },
        {
          keys: ["merci", "parfait", "ok", "compris", "au revoir", "bye"],
          answer: "Avec plaisir. N'hésitez pas à revenir si vous avez d'autres questions — nous sommes là pour faire décoller votre projet.\n\nBonne journée !",
        },
        {
          keys: ["service", "proposez", "faites", "offre"],
          answer: "Xenon propose des solutions digitales premium :\n\n• Création de sites vitrines (7–10 jours)\n• Boutiques E-commerce (10–14 jours)\n• Automatisation & Scraping (FB, Maps, CRM)\n• Design UI/UX & Cybersécurité\n\nChaque projet est livré avec 6 mois de support.",
        },
        {
          keys: ["tarif", "prix", "cout", "combien", "budget", "devis"],
          answer: "Nos tarifs sont transparents :\n• Vitrine : dès 30 000 DZD\n• E-commerce : dès 60 000 DZD\n• Automation : dès 15 000 DZD\n\nModalités : 50% d'acompte, 50% à la livraison. Devis gratuit sous 24h.",
        },
        {
          keys: ["delai", "temps", "quand", "livraison"],
          answer: "Nous sommes rapides :\n• Vitrine : 7-10 jours\n• E-commerce : 10-14 jours\n• Automation : 3-5 jours\n\nChaque jour de retard est déduit de la facture finale.",
        },
        {
          keys: ["equipe", "qui", "fondateur", "rynas", "ryan", "amar"],
          answer: "Notre équipe :\n• Rynas Kebdi : CEO & IA Automation\n• Ryan AitBessai : Lead Backend\n• Amar Bellabas : Design & Cybersécurité\n\nNous mettons nos expertises complémentaires au service de votre projet.",
        },
        {
          keys: ["automation", "scraping", "extraction", "donnees", "leads"],
          answer: "Nous sommes experts en automatisation de croissance :\n\n• Extraction de leads (Maps, FB, IG)\n• Bots de réponse automatique\n• Synchronisation de données (CRM, Excel)\n• Automatisation de tâches répétitives\n\nPrestation à partir de 15 000 DZD.",
        },
        {
          keys: ["cyber", "securite", "audit", "hacking", "protection", "ui", "ux", "design"],
          answer: "La sécurité et le design sont au cœur de nos projets.\n\nAmar Bellabas assure des audits de sécurité et le design UI/UX premium. Chaque site Xenon est livré sécurisé par défaut avec un design unique.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  en: {
    dir: "ltr" as const,
    lang: "en",

    nav: {
      home: "Home",
      services: "Services",
      realisations: "Portfolio",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      cta: "Start a project",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skipToContent: "Skip to content",
      toggleTheme: "Toggle theme",
    },

    footer: {
      tagline: "Let's build your digital presence of tomorrow together.",
      navigation: "Navigation",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy policy",
      servicesList: ["Websites", "E-commerce", "Automation", "SEO"],
    },

    home: {
      heroBadge: "Your trusted digital partner",
      heroTitle1: "Digital Agency in Algeria:",
      heroTitle2: "Web Design &",
      heroTitleEm: "Automation",
      tickerDelivery: "Sites delivered in 7–10 days",
      tickerTech: "React & Next.js — zero WordPress",
      tickerLocation: "Bejaia, Algeria",
      heroDesc:
        "Specialised web agency in Algeria. Modern websites, smart automations and e-commerce solutions that transform your business.",
      heroCta: "Start your project",
      heroSecondary: "View our services",
      stats: [
        { value: "100%", label: "Custom Code" },
        { value: "0.2s", label: "Latency" },
        { value: "24h", label: "Response" },
        { value: "6 mo", label: "Support included" },
      ],
      whyLabel: "Our difference",
      whyTitle: "Why choose XenonDz?",
      whyDesc:
        "We turn your ideas into high-performing, profitable digital solutions.",
      whyCards: [
        {
          title: "Fast delivery",
          description:
            "Your site live in days, not months. Efficiency without compromising quality.",
        },
        {
          title: "Modern technology",
          description:
            "React, Tailwind, and the latest tech for fast, secure, and scalable websites.",
        },
        {
          title: "Guaranteed growth",
          description:
            "Solutions built to scale with your business. SEO-optimised and maximum performance.",
        },
      ],
      benefitsLabel: "What you get",
      benefitsTitle1: "Concrete results",
      benefitsTitle2: "for your business",
      benefitsList: [
        "Responsive website optimised for all devices",
        "Increase in your online visibility",
        "Automation of your repetitive processes",
        "Support and maintenance included for 6 months",
        "Full training to manage your site",
        "Secure hosting and optimal performance",
      ],
      resultsLabel: "Our Commitment",
      resultsItems: [
        { label: "Bespoke", value: "100%" },
        { label: "Speed Boost", value: "x5" },
        { label: "Transparency", value: "100%" },
      ],
      ctaLabel: "Ready to start?",
      ctaTitle1: "Ready to transform your",
      ctaTitle2: "digital presence?",
      ctaDesc:
        "Let's talk about your project. Free first consultation, no commitment.",
      ctaButton: "Get a free quote",
      ctaFootnote: "Response < 24h · Detailed quote · No commitment",
      philosophyLabel: "The XenonDz advantage",
      philosophyTitle: "Why trust us with your first (or next) project?",
      philosophyDesc:
        "We are not an agency that rests on its laurels. We are a team of passionate developers using the latest web technologies (React, AI, Cloud) to deliver results a classic CMS can never achieve.",
      philosophyCode: "100% Custom Code",
      philosophyCodeDesc: "No pre-built or limited themes. Your site is unique.",
      philosophySpeed: "Raw Speed",
      philosophySpeedDesc: "Millisecond-level optimisation for SEO.",
      philosophyPromise: '"Zero Risk" promise',
      philosophyPromiseDesc:
        "To build our reputation, we raise the bar: ultra-personalised support, full pricing transparency, and reactive technical support within 24h.",
      philosophyCta: "Discuss your vision",
    },

    about: {
      heroLabel: "Our story",
      heroTitle1: "Our mission:",
      heroTitleEm: "your digital success",
      heroDesc:
        "A digital agency passionate about innovation, dedicated to transforming businesses through the web.",
      teamLabel: "The team",
      teamTitle: "A passionate team",
      team: [
        {
          name: "Rynas Kebdi",
          role: "CEO & Founder",
          bio: "Front-end & AI Automation specialist, passionate about digital entrepreneurship.",
        },
        {
          name: "Ryan AitBessai",
          role: "Lead Dev & Co-Founder",
          bio: "Backend specialist.",
        },
        {
          name: "Amar Bellabas",
          role: "Creative Director & Cybersecurity",
          bio: "UI/UX specialist, cybersecurity consultant.",
        },
      ],
      valuesLabel: "What drives us",
      valuesTitle: "Our values",
      values: [
        {
          title: "Excellence",
          description:
            "We always aim for the highest quality in every project, big or small.",
        },
        {
          title: "Collaboration",
          description:
            "Your success is our success. We work hand in hand with you.",
        },
        {
          title: "Innovation",
          description:
            "We use the latest technologies to give you a competitive edge.",
        },
        {
          title: "Transparency",
          description:
            "Clear pricing, respected deadlines, honest communication.",
        },
      ],
      ctaLabel: "Let's work together",
      ctaTitle: "Ready to start your project?",
      ctaDesc:
        "Contact us for a free consultation and discover how we can help you.",
      ctaButton: "Get in touch",
    },

    services: {
      heroLabel: "What we do",
      heroTitle1: "Services that transform",
      heroTitleEm: "your business",
      heroDesc:
        "Complete solutions to grow your online presence and automate your growth.",
      discover: "Discover",
      from: "From",
      ctaLabel: "Custom project?",
      ctaTitle: "Do you have a specific need?",
      ctaDesc:
        "Every project is unique. Let's talk about your needs to find the ideal solution.",
      ctaButton: "Discuss my project",
    },

    contact: {
      heroLabel: "Let's get started",
      heroTitle1: "Let's talk about",
      heroTitleEm: "your project",
      heroDesc: "Get a free, personalised quote in less than 24h.",
      emailTitle: "Email",
      emailSub: "Reply within 24h",
      phoneTitle: "Phone",
      phoneSub: "Professional number coming soon",
      addressTitle: "Address",
      addressSub: "Official address not yet available",
      urgentTitle: "Urgent?",
      urgentDesc:
        "For urgent requests, call us directly or send an email with [URGENT] in the subject line.",
      formName: "Full name *",
      formEmail: "Email *",
      formPhone: "Phone",
      formCompany: "Company",
      formService: "Desired service *",
      formBudget: "Estimated budget",
      formMessage: "Describe your project *",
      formMessagePlaceholder:
        "Tell us about your project, goals, constraints...",
      formSubmit: "Send my request",
      formSending: "Sending…",
      formConsent:
        "By submitting this form, you agree to be contacted by our team.",
      formError:
        "An error occurred. Check your Web3Forms key and try again.",
      successTitle: "Message sent!",
      successDesc: "We'll reply within 24h. Check your inbox.",
      selectService: "Select a service",
      selectBudget: "Select a range",
      serviceOptions: [
        { value: "site-web", label: "Professional Website" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "automatisation", label: "Web Automation" },
        { value: "seo", label: "SEO" },
        { value: "application", label: "Web Application" },
        { value: "autre", label: "Other" },
      ],
      budgetOptions: [
        { value: "500-2000", label: "5,000DA – 20,000DA" },
        { value: "2000-5000", label: "20,000DA – 50,000DA" },
        { value: "5000-10000", label: "50,000DA – 100,000DA" },
        { value: "10000-15000", label: "100,000DA – 150,000DA" },
        { value: "10000+", label: "Over 150,000DA" },
      ],
    },

    faq: {
      heroLabel: "We answer everything",
      heroTitle1: "Frequently asked",
      heroTitleEm: "questions",
      heroDesc:
        "Everything you need to know before starting your project with us.",
      ctaTitle: "Still have questions?",
      ctaDesc: "Our team is available to answer all your questions.",
      ctaButton: "Contact us",
      categories: [
        {
          label: "Timelines & Process",
          faqs: [
            {
              question: "What is the average project timeline?",
              answer:
                "A standard showcase site is delivered in 7–10 days, an e-commerce in 10–14 days. Exact timelines depend on the complexity of your project and how quickly you provide feedback.",
            },
            {
              question: "How does a project work from start to finish?",
              answer:
                "The process is simple: free consultation → detailed quote → approval → development with regular check-ins → delivery + training. You are involved at every step.",
            },
            {
              question: "Can I change the design during the project?",
              answer:
                "Yes, we include 2 revision cycles in our pricing. Additional changes are possible for an agreed-upon additional fee.",
            },
          ],
        },
        {
          label: "Pricing & Payment",
          faqs: [
            {
              question: "How does payment work?",
              answer:
                "50% upon signing the quote, 50% upon delivery. We accept bank transfers and credit cards. Payment plans are available for larger projects.",
            },
            {
              question: "Are there hidden fees after delivery?",
              answer:
                "No. The quote you sign is a fixed, final price. The only recurring costs are hosting and domain name, clearly stated in your quote.",
            },
            {
              question:
                "Do you offer pricing for startups or non-profits?",
              answer:
                "Yes, we have offers tailored to early-stage organisations. Contact us to discuss — we'll find a solution that fits your budget.",
            },
          ],
        },
        {
          label: "Support & Maintenance",
          faqs: [
            {
              question: "Do you offer support after delivery?",
              answer:
                "Yes, all our projects include 6 months of support and maintenance. We also provide full training so you can manage your site independently.",
            },
            {
              question: "What happens if my site goes down?",
              answer:
                "Contact us and we'll respond within 4 hours on business days. Maintenance contract clients benefit from automatic monitoring.",
            },
            {
              question: "Can I manage my site myself after delivery?",
              answer:
                "Absolutely. We train you on site management at delivery. You can update text, images and products on your own.",
            },
          ],
        },
        {
          label: "Technical & SEO",
          faqs: [
            {
              question: "Will my site rank well on Google?",
              answer:
                "Yes, on-page SEO is included in all our projects: semantic structure, optimised tags, load performance, sitemap and robots.txt.",
            },
            {
              question: "Will my site be mobile-friendly?",
              answer:
                "Always. All our sites are 100% responsive and optimised for mobile, tablet and desktop. We test on numerous devices before each delivery.",
            },
            {
              question: "Do you work with companies outside Algeria?",
              answer:
                "For now, we work exclusively in Algeria, with rare exceptions. We are fully focused on the local market at this stage — but international expansion is in the works and coming soon.",
            },
          ],
        },
      ],
    },

    notFound: {
      title: "Page not found",
      desc: "The page you're looking for doesn't exist or has been moved.",
      back: "Back to home",
    },

    // Realisations
    realisations: {
      badge: "Our projects",
      title: "Our <em>works</em>",
      description: "Discover the websites and digital solutions we've designed for our clients.",
      featured: "Featured",
      all: "All",
      fullPortfolio: "Full portfolio",
      allProjects: "All our projects",
      loading: "Loading works…",
      empty: "No works found for this category.",
      ctaTitle: "Is your project next?",
      ctaDesc: "Contact us to discuss your project and get a free quote.",
      ctaButton: "Start your project",
      visite: "Visit site",
      preview: "Loading preview…",
      notAvailable: "Preview not available",
      noUrl: "No URL provided",
      vedette: "Featured",
    },

    // Chatbot
    chatbot: {
      title: "Xenon Agent",
      sub: "Online",
      welcome: "Hello! I am the Xenon assistant. How can I help you today?",
      placeholder: "Type a message...",
      send: "Send",
      close: "Close",
      call: "Call",
      whatsapp: "WhatsApp",
      portfolio: "View portfolio",
      fallback: "Sorry, I don't have the exact answer. However, our team will get back to you within 24 hours.\n\nWould you like us to contact you?",
      confirmClear: "Clear the entire conversation history?",
      suggestions: {
        services: "What services do you offer?",
        pricing: "Your rates & timelines?",
        automation: "Automation & Scraping expertise",
        team: "Who is in the team?",
      },
      kb: [
        {
          keys: ["hello", "hi", "hey", "good morning", "good evening"],
          answer: "Hello! Welcome to Xenon.\n\nWe are a digital agency. I can help you with our services (websites, e-commerce, automation), our rates, or our team. Where would you like to start?",
        },
        {
          keys: ["thanks", "thank you", "perfect", "ok", "understood", "bye"],
          answer: "You're welcome! Don't hesitate to come back if you have more questions — we're here to help your project take off.\n\nHave a great day!",
        },
        {
          keys: ["service", "offer", "do you do", "provide"],
          answer: "Xenon offers premium digital solutions:\n\n• Showcase websites (7–10 days)\n• E-commerce stores (10–14 days)\n• Automation & Scraping (FB, Maps, CRM)\n• UI/UX Design & Cybersecurity\n\nEvery project includes 6 months of support.",
        },
        {
          keys: ["rate", "price", "cost", "how much", "budget", "quote"],
          answer: "Our rates are transparent:\n• Showcase: from 30,000 DZD\n• E-commerce: from 60,000 DZD\n• Automation: from 15,000 DZD\n\nTerms: 50% deposit, 50% on delivery. Free quote within 24h.",
        },
        {
          keys: ["delay", "time", "when", "delivery", "duration"],
          answer: "We are fast:\n• Showcase: 7-10 days\n• E-commerce: 10-14 days\n• Automation: 3-5 days\n\nEvery day of delay is deducted from the final invoice.",
        },
        {
          keys: ["team", "who", "founder", "rynas", "ryan", "amar"],
          answer: "Our team:\n• Rynas Kebdi: CEO & AI Automation\n• Ryan AitBessai: Lead Backend\n• Amar Bellabas: Design & Cybersecurity\n\nWe combine our expertise to ensure your success.",
        },
        {
          keys: ["automation", "scraping", "extraction", "data", "leads"],
          answer: "We are growth automation experts:\n\n• Lead extraction (Maps, FB, IG)\n• Automatic reply bots\n• Data synchronization (CRM, Excel)\n• Repetitive task automation\n\nServices starting from 15,000 DZD.",
        },
        {
          keys: ["cyber", "security", "audit", "hacking", "protection", "ui", "ux", "design"],
          answer: "Security and design are at the core of our projects.\n\nAmar Bellabas handles security audits and premium UI/UX design. Every Xenon site is delivered secure by default with a unique design.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  ar: {
    dir: "rtl" as const,
    lang: "ar",

    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      realisations: "إنجازاتنا",
      about: "من نحن",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      cta: "ابدأ مشروعك",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      skipToContent: "انتقل إلى المحتوى",
      toggleTheme: "تغيير المظهر",
    },

    footer: {
      tagline: "لنبني معاً حضورك الرقمي لمستقبل أفضل.",
      navigation: "التنقل",
      services: "الخدمات",
      contact: "التواصل",
      rights: "جميع الحقوق محفوظة.",
      legal: "الشروط القانونية",
      privacy: "سياسة الخصوصية",
      servicesList: ["المواقع الإلكترونية", "التجارة الإلكترونية", "الأتمتة", "تحسين محركات البحث"],
    },

    home: {
      heroBadge: "شريكك الرقمي الموثوق",
      heroTitle1: "وكالة رقمية في الجزائر:",
      heroTitle2: "تصميم مواقع ويب و",
      heroTitleEm: "أتمتة",
      tickerDelivery: "تسليم في 7–10 أيام",
      tickerTech: "React & Next.js — بدون WordPress",
      tickerLocation: "بجاية، الجزائر",
      heroDesc:
        "وكالة ويب متخصصة في الجزائر. مواقع ويب عصرية، أتمتة ذكية وحلول تجارة إلكترونية تُحوّل أعمالك.",
      heroCta: "ابدأ مشروعك",
      heroSecondary: "اكتشف خدماتنا",
      stats: [
        { value: "100%", label: "برمجة خاصة" },
        { value: "0.2ثا", label: "سرعة الرد" },
        { value: "24سا", label: "وقت الرد" },
        { value: "6 أشهر", label: "دعم مشمول" },
      ],
      whyLabel: "ما يميّزنا",
      whyTitle: "لماذا تختار XenonDz؟",
      whyDesc: "نحوّل أفكارك إلى حلول رقمية فعّالة ومربحة.",
      whyCards: [
        {
          title: "سرعة التنفيذ",
          description:
            "موقعك جاهز خلال أيام لا أشهر. كفاءة عالية دون المساس بالجودة.",
        },
        {
          title: "تقنيات حديثة",
          description:
            "React وTailwind وأحدث التقنيات لمواقع سريعة وآمنة وقابلة للتوسع.",
        },
        {
          title: "نمو مضمون",
          description:
            "حلول مصممة للتوسع مع أعمالك. تحسين محركات بحث متقدم وأداء أقصى.",
        },
      ],
      benefitsLabel: "ما ستحصل عليه",
      benefitsTitle1: "نتائج ملموسة",
      benefitsTitle2: "لأعمالك",
      benefitsList: [
        "موقع متجاوب ومحسّن لجميع الأجهزة",
        "زيادة في ظهورك عبر الإنترنت",
        "أتمتة عملياتك المتكررة",
        "دعم وصيانة مشمولان لمدة 6 أشهر",
        "تدريب كامل على إدارة موقعك",
        "استضافة آمنة وأداء مثالي",
      ],
      resultsLabel: "إلتزامنا",
      resultsItems: [
        { label: "تصميم خاص", value: "100%" },
        { label: "سرعة فائقة", value: "x5" },
        { label: "شفافية", value: "100%" },
      ],
      ctaLabel: "هل أنت مستعد؟",
      ctaTitle1: "مستعد لتحويل",
      ctaTitle2: "حضورك الرقمي؟",
      ctaDesc:
        "تحدّث معنا عن مشروعك. أول استشارة مجانية وبدون أي التزام.",
      ctaButton: "احصل على عرض مجاني",
      ctaFootnote: "رد خلال أقل من 24 ساعة · عرض مفصّل · بدون التزام",
      philosophyLabel: "ميزة XenonDz",
      philosophyTitle: "لماذا تثق بنا في مشروعك الأول (أو التالي)؟",
      philosophyDesc:
        "لسنا وكالة تعتمد على ما حققناه سابقاً. بل نحن فريق من المطورين الشغوفين الذين يستخدمون أحدث تقنيات الويب (React، AI، Cloud) لتحقيق نتائج لا يمكن لأي نظام CMS تقليدي تحقيقها.",
      philosophyCode: "كود 100% خاص",
      philosophyCodeDesc: "لا قوالب جاهزة أو محدودة. موقعك فريد من نوعه.",
      philosophySpeed: "سرعة فائقة",
      philosophySpeedDesc: "تحسين بالمللي ثانية لتحسين محركات البحث.",
      philosophyPromise: 'وعدنا "بصفر مخاطرة"',
      philosophyPromiseDesc:
        "لبناء سمعتنا، نرفع الحد الأعلى: مرافقة شخصية عالية المستوى، شفافية كاملة في الأسعار، ودعم تقني فوري خلال 24 ساعة.",
      philosophyCta: "ناقش رؤيتك",
    },

    about: {
      heroLabel: "قصتنا",
      heroTitle1: "مهمتنا:",
      heroTitleEm: "نجاحك الرقمي",
      heroDesc:
        "وكالة رقمية شغوفة بالابتكار ومكرّسة لتحويل الشركات عبر الويب.",
      teamLabel: "الفريق",
      teamTitle: "فريق متحمس وملتزم",
      team: [
        {
          name: "Rynas Kebdi",
          role: "المدير التنفيذي والمؤسس",
          bio: "متخصص في الواجهة الأمامية وأتمتة الذكاء الاصطناعي، شغوف بريادة الأعمال الرقمية.",
        },
        {
          name: "Ryan AitBessai",
          role: "المطور الرئيسي والمؤسس المشارك",
          bio: "متخصص في تطوير الخلفية.",
        },
        {
          name: "Amar Bellabas",
          role: "المدير الإبداعي والأمن السيبراني",
          bio: "متخصص في تصميم UI/UX ومستشار أمن سيبراني.",
        },
      ],
      valuesLabel: "ما يقودنا",
      valuesTitle: "قيمنا",
      values: [
        {
          title: "التميّز",
          description:
            "نسعى دائماً لأعلى مستوى من الجودة في كل مشروع، كبيراً كان أم صغيراً.",
        },
        {
          title: "التعاون",
          description: "نجاحك هو نجاحنا. نعمل معاً يداً بيد في كل خطوة.",
        },
        {
          title: "الابتكار",
          description:
            "نستخدم أحدث التقنيات لمنحك ميزة تنافسية حقيقية.",
        },
        {
          title: "الشفافية",
          description: "أسعار واضحة، مواعيد محترمة، تواصل صادق.",
        },
      ],
      ctaLabel: "لنعمل معاً",
      ctaTitle: "هل أنت مستعد لبدء مشروعك؟",
      ctaDesc:
        "تواصل معنا لاستشارة مجانية واكتشف كيف يمكننا مساعدتك.",
      ctaButton: "تواصل معنا",
    },

    services: {
      heroLabel: "ما نقدمه",
      heroTitle1: "خدمات تُحوّل",
      heroTitleEm: "أعمالك",
      heroDesc:
        "حلول شاملة لتطوير حضورك عبر الإنترنت وأتمتة نموك.",
      discover: "اكتشف",
      from: "ابتداءً من",
      ctaLabel: "مشروع مخصص؟",
      ctaTitle: "هل لديك احتياج خاص؟",
      ctaDesc:
        "كل مشروع فريد من نوعه. تحدث معنا لإيجاد الحل المثالي.",
      ctaButton: "ناقش مشروعي",
    },

    contact: {
      heroLabel: "لنبدأ معاً",
      heroTitle1: "تحدّث معنا عن",
      heroTitleEm: "مشروعك",
      heroDesc: "احصل على عرض مجاني ومخصص في أقل من 24 ساعة.",
      emailTitle: "البريد الإلكتروني",
      emailSub: "رد خلال أقل من 24 ساعة",
      phoneTitle: "الهاتف",
      phoneSub: "رقم مهني قريباً",
      addressTitle: "العنوان",
      addressSub: "العنوان الرسمي غير متاح حالياً",
      urgentTitle: "طارئ؟",
      urgentDesc:
        "للطلبات العاجلة، اتصل بنا مباشرة أو أرسل بريداً إلكترونياً بـ [URGENT] في العنوان.",
      formName: "الاسم الكامل *",
      formEmail: "البريد الإلكتروني *",
      formPhone: "الهاتف",
      formCompany: "الشركة",
      formService: "الخدمة المطلوبة *",
      formBudget: "الميزانية التقريبية",
      formMessage: "صف مشروعك *",
      formMessagePlaceholder: "أخبرنا عن مشروعك وأهدافك ومتطلباتك...",
      formSubmit: "إرسال طلبي",
      formSending: "جارٍ الإرسال...",
      formConsent: "بإرسال هذا النموذج، توافق على أن يتصل بك فريقنا.",
      formError: "حدث خطأ. تحقق من مفتاح Web3Forms وأعد المحاولة.",
      successTitle: "تم إرسال رسالتك!",
      successDesc: "سنرد عليك خلال 24 ساعة. تحقق من بريدك الإلكتروني.",
      selectService: "اختر خدمة",
      selectBudget: "اختر نطاقاً",
      serviceOptions: [
        { value: "site-web", label: "موقع إلكتروني احترافي" },
        { value: "ecommerce", label: "متجر إلكتروني" },
        { value: "automatisation", label: "أتمتة الويب" },
        { value: "seo", label: "تحسين محركات البحث" },
        { value: "application", label: "تطبيق ويب" },
        { value: "autre", label: "أخرى" },
      ],
      budgetOptions: [
        { value: "500-2000", label: "5,000 – 20,000 دج" },
        { value: "2000-5000", label: "20,000 – 50,000 دج" },
        { value: "5000-10000", label: "50,000 – 100,000 دج" },
        { value: "10000-15000", label: "100,000 – 150,000 دج" },
        { value: "10000+", label: "أكثر من 150,000 دج" },
      ],
    },

    faq: {
      heroLabel: "نجيب على كل شيء",
      heroTitle1: "الأسئلة",
      heroTitleEm: "الشائعة",
      heroDesc:
        "كل ما تحتاج معرفته قبل بدء مشروعك معنا.",
      ctaTitle: "هل لديك أسئلة أخرى؟",
      ctaDesc: "فريقنا متاح للرد على جميع استفساراتك.",
      ctaButton: "تواصل معنا",
      categories: [
        {
          label: "المواعيد والعملية",
          faqs: [
            {
              question: "ما هو متوسط مدة المشروع؟",
              answer:
                "يُسلَّم الموقع التعريفي العادي في 7-10 أيام، والمتجر الإلكتروني في 10-14 يوماً. تعتمد المدد الدقيقة على تعقيد مشروعك وسرعة ردودك.",
            },
            {
              question: "كيف يسير المشروع من البداية إلى النهاية؟",
              answer:
                "العملية بسيطة: استشارة مجانية ← عرض مفصّل ← موافقة ← تطوير مع نقاط دورية ← تسليم + تدريب. أنت مشارك في كل خطوة.",
            },
            {
              question: "هل يمكنني تعديل التصميم أثناء المشروع؟",
              answer:
                "نعم، نشمل دورتين من المراجعات في أسعارنا. التعديلات الإضافية ممكنة مقابل رسوم إضافية محددة مسبقاً.",
            },
          ],
        },
        {
          label: "الأسعار والدفع",
          faqs: [
            {
              question: "كيف يتم الدفع؟",
              answer:
                "50% عند توقيع العرض، 50% عند التسليم. نقبل التحويل البنكي والبطاقة البنكية. خطط الدفع متاحة للمشاريع الكبيرة.",
            },
            {
              question: "هل هناك رسوم خفية بعد التسليم؟",
              answer:
                "لا. العرض الذي توقّعه هو سعر ثابت ونهائي. التكاليف الدورية الوحيدة هي الاستضافة واسم النطاق، وهي مذكورة بوضوح في عرضك.",
            },
            {
              question: "هل تقدمون أسعاراً للشركات الناشئة أو الجمعيات؟",
              answer:
                "نعم، لدينا عروض مخصصة للمشاريع الناشئة. تواصل معنا لمناقشة ذلك، وسنجد حلاً يناسب ميزانيتك.",
            },
          ],
        },
        {
          label: "الدعم والصيانة",
          faqs: [
            {
              question: "هل تقدمون دعماً بعد التسليم؟",
              answer:
                "نعم، تشمل جميع مشاريعنا 6 أشهر من الدعم والصيانة، بالإضافة إلى تدريب كامل لتتمكن من إدارة موقعك بشكل مستقل.",
            },
            {
              question: "ماذا يحدث إذا توقف موقعي عن العمل؟",
              answer:
                "تواصل معنا وسنتدخل خلال 4 ساعات في أيام العمل. عملاء عقد الصيانة يستفيدون من مراقبة تلقائية.",
            },
            {
              question: "هل يمكنني إدارة موقعي بنفسي بعد التسليم؟",
              answer:
                "بالتأكيد. ندربك على إدارة موقعك عند التسليم. يمكنك تعديل النصوص والصور والمنتجات باستقلالية تامة.",
            },
          ],
        },
        {
          label: "التقنية وتحسين البحث",
          faqs: [
            {
              question: "هل سيظهر موقعي بشكل جيد على Google؟",
              answer:
                "نعم، يشمل تحسين محركات البحث On-Page جميع مشاريعنا: بنية دلالية، وسوم محسّنة، سرعة تحميل، خريطة الموقع وملف robots.txt.",
            },
            {
              question: "هل سيكون موقعي متوافقاً مع الهواتف؟",
              answer:
                "دائماً. جميع مواقعنا متجاوبة 100% ومحسّنة للهاتف واللوحي وسطح المكتب. نختبر على أجهزة عديدة قبل كل تسليم.",
            },
            {
              question: "هل تعملون مع شركات خارج الجزائر؟",
              answer: "في الوقت الحالي، نعمل حصراً داخل الجزائر، باستثناءات نادرة. نركّز جهودنا على السوق المحلي في هذه المرحلة — لكن التوسع الدولي قيد الإعداد وسيأتي قريباً."
            },
          ],
        },
      ],
    },

    notFound: {
      title: "الصفحة غير موجودة",
      desc: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      back: "العودة إلى الرئيسية",
    },

    // Realisations
    realisations: {
      badge: "مشاريعنا",
      title: "أبرز <em>أعمالنا</em>",
      description: "اكتشف المواقع والحلول الرقمية التي صممناها لعملائنا.",
      featured: "مميز",
      all: "الكل",
      fullPortfolio: "المعرض الكامل",
      allProjects: "جميع مشاريعنا",
      loading: "جاري تحميل الأعمال…",
      empty: "لا توجد أعمال لهذه الفئة.",
      ctaTitle: "هل مشروعك هو التالي؟",
      ctaDesc: "اتصل بنا لمناقشة مشروعك والحصول على عرض سعر مجاني.",
      ctaButton: "ابدأ مشروعك",
      visite: "زيارة الموقع",
      preview: "جاري تحميل المعاينة…",
      notAvailable: "المعاينة غير متاحة",
      noUrl: "لم يتم توفير رابط",
      vedette: "مميز",
    },

    // Chatbot
    chatbot: {
      title: "Xenon Agent",
      sub: "متصل الآن",
      welcome: "مرحباً! أنا مساعد Xenon الرقمي. كيف يمكنني مساعدتك اليوم؟",
      placeholder: "اكتب رسالة...",
      send: "إرسال",
      close: "إغلاق",
      call: "اتصال",
      whatsapp: "واتساب",
      portfolio: "إنجازاتنا",
      fallback: "عذراً، ليس لدي الإجابة الدقيقة حالياً. ومع ذلك، سيقوم فريقنا بالرد عليك في أقل من 24 ساعة.\n\nهل تود أن نتواصل معك؟",
      confirmClear: "هل تريد مسح كل سجل المحادثة؟",
      suggestions: {
        services: "ما هي الخدمات التي تقدمونها؟",
        pricing: "الأسعار والمواعيد؟",
        automation: "خبرة الأتمتة والاستخراج",
        team: "من هم أعضاء الفريق؟",
      },
      kb: [
        {
          keys: ["مرحبا", "سلام", "اهلا", "صباح", "مساء"],
          answer: "مرحباً بك في Xenon!\n\nنحن وكالة رقمية. يمكنني إطلاعك على خدماتنا (المواقع، التجارة الإلكترونية، الأتمتة)، أسعارنا أو فريقنا. بماذا تود البدء؟",
        },
        {
          keys: ["شكرا", "ممتاز", "حسنا", "فهمت", "وداعا", "باي"],
          answer: "على الرحب والسعة! لا تتردد في العودة إذا كانت لديك أسئلة أخرى - نحن هنا لإنجاح مشروعك.\n\nيومك سعيد!",
        },
        {
          keys: ["خدمة", "خدمات", "تقدمون", "تعملون"],
          answer: "تقدم Xenon حلولاً رقمية متميزة:\n\n• إنشاء مواقع تعريفية (7-10 أيام)\n• متاجر إلكترونية (10-14 يوماً)\n• أتمتة واستخراج بيانات (فيسبوك، خرائط جوجل)\n• تصميم UI/UX وأمن سيبراني\n\nكل مشروع يتضمن 6 أشهر من الدعم.",
        },
        {
          keys: ["سعر", "اسعار", "تكلفة", "بكم", "ميزانية", "عرض"],
          answer: "أسعارنا شفافة:\n• موقع تعريفي: ابتداءً من 30,000 دج\n• متجر إلكتروني: ابتداءً من 60,000 دج\n• أتمتة: ابتداءً من 15,000 دج\n\nالشروط: 50% عند البدء، 50% عند التسليم. عرض سعر مجاني خلال 24 ساعة.",
        },
        {
          keys: ["مدة", "وقت", "متى", "تسليم"],
          answer: "نحن نتميز بالسرعة:\n• موقع تعريفي: 7-10 أيام\n• متجر إلكتروني: 10-14 يوماً\n• أتمتة بسيطة: 3-5 أيام\n\nكل يوم تأخير يُخصم من الفاتورة النهائية.",
        },
        {
          keys: ["فريق", "من", "مؤسس", "ريناس", "ريان", "عمار"],
          answer: "فريقنا :\n• ريناس كبدي: المدير التنفيذي وأتمتة الذكاء الاصطناعي\n• ريان آيت بسعي: مطور تقني رئيسي\n• عمار بلعباس: التصميم والأمن السيبراني\n\nنضع خبراتنا المتكاملة في خدمة مشروعك.",
        },
        {
          keys: ["أتمتة", "اتمتة", "استخراج", "بيانات", "عملاء", "فايسبوك", "خرائط"],
          answer: "نحن خبراء في أتمتة النمو:\n\n• استخراج بيانات العملاء (خرائط جوجل، فيسبوك، انستغرام)\n• بوتات الرد الآلي\n• مزامنة البيانات (CRM، Excel)\n• أتمتة المهام المتكررة\n\nالخدمات تبدأ من 15,000 دج.",
        },
        {
          keys: ["أمن", "امن", "حماية", "اختراق", "تصميم", "تجربة", "مستخدم"],
          answer: "الأمن والتصميم في صلب مشاريعنا.\n\nريان عمار بلعباس يشرف على تدقيق الأمن وتصميم UI/UX المتميز. كل موقع Xenon يتم تسليمه مؤمناً بتصميم فريد.",
        },
      ],
    },
  },
} as const;

export type Translations = (typeof translations)["fr"];
