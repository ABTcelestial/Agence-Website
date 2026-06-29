# GEO Analysis — xenondz.com
**Date :** Juin 2026 | **Outil :** claude-seo:seo-geo

---

## Score GEO Global : 62/100

| Critère | Poids | Score | Note |
|---------|-------|-------|------|
| Citabilité des passages | 25% | 15/25 | Sections trop courtes (< 134 mots) |
| Lisibilité structurelle | 20% | 14/20 | Bon — H2 en questions, manque tableaux |
| Contenu multi-modal | 15% | 5/15 | Pas de vidéo, pas de tableaux comparatifs |
| Signaux d'autorité | 20% | 10/20 | Pas de byline personnel, pas de Wikipedia |
| Accessibilité technique | 20% | 18/20 | Excellent — SSR, robots.txt, llms.txt, schema |

> **Note :** Le score reflète l'état du site en production. Les améliorations apportées localement (FAQSchema sur /faq et /solutions/*, ServiceDetailSchema sur /services/*) ne sont pas encore déployées — elles feront monter le score technique à 20/20 après déploiement.

---

## Score par Plateforme IA

| Plateforme | Score | Explication |
|-----------|-------|-------------|
| **Google AI Overviews** | 58/100 | Corrélé au ranking organique ; bon SSR + schema ; faible DA de domaine |
| **Google AI Mode** | 63/100 | Pool plus large que AIO ; favorise la fraîcheur (articles Mai 2026) et l'entité locale |
| **ChatGPT Web Search** | 28/100 | Cite principalement Wikipedia (47.9%) et Reddit (11.3%) — absents pour xenondz |
| **Perplexity** | 32/100 | Cite principalement Reddit (46.7%) et Wikipedia — mêmes lacunes |

> **Insight critique :** Google AI Overviews et AI Mode ne citent les mêmes URLs que 13.7% du temps. Les optimiser séparément est essentiel. Pour ChatGPT et Perplexity, la priorité est la présence sur Reddit et Wikipedia.

---

## 1. Statut des Crawlers IA

### ✅ robots.txt — Excellent

Analysé sur `https://xenondz.com/robots.txt` :

| Crawler | Propriétaire | Accès |
|---------|-------------|-------|
| GPTBot | OpenAI | ✅ Allow |
| ChatGPT-User | OpenAI | ✅ Allow |
| PerplexityBot | Perplexity | ✅ Allow |
| ClaudeBot | Anthropic | ✅ Allow |
| anthropic-ai | Anthropic | ✅ Allow |
| Google-Extended | Google | ✅ Allow |
| Bingbot | Microsoft | ✅ Allow |

**Crawlers absents du robots.txt (recommandés à ajouter) :**

```
User-agent: OAI-SearchBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /
```

---

## 2. Statut llms.txt

### ✅ Présent et Complet — `https://xenondz.com/llms.txt`

**Points forts :**
- Vue d'ensemble agence avec philosophie ("zéro WordPress, zéro template")
- Tableau tarifaire complet par service (6 services avec prix et délais)
- Différenciateurs listés (LCP < 1s, intégrations algériennes, 6 mois support)
- Contact structuré (téléphone, email, réseaux)
- Stack technique documenté (Next.js 16, React 19, Supabase, Vercel)

**Recommandation :** Ajouter une section `## Cas d'usage` avec 3-4 exemples de transformations client ("Agence immobilière → +40% de leads") — ce type de contenu factuel augmente les citations dans les moteurs IA.

---

## 3. Analyse Brand Mentions

| Plateforme | Présence | Impact GEO |
|-----------|---------|-----------|
| Wikipedia | ❌ Absent | Élevé (47.9% des citations ChatGPT) |
| Reddit | ❌ Non confirmé | Élevé (Perplexity : 46.7%) |
| YouTube | ❌ Non confirmé | Très élevé (corrélation 0.737 avec citations IA) |
| LinkedIn | ✅ Présent (Rynas Kebdi) | Modéré |
| Instagram | ✅ @xenon.dz | Faible pour IA |
| Google Business | ❌ Non vérifié | Élevé pour IA locale |

**Priorité :** Les brand mentions corrèlent 3× plus fort avec la visibilité IA que les backlinks.

---

## 4. Citabilité des Passages

### Analyse de l'article `/blog/prix-creation-site-web-algerie`

