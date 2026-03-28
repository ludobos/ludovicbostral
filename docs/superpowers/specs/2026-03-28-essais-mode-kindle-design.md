# Spec : Section Essais — Mode Kindle

## Objectif

Publier l'essai "La France est-elle un pays de sport ?" sur bostral.com/essais avec une expérience de lecture immersive type Kindle, un SEO/GEO poussé au maximum, et des téléchargements PDF + ePub. La structure doit accueillir d'autres essais à l'avenir.

---

## Structure des fichiers

```
/essais/
├── index.html                                    # Page catalogue des essais
├── essais.css                                    # Styles partagés (catalogue + reader)
├── essais.js                                     # JS partagé (navigation, mode sombre, TOC)
│
└── la-france-est-elle-un-pays-de-sport/
    ├── index.html                                # Landing : résumé + TOC + chiffres clés
    ├── 1-definition-pays-de-sport.html
    ├── 2-densite-francaise.html
    ├── 3-puissance-collective.html
    ├── 4-desert-individuel.html
    ├── 5-france-forme-etranger-eleve.html
    ├── 6-calque-educatif.html
    ├── 7-comment-tweaker.html
    ├── 8-conclusion.html
    ├── bibliographie.html
    │
    ├── la-france-est-elle-un-pays-de-sport.pdf   # PDF existant (copié depuis france-sport-data)
    ├── la-france-est-elle-un-pays-de-sport.epub  # ePub généré via pandoc
    │
    └── img/
        ├── og-cover.jpg                          # Image Open Graph 1200x630
        ├── 01-ratio-medailles-licencies.png      # 8 graphiques existants
        ├── 02-uk-sport-trajectoire.png
        ├── 03-decrochage-jeunes.png
        ├── 04-paris2024-genre.png
        ├── 05-cout-france-uk.png
        ├── 06-profondeur-selections.png
        ├── 07-ou-va-largent.png
        ├── 08-taxonomie-monopole.png
        ├── infographie-flux-export.svg           # NOUVEAU : flux athlètes FR → étranger
        └── infographie-4-modeles.svg             # NOUVEAU : FR vs US vs CN vs URSS
```

### Contenu source

L'essai complet est dans `/Users/ludovicbostral/france-sport-data/output/essai/00-essai-complet.md` (1 299 lignes, ~45 000 mots). Il est structuré en chapitres markdown séparés par des `# Titre`. Les chapitres individuels existent aussi dans des fichiers séparés (`00-introduction.md` à `09-bibliographie.md`).

### Mapping chapitres → fichiers HTML

| # | Titre dans le markdown | Fichier HTML | Lignes source |
|---|---|---|---|
| — | Résumé + Introduction | `index.html` (landing) | 1–55 |
| 1 | Qu'est-ce qu'un pays de sport ? | `1-definition-pays-de-sport.html` | 56–162 |
| 2 | La densité française | `2-densite-francaise.html` | 163–259 |
| 3 | La puissance collective | `3-puissance-collective.html` | 260–374 |
| 4 | Le désert individuel et ses exceptions | `4-desert-individuel.html` | 375–595 |
| 5 | La France forme, l'étranger élève | `5-france-forme-etranger-eleve.html` | 596–716 |
| 6 | Le calque éducatif | `6-calque-educatif.html` | 717–949 |
| 7 | Comment tweaker le système | `7-comment-tweaker.html` | 950–1183 |
| 8 | Conclusion | `8-conclusion.html` | 1184–1238 |
| — | Bibliographie | `bibliographie.html` | 1239–fin |

---

## Expérience de lecture "Mode Kindle"

### Typographie et mise en page

- Police : `Georgia, 'Times New Roman', serif`
- Colonne : `max-width: 680px`, centrée, `margin: 0 auto`
- Taille : `19px` desktop, `17px` mobile (breakpoint 768px)
- Interligne : `line-height: 1.85`
- Fond clair : `#faf8f5` (papier chaud e-ink)
- Texte clair : `#2c2c2c` (pas noir pur)
- Marges verticales : `padding: 80px 24px` autour du contenu principal
- Titres `<h1>` : même serif, `font-size: 2.2rem`, `margin-bottom: 0.5em`
- Sous-titres `<h2>` : `1.4rem`, `margin-top: 2.5em`
- Citations `<blockquote>` : bordure gauche `3px solid #ccc`, italique, retrait
- Tableaux : bordures fines, responsive (scroll horizontal mobile)

### Mode sombre

- Toggle : bouton 🌙/☀️ en haut à droite du reader, persisté en `localStorage` sous la clé `essais-dark-mode`
- Fond sombre : `#1a1a1a`
- Texte sombre : `#d4c5a9` (sépia sur noir — mode Kindle nuit)
- Images : légère réduction d'opacité (`opacity: 0.9`) pour ne pas éblouir
- SVG infographies : couleurs via `currentColor` ou CSS custom properties, s'adaptent automatiquement

### Navigation entre chapitres

