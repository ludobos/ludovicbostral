#!/usr/bin/env python3
"""
Build script: Markdown chapters → HTML reader pages
Essay: "La France est-elle un pays de sport ?"
Author: Ludovic Bostral
"""

import subprocess
import re
import html
import os
from pathlib import Path

# ─── Constants ────────────────────────────────────────────────────────────────

BASE_URL = "/essais/la-france-est-elle-un-pays-de-sport"
ESSAY_TITLE = "La France est-elle un pays de sport ?"
AUTHOR = "Ludovic Bostral"
DATE = "2026-03-28"
TOTAL_CHAPTERS = 8
PANDOC = "/opt/homebrew/bin/pandoc"

SOURCE_DIR = Path("/Users/ludovicbostral/france-sport-data/output/essai")
OUTPUT_DIR = Path("/Users/ludovicbostral/ludovicbostral/essais/la-france-est-elle-un-pays-de-sport")

# ─── Chapter Configuration ────────────────────────────────────────────────────

CHAPTERS = [
    {
        "num": 1,
        "slug": "1-definition",
        "title": "Qu'est-ce qu'un pays de sport ?",
        "source": "01-definition-pays-de-sport.md",
        "images": ["infographie-4-modeles.svg"],
    },
    {
        "num": 2,
        "slug": "2-densite",
        "title": "La densité française",
        "source": "02-densite-francaise.md",
        "images": ["03-decrochage-jeunes.png"],
    },
    {
        "num": 3,
        "slug": "3-puissance-collective",
        "title": "La puissance collective",
        "source": "03-puissance-collective.md",
        "images": ["04-paris2024-genre.png", "06-profondeur-selections.png"],
    },
    {
        "num": 4,
        "slug": "4-desert-individuel",
        "title": "Le désert individuel et ses exceptions",
        "source": "04-desert-individuel.md",
        "images": [],
    },
    {
        "num": 5,
        "slug": "5-france-forme",
        "title": "La France forme, l'étranger élève",
        "source": "05-france-forme-etranger-eleve.md",
        "images": ["infographie-flux-export.svg"],
    },
    {
        "num": 6,
        "slug": "6-calque-educatif",
        "title": "Le calque éducatif",
        "source": "06-calque-educatif.md",
        "images": ["08-taxonomie-monopole.png"],
    },
    {
        "num": 7,
        "slug": "7-comment-tweaker",
        "title": "Comment tweaker le système",
        "source": "07-comment-tweaker.md",
        "images": ["02-uk-sport-trajectoire.png", "05-cout-france-uk.png", "07-ou-va-largent.png"],
    },
    {
        "num": 8,
        "slug": "8-conclusion",
        "title": "Conclusion : Un pays de sport, pas encore",
        "source": "08-conclusion.md",
        "images": [],
    },
    {
        "num": None,  # bibliographie = not a numbered chapter
        "slug": "bibliographie",
        "title": "Bibliographie",
        "source": "09-bibliographie.md",
        "images": [],
    },
]

# ─── Helpers ─────────────────────────────────────────────────────────────────