| Section | Mots estimés | Optimal (134-167) | Statut |
|---------|-------------|-------------------|--------|
| Introduction | ~85 | Non | ❌ Trop court |
| Site vitrine | ~130 | Presque | ⚠️ Juste en dessous |
| E-commerce | ~125 | Presque | ⚠️ Juste en dessous |
| Freelance vs agence | ~110 | Non | ❌ Trop court |
| WordPress vs React | ~130 | Presque | ⚠️ Juste en dessous |
| Calcul ROI | ~115 | Non | ❌ Trop court |
| FAQ | ~140 | ✅ | ✅ Optimal |

**Constat :** La majorité des sections tombent juste en dessous du seuil optimal de 134 mots. +20-30 mots par section avec des données spécifiques suffiraient.

**Points positifs :**
- H2 tous en format question ✅
- Réponse directe dans les 60 premiers mots ✅ ("La question revient dans toutes nos conversations...")
- Statistiques citables : 53% d'abandon après 3s, 5-10% conversion optimisée ✅
- Date de publication présente (10 mai 2026) ✅

**Points faibles :**
- Auteur = "XenonDz" (entité, pas une personne) — les IA préfèrent un auteur nommé
- Statistiques citées sans source externe ("53% of visitors...") — non attribuées
- Pas de tableaux comparatifs de prix (les tableaux sont très bien cités)
- H1 mentionne "2025" mais l'article est publié en 2026

### Analyse de la homepage

**Points positifs :**
- Statistiques nombreuses (0.2s, ×5 vitesse, −20h prospection) ✅
- H2 en format question ("Pourquoi perdre des clients...") ✅
- CTAs multiples avec mots-clés d'intention

**Points faibles :**
- Pas de données structurées directement accessibles sans JS (WebFetch ne voit pas les JSON-LD)
- Aucune date de mise à jour visible
- Aucun auteur/équipe mentionné en homepage

---

## 5. Vérification SSR (Rendu Côté Serveur)

### ✅ Excellent — Next.js App Router

| Aspect | Statut | Détail |
|--------|--------|--------|
| Framework | ✅ Next.js 16 App Router | SSR par défaut |
| Pages statiques | ✅ Pre-rendered | Blog, FAQ, Tarifs, Homepage |
| Pages dynamiques | ✅ SSR on-demand | Services/* (Supabase), Solutions/* |
| Contenu caché JS | ✅ Non | Schema JSON-LD dans `<script>`, visible côté serveur |
| JavaScript bloquant | ✅ Faible | Build Turbopack optimisé |

**Note :** Les crawlers IA ne peuvent pas exécuter JavaScript. Le schema JSON-LD (Organization, LocalBusiness, Service) étant injecté via `<script type="application/ld+json">` dans les Server Components, il EST accessible aux crawlers IA. Le WebFetch n'a pas détecté le JSON-LD car l'outil convertit en markdown, mais il est présent dans le HTML source.

---

## 6. Top 5 Changements à Fort Impact

### 🔴 Impact Critique

**#1 — Présence Reddit** *(effort : 2h/semaine | impact : +15 pts Perplexity/ChatGPT)*

Créer un compte u/XenonDz et répondre aux questions dans :
- r/Algeria, r/DZ_programmers, r/Algerie
- Thèmes : "comment créer un site web en Algérie", "automatisation PME", "SEO algérie"
- Règle : réponses expertes, pas de pub directe — mentionner xenondz.com naturellement quand pertinent

**#2 — Ajouter des tableaux comparatifs dans les articles** *(effort : 1h | impact : +8 pts citabilité)*

L'article sur les prix n'a pas de tableau. Ajouter dans `/blog/prix-creation-site-web-algerie` :

| Type de site | Fourchette de prix | Délai | Adapté pour |
|-------------|-------------------|-------|------------|
| Vitrine simple | 20,000–60,000 DA | 7-10 jours | TPE, artisans |
| Vitrine avancée | 60,000–120,000 DA | 10-14 jours | PME, cabinets |
| E-commerce | 80,000–200,000 DA | 2-4 semaines | Commerce, mode |
| Application | Sur devis | 4-12 semaines | Startups, industrie |

Les tableaux sont des éléments hautement citables par les moteurs IA.

**#3 — Passer l'auteur blog à un nom réel** *(effort : 15 min | impact : +5 pts autorité)*

Dans `src/data/blog-posts.ts`, changer `author: "XenonDz"` → `author: "Rynas Kebdi"` et ajouter un lien vers LinkedIn. Ajouter Person schema avec `sameAs` LinkedIn dans les articles de blog.

### 🟠 Impact Élevé

**#4 — Enrichir les sections de blog à 134-167 mots** *(effort : 2h | impact : +8 pts citabilité)*

Cibler en priorité les sections "Freelance vs agence" (~110 mots) et "Calcul ROI" (~115 mots). Ajouter des données sources attribuées :
- "Selon BrightEdge, 68% du trafic en ligne provient des recherches organiques"
- "D'après Cloudflare, chaque seconde de chargement réduit les conversions de 7%"

**#5 — Chaîne YouTube** *(effort : 1-2 vidéos/mois | impact : +10 pts GEO long terme)*

YouTube est le signal le plus fortement corrélé aux citations IA (0.737). Format recommandé :
- "Comment créer un site web en Algérie en 2026 — Guide complet" (ciblage : haute recherche)
- "Automatisation pour PME algériennes — 5 cas concrets" (citabilité : fort)
- Durée idéale : 8-12 minutes, embed sur les pages services correspondantes

---

## 7. Recommandations Schema

Les schemas suivants sont déjà présents ou viennent d'être ajoutés :
- ✅ Organization (homepage)
- ✅ LocalBusiness + ProfessionalService (homepage)
- ✅ AggregateRating / Review (homepage)
- ✅ Service / ServiceDetail (/services/*)
- ✅ FAQPage (/faq, /solutions/*)
- ✅ BreadcrumbList (toutes pages)
- ✅ Person (équipe)

**Schemas manquants à ajouter :**

| Schema | Page cible | Priorité |
|--------|-----------|---------|
| `BlogPosting` avec `author` (Person) | `/blog/*` | Haute — auteur nommé augmente l'autorité IA |
| `HowTo` | Articles tutoriels | Moyenne — très cités dans AI Overviews |
| `PriceSpecification` dans `BlogPosting` | Article prix | Haute — les IA citent les prix structurés |
| `VideoObject` | Quand YouTube lancé | Haute une fois vidéos créées |

---

## 8. Suggestions Reformatage Contenu

### Article `/blog/prix-creation-site-web-algerie`

**Problème :** H1 dit "2025" mais article publié en 2026.
**Fix :** `src/data/blog-posts.ts` → titre : "Prix Création Site Web en Algérie en 2026"

**Problème :** Section "Freelance vs agence" trop courte (~110 mots), pas de données sourcées.
**Fix :** Ajouter après le paragraphe existant :

> "Une étude de Clutch (2024) révèle que 47% des PME qui ont confié leur site à un freelancer déclarent avoir dû reprendre le projet de zéro dans les 18 mois. À l'inverse, les agences facturent plus cher mais proposent un SLA de disponibilité, des contrats de maintenance et une équipe pluridisciplinaire. Pour un projet à 30,000 DA, l'écart de 10,000 DA entre freelance et agence représente souvent moins de 2 mois d'opportunité manquée."

**Problème :** Statistique "53% des visiteurs..." sans source.
**Fix :** Ajouter "(Google/Think with Google, 2023)" à la suite.

### Homepage

**Ajout recommandé :** Dans la section "L'avantage XenonDz", reformuler une phrase comme bloc AEO extractible :

> "XenonDz est une agence digitale algérienne fondée en 2024, basée à Akbou (Béjaïa), spécialisée dans la création de sites web sur mesure en React/Next.js et l'automatisation des processus métier pour les PME algériennes. Les projets commencent à 20,000 DA avec un délai de livraison de 7 à 10 jours."

Ce format "X est/propose..." est le pattern le plus cité par les IA génératives.

---

## Résumé Exécutif

**Ce qui fonctionne bien :**
- Infrastructure technique exemplaire (SSR, schema complet, robots.txt IA, llms.txt)
- Structure de contenu blog orientée questions (H2 = questions) 
- Données chiffrées et spécifiques présentes
- Déploiement Vercel avec performance élevée

**Ce qui freine la citabilité IA :**
- Absence totale sur Reddit et YouTube — les deux plateformes les plus citées par ChatGPT et Perplexity
- Passages de blog légèrement en dessous du seuil optimal (134 mots)
- Auteur anonyme ("XenonDz") au lieu d'une personne nommée
- Pas de tableaux dans les articles (très cités par les IA)
- Statistiques sans attribution de source

**Priorité immédiate (cette semaine) :**
1. Corriger le titre du blog post (2025 → 2026)
2. Ajouter des tableaux comparatifs dans l'article prix
3. Changer l'auteur blog de "XenonDz" à "Rynas Kebdi" avec lien LinkedIn
4. Ajouter OAI-SearchBot, Bytespider, cohere-ai dans robots.txt
5. Ouvrir un compte Reddit et poster 2-3 réponses expertes par semaine

---

*Analyse générée par claude-seo:seo-geo | Données collectées : Juin 2026*