- **Barre de progression** (sticky top, 48px) :
  - Texte centré : "Chapitre 3 sur 8 · ~12 min"
  - Barre de progression fine (3px) sous le texte, proportionnelle au chapitre courant
  - Clic sur le texte → ouvre la table des matières en overlay
  - Bouton mode sombre 🌙/☀️ à droite
  - Bouton PDF/ePub discret à gauche (icône 📥)

- **Navigation bas de page** :
  - `← Chapitre précédent : [titre]` / `Chapitre suivant : [titre] →`
  - Le premier chapitre a seulement → ; le dernier a seulement ←
  - Après le dernier chapitre, lien vers bibliographie

- **Raccourcis clavier** : flèches ← → pour naviguer entre chapitres

- **Table des matières overlay** :
  - Déclenchée par clic sur la barre de progression
  - Liste des chapitres avec temps de lecture estimé
  - Chapitre courant mis en surbrillance
  - Lien vers PDF/ePub en bas de l'overlay
  - Fermeture par clic extérieur ou touche Escape

### Temps de lecture

Calculé à 250 mots/minute. Affiché par chapitre dans la barre de progression et dans la TOC.

---

## Infographies et graphiques

### 8 graphiques PNG existants — placement

| Graphique | Chapitre | Position dans le texte |
|---|---|---|
| 01 Ratio médailles/licenciés | Landing page + Ch.1 | Après le paragraphe sur l'efficience olympique |
| 02 UK Sport trajectoire | Ch.7 Comment tweaker | Après la section UK Sport |
| 03 Décrochage des jeunes | Ch.2 Densité française | Après les données sur la pratique par âge |
| 04 Paris 2024 par genre | Ch.3 Puissance collective | Après le bilan Paris 2024 |
| 05 Coût France vs UK | Ch.7 Comment tweaker | Après la comparaison budgétaire |
| 06 Profondeur du vivier | Ch.3 Puissance collective | Après la section sports collectifs |
| 07 Où va l'argent | Ch.7 Comment tweaker | Après la section budget ANS |
| 08 Taxonomie monopole | Ch.6 Calque éducatif | Après la section sur le monopole fédéral |

### 2 infographies SVG à créer

**1. Flux d'export (Ch.5 — France forme, étranger élève)**

Schéma de type sankey simplifié montrant :
- À gauche : "Clubs français" (avec exemples : Flash de La Courneuve, CN Toulouse, Stade Bordelais, etc.)
- Au centre : les athlètes
- À droite : les destinations (NCAA, WorldTour, NBA/NFL, micro-pôles d'exception)
- Exemples nommés sur chaque flux : Marchand → ASU, Seremes → Texas Tech, Magnier → Soudal Quick-Step, Wembanyama → Spurs
- Couleurs : bleu (FR) → rouge/blanc/bleu dégradé → couleur destination

**2. Les 4 modèles comparés (Ch.1 — Définition)**

Tableau visuel ou radar chart comparant :
- France : densité A+, collectif A+, individuel C, détection D
- USA : marché A+, NCAA A+, per capita D, soutien gov. F
- Chine : élite A, médailles ciblées A+, masse F, éthique D
- UK : concentration A, cycle court A, durabilité C

Format : tableau stylisé avec des barres colorées ou des lettres-notes type Aspen Institute.

### Présentation des images dans le reader

- `max-width: 100%` de la colonne (680px)
- `border-radius: 4px`
- Légende `<figcaption>` sous chaque image : description + source des données
- `loading="lazy"` sur toutes les images
- `alt` descriptif complet pour l'accessibilité et le SEO images

---

## SEO

### Meta tags (par page de chapitre)

```html
<title>La France est-elle un pays de sport ? — Ch.3 : La puissance collective | Ludovic Bostral</title>
<meta name="description" content="[résumé spécifique au chapitre, 150 caractères max]">
<meta name="author" content="Ludovic Bostral">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/3-puissance-collective.html">
<link rel="prev" href="2-densite-francaise.html">
<link rel="next" href="4-desert-individuel.html">
<html lang="fr">
```

### Open Graph / Twitter Cards

Identiques sur toutes les pages de l'essai (partage = toujours la même card accrocheuse) :

```html
<meta property="og:type" content="article">
<meta property="og:title" content="La France est-elle un pays de sport ?">
<meta property="og:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part. Un essai de Ludovic Bostral.">
<meta property="og:image" content="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg">
<meta property="og:url" content="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Ludovic Bostral">
<meta property="article:author" content="https://www.linkedin.com/in/ludovicbostral">
<meta property="article:published_time" content="2026-03-28">
<meta property="article:section" content="Sport">
<meta property="article:tag" content="sport,France,Paris 2024,INSEP,politique sportive">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="La France est-elle un pays de sport ?">
<meta name="twitter:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part.">
<meta name="twitter:image" content="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg">
```

### Schema.org JSON-LD

**Sur la landing page de l'essai :**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "La France est-elle un pays de sport ?",
  "alternativeHeadline": "Formation, densité, et l'incapacité à élever",
  "author": {
    "@type": "Person",
    "name": "Ludovic Bostral",
    "url": "https://www.bostral.com",
    "sameAs": ["https://www.linkedin.com/in/ludovicbostral", "https://streamingradar.substack.com"]
  },
  "publisher": {
    "@type": "Person",
    "name": "Ludovic Bostral"
  },
  "datePublished": "2026-03-28",
  "dateModified": "2026-03-28",
  "inLanguage": "fr",
  "wordCount": 45000,
  "about": [
    "Sport en France",
    "Politique sportive française",
    "Paris 2024",
    "INSEP",
    "NCAA",
    "Formation sportive"
  ],
  "spatialCoverage": {
    "@type": "Place",
    "name": "France"
  },
  "hasPart": [
    {
      "@type": "Article",
      "name": "Qu'est-ce qu'un pays de sport ?",
      "url": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/1-definition-pays-de-sport.html",
      "position": 1
    }
  ],
  "associatedMedia": [
    {
      "@type": "MediaObject",
      "encodingFormat": "application/pdf",
      "contentUrl": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.pdf",
      "name": "Télécharger en PDF"
    },
    {
      "@type": "MediaObject",
      "encodingFormat": "application/epub+zip",
      "contentUrl": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub",
      "name": "Télécharger en ePub"
    }
  ]
}
```

**Sur chaque page de chapitre :**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Titre du chapitre]",
  "author": { "@type": "Person", "name": "Ludovic Bostral" },
  "datePublished": "2026-03-28",
  "inLanguage": "fr",
  "isPartOf": {
    "@type": "Article",
    "name": "La France est-elle un pays de sport ?",
    "url": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/"
  },
  "position": 3
}
```