def word_count(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    return len(text.split())


def reading_time(words: int) -> int:
    return max(1, round(words / 250))


def markdown_to_html(source_path: Path) -> str:
    result = subprocess.run(
        [PANDOC, "--from=markdown", "--to=html5", str(source_path)],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout


def strip_first_h1(html_body: str) -> str:
    """Remove the first <h1>...</h1> block from converted HTML."""
    return re.sub(r"<h1[^>]*>.*?</h1>", "", html_body, count=1, flags=re.DOTALL)


def strip_tags(html_str: str) -> str:
    return re.sub(r"<[^>]+>", "", html_str)


def meta_description(body_html: str, max_chars: int = 150) -> str:
    text = strip_tags(body_html).strip()
    text = re.sub(r"\s+", " ", text)
    if len(text) <= max_chars:
        return text
    truncated = text[:max_chars]
    last_space = truncated.rfind(" ")
    if last_space > 0:
        truncated = truncated[:last_space]
    return truncated + "..."


def figure_html(image_filename: str, chapter_title: str) -> str:
    ext = image_filename.rsplit(".", 1)[-1].lower()
    alt_text = html.escape(chapter_title)
    src = f"img/{image_filename}"
    return (
        f'<figure class="chapter-figure">\n'
        f'  <img src="{src}" alt="{alt_text}" loading="lazy">\n'
        f'</figure>\n'
    )


def chapter_href(ch: dict) -> str:
    return f"{ch['slug']}.html"


# ─── Navigation helpers ───────────────────────────────────────────────────────

def get_prev_next(index: int):
    """Return (prev_dict, next_dict) for CHAPTERS[index].
    prev/next can have special keys: slug, title.
    """
    ch = CHAPTERS[index]

    if index == 0:
        # Chapter 1: prev = index.html
        prev = {"slug": "index", "title": "Introduction"}
        next_ch = CHAPTERS[1]
    elif index == len(CHAPTERS) - 1:
        # Bibliographie: prev = chapter 8, no next
        prev = CHAPTERS[index - 1]
        next_ch = None
    elif ch["num"] == 8:
        # Chapter 8: next = bibliographie
        prev = CHAPTERS[index - 1]
        next_ch = CHAPTERS[index + 1]  # bibliographie
    else:
        prev = CHAPTERS[index - 1]
        next_ch = CHAPTERS[index + 1]

    return prev, next_ch


# ─── TOC HTML ─────────────────────────────────────────────────────────────────

def toc_html(current_slug: str, reading_times: dict) -> str:
    items = []
    for ch in CHAPTERS:
        slug = ch["slug"]
        title = ch["title"]
        rt = reading_times.get(slug, 1)
        is_current = "current" if slug == current_slug else ""
        num_label = f"Ch.{ch['num']} · " if ch["num"] is not None else ""
        items.append(
            f'      <li class="{is_current}">'
            f'<a href="{chapter_href(ch)}">'
            f'{num_label}{html.escape(title)}'
            f'<span class="toc-time">{rt} min</span>'
            f"</a></li>"
        )
    return "\n".join(items)


# ─── Schema.org JSON-LD ───────────────────────────────────────────────────────

def schema_article(ch: dict, chapter_url: str, description: str) -> str:
    essay_url = f"https://www.bostral.com{BASE_URL}/"
    pos = ch["num"] if ch["num"] is not None else 9
    escaped_title = ch["title"].replace('"', '\\"')
    escaped_desc = description.replace('"', '\\"')
    return f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{escaped_title}",
  "description": "{escaped_desc}",
  "author": {{
    "@type": "Person",
    "name": "{AUTHOR}",
    "url": "https://www.linkedin.com/in/ludovicbostral"
  }},
  "datePublished": "{DATE}",
  "inLanguage": "fr-FR",
  "url": "{chapter_url}",
  "isPartOf": {{
    "@type": "Book",
    "name": "{ESSAY_TITLE}",
    "url": "{essay_url}"
  }},
  "position": {pos}
}}
</script>'''


def schema_breadcrumb(ch: dict, chapter_url: str) -> str:
    essay_url = f"https://www.bostral.com{BASE_URL}/"
    essays_url = "https://www.bostral.com/essais/"
    escaped_ch_title = ch["title"].replace('"', '\\"')
    escaped_essay_title = ESSAY_TITLE.replace('"', '\\"')
    return f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://www.bostral.com/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "Essais",
      "item": "{essays_url}"
    }},
    {{
      "@type": "ListItem",
      "position": 3,
      "name": "{escaped_essay_title}",
      "item": "{essay_url}"
    }},
    {{
      "@type": "ListItem",
      "position": 4,
      "name": "{escaped_ch_title}",
      "item": "{chapter_url}"
    }}
  ]
}}
</script>'''


# ─── Full page template ───────────────────────────────────────────────────────

def render_page(ch: dict, body_html: str, reading_times: dict) -> str:
    slug = ch["slug"]
    title = ch["title"]
    chapter_num = ch["num"]
    rt = reading_times.get(slug, 1)

    chapter_url = f"https://www.bostral.com{BASE_URL}/{slug}.html"
    essay_url = f"https://www.bostral.com{BASE_URL}/"

    description = meta_description(body_html)
    escaped_title = html.escape(title)
    escaped_description = html.escape(description)
    escaped_essay_title = html.escape(ESSAY_TITLE)

    # Chapter label for progress bar
    if chapter_num is not None:
        chapter_label = f"Chapitre {chapter_num} sur {TOTAL_CHAPTERS} · ~{rt} min"
    else:
        chapter_label = f"Bibliographie · ~{rt} min"

    # Prev / next
    index = next(i for i, c in enumerate(CHAPTERS) if c["slug"] == slug)
    prev_ch, next_ch = get_prev_next(index)

    # <link rel="prev/next"> in head
    prev_link = ""
    if prev_ch:
        prev_href = f"{prev_ch['slug']}.html"
        prev_link = f'  <link rel="prev" href="{prev_href}">'

    next_link = ""
    if next_ch:
        next_href = f"{next_ch['slug']}.html"
        next_link = f'  <link rel="next" href="{next_href}">'

    # Progress bar nav buttons
    prev_btn = ""
    if prev_ch:
        prev_href = f"{prev_ch['slug']}.html"
        prev_btn = f'<a href="{prev_href}" class="progress-nav__prev" aria-label="Chapitre précédent">‹ Précédent</a>'
    else:
        prev_btn = '<span class="progress-nav__prev progress-nav__prev--disabled">‹ Précédent</span>'

    next_btn = ""
    if next_ch:
        next_href = f"{next_ch['slug']}.html"
        next_btn = f'<a href="{next_href}" class="progress-nav__next" aria-label="Chapitre suivant">Suivant ›</a>'
    else:
        next_btn = '<span class="progress-nav__next progress-nav__next--disabled">Fin</span>'

    # Chapter nav at bottom of article
    article_prev = ""
    if prev_ch:
        prev_href = f"{prev_ch['slug']}.html"
        escaped_prev_title = html.escape(prev_ch["title"])
        article_prev = (
            f'<a href="{prev_href}" class="chapter-nav__prev">'
            f'<span class="chapter-nav__label">Chapitre précédent</span>'
            f'<span class="chapter-nav__title">{escaped_prev_title}</span>'
            f"</a>"
        )

    article_next = ""
    if next_ch:
        next_href = f"{next_ch['slug']}.html"
        escaped_next_title = html.escape(next_ch["title"])
        article_next = (
            f'<a href="{next_href}" class="chapter-nav__next">'
            f'<span class="chapter-nav__label">Chapitre suivant</span>'
            f'<span class="chapter-nav__title">{escaped_next_title}</span>'
            f"</a>"
        )

    # Figures for images
    figures_html = ""
    if ch.get("images"):
        for img in ch["images"]:
            figures_html += figure_html(img, title)

    # TOC
    toc = toc_html(slug, reading_times)

    # Breadcrumb
    if chapter_num is not None:
        breadcrumb_current = f"Chapitre {chapter_num} — {escaped_title}"
    else:
        breadcrumb_current = escaped_title

    # Schema.org
    schema1 = schema_article(ch, chapter_url, description)
    schema2 = schema_breadcrumb(ch, chapter_url)

    # Download URLs (relative for file:// compatibility)
    pdf_url = "la-france-est-elle-un-pays-de-sport.pdf"
    epub_url = "la-france-est-elle-un-pays-de-sport.epub"

    # Page title for <title> tag
    page_title = f"{escaped_title} — {escaped_essay_title}"

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page_title}</title>
  <meta name="description" content="{escaped_description}">
  <link rel="canonical" href="{chapter_url}">
{prev_link}
{next_link}

  <!-- GEO meta -->
  <meta name="geo.region" content="FR">
  <meta name="geo.placename" content="France">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="{escaped_essay_title}">
  <meta property="og:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part. Un essai de Ludovic Bostral.">
  <meta property="og:image" content="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg">
  <meta property="og:url" content="{essay_url}">
  <meta property="og:locale" content="fr_FR">
  <meta property="article:author" content="https://www.linkedin.com/in/ludovicbostral">
  <meta property="article:published_time" content="{DATE}">
  <meta property="article:section" content="Sport">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{escaped_essay_title}">
  <meta name="twitter:description" content="La France forme 17,2 millions de licenciés et n'élève nulle part. Un essai de Ludovic Bostral.">
  <meta name="twitter:image" content="https://www.bostral.com/essais/la-france-est-elle-un-pays-de-sport/img/og-cover.jpg">

  <!-- Schema.org -->
  {schema1}
  {schema2}

  <link rel="stylesheet" href="../essais.css">
</head>
<body>

  <!-- Progress bar -->
  <header class="progress-bar">
    <div class="progress-bar__download">
      <a href="{pdf_url}" download>PDF</a> ·
      <a href="{epub_url}" download>ePub</a>
    </div>
    <span class="progress-bar__text" role="button" tabindex="0" aria-label="Ouvrir la table des matières">
      {chapter_label}
    </span>
    <button class="progress-bar__dark-toggle" aria-label="Mode sombre"></button>
    <div class="progress-bar__track"><div class="progress-bar__fill"></div></div>
  </header>

  <!-- TOC overlay -->
  <div class="toc-overlay" role="dialog" aria-label="Table des matières">
    <div class="toc-overlay__content">
      <div class="toc-overlay__title">{escaped_essay_title}</div>
      <ul class="toc-overlay__list">
{toc}
      </ul>
      <div class="toc-overlay__download">
        Télécharger : <a href="{pdf_url}" download>PDF</a> ·
        <a href="{epub_url}" download>ePub</a>
      </div>
    </div>
  </div>

  <!-- Main article -->
  <main>
    <article class="reader">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <ol>
          <li><a href="https://www.bostral.com/">Accueil</a></li>
          <li><a href="https://www.bostral.com/essais/">Essais</a></li>
          <li><a href="{essay_url}">{escaped_essay_title}</a></li>
          <li aria-current="page">{breadcrumb_current}</li>
        </ol>
      </nav>

      <h1>{escaped_title}</h1>

      <div class="reader__body">
{body_html}
{figures_html}
      </div>

      <!-- Chapter navigation -->
      <nav class="chapter-nav" aria-label="Navigation entre chapitres">
        <div class="chapter-nav__prev-wrap">
          {article_prev}
        </div>
        <div class="chapter-nav__next-wrap">
          {article_next}
        </div>
      </nav>

    </article>
  </main>

  <!-- Footer -->
  <footer class="reader-footer">
    <p>
      <strong>{escaped_essay_title}</strong> —
      <a href="https://www.linkedin.com/in/ludovicbostral">{AUTHOR}</a> · {DATE}
    </p>
    <p>
      <a href="index.html">Retour à l'essai</a> ·
      <a href="{pdf_url}" download>PDF</a> ·
      <a href="{epub_url}" download>ePub</a>
    </p>
  </footer>

  <script src="../essais.js"></script>
</body>
</html>
"""


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    # Pre-compute reading times for all chapters
    reading_times = {}
    for ch in CHAPTERS:
        src = SOURCE_DIR / ch["source"]
        if src.exists():
            words = word_count(src)
            reading_times[ch["slug"]] = reading_time(words)
        else:
            print(f"  WARNING: source not found: {src}")
            reading_times[ch["slug"]] = 1

    # Generate each chapter
    for ch in CHAPTERS:
        src = SOURCE_DIR / ch["source"]
        if not src.exists():
            print(f"  SKIP (not found): {src}")
            continue

        print(f"  Building {ch['slug']}.html from {ch['source']}...")

        # Convert markdown to HTML via pandoc
        body_html = markdown_to_html(src)

        # Strip first <h1> (we render our own)
        body_html = strip_first_h1(body_html)

        # Render full page
        page = render_page(ch, body_html, reading_times)

        # Write output
        out_path = OUTPUT_DIR / f"{ch['slug']}.html"
        out_path.write_text(page, encoding="utf-8")
        size_kb = out_path.stat().st_size // 1024
        print(f"    → {out_path} ({size_kb} KB)")

    print("\nDone. Generated files:")
    for ch in CHAPTERS:
        out_path = OUTPUT_DIR / f"{ch['slug']}.html"
        if out_path.exists():
            print(f"  {out_path.name}  ({out_path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
