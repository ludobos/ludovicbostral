# Instruction pour Claude Code : Traduction Track Record Streaming

## Contexte
Tu as un fichier `streaming-predictions-fr.html` qui est un track record professionnel de prédictions streaming (2020-2026). Il contient 12 prédictions confirmées avec détails, 3 prédictions futures pour 2026, et toutes les infos de contact.

## Objectif
Créer 3 versions traduites (anglais, chinois mandarin, espagnol) + générer les PDFs pour chaque langue.

## Fichier source
`streaming-predictions-fr.html` (1018 lignes, 46 KB)

## Tâches à effectuer

### 1. Traduction en ANGLAIS (streaming-predictions-en.html)

**Sections à traduire :**
- Hero : "Track Record : Prédictions Streaming 2020-2026" → "Track Record: Streaming Predictions 2020-2026"
- Intro complète
- Stats labels
- Titres des 12 prédictions dans la timeline
- Section "Mes Prédictions 2026" → "My 2026 Predictions"
- Les 3 paris futurs (PARI #1, #2, #3 → BET #1, #2, #3)
- CTA principal
- Footer complet

**À NE PAS traduire :**
- Les noms propres : M6 Replay, Afrostream, Majelan, Kessel, Netflix, Disney, etc.
- Les noms de personnes : MrBeast, Squeezie, Inoxtag, Zack Nani, etc.
- Les URLs et emails
- Le CSS
- Le nom "Streaming Radar" (c'est une marque)

**Ton :** Professionnel B2B, corporate consulting, pas marketing agressif

### 2. Traduction en CHINOIS MANDARIN (streaming-predictions-zh.html)

**Important pour le chinois :**
- Utilise les caractères simplifiés (中国大陆标准)
- "Track Record" → "预测记录" ou "业绩记录"
- "Streaming" → "流媒体"
- Garde les titres de section courts et impactants
- Les chiffres peuvent rester en format occidental (12+, 25+, etc.)
- Format des dates : "2026年2月" pour "Février 2026"

**Spécificités :**
- "Consultant" → "顾问"
- "Prédictions confirmées" → "已验证预测"
- "Réserver un créneau" → "预约咨询" ou "预约会议"

### 3. Traduction en ESPAGNOL (streaming-predictions-es.html)

**Sections à traduire :**
- Hero : "Track Record: Predicciones Streaming 2020-2026"
- Intro complète
- Stats labels
- Titres des 12 prédictions
- Section "Mis Predicciones 2026"
- Los 3 pronósticos (APUESTA #1, #2, #3)
- CTA principal
- Footer completo

**Ton :** Profesional B2B, estilo consultoría corporativa

**Spécificités :**
- "Streaming" reste "streaming" (mot accepté en espagnol)
- "Réserver un créneau" → "Reservar una llamada"
- Garde le tutoiement professionnel ("usted" implicite)

### 4. Génération des PDFs

Pour chaque fichier HTML traduit, génère le PDF correspondant avec cette commande :

```bash
wkhtmltopdf \
  --enable-local-file-access \
  --page-size A4 \
  --margin-top 20mm \
  --margin-bottom 20mm \
  --margin-left 15mm \
  --margin-right 15mm \
  streaming-predictions-en.html \
  streaming-predictions-en.pdf

wkhtmltopdf \
  --enable-local-file-access \
  --page-size A4 \
  --margin-top 20mm \
  --margin-bottom 20mm \
  --margin-left 15mm \
  --margin-right 15mm \
  streaming-predictions-zh.html \
  streaming-predictions-zh.pdf

wkhtmltopdf \
  --enable-local-file-access \
  --page-size A4 \
  --margin-top 20mm \
  --margin-bottom 20mm \
  --margin-left 15mm \
  --margin-right 15mm \
  streaming-predictions-es.html \
  streaming-predictions-es.pdf
```

### 5. Vérifications finales

Pour chaque fichier créé, vérifie :
- ✅ Tous les liens sont cliquables (href présents)
- ✅ Les accents sont corrects (é, è, à, ñ, etc.)
- ✅ Les caractères chinois s'affichent correctement
- ✅ Le footer contient tous les liens de contact
- ✅ Le PDF fait environ 350-400 KB
- ✅ Les sections ne sont pas coupées en milieu de page

## Livrables attendus

À la fin, tu devrais avoir **6 fichiers** :

### HTML
1. `streaming-predictions-en.html` (anglais)
2. `streaming-predictions-zh.html` (chinois mandarin)
3. `streaming-predictions-es.html` (espagnol)

### PDF
4. `streaming-predictions-en.pdf` (anglais)
5. `streaming-predictions-zh.pdf` (chinois mandarin)
6. `streaming-predictions-es.pdf` (espagnol)

## Structure du document à respecter

Le document contient :
1. **Hero** : Titre + description + date
2. **Intro** : Pourquoi ce track record + 3 paris 2026
3. **Stats** : 4 cartes (2020, 12+, 25+, 3)
4. **Mes Prédictions 2026** : 3 paris audacieux en cartes
5. **Timeline confirmée** : 12 prédictions détaillées avec dates (2020-2026)
6. **Quote** : Citation de conclusion
7. **CTA** : Appel à l'action principal avec 2 boutons
8. **Footer** : Infos complètes + tous les liens de contact

## Notes importantes

- Conserve TOUS les liens href (cal.com, streamingradar.substack.com, bostral.com, etc.)
- Le CSS ne doit PAS être modifié
- Les meta tags peuvent être traduits (`<title>` notamment)
- Garde le même formatage HTML (classes, IDs, structure)
- Les emojis dans le footer sont OK (🌐📧📰📅💼)

## Ordre d'exécution recommandé

1. Commence par l'anglais (plus simple, permet de valider le process)
2. Génère le PDF anglais et vérifie
3. Ensuite chinois (plus technique avec les caractères)
4. Génère le PDF chinois et vérifie l'encodage
5. Termine par l'espagnol (similaire au français)
6. Génère le PDF espagnol

## Test rapide

Pour vérifier qu'un PDF est correct, ouvre-le et teste :
- Clique sur le lien cal.com → doit ouvrir le navigateur
- Clique sur l'email → doit ouvrir le client mail
- Scroll jusqu'au footer → toutes les infos présentes
- Vérifie qu'il n'y a pas de "☐" (caractères manquants)

## Si problème avec wkhtmltopdf

Si wkhtmltopdf n'est pas installé, dis-le moi et je te donnerai une solution alternative (reportlab ou weasyprint).

---

**GO ! Lance-toi et tiens-moi au courant de la progression.** 🚀