**Fil d'Ariane (BreadcrumbList) sur chaque page :**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.bostral.com" },
    { "@type": "ListItem", "position": 2, "name": "Essais", "item": "https://www.bostral.com/essais/" },
    { "@type": "ListItem", "position": 3, "name": "La France est-elle un pays de sport ?", "item": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/" },
    { "@type": "ListItem", "position": 4, "name": "La puissance collective" }
  ]
}
```

---

## GEO targeting

```html
<meta name="geo.region" content="FR">
<meta name="geo.placename" content="France">
<meta name="DC.language" content="fr">
<meta name="DC.subject" content="Sport;Politique sportive;Paris 2024;INSEP">
```

Pas de `hreflang` multi-langue : l'essai est un contenu éditorial français, pas destiné à être traduit.

Le Schema.org `spatialCoverage` (voir ci-dessus) renforce le signal géographique pour Google.

---

## Page catalogue `/essais/index.html`

- Schema.org `CollectionPage` avec `hasPart`
- Une card par essai contenant :
  - Titre + sous-titre
  - Date de publication
  - Temps de lecture total (~45 min)
  - Nombre de chapitres (8)
  - Accroche (2 lignes du résumé)
  - Liens PDF / ePub
  - Bouton "Lire →"
- Design : sobre, même fond `#faf8f5`, même typo serif
- La page est prête pour accueillir d'autres essais (la card est un pattern réutilisable)

---

## Téléchargements

### PDF
Le PDF existant (`la-france-est-elle-un-pays-de-sport.pdf`) est copié depuis `france-sport-data/output/essai/`. Aucune génération nécessaire.

### ePub
Généré via `pandoc` depuis le markdown complet :

```bash
pandoc 00-essai-complet.md \
  -o la-france-est-elle-un-pays-de-sport.epub \
  --metadata title="La France est-elle un pays de sport ?" \
  --metadata author="Ludovic Bostral" \
  --metadata lang=fr \
  --metadata date=2026-03-28 \
  --toc \
  --toc-depth=1 \
  --epub-chapter-level=1
```

Les graphiques PNG sont inclus automatiquement s'ils sont référencés dans le markdown. Si le markdown ne les référence pas, on ajoute les références avant la génération.

### Présentation

Bandeau discret présent sur :
- La landing page de l'essai (en haut, après le résumé)
- Chaque page de chapitre (dans la barre de progression + en footer)

Format : `📥 PDF · ePub` — deux liens inline, petite taille, pas de CTA agressif.

---

## Compatibilité technique

- **Stack** : 100% vanilla HTML/CSS/JS (cohérent avec le site existant)
- **Hébergement** : GitHub Pages (fichiers statiques, pas de build)
- **Navigateurs** : tous modernes (CSS custom properties, `localStorage`, `IntersectionObserver`)
- **Mobile** : responsive, colonne pleine largeur avec padding, navigation swipe-friendly
- **Performance** : pas de framework, images lazy-loaded, CSS/JS < 20 Ko total
- **Accessibilité** : sémantique HTML5 (`<article>`, `<nav>`, `<figure>`, `<figcaption>`), `alt` sur toutes les images, navigation clavier, contraste WCAG AA

---

## Ce qui n'est PAS dans le scope

- Traduction multi-langue de l'essai
- Système de commentaires
- Analytics spécifique aux essais (on garde le Google Analytics existant)
- Génération automatique du HTML depuis le markdown (c'est un one-shot, on convertit manuellement)
- Intégration au `index.html` principal (les essais vivent dans `/essais/`, lien depuis le site principal à ajouter séparément)
