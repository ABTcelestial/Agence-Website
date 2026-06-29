# Architecture du Site — Structure URL et Liens Internes

## Arborescence Recommandée

```
/ (Home)
│
├── /services                           ← Index des services
│   ├── /site-web-vitrine               ✅ Existant
│   ├── /boutique-ecommerce             ✅ Existant
│   ├── /automatisation                 ✅ Existant — renommer/repositionner "sur demande"
│   ├── /referencement-naturel          ✅ Existant
│   ├── /developpement-application      ✅ Existant
│   └── /audit-performance              ✅ Existant
│
├── /solutions                          ← Verticals sectoriels
│   ├── /immobilier                     ✅ Existant
│   ├── /medical                        ✅ Existant
│   ├── /restaurant                     ✅ Existant
│   ├── /mode-ecommerce                 ✅ Existant
│   ├── /scraping-google-maps           ✅ Existant
│   ├── /btp                            🆕 À CRÉER — BTP/Construction
│   └── /juridique                      🆕 À CRÉER — Cabinets juridiques/notaires
│
├── /realisations                       ← Études de cas (portfolio)
│   ├── /[slug]                         🆕 Mininum 3 cas à publier
│   └── (index)                         ✅ Existant
│
├── /blog
│   ├── /[slug]                         ✅ Existant (2+ articles)
│   └── /categorie                      🆕 À CRÉER — index par catégorie
│       ├── /creation-site-web
│       ├── /e-commerce
│       ├── /automatisation
│       ├── /seo
│       └── /developpement
│
├── /about (ou /a-propos)
│   ├── (index)                         ✅ Existant
│   ├── /equipe                         🆕 À CRÉER — team bios + Person schema
│   └── /processus                      🆕 À CRÉER — méthodologie de travail
│
├── /tarifs                             ✅ Existant — fort potentiel SEO
├── /contact                            ✅ Existant
└── /faq                                🆕 À CRÉER — page FAQ autonome avec FAQPage schema
```

**Légende :** ✅ Existant | 🆕 À créer

---

## Pages à Créer (Priorité)

| Page | URL | Priorité | Mot-clé cible |
|------|-----|---------|---------------|
| BTP Solutions | `/solutions/btp` | P1 | "site web entreprise BTP algérie" |
| Juridique Solutions | `/solutions/juridique` | P1 | "site web cabinet juridique algérie" |
| Team/Équipe | `/about/equipe` | P1 | — (E-E-A-T) |
| Page FAQ | `/faq` | P2 | "faq agence web algérie" |
| Catégories Blog | `/blog/categorie/*` | P2 | Navigation + crawlabilité |
| Processus | `/about/processus` | P3 | — (confiance) |

---

## Matrice de Liens Internes

### Règle par type de page

| Page source | Doit lier vers |
|------------|---------------|
| `/services/*` | `/solutions/*` (1-2 secteurs pertinents) + `/realisations/*` (1 cas) + `/tarifs` + article blog pillar |
| `/solutions/*` | `/services/*` parent + `/realisations/*` (1 cas) + `/contact` |
| `/blog/*` | `/services/*` concerné (ancre CTA) + 2-3 articles connexes |
| `/realisations/*` | `/services/*` utilisé + `/solutions/*` du secteur + `/contact` |
| `/tarifs` | Tous les `/services/*` + `/contact` + `/faq` |
| `/faq` | `/services/*` concernés + `/contact` + `/tarifs` |

### Ancres recommandées (FR)

| Destination | Ancre à utiliser |
|-------------|-----------------|
| `/services/automatisation` | "automatisation sur demande", "automatiser vos processus" |
| `/services/site-web-vitrine` | "création de site web professionnel", "site vitrine sur mesure" |
| `/tarifs` | "voir nos tarifs", "découvrir nos prix", "demander un devis" |
| `/contact` | "prendre contact", "demander une démonstration", "nous contacter" |
| `/realisations/*` | "voir l'étude de cas", "découvrir le projet" |

---

## Structure Schema par Type de Page

| Type de page | Schema recommandés |
|-------------|-------------------|
| Homepage | `Organization`, `ProfessionalService`, `LocalBusiness` |
| `/services/*` | `Service`, `FAQPage`, `BreadcrumbList` |
| `/solutions/*` | `Service`, `FAQPage`, `BreadcrumbList` |
| `/realisations/*` | `Article`, `BreadcrumbList` |
| `/blog/*` | `BlogPosting`, `Article`, `BreadcrumbList`, `FAQPage` (si FAQ présente) |
| `/about/equipe` | `Person` × N, `ProfilePage` |
| `/tarifs` | `Offer`, `PriceSpecification`, `FAQPage` |
| `/faq` | `FAQPage` |

---

## Considérations Multilingues

Le site utilise actuellement un switcheur côté client sans URLs distinctes.

### Option A — Status quo amélioré (court terme)
- Garder les URLs uniques
- Ajouter hreflang pointant vers la même URL pour fr-DZ, ar-DZ, x-default
- Avantage : zéro refonte d'architecture
- Limite : Google ne peut pas indexer la version arabe séparément

### Option B — Sous-répertoires (recommandé, long terme)
```
/fr/services/...   (default, actuel → redirect)
/ar/services/...   (nouvelle arborescence)
```
- Avantage : indexation complète des deux langues
- Effort : restructuration Next.js avec i18n routing natif (next-intl ou next.config i18n)
- À envisager en Phase 4 quand le contenu arabe atteint 20+ pages

---

## Sitemap Priorités

| URL pattern | Changefreq | Priority |
|-------------|------------|---------|
| `/` | weekly | 1.0 |
| `/services/*` | monthly | 0.9 |
| `/solutions/*` | monthly | 0.9 |
| `/tarifs` | monthly | 0.8 |
| `/realisations/*` | monthly | 0.8 |
| `/blog/*` | weekly | 0.7 |
| `/blog/categorie/*` | weekly | 0.6 |
| `/about/*` | yearly | 0.5 |
| `/contact` | yearly | 0.6 |
| `/faq` | monthly | 0.6 |
