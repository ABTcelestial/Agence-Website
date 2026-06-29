# Feuille de Route d'Implémentation SEO

## Vue d'Ensemble

```
Phase 1 (Semaines 1-2)  →  Corrections techniques critiques
Phase 2 (Semaines 3-6)  →  Fondations contenu
Phase 3 (Semaines 7-16) →  Autorité et backlinks
Phase 4 (Mois 5-12)     →  Échelle et programmatique
```

---

## Phase 1 : Corrections Techniques Critiques (Semaines 1-2)

### 1.1 Hreflang — PRIORITÉ MAXIMALE

**Problème :** Le site utilise le changement de langue côté client (localStorage) sans URLs distinctes ni tags hreflang. Google ne comprend pas les variantes linguistiques.

**Fichiers à modifier :**
- `src/app/layout.tsx` — ajouter les alternates dans `metadata`
- `src/app/sitemap.ts` (ou `sitemap.xml`) — ajouter les `<xhtml:link>` alternates

**Implémentation dans le metadata Next.js :**
```typescript
alternates: {
  languages: {
    'fr-DZ': 'https://votredomaine.dz',
    'ar-DZ': 'https://votredomaine.dz',
    'x-default': 'https://votredomaine.dz',
  },
},
```

> Note : Si les URLs restent identiques pour toutes les langues (switcheur client), l'hreflang doit pointer vers la même URL avec des signaux de contenu différenciés. L'idéal serait des sous-répertoires (`/fr/`, `/ar/`) mais cela est un changement d'architecture majeur à envisager en Phase 4.

### 1.2 Schema LocalBusiness — Compléter

**Problème :** Le schema LocalBusiness est présent mais incomplet (manque adresse, téléphone, horaires).

**À ajouter :**
```json
{
  "@type": ["ProfessionalService", "LocalBusiness"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADRESSE]",
    "addressLocality": "Alger",
    "addressRegion": "Alger",
    "postalCode": "[CODE POSTAL]",
    "addressCountry": "DZ"
  },
  "telephone": "+213[NUMERO]",
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": "DZ",
  "currenciesAccepted": "DZD"
}
```

### 1.3 FAQPage Schema sur les Pages Services

**Fichiers cibles :** `src/app/services/[slug]/page.tsx`

Ajouter un composant `FAQSchema` avec 4-6 questions/réponses par service. Utiliser le schema JSON-LD :
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Combien coûte une création de site web en Algérie ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "..."
    }
  }]
}
```

### 1.4 Créer `llms.txt`

Créer `/public/llms.txt` (accessible à `https://domaine/llms.txt`) :

```
# Xenon — Agence Digitale B2B Algérie

## Services
- Création de sites web professionnels pour entreprises algériennes
- Automatisations sur demande : RH, facturation, e-commerce, processus métier
- Développement d'applications et logiciels sur mesure
- Référencement naturel (SEO) en français et arabe
- Audit et optimisation de performance web

## Secteurs
Immobilier, médical, restauration, mode, juridique, BTP, toutes PME

## Contact
Email: [EMAIL]
Téléphone: +213[NUMERO]
Adresse: Alger, Algérie

## À propos
Agence digitale algérienne spécialisée dans la transformation numérique des PME.
Fondée à Alger, nous travaillons exclusivement avec des entreprises algériennes.
```

### 1.5 Google Business Profile (Action manuelle)

- Aller sur business.google.com
- Créer/réclamer la fiche avec nom, adresse, téléphone, site, catégorie "Agence de marketing digital"
- Ajouter photos (bureau, équipe, projets)
- Activer la messagerie
- Viser 10+ avis Google dans les 3 premiers mois

---

## Phase 2 : Fondations Contenu (Semaines 3-6)

### 2.1 Trois Articles Cornerstone (FR)

Publier dans cet ordre de priorité :

1. **"Prix création site web algérie 2026"** — cible `prix création site web algérie`
   - Tableaux comparatifs (vitrine vs e-commerce vs app)
   - Détail de ce qui justifie les prix
   - FAQ intégrée
   - CTA vers `/tarifs`

2. **"Guide SEO algérie 2026"** — cible `SEO algérie guide`
   - Guide complet 2 000+ mots
   - Spécificités du marché algérien
   - Sous-sections pour AI Overviews

3. **"10 automatisations concrètes pour entreprises algériennes"** — cible `automatisation entreprise algérie`
   - Exemples réels par secteur (immobilier, restaurant, juridique, etc.)
   - Pas seulement lead gen — facturation, RH, suivi commandes, reporting
   - Ancre vers `/services/automatisation`

### 2.2 Deux Nouvelles Pages Industrie

- `/solutions/btp` — secteur BTP/construction
- `/solutions/juridique` — cabinets juridiques et notaires

Chaque page : 800+ mots, défis sectoriels, fonctionnalités spécifiques, étude de cas, FAQPage schema.

### 2.3 Page Équipe

Créer `/about/equipe` :
- Photos professionnelles
- Bios (rôle, expérience, spécialisation)
- Schema `Person` avec `sameAs` LinkedIn
- ProfilePage schema

### 2.4 Premier Article en Arabe

Cible : `إنشاء موقع إلكتروني الجزائر`

- Adaptation culturelle (pas traduction mécanique)
- Vérification RTL
- Hreflang `ar-DZ`

---

## Phase 3 : Autorité et Backlinks (Semaines 7-16)

### 3.1 Trois Études de Cas

Publier dans `/realisations/[slug]` :
- **Cas 1 :** Client site web (secteur au choix) — métriques trafic, temps de chargement
- **Cas 2 :** Client automatisation — temps économisé, processus remplacés, ROI
- **Cas 3 :** Client application — nombre d'utilisateurs, fonctionnalités livrées

Format : résumé + contexte + défi + solution + résultats chiffrés + témoignage.
Schema : `Article` + référence au service.

### 3.2 Annuaires et Citations Locales

Soumettre NAP (Nom, Adresse, Téléphone) de manière identique sur :
- YallaLouise
- Annuaire Algérie Pro
- Yelp Algérie (si actif)
- LinkedIn Company Page
- Pages Jaunes DZ
- Portail associations sectorielles (CAWEB, CCI Alger)

### 3.3 Audit des Liens Internes

Règles à appliquer :
- Chaque article de blog → lien vers la page service correspondante
- Chaque page service → lien vers 2-3 solutions sectorielles et 1 étude de cas
- Page `/tarifs` → accessible depuis chaque CTA service
- `/blog` → liens vers les catégories

### 3.4 Outreach Backlinks

Cibles pour guest posts / mentions :
- Startups.dz, TechAlgerie, CAWEB.dz
- LinkedIn Algeria Business groups
- Associations : CAM (Confédération Algérienne du Patronat), CCI Alger
- Médias économiques algériens : El Watan Économie, Liberté Économie

---

## Phase 4 : Échelle et Programmatique (Mois 5-12)

### 4.1 SEO Programmatique par Ville

Créer des pages `service × ville` :
```
/services/site-web-oran
/services/site-web-constantine
/services/site-web-annaba
/services/agence-web-setif
/services/automatisation-oran
```

Template unique + contenu dynamique par ville (population, tissu économique, secteurs dominants).

### 4.2 Expansion Contenu Arabe

Passer à 2 articles/mois en arabe. Prioriser :
- Articles ciblant les chercheurs hors Alger
- Traductions adaptées des cornerstones FR

### 4.3 Contenu Vidéo

- YouTube : 1 vidéo/mois en FR ou AR (tutoriels, présentation client, coulisses)
- Embed sur les pages services concernées
- Transcript en texte → contenu SEO supplémentaire

### 4.4 Étude Originale Annuelle

Publier "État du digital des PME algériennes" — enquête + analyse.
Objectif : PR naturel, citations par les médias, autorité E-E-A-T.

### 4.5 Optimisation AI Overviews

- Reformater les H2 en questions directes
- Réponse courte (2-3 phrases) immédiatement après chaque H2
- Tableaux récapitulatifs en fin d'article
- Listes à puces pour les étapes et comparatifs

---

## Checklist de Vérification

### Après Phase 1
- [ ] Hreflang visible dans le `<head>` de chaque page (inspecter le HTML)
- [ ] Schema LocalBusiness testé sur [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] `https://[domaine]/llms.txt` accessible et lisible
- [ ] Sitemap à jour avec nouvelles pages

### Après Phase 2
- [ ] 3 articles de blog publiés et indexés (Google Search Console)
- [ ] 2 nouvelles pages industrie dans le sitemap
- [ ] Page équipe avec schema Person validé

### Après Phase 3
- [ ] 3 études de cas publiées
- [ ] NAP cohérent sur tous les annuaires
- [ ] Minimum 5 backlinks externes acquis

### Mensuel (récurrent)
- [ ] `npx next build` sans erreurs metadata
- [ ] Lighthouse mobile ≥ 90 sur les pages principales
- [ ] Google Search Console — aucune erreur de couverture critique
- [ ] Sitemap soumis à Bing Webmaster Tools
