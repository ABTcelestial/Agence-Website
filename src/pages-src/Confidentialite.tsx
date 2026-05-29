'use client';

import Link from "next/link";
import { ShieldCheck, Eye, Database, HeartHandshake, Cookie, Lock } from "lucide-react";
import { SEOHead } from "../components/seo/SEOHead";

export function Confidentialite() {
  return (
    <>
      <SEOHead
        noIndex={true}
        title="Politique de confidentialité — XenonDz"
        description="Politique de confidentialité de XenonDz, agence digitale basée à Béjaïa, Algérie."
      />
      <div className="w-full py-12 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 hero-animate-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(201,168,76,0.08))" }}>
              <ShieldCheck size={28} style={{ color: "var(--accent)" }} />
            </div>
            <p className="section-label" style={{ justifyContent: "center" }}>Respect de la Vie Privée</p>
            <h1 className="text-foreground text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Politique de <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Confidentialité</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-muted-foreground max-w-lg mx-auto font-light">
              Chez XenonDz, la protection et la confidentialité de vos données personnelles sont au cœur de nos engagements.
            </p>
          </div>

          {/* Grid of Sections */}
          <div className="space-y-12">
            
            {/* 1. Responsable du Traitement */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Lock size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  1. Responsable du Traitement
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Les données personnelles collectées dans le cadre de l'activité du site sont traitées sous la responsabilité de :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Responsable :</strong> Rynas Kebdi (Fondateur)
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Contact direct :</strong> <a href="mailto:xenondz.inc@gmail.com" className="text-accent hover:underline">xenondz.inc@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* 2. Données Collectées */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Eye size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  2. Données Collectées & Méthode
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Nous collectons uniquement les informations strictement nécessaires pour répondre à vos demandes commerciales et concevoir vos projets :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span><strong>Formulaire de contact :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, secteur d'activité, budget estimé et description détaillée de votre besoin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span><strong>Données de navigation (Analytics anonymisé) :</strong> Pages visitées, temps de lecture, pays de connexion (via cookies anonymes) afin d'améliorer l'expérience globale du site.</span>
                </li>
              </ul>
            </div>

            {/* 3. Finalité de la collecte */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <HeartHandshake size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  3. Utilisation de vos Données
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Vos données sont collectées et traitées pour les objectifs exclusifs suivants :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span>L'élaboration de devis personnalisés pour vos projets web et automatisations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span>Le suivi relationnel (appels téléphoniques, e-mails de cadrage technique).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span>La gestion des réclamations clients ou des demandes de support.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                <strong>Important :</strong> XenonDz ne vend, ne loue, ni ne partage jamais vos données personnelles à des tiers à des fins publicitaires ou commerciales.
              </p>
            </div>

            {/* 4. Stockage & Sécurité */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Database size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  4. Sécurité & Durée de Conservation
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Toutes les informations soumises via nos formulaires sont centralisées sur une base de données hautement sécurisée, gérée via notre infrastructure <strong>Supabase</strong> avec chiffrement des flux (SSL/HTTPS).
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Les données d'un client potentiel sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter du dernier contact, sauf demande de suppression anticipée de votre part.
              </p>
            </div>

            {/* 5. Cookies & traceurs */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Cookie size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  5. Utilisation des Cookies
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Pour assurer le bon fonctionnement de l'interface, nous utilisons des cookies fonctionnels locaux (sans suivi intrusif) :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span><strong>Theme Cookie :</strong> Mémorise votre préférence d'affichage (Sombre / Clair).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <span><strong>Language Cookie :</strong> Conserve la langue sélectionnée (FR, EN, AR) lors de votre navigation.</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Vous pouvez configurer votre navigateur pour bloquer ces cookies, bien que cela puisse altérer certaines fonctionnalités de confort du site (comme la persistance de la langue sélectionnée).
              </p>
            </div>

          </div>

          {/* Footer Back Button */}
          <div className="text-center mt-16">
            <Link href="/">
              <button className="btn-primary-pro inline-flex items-center px-8 py-3 text-sm text-white rounded-lg">
                Retour à l'accueil
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}