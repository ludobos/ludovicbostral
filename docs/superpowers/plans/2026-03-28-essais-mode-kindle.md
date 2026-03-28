# Essais Mode Kindle — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier l'essai "La France est-elle un pays de sport ?" sur bostral.com/essais avec un reader Kindle-like chapitré, SEO/GEO max, téléchargement PDF/ePub.

**Architecture:** Site statique vanilla HTML/CSS/JS sur GitHub Pages. Un CSS + JS partagés pour le reader. Un script Python one-shot pour convertir les chapitres markdown en HTML. 10 pages HTML par essai (landing + 8 chapitres + bibliographie) + 1 page catalogue.

**Tech Stack:** HTML5, CSS3 (custom properties, media queries), vanilla JS (localStorage, keyboard events), Python 3 + markdown lib (build script one-shot), pandoc (ePub generation).

**Spec:** `docs/superpowers/specs/2026-03-28-essais-mode-kindle-design.md`

**Source de l'essai:** `/Users/ludovicbostral/france-sport-data/output/essai/`

---

## Structure des fichiers

```
essais/
├── index.html                  # CRÉER — Page catalogue des essais
├── essais.css                  # CRÉER — Styles reader Kindle + catalogue
├── essais.js                   # CRÉER — Navigation, mode sombre, TOC overlay, clavier
└── la-france-est-elle-un-pays-de-sport/
    ├── index.html              # CRÉER — Landing page (résumé + TOC)
    ├── 1-definition.html       # CRÉER — Chapitre 1
    ├── 2-densite.html          # CRÉER — Chapitre 2
    ├── 3-puissance-collective.html  # CRÉER — Chapitre 3
    ├── 4-desert-individuel.html     # CRÉER — Chapitre 4
    ├── 5-france-forme.html     # CRÉER — Chapitre 5
    ├── 6-calque-educatif.html  # CRÉER — Chapitre 6
    ├── 7-comment-tweaker.html  # CRÉER — Chapitre 7
    ├── 8-conclusion.html       # CRÉER — Chapitre 8
    ├── bibliographie.html      # CRÉER — Bibliographie
    ├── la-france-est-elle-un-pays-de-sport.pdf   # COPIER depuis source
    ├── la-france-est-elle-un-pays-de-sport.epub  # GÉNÉRER via pandoc
    └── img/
        ├── og-cover.jpg        # CRÉER — Open Graph 1200x630
        ├── 01-ratio-medailles-licencies.png   # COPIER
        ├── 02-uk-sport-trajectoire.png        # COPIER
        ├── 03-decrochage-jeunes.png           # COPIER
        ├── 04-paris2024-genre.png             # COPIER
        ├── 05-cout-france-uk.png              # COPIER
        ├── 06-profondeur-selections.png       # COPIER
        ├── 07-ou-va-largent.png               # COPIER
        ├── 08-taxonomie-monopole.png          # COPIER
        ├── infographie-flux-export.svg        # CRÉER
        └── infographie-4-modeles.svg          # CRÉER

scripts/
└── build-essai.py              # CRÉER — Script one-shot markdown → HTML
```

Fichiers du site principal à modifier :
- `index.html` — Ajouter un lien vers /essais dans la navigation

---

## Chapitres — Référence

| # | Slug HTML | Fichier source MD | Mots | Temps (~250 mots/min) |
|---|---|---|---|---|
| — | `index.html` (landing) | `00-introduction.md` + résumé de `00-essai-complet.md` (lignes 1-9) | ~2 800 | 11 min |
| 1 | `1-definition.html` | `01-definition-pays-de-sport.md` | 3 663 | 15 min |
| 2 | `2-densite.html` | `02-densite-francaise.md` | 3 511 | 14 min |
| 3 | `3-puissance-collective.html` | `03-puissance-collective.md` | 3 969 | 16 min |
| 4 | `4-desert-individuel.html` | `04-desert-individuel.md` | 8 157 | 33 min |
| 5 | `5-france-forme.html` | `05-france-forme-etranger-eleve.md` | 4 228 | 17 min |
| 6 | `6-calque-educatif.html` | `06-calque-educatif.md` | 8 772 | 35 min |
| 7 | `7-comment-tweaker.html` | `07-comment-tweaker.md` | 9 035 | 36 min |
| 8 | `8-conclusion.html` | `08-conclusion.md` | 1 938 | 8 min |
| — | `bibliographie.html` | `09-bibliographie.md` | 611 | 2 min |

**Graphiques — Placement :**

| Graphique PNG | Chapitre cible |
|---|---|
| `01-ratio-medailles-licencies.png` | Landing + Ch.1 |
| `02-uk-sport-trajectoire.png` | Ch.7 |
| `03-decrochage-jeunes.png` | Ch.2 |
| `04-paris2024-genre.png` | Ch.3 |
| `05-cout-france-uk.png` | Ch.7 |
| `06-profondeur-selections.png` | Ch.3 |
| `07-ou-va-largent.png` | Ch.7 |
| `08-taxonomie-monopole.png` | Ch.6 |

| Infographie SVG à créer | Chapitre cible |
|---|---|
| `infographie-flux-export.svg` | Ch.5 |
| `infographie-4-modeles.svg` | Ch.1 |

---

### Task 1 : Setup — Répertoires et assets

**Files:**
- Create: `essais/la-france-est-elle-un-pays-de-sport/img/` (directory)
- Copy: PDF + 8 PNG depuis source

- [ ] **Step 1 : Créer la structure de répertoires**

```bash
mkdir -p essais/la-france-est-elle-un-pays-de-sport/img
```

- [ ] **Step 2 : Copier le PDF**

```bash
cp /Users/ludovicbostral/france-sport-data/output/essai/la-france-est-elle-un-pays-de-sport.pdf \
   essais/la-france-est-elle-un-pays-de-sport/
```

- [ ] **Step 3 : Copier les 8 graphiques PNG (renommer avec tirets)**

```bash
cd /Users/ludovicbostral/ludovicbostral
for f in /Users/ludovicbostral/france-sport-data/output/essai/graphiques/*.png; do
  newname=$(basename "$f" | tr '_' '-')
  cp "$f" "essais/la-france-est-elle-un-pays-de-sport/img/$newname"
done
```

- [ ] **Step 4 : Vérifier**

```bash
ls -la essais/la-france-est-elle-un-pays-de-sport/img/
ls -la essais/la-france-est-elle-un-pays-de-sport/*.pdf
```

Attendu : 8 fichiers PNG + 1 PDF.

- [ ] **Step 5 : Commit**

```bash
git add essais/
git commit -m "chore: setup essais directory structure with assets"
```

---

### Task 2 : CSS — Reader Kindle + Catalogue

**Files:**
- Create: `essais/essais.css`

Ce CSS couvre : mode clair, mode sombre, typographie reader, barre de progression, navigation chapitres, TOC overlay, catalogue, responsive, images/figures.

- [ ] **Step 1 : Écrire `essais/essais.css`**

```css
/* ============================================
   ESSAIS — Reader Kindle + Catalogue
   ============================================ */

/* --- Reset & Base --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* Mode clair (défaut — papier e-ink) */
  --bg: #faf8f5;
  --text: #2c2c2c;
  --text-secondary: #666;
  --text-muted: #999;
  --border: #e0dcd5;
  --accent: #8b4513;
  --link: #1a5276;
  --link-hover: #2980b9;
  --code-bg: #f0ece4;
  --blockquote-border: #ccc;
  --progress-bg: #e0dcd5;
  --progress-fill: #8b4513;
  --overlay-bg: rgba(0, 0, 0, 0.5);
  --card-bg: #fff;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.08);
  --img-opacity: 1;
}

/* Mode sombre */
.dark {
  --bg: #1a1a1a;
  --text: #d4c5a9;
  --text-secondary: #a89a7e;
  --text-muted: #7a6f5f;
  --border: #333;
  --accent: #d4a057;
  --link: #7fb3d3;
  --link-hover: #a8d4f0;
  --code-bg: #2a2520;
  --blockquote-border: #555;
  --progress-bg: #333;
  --progress-fill: #d4a057;
  --overlay-bg: rgba(0, 0, 0, 0.75);
  --card-bg: #242424;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.3);
  --img-opacity: 0.9;
}

html { scroll-behavior: smooth; }

body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 19px;
  line-height: 1.85;
  color: var(--text);
  background: var(--bg);
  transition: background 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
}

/* --- Reading Column --- */
.reader {
  max-width: 680px;
  margin: 0 auto;
  padding: 100px 24px 80px;
}

/* --- Typography --- */
h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.2rem;
  line-height: 1.25;
  margin-bottom: 0.5em;
  color: var(--text);
  font-weight: 700;
  letter-spacing: -0.5px;
}

h2 {
  font-size: 1.4rem;
  margin-top: 2.5em;
  margin-bottom: 0.6em;
  color: var(--text);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.3em;
}

h3 {
  font-size: 1.15rem;
  margin-top: 2em;
  margin-bottom: 0.5em;
  color: var(--text);
  font-weight: 600;
}

p {
  margin-bottom: 1.2em;
  text-align: justify;
  hyphens: auto;
  -webkit-hyphens: auto;
}

a { color: var(--link); text-decoration: none; border-bottom: 1px solid transparent; }
a:hover { color: var(--link-hover); border-bottom-color: var(--link-hover); }

strong { font-weight: 700; }
em { font-style: italic; }

blockquote {
  border-left: 3px solid var(--blockquote-border);
  padding: 0.8em 1.2em;
  margin: 1.5em 0;
  font-style: italic;
  color: var(--text-secondary);
}

code {
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 0.85em;
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 3px;
}

hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2.5em 0;
}

/* Lists */
ul, ol {
  margin: 1em 0;
  padding-left: 1.5em;
}

li {
  margin-bottom: 0.5em;
}

/* --- Tables --- */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-size: 0.9em;
  line-height: 1.5;
  overflow-x: auto;
  display: block;
}

thead { border-bottom: 2px solid var(--border); }
th { font-weight: 600; text-align: left; padding: 8px 12px; color: var(--text); }
td { padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--text-secondary); }
tr:hover td { background: var(--code-bg); }

/* --- Images & Figures --- */
figure {
  margin: 2em 0;
  text-align: center;
}

figure img, .reader img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  opacity: var(--img-opacity);
  transition: opacity 0.3s ease;
}

figcaption {
  font-size: 0.82em;
  color: var(--text-muted);
  margin-top: 0.6em;
  font-style: italic;
  line-height: 1.4;
}

/* --- Progress Bar (sticky top) --- */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: background 0.3s ease;
}

.progress-bar__text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.82rem;
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
}

.progress-bar__text:hover { color: var(--text); }

.progress-bar__track {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--progress-bg);
  width: 100%;
}

.progress-bar__fill {
  height: 100%;
  background: var(--progress-fill);
  transition: width 0.3s ease;
}

.progress-bar__dark-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px 8px;
}

.progress-bar__dark-toggle:hover { color: var(--text); }

.progress-bar__download {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.progress-bar__download a {
  color: var(--text-muted);
  margin: 0 4px;
  border-bottom: 1px dotted var(--text-muted);
}

.progress-bar__download a:hover { color: var(--text); }

/* --- Chapter Navigation (bottom) --- */
.chapter-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4em;
  padding-top: 2em;
  border-top: 1px solid var(--border);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  gap: 2em;
}

.chapter-nav a {
  color: var(--link);
  text-decoration: none;
  max-width: 45%;
  line-height: 1.4;
}

.chapter-nav a:hover { color: var(--link-hover); }

.chapter-nav__prev::before { content: "\2190\00a0"; }
.chapter-nav__next::after { content: "\00a0\2192"; }
.chapter-nav__next { text-align: right; margin-left: auto; }

/* --- TOC Overlay --- */
.toc-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  z-index: 200;
  display: none;
  align-items: center;
  justify-content: center;
}

.toc-overlay.open { display: flex; }

.toc-overlay__content {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  max-width: 520px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 2em;
}

.toc-overlay__title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.3rem;
  margin-bottom: 1em;
  color: var(--text);
}

.toc-overlay__list {
  list-style: none;
  padding: 0;
}

.toc-overlay__list li {
  margin-bottom: 0.8em;
}

.toc-overlay__list a {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--text-secondary);
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  padding: 4px 0;
}

.toc-overlay__list a:hover { color: var(--text); }
.toc-overlay__list a.current { color: var(--accent); font-weight: 600; }

.toc-overlay__list .toc-time {
  font-size: 0.8rem;
  color: var(--text-muted);
  white-space: nowrap;
  margin-left: 1em;
}

.toc-overlay__download {
  margin-top: 1.5em;
  padding-top: 1em;
  border-top: 1px solid var(--border);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.toc-overlay__download a {
  color: var(--link);
  margin: 0 6px;
}

/* --- Breadcrumb --- */
.breadcrumb {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-bottom: 2em;
}

.breadcrumb a { color: var(--text-muted); }
.breadcrumb a:hover { color: var(--text); }
.breadcrumb span { margin: 0 6px; }

/* --- Landing Page --- */
.landing-hero {
  margin-bottom: 3em;
}

.landing-hero h1 {
  font-size: 2.6rem;
  line-height: 1.15;
  margin-bottom: 0.3em;
}

.landing-hero .subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  font-style: italic;
  margin-bottom: 1em;
}

.landing-hero .meta {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.landing-resume {
  margin: 2.5em 0;
  padding: 1.5em;
  background: var(--code-bg);
  border-radius: 6px;
  font-size: 0.95em;
  line-height: 1.75;
}

.landing-chiffres {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5em;
  margin: 2.5em 0;
  text-align: center;
}

.landing-chiffres .chiffre {
  padding: 1.2em;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.landing-chiffres .chiffre-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  display: block;
  margin-bottom: 0.3em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.landing-chiffres .chiffre-label {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.landing-toc {
  margin: 3em 0;
}

.landing-toc h2 {
  font-size: 1.3rem;
  margin-bottom: 1em;
  border-bottom: none;
}

.landing-toc ol {
  list-style: none;
  padding: 0;
  counter-reset: chapter;
}

.landing-toc ol li {
  counter-increment: chapter;
  margin-bottom: 0.8em;
}

.landing-toc ol li a {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1.05rem;
}

.landing-toc ol li a::before {
  content: counter(chapter) ". ";
  color: var(--text-muted);
  margin-right: 0.5em;
}

.landing-toc .toc-time {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-left: 1em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.landing-download {
  margin: 2em 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.landing-download a {
  display: inline-block;
  color: var(--link);
  margin-right: 1.2em;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.landing-download a:hover {
  background: var(--code-bg);
  border-bottom-color: var(--border);
}

/* --- Catalogue Page --- */
.catalogue {
  max-width: 720px;
  margin: 0 auto;
  padding: 60px 24px;
}

.catalogue h1 {
  font-size: 2.4rem;
  margin-bottom: 0.3em;
}

.catalogue .intro-text {
  color: var(--text-secondary);
  margin-bottom: 3em;
  font-size: 1.05rem;
}

.essai-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2em;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.2s ease;
}

.essai-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }

.essai-card h2 {
  font-size: 1.5rem;
  border-bottom: none;
  margin-top: 0;
  margin-bottom: 0.2em;
}

.essai-card h2 a { color: var(--text); border-bottom: none; }
.essai-card h2 a:hover { color: var(--accent); }

.essai-card .card-subtitle {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 0.8em;
  font-size: 0.95rem;
}

.essai-card .card-meta {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1em;
}

.essai-card .card-excerpt {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.2em;
  line-height: 1.7;
}

.essai-card .card-actions {
  display: flex;
  gap: 1em;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.85rem;
}

.essai-card .card-actions a { color: var(--link); }

.essai-card .btn-read {
  background: var(--accent);
  color: #fff;
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 600;
  border-bottom: none;
}

.essai-card .btn-read:hover { opacity: 0.9; color: #fff; }

/* --- Footer --- */
.essai-footer {
  margin-top: 4em;
  padding-top: 2em;
  border-top: 1px solid var(--border);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: center;
}

.essai-footer a { color: var(--text-muted); }
.essai-footer a:hover { color: var(--text); }

/* --- Responsive --- */
@media (max-width: 768px) {
  body { font-size: 17px; }
  h1 { font-size: 1.8rem; }
  .landing-hero h1 { font-size: 2rem; }
  .reader { padding: 80px 18px 60px; }
  .landing-chiffres { grid-template-columns: 1fr; }
  .chapter-nav { flex-direction: column; gap: 1em; }
  .chapter-nav a { max-width: 100%; }
  .progress-bar__download { display: none; }
  table { font-size: 0.82em; }
  th, td { padding: 6px 8px; }
}

/* --- Print --- */
@media print {
  .progress-bar, .toc-overlay, .chapter-nav, .progress-bar__dark-toggle { display: none !important; }
  body { font-size: 12pt; background: #fff; color: #000; }
  .reader { padding: 0; max-width: 100%; }
}
```

- [ ] **Step 2 : Vérifier la syntaxe**

Ouvrir `essais/essais.css` et vérifier qu'il n'y a pas d'erreur de syntaxe (balises non fermées, propriétés CSS invalides).

- [ ] **Step 3 : Commit**

```bash
git add essais/essais.css
git commit -m "feat: add Kindle reader CSS with dark mode and responsive"
```

---

### Task 3 : JS — Navigation, mode sombre, TOC, clavier

**Files:**
- Create: `essais/essais.js`

- [ ] **Step 1 : Écrire `essais/essais.js`**

```javascript
/* ============================================
   ESSAIS — Reader Kindle JS
   ============================================ */

(function () {
  'use strict';

  // --- Dark Mode ---
  const STORAGE_KEY = 'essais-dark-mode';

  function initDarkMode() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      document.documentElement.classList.add('dark');
    }
    const toggle = document.querySelector('.progress-bar__dark-toggle');
    if (toggle) {
      updateToggleLabel(toggle);
      toggle.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem(STORAGE_KEY, isDark);
        updateToggleLabel(toggle);
      });
    }
  }

  function updateToggleLabel(btn) {
    const isDark = document.documentElement.classList.contains('dark');
    btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.setAttribute('aria-label', isDark ? 'Mode clair' : 'Mode sombre');
  }

  // --- TOC Overlay ---
  function initTOC() {
    const trigger = document.querySelector('.progress-bar__text');
    const overlay = document.querySelector('.toc-overlay');
    if (!trigger || !overlay) return;

    trigger.addEventListener('click', function () {
      overlay.classList.add('open');
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
      }
    });
  }

  // --- Keyboard Navigation ---
  function initKeyboardNav() {
    var prevLink = document.querySelector('.chapter-nav__prev');
    var nextLink = document.querySelector('.chapter-nav__next');

    document.addEventListener('keydown', function (e) {
      // Don't navigate if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      // Don't navigate if TOC overlay is open
      if (document.querySelector('.toc-overlay.open')) return;

      if (e.key === 'ArrowLeft' && prevLink) {
        window.location.href = prevLink.href;
      } else if (e.key === 'ArrowRight' && nextLink) {
        window.location.href = nextLink.href;
      }
    });
  }

  // --- Reading Progress (scroll-based) ---
  function initScrollProgress() {
    var fill = document.querySelector('.progress-bar__fill');
    if (!fill) return;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      fill.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initTOC();
    initKeyboardNav();
    initScrollProgress();
  });
})();
```

