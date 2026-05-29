'use client';

import Link from "next/link";
import { FileText, MapPin, Mail, ShieldAlert, Award, Server } from "lucide-react";
import { SEOHead } from "../components/seo/SEOHead";

export function MentionsLegales() {
  return (
    <>
      <SEOHead
        noIndex={true}
        title="Mentions légales — XenonDz"
        description="Mentions légales de XenonDz, agence digitale basée à Béjaïa, Algérie."
      />
      <div className="w-full py-12 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 hero-animate-1">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, rgba(26,26,110,0.08), rgba(201,168,76,0.08))" }}>
              <FileText size={28} style={{ color: "var(--accent)" }} />
            </div>
            <p className="section-label" style={{ justifyContent: "center" }}>Transparence & Cadre Légal</p>
            <h1 className="text-foreground text-4xl sm:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Mentions <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Légales</em>
            </h1>
            <div className="gold-line gold-line-center" />
            <p className="text-muted-foreground max-w-lg mx-auto font-light">
              Conformément aux réglementations sur la transparence numérique, voici les détails légaux concernant l'édition, l'hébergement et l'activité de XenonDz.
            </p>
          </div>

          {/* Grid of Sections */}
          <div className="space-y-12">
            
            {/* 1. Éditeur de la Plateforme */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  1. Édition du Site
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Le présent site web, accessible à l'adresse <strong>https://xenondz.vercel.app</strong>, est édité par :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Créateur & Éditeur :</strong> Rynas Kebdi
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Forme juridique :</strong> Activité professionnelle indépendante (Services Digitaux)
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Siège Social :</strong> Béjaïa, Algérie
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Directeur de la Publication :</strong> Rynas Kebdi (Founder & Lead Developer)
                </li>
              </ul>
            </div>

            {/* 2. Hébergement */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Server size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  2. Hébergement du Site
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                L'hébergement et la distribution du site web sont assurés de manière hautement sécurisée par :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Prestataire :</strong> Vercel Inc.
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Siège social :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Site web officiel :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>
                </li>
              </ul>
            </div>

            {/* 3. Contact & Communication */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <Mail size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  3. Contact & Support
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Pour toute réclamation, question ou signalement de contenu illicite, notre équipe de support se tient entièrement à votre écoute :
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Adresse Email :</strong> <a href="mailto:xenondz.inc@gmail.com" className="text-accent hover:underline">xenondz.inc@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <strong className="text-muted-foreground">Téléphone Algérie :</strong> <a href="tel:+213794055836" className="text-accent hover:underline">+213 (0) 794 05 58 36</a>
                </li>
              </ul>
            </div>

            {/* 4. Propriété intellectuelle */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <ShieldAlert size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  4. Propriété Intellectuelle
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                L'ensemble du contenu présent sur ce site — y compris les chartes graphiques, maquettes, codes sources, icônes, animations, textes, images de réalisations et logos — est la propriété exclusive de <strong>XenonDz</strong>, sauf indication contraire explicite.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Toute reproduction, distribution ou représentation partielle ou complète de ces éléments, par quelque procédé que ce soit, est strictement interdite sans notre accord préalable écrit et constituerait une contrefaçon sanctionnée par la législation en vigueur.
              </p>
            </div>

            {/* 5. Limitation de Responsabilité */}
            <div className="card-pro">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary dark:text-accent">
                  <MapPin size={20} />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-0" style={{ fontFamily: "var(--font-family)" }}>
                  5. Responsabilité technique & commerciale
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                XenonDz met en œuvre tous les efforts à sa disposition pour garantir la fiabilité des informations présentes sur le site. Cependant, des erreurs ou omissions peuvent survenir. L'utilisateur utilise le site et ses services sous sa seule et entière responsabilité.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Nous nous réservons le droit de modifier le contenu de nos offres, tarifs, réalisations et fiches de services à tout moment et sans préavis.
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