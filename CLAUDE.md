# Claude Code Configuration

## Project Overview
Personal consulting website for Ludovic Bostral - Streaming/OTT technology consultant.
Single-page site with multi-language support (EN/FR/ZH/ES).

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (no framework)
- **Hosting**: GitHub Pages
- **Form**: Formspree
- **Analytics**: Google Analytics, ContentSquare

## File Structure
```
/
├── index.html          # Single page with all sections
├── style.css           # All styles (~1400 lines)
├── script.js           # Translations + interactions (~1900 lines)
├── assets/
│   ├── big.jpeg        # Hero image
│   ├── m6-logo.png     # M6 case study logo
│   ├── afrostream-logo.png
│   └── favicon files
└── CLAUDE.md
```

## Key Patterns

### Translations
All text uses `data-i18n` attributes. Translations in `script.js`:
```javascript
const translations = {
    en: { "key.path": "English text" },
    fr: { "key.path": "French text" },
    zh: { "key.path": "中文" },
    es: { "key.path": "Spanish text" }
};
```

### CSS Variables
Use existing variables from `:root` in style.css:
- Colors: `--color-primary`, `--color-accent`, `--color-secondary`
- Spacing: `--spacing-sm/md/lg/xl/xxl`
- Typography: `--font-weight-bold/semibold/extrabold`

### Sections Order (in index.html)
1. Header + Language Switcher
2. Hero
3. Services (3 cards)
4. Results (stats)
5. Testimonials
6. **Case Studies** (M6 Replay, Afrostream)
7. Lead Capture Form
8. Resources
9. Content (Newsletter/Podcast)
10. About
11. Contact CTA
12. Footer
13. Modals (Legal, Case Studies, Resources)

## Common Tasks

### Add New Translation Key
1. Add to all 4 language objects in `script.js`
2. Use `data-i18n="section.key"` in HTML

### Add New Section
1. Insert HTML in `index.html` at correct position
2. Add styles in `style.css` before PRINT STYLES section
3. Add translations to all 4 languages

### Modify Case Studies
- Cards: Lines ~200-260 in `index.html`
- Modals: Lines ~556-670 in `index.html`
- Translations: Search `caseStudies.` in `script.js`

## Git Workflow
- Main branch: `main`
- Always commit with descriptive message
- Push directly to main for small changes

## External Links
- LinkedIn: https://linkedin.com/in/ludovicbostral
- Newsletter: https://streamingradar.substack.com
- Calendar: https://calendar.app.google/link
- Email: ludovic@bostral.com