- [ ] **Step 2 : Commit**

```bash
git add essais/essais.js
git commit -m "feat: add reader JS — dark mode, TOC overlay, keyboard nav, scroll progress"
```

---

### Task 4 : Script de build — Markdown vers HTML

**Files:**
- Create: `scripts/build-essai.py`

Script Python one-shot qui lit les fichiers markdown source et génère les HTML de chaque chapitre en appliquant le template reader. Utilise la lib standard `markdown` (installée via pip si nécessaire).

- [ ] **Step 1 : Vérifier que la lib markdown est disponible**

```bash
python3 -c "import markdown; print('OK')" 2>/dev/null || pip3 install markdown
```

- [ ] **Step 2 : Écrire `scripts/build-essai.py`**

```python
#!/usr/bin/env python3
"""
One-shot builder: converts essay markdown chapters to HTML reader pages.
Usage: python3 scripts/build-essai.py
"""

import markdown
import os
import re

# --- Configuration ---
SOURCE_DIR = "/Users/ludovicbostral/france-sport-data/output/essai"
OUTPUT_DIR = "essais/la-france-est-elle-un-pays-de-sport"
BASE_URL = "/essais/la-france-est-elle-un-pays-de-sport"
ESSAY_TITLE = "La France est-elle un pays de sport ?"
ESSAY_SUBTITLE = "Formation, densité, et l'incapacité à élever"
AUTHOR = "Ludovic Bostral"
DATE = "2026-03-28"
DATE_DISPLAY = "28 mars 2026"

CHAPTERS = [
    {
        "source": "01-definition-pays-de-sport.md",
        "slug": "1-definition.html",
        "title": "Qu'est-ce qu'un pays de sport ?",
        "number": 1,
        "words": 3663,
        "images": ["infographie-4-modeles.svg"],
        "image_after_h2": "Quatre modèles",  # Insert image after this h2
    },
    {
        "source": "02-densite-francaise.md",
        "slug": "2-densite.html",
        "title": "La densité française",
        "number": 2,
        "words": 3511,
        "images": ["03-decrochage-jeunes.png"],
        "image_after_h2": None,  # Insert at end of chapter
    },
    {
        "source": "03-puissance-collective.md",
        "slug": "3-puissance-collective.html",
        "title": "La puissance collective",
        "number": 3,
        "words": 3969,
        "images": ["04-paris2024-genre.png", "06-profondeur-selections.png"],
        "image_after_h2": None,
    },
    {
        "source": "04-desert-individuel.md",
        "slug": "4-desert-individuel.html",
        "title": "Le désert individuel et ses exceptions",
        "number": 4,
        "words": 8157,
        "images": [],
        "image_after_h2": None,
    },
    {
        "source": "05-france-forme-etranger-eleve.md",
        "slug": "5-france-forme.html",
        "title": "La France forme, l'étranger élève",
        "number": 5,
        "words": 4228,
        "images": ["infographie-flux-export.svg"],
        "image_after_h2": None,
    },
    {
        "source": "06-calque-educatif.md",
        "slug": "6-calque-educatif.html",
        "title": "Le calque éducatif",
        "number": 6,
        "words": 8772,
        "images": ["08-taxonomie-monopole.png"],
        "image_after_h2": None,
    },
    {
        "source": "07-comment-tweaker.md",
        "slug": "7-comment-tweaker.html",
        "title": "Comment tweaker le système",
        "number": 7,
        "words": 9035,
        "images": ["02-uk-sport-trajectoire.png", "05-cout-france-uk.png", "07-ou-va-largent.png"],
        "image_after_h2": None,
    },
    {
        "source": "08-conclusion.md",
        "slug": "8-conclusion.html",
        "title": "Conclusion : Un pays de sport, pas encore",
        "number": 8,
        "words": 1938,
        "images": [],
        "image_after_h2": None,
    },
]

BIBLIO = {
    "source": "09-bibliographie.md",
    "slug": "bibliographie.html",
    "title": "Bibliographie",
    "words": 611,
}

TOTAL_CHAPTERS = len(CHAPTERS)


def reading_time(words):
    return max(1, round(words / 250))


def md_to_html(md_text):
    """Convert markdown to HTML, stripping the first H1 (we add our own)."""
    # Remove the first heading line
    lines = md_text.split("\n")
    filtered = []
    skipped_first_h1 = False
    for line in lines:
        if not skipped_first_h1 and line.startswith("# "):
            skipped_first_h1 = True
            continue
        # Also skip --- right after the title
        if skipped_first_h1 and not filtered and line.strip() in ("---", ""):
            continue
        filtered.append(line)

    md_clean = "\n".join(filtered)
    return markdown.markdown(
        md_clean,
        extensions=["tables", "fenced_code", "smarty"],
    )


def build_chapter_html(chapter, prev_ch, next_ch, body_html):
    """Build a full chapter HTML page."""
    num = chapter["number"]
    title = chapter["title"]
    slug = chapter["slug"]
    minutes = reading_time(chapter["words"])

    prev_link = ""
    if prev_ch:
        prev_link = f'<a href="{prev_ch["slug"]}" class="chapter-nav__prev">{prev_ch["title"]}</a>'
    else:
        prev_link = f'<a href="index.html" class="chapter-nav__prev">Introduction</a>'

    next_link = ""
    if next_ch:
        next_link = f'<a href="{next_ch["slug"]}" class="chapter-nav__next">{next_ch["title"]}</a>'

    # Breadcrumb
    breadcrumb = f'''<nav class="breadcrumb" aria-label="Fil d'Ariane">
        <a href="/">Accueil</a> <span>&rsaquo;</span>
        <a href="/essais/">Essais</a> <span>&rsaquo;</span>
        <a href="{BASE_URL}/">{ESSAY_TITLE}</a> <span>&rsaquo;</span>
        {title}
    </nav>'''

    # TOC overlay items
    toc_items = ""
    for ch in CHAPTERS:
        current_class = ' class="current"' if ch["number"] == num else ""
        t = reading_time(ch["words"])
        toc_items += f'''        <li><a href="{ch["slug"]}"{current_class}>
            <span>{ch["number"]}. {ch["title"]}</span>
            <span class="toc-time">{t} min</span>
        </a></li>\n'''
    toc_items += f'''        <li><a href="bibliographie.html"><span>Bibliographie</span><span class="toc-time">2 min</span></a></li>'''

    # Meta description (first 155 chars of body text)
    desc_text = re.sub(r"<[^>]+>", "", body_html)[:155].rsplit(" ", 1)[0] + "..."

    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{ESSAY_TITLE} — Ch.{num} : {title} | {AUTHOR}</title>
    <meta name="description" content="{desc_text}">
    <meta name="author" content="{AUTHOR}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.bostral.com{BASE_URL}/{slug}">
    {f'<link rel="prev" href="{prev_ch["slug"]}">' if prev_ch else f'<link rel="prev" href="index.html">'}
    {f'<link rel="next" href="{next_ch["slug"]}">' if next_ch else ""}

    <!-- GEO -->
    <meta name="geo.region" content="FR">
    <meta name="geo.placename" content="France">
    <meta name="DC.language" content="fr">

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="{ESSAY_TITLE}">
    <meta property="og:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part. Un essai de {AUTHOR}.">
    <meta property="og:image" content="https://www.bostral.com{BASE_URL}/img/og-cover.jpg">
    <meta property="og:url" content="https://www.bostral.com{BASE_URL}/">
    <meta property="og:locale" content="fr_FR">
    <meta property="article:author" content="https://www.linkedin.com/in/ludovicbostral">
    <meta property="article:published_time" content="{DATE}">
    <meta property="article:section" content="Sport">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{ESSAY_TITLE}">
    <meta name="twitter:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part.">
    <meta name="twitter:image" content="https://www.bostral.com{BASE_URL}/img/og-cover.jpg">

    <!-- Schema.org -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{title}",
        "author": {{ "@type": "Person", "name": "{AUTHOR}" }},
        "datePublished": "{DATE}",
        "inLanguage": "fr",
        "isPartOf": {{
            "@type": "Article",
            "name": "{ESSAY_TITLE}",
            "url": "https://www.bostral.com{BASE_URL}/"
        }},
        "position": {num}
    }}
    </script>
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.bostral.com" }},
            {{ "@type": "ListItem", "position": 2, "name": "Essais", "item": "https://www.bostral.com/essais/" }},
            {{ "@type": "ListItem", "position": 3, "name": "{ESSAY_TITLE}", "item": "https://www.bostral.com{BASE_URL}/" }},
            {{ "@type": "ListItem", "position": 4, "name": "{title}" }}
        ]
    }}
    </script>

    <link rel="stylesheet" href="../essais.css">
</head>
<body>

    <!-- Progress Bar -->
    <header class="progress-bar">
        <div class="progress-bar__download">
            <a href="la-france-est-elle-un-pays-de-sport.pdf" download>PDF</a> ·
            <a href="la-france-est-elle-un-pays-de-sport.epub" download>ePub</a>
        </div>
        <span class="progress-bar__text" role="button" tabindex="0" aria-label="Ouvrir la table des matières">
            Chapitre {num} sur {TOTAL_CHAPTERS} · ~{minutes} min
        </span>
        <button class="progress-bar__dark-toggle" aria-label="Mode sombre"></button>
        <div class="progress-bar__track"><div class="progress-bar__fill" style="width: {round(num / TOTAL_CHAPTERS * 100)}%"></div></div>
    </header>

    <!-- TOC Overlay -->
    <div class="toc-overlay" role="dialog" aria-label="Table des matières">
        <div class="toc-overlay__content">
            <div class="toc-overlay__title">Table des matières</div>
            <ul class="toc-overlay__list">
                <li><a href="index.html"><span>Introduction</span><span class="toc-time">11 min</span></a></li>
{toc_items}
            </ul>
            <div class="toc-overlay__download">
                Télécharger : <a href="la-france-est-elle-un-pays-de-sport.pdf" download>PDF</a> ·
                <a href="la-france-est-elle-un-pays-de-sport.epub" download>ePub</a>
            </div>
        </div>
    </div>

    <!-- Content -->
    <article class="reader">
        {breadcrumb}
        <h1>{title}</h1>
        {body_html}

        <nav class="chapter-nav">
            {prev_link}
            {next_link}
        </nav>
    </article>

    <footer class="essai-footer">
        <p>&copy; {DATE[:4]} {AUTHOR} · <a href="/">bostral.com</a></p>
    </footer>

    <script src="../essais.js"></script>
</body>
</html>'''


def build_biblio_html(body_html):
    """Build the bibliography page."""
    last_ch = CHAPTERS[-1]

    breadcrumb = f'''<nav class="breadcrumb" aria-label="Fil d'Ariane">
        <a href="/">Accueil</a> <span>&rsaquo;</span>
        <a href="/essais/">Essais</a> <span>&rsaquo;</span>
        <a href="{BASE_URL}/">{ESSAY_TITLE}</a> <span>&rsaquo;</span>
        Bibliographie
    </nav>'''

    toc_items = ""
    for ch in CHAPTERS:
        t = reading_time(ch["words"])
        toc_items += f'''        <li><a href="{ch["slug"]}"><span>{ch["number"]}. {ch["title"]}</span><span class="toc-time">{t} min</span></a></li>\n'''
    toc_items += f'''        <li><a href="bibliographie.html" class="current"><span>Bibliographie</span><span class="toc-time">2 min</span></a></li>'''

    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{ESSAY_TITLE} — Bibliographie | {AUTHOR}</title>
    <meta name="description" content="Sources et références de l'essai sur le système sportif français.">
    <meta name="author" content="{AUTHOR}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.bostral.com{BASE_URL}/bibliographie.html">
    <link rel="prev" href="{last_ch["slug"]}">

    <meta name="geo.region" content="FR">
    <meta name="geo.placename" content="France">
    <meta name="DC.language" content="fr">

    <meta property="og:type" content="article">
    <meta property="og:title" content="{ESSAY_TITLE}">
    <meta property="og:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part. Un essai de {AUTHOR}.">
    <meta property="og:image" content="https://www.bostral.com{BASE_URL}/img/og-cover.jpg">
    <meta property="og:url" content="https://www.bostral.com{BASE_URL}/">
    <meta property="og:locale" content="fr_FR">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{ESSAY_TITLE}">
    <meta name="twitter:image" content="https://www.bostral.com{BASE_URL}/img/og-cover.jpg">

    <link rel="stylesheet" href="../essais.css">
</head>
<body>

    <header class="progress-bar">
        <div class="progress-bar__download">
            <a href="la-france-est-elle-un-pays-de-sport.pdf" download>PDF</a> ·
            <a href="la-france-est-elle-un-pays-de-sport.epub" download>ePub</a>
        </div>
        <span class="progress-bar__text" role="button" tabindex="0" aria-label="Ouvrir la table des matières">
            Bibliographie · ~2 min
        </span>
        <button class="progress-bar__dark-toggle" aria-label="Mode sombre"></button>
        <div class="progress-bar__track"><div class="progress-bar__fill" style="width: 100%"></div></div>
    </header>

    <div class="toc-overlay" role="dialog" aria-label="Table des matières">
        <div class="toc-overlay__content">
            <div class="toc-overlay__title">Table des matières</div>
            <ul class="toc-overlay__list">
                <li><a href="index.html"><span>Introduction</span><span class="toc-time">11 min</span></a></li>
{toc_items}
            </ul>
            <div class="toc-overlay__download">
                Télécharger : <a href="la-france-est-elle-un-pays-de-sport.pdf" download>PDF</a> ·
                <a href="la-france-est-elle-un-pays-de-sport.epub" download>ePub</a>
            </div>
        </div>
    </div>

    <article class="reader">
        {breadcrumb}
        <h1>Bibliographie</h1>
        {body_html}

        <nav class="chapter-nav">
            <a href="{last_ch["slug"]}" class="chapter-nav__prev">{last_ch["title"]}</a>
        </nav>
    </article>

    <footer class="essai-footer">
        <p>&copy; {DATE[:4]} {AUTHOR} · <a href="/">bostral.com</a></p>
    </footer>

    <script src="../essais.js"></script>
</body>
</html>'''


def insert_images(body_html, images):
    """Append image figures at the end of the body."""
    if not images:
        return body_html

    img_html = ""
    for img in images:
        alt = img.replace("-", " ").replace(".png", "").replace(".svg", "")
        img_html += f'''
<figure>
    <img src="img/{img}" alt="{alt}" loading="lazy">
    <figcaption>{alt.title()}</figcaption>
</figure>
'''
    return body_html + img_html


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Build chapters
    for i, ch in enumerate(CHAPTERS):
        source_path = os.path.join(SOURCE_DIR, ch["source"])
        with open(source_path, "r", encoding="utf-8") as f:
            md_text = f.read()

        body_html = md_to_html(md_text)
        body_html = insert_images(body_html, ch["images"])

        prev_ch = CHAPTERS[i - 1] if i > 0 else None
        next_ch = CHAPTERS[i + 1] if i < len(CHAPTERS) - 1 else None

        # Last chapter links to bibliographie
        if i == len(CHAPTERS) - 1:
            next_ch = {"slug": "bibliographie.html", "title": "Bibliographie"}

        html = build_chapter_html(ch, prev_ch, next_ch, body_html)

        output_path = os.path.join(OUTPUT_DIR, ch["slug"])
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  Built: {ch['slug']} ({ch['words']} words, ~{reading_time(ch['words'])} min)")

    # Build bibliography
    biblio_path = os.path.join(SOURCE_DIR, BIBLIO["source"])
    with open(biblio_path, "r", encoding="utf-8") as f:
        md_text = f.read()
    body_html = md_to_html(md_text)
    html = build_biblio_html(body_html)
    output_path = os.path.join(OUTPUT_DIR, BIBLIO["slug"])
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  Built: bibliographie.html")

    print(f"\nDone! {len(CHAPTERS) + 1} pages generated in {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3 : Exécuter le script**

```bash
cd /Users/ludovicbostral/ludovicbostral
python3 scripts/build-essai.py
```

Attendu : 9 fichiers HTML générés dans `essais/la-france-est-elle-un-pays-de-sport/`.

- [ ] **Step 4 : Vérifier le résultat dans le navigateur**

```bash
open essais/la-france-est-elle-un-pays-de-sport/1-definition.html
```

Vérifier : styles appliqués, mode sombre fonctionne, navigation ←/→ fonctionne, images affichées.

- [ ] **Step 5 : Commit**

```bash
git add scripts/build-essai.py essais/la-france-est-elle-un-pays-de-sport/*.html
git commit -m "feat: generate chapter HTML pages from markdown with build script"
```

---

### Task 5 : Landing page de l'essai

**Files:**
- Create: `essais/la-france-est-elle-un-pays-de-sport/index.html`

La landing page est custom (pas générée par le script). Elle contient : titre, sous-titre, date, résumé encadré, 3 chiffres clés, table des matières, introduction, liens de téléchargement.

- [ ] **Step 1 : Écrire la landing page**

Lire le contenu du résumé (lignes 1-9 de `00-essai-complet.md`) et de l'introduction (`00-introduction.md`), puis construire la page `index.html` manuellement avec :

1. Le `<head>` complet avec tous les meta SEO/OG/Schema.org (utiliser le modèle de la spec, avec `@type: Article`, `hasPart` pour tous les chapitres, `associatedMedia` pour PDF/ePub)
2. La barre de progression simplifiée (pas de "Chapitre X sur Y", juste le titre + toggle sombre)
3. Le contenu :
   - `.landing-hero` : titre H1, sous-titre, date + temps de lecture total (~3h)
   - `.landing-resume` : le résumé encadré (les 3 paragraphes "Trois constats / Trois propositions / Trois chiffres")
   - `.landing-chiffres` : 3 cartes (240 médailles/100k licenciés escrime, 0.15 football, 88-132 M€/an le coût des 3 propositions)
   - Le graphique `01-ratio-medailles-licencies.png` en `<figure>`
   - `.landing-toc` : table des matières ordonnée avec temps de lecture par chapitre
   - `.landing-download` : liens PDF + ePub
   - Le texte de l'introduction (converti du markdown)
   - Navigation : lien vers "Chapitre 1 →"
4. TOC overlay (même structure que les chapitres)
5. Footer
6. Schema.org complet avec `hasPart` et `associatedMedia`

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
open essais/la-france-est-elle-un-pays-de-sport/index.html
```

Vérifier : mise en page, chiffres clés, TOC cliquable, liens PDF/ePub, mode sombre.

- [ ] **Step 3 : Commit**

```bash
git add essais/la-france-est-elle-un-pays-de-sport/index.html
git commit -m "feat: add essay landing page with résumé, key figures, and TOC"
```

---

### Task 6 : Page catalogue `/essais/index.html`

**Files:**
- Create: `essais/index.html`

- [ ] **Step 1 : Écrire `essais/index.html`**

Page sobre avec :
- `<head>` complet (Schema.org `CollectionPage`, OG, meta)
- Toggle mode sombre en haut à droite
- Titre H1 "Essais"
- Texte intro court (1-2 phrases)
- Une `.essai-card` pour l'essai (titre, sous-titre, date, 8 chapitres, ~3h, accroche 2 lignes, bouton "Lire", liens PDF/ePub)
- Footer avec lien retour vers bostral.com

Le Schema.org :
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Essais — Ludovic Bostral",
  "url": "https://www.bostral.com/essais/",
  "author": { "@type": "Person", "name": "Ludovic Bostral" },
  "hasPart": [{
    "@type": "Article",
    "name": "La France est-elle un pays de sport ?",
    "url": "https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/"
  }]
}
```

- [ ] **Step 2 : Vérifier dans le navigateur**

```bash
open essais/index.html
```

Vérifier : card affichée, liens fonctionnels, mode sombre.

- [ ] **Step 3 : Commit**

```bash
git add essais/index.html
git commit -m "feat: add /essais catalogue page"
```

---

### Task 7 : Générer l'ePub

**Files:**
- Create: `essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub`

- [ ] **Step 1 : Générer l'ePub via pandoc**

```bash
cd /Users/ludovicbostral/france-sport-data/output/essai
pandoc 00-essai-complet.md \
  -o /Users/ludovicbostral/ludovicbostral/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub \
  --metadata title="La France est-elle un pays de sport ?" \
  --metadata author="Ludovic Bostral" \
  --metadata lang=fr \
  --metadata date=2026-03-28 \
  --toc \
  --toc-depth=1 \
  --epub-chapter-level=1
```

- [ ] **Step 2 : Vérifier que le fichier est créé et non vide**

```bash
ls -la /Users/ludovicbostral/ludovicbostral/essais/la-france-est-elle-un-pays-de-sport/*.epub
```

Attendu : fichier > 100 Ko.

- [ ] **Step 3 : Ouvrir pour vérifier**

```bash
open /Users/ludovicbostral/ludovicbostral/essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub
```

Doit s'ouvrir dans Apple Books. Vérifier : chapitrage, table des matières, texte lisible.

- [ ] **Step 4 : Commit**

```bash
git add essais/la-france-est-elle-un-pays-de-sport/la-france-est-elle-un-pays-de-sport.epub
git commit -m "feat: add ePub download for essay"
```

---

### Task 8 : Image OG (Open Graph cover)

**Files:**
- Create: `essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg`

L'image OG (1200×630) est celle qui s'affiche sur LinkedIn/Twitter lors du partage. On la crée via une page HTML → screenshot.

- [ ] **Step 1 : Créer un HTML temporaire pour le rendu OG**

Créer `/tmp/og-cover.html` :

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #1a1a1a;
    color: #faf8f5;
    font-family: Georgia, serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px;
  }
  h1 { font-size: 52px; line-height: 1.2; margin-bottom: 16px; }
  .subtitle { font-size: 22px; color: #d4c5a9; font-style: italic; margin-bottom: 40px; }
  .author { font-size: 18px; color: #999; }
  .accent-line { width: 80px; height: 4px; background: #8b4513; margin-bottom: 30px; }
</style>
</head>
<body>
  <div class="accent-line"></div>
  <h1>La France est-elle un pays de sport ?</h1>
  <p class="subtitle">Formation, densité, et l'incapacité à élever</p>
  <p class="author">Ludovic Bostral · Mars 2026</p>
</body>
</html>
```

- [ ] **Step 2 : Screenshot via le navigateur ou un outil CLI**

Option A — Si `pageres-cli` est installé :
```bash
npx pageres /tmp/og-cover.html 1200x630 --filename=og-cover --format=jpg --crop
mv og-cover.jpg essais/la-france-est-elle-un-pays-de-sport/img/
```

Option B — Ouvrir dans Chrome et screenshot manuellement à 1200×630.

Option C — Utiliser `wkhtmltoimage` si disponible :
```bash
wkhtmltoimage --width 1200 --height 630 --quality 90 /tmp/og-cover.html essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg
```

Choisir l'option disponible sur la machine.

- [ ] **Step 3 : Vérifier le rendu**

```bash
open essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg
```

Attendu : image 1200×630, fond sombre, titre lisible, sous-titre sépia, auteur.

- [ ] **Step 4 : Commit**

```bash
git add essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg
git commit -m "feat: add Open Graph cover image for essay"
```

---

### Task 9 : Infographies SVG

**Files:**
- Create: `essais/la-france-est-elle-un-pays-de-sport/img/infographie-flux-export.svg`
- Create: `essais/la-france-est-elle-un-pays-de-sport/img/infographie-4-modeles.svg`

#### 9a : Infographie flux d'export (Ch.5)

- [ ] **Step 1 : Créer le SVG `infographie-flux-export.svg`**

Schéma de type flow/sankey simplifié :
- Gauche : "Clubs français" (3 exemples : CN Toulouse, Stade Bordelais, Flash de La Courneuve)
- Centre : flèches
- Droite : 4 destinations (NCAA, WorldTour, NBA, micro-pôles) avec noms d'athlètes

Le SVG doit utiliser `currentColor` pour que les textes s'adaptent au mode sombre. Fond transparent. Largeur viewport 680px max, hauteur ~400px.

- [ ] **Step 2 : Vérifier le rendu**

```bash
open essais/la-france-est-elle-un-pays-de-sport/img/infographie-flux-export.svg
```

- [ ] **Step 3 : Commit**

```bash
git add essais/la-france-est-elle-un-pays-de-sport/img/infographie-flux-export.svg
git commit -m "feat: add athlete export flow infographic SVG"
```

#### 9b : Infographie 4 modèles (Ch.1)

- [ ] **Step 4 : Créer le SVG `infographie-4-modeles.svg`**

Tableau visuel comparant 4 modèles (France, USA, Chine, UK) sur 4 axes :
- Densité/masse
- Elite absolue
- Efficience (per capita)
- Détection

Utiliser des barres horizontales colorées ou des lettres-notes (A+/A/B/C/D/F) style Aspen Institute. `currentColor` pour l'adaptabilité.

- [ ] **Step 5 : Vérifier le rendu**

```bash
open essais/la-france-est-elle-un-pays-de-sport/img/infographie-4-modeles.svg
```

- [ ] **Step 6 : Commit**

```bash
git add essais/la-france-est-elle-un-pays-de-sport/img/infographie-4-modeles.svg
git commit -m "feat: add 4-model comparison infographic SVG"
```

---

### Task 10 : Lien depuis le site principal

**Files:**
- Modify: `index.html` (racine du site)
- Modify: `script.js` (traductions)

- [ ] **Step 1 : Ajouter un lien "Essais" dans la navigation du site principal**

Dans `index.html`, trouver la section navigation/header et ajouter un lien vers `/essais/`. L'élément doit utiliser `data-i18n` pour la traduction.

- [ ] **Step 2 : Ajouter les traductions dans `script.js`**

```javascript
// Ajouter dans chaque objet de langue :
// en: "nav.essays": "Essays"
// fr: "nav.essays": "Essais"
// zh: "nav.essays": "随笔"
// es: "nav.essays": "Ensayos"
```

- [ ] **Step 3 : Vérifier**

```bash
open index.html
```

Vérifier que le lien apparaît dans la nav et fonctionne dans les 4 langues.

- [ ] **Step 4 : Commit**

```bash
git add index.html script.js
git commit -m "feat: add Essays link to main site navigation"
```

---

### Task 11 : Vérification finale et nettoyage

- [ ] **Step 1 : Naviguer à travers tout le parcours**

1. Ouvrir `essais/index.html` (catalogue) — vérifier la card
2. Cliquer "Lire" → landing page — vérifier résumé, chiffres, TOC
3. Cliquer chapitre 1 → naviguer avec → jusqu'au chapitre 8
4. Vérifier les images/graphiques dans chaque chapitre
5. Vérifier le mode sombre (toggle + persistence)
6. Vérifier la navigation clavier (←/→)
7. Vérifier la TOC overlay (clic sur "Chapitre X sur 8")
8. Tester les liens PDF/ePub (téléchargement)
9. Vérifier le responsive (redimensionner la fenêtre ou DevTools mobile)
10. Vérifier la bibliographie

- [ ] **Step 2 : Valider le SEO**

Ouvrir un chapitre et vérifier dans l'inspecteur :
- `<title>` correct
- `<meta name="description">` présent et pertinent
- OG tags présents
- Schema.org JSON-LD valide (coller dans https://validator.schema.org)
- Breadcrumb JSON-LD valide
- `rel="prev"` / `rel="next"` présents
- `<html lang="fr">`

- [ ] **Step 3 : Corriger tout problème identifié**

- [ ] **Step 4 : Commit final si corrections**

```bash
git add -A essais/
git commit -m "fix: corrections from final review"
```

- [ ] **Step 5 : Push**

```bash
git push origin main
```
