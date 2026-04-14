# Instructions pour générer les favicons

## Image source
Le logo "Streaming Radar" fourni par l'utilisateur (illustration d'une personne avec un téléphone affichant "NETPLAX").

## Étapes pour créer les favicons

### Option 1 : RealFaviconGenerator (Recommandé)

1. Allez sur **https://realfavicongenerator.net/**
2. Cliquez sur "Select your Favicon image"
3. Téléchargez l'image du logo Streaming Radar
4. Configurez les options :
   - **Favicon for iOS**: Ajustez le padding si nécessaire
   - **Favicon for Android Chrome**: Utilisez la couleur de thème `#1A3D5C`
   - **Windows Metro**: Couleur de fond `#1A3D5C`
   - **macOS Safari**: Background color `#F5F3EF`
5. Générez et téléchargez le package
6. Extrayez les fichiers dans ce dossier `/assets/`

### Option 2 : Favicon.io

1. Allez sur **https://favicon.io/favicon-converter/**
2. Téléchargez l'image du logo
3. Téléchargez le package généré
4. Extrayez les fichiers dans `/assets/`

### Option 3 : Photoshop/GIMP (Manuel)

Si vous voulez créer manuellement :

1. **Ouvrir l'image** dans Photoshop/GIMP
2. **Recadrer** pour garder uniquement la partie importante (la personne + texte "STREAMING RADAR")
3. **Créer les différentes tailles** :
   - `favicon.ico` : 16x16, 32x32, 48x48 (multi-résolution)
   - `favicon-16x16.png` : 16x16
   - `favicon-32x32.png` : 32x32
   - `apple-touch-icon.png` : 180x180
   - `android-chrome-192x192.png` : 192x192
   - `android-chrome-512x512.png` : 512x512
4. **Exporter** chaque taille avec le bon nom
5. Placer dans `/assets/` (sauf favicon.ico à la racine)

## Fichiers attendus

Une fois générés, vous devriez avoir :

```
/home/user/ludovicbostral/
├── favicon.ico                           # À la racine
├── site.webmanifest                      # Déjà créé ✓
└── assets/
    ├── favicon-16x16.png                 # À créer
    ├── favicon-32x32.png                 # À créer
    ├── apple-touch-icon.png              # À créer
    ├── android-chrome-192x192.png        # À créer
    └── android-chrome-512x512.png        # À créer
```

## Vérification

Après avoir placé les fichiers :

1. Commit et push les fichiers
2. Déployer sur Netlify
3. Vérifier le favicon dans l'onglet du navigateur
4. Tester sur mobile (iOS et Android)
5. Tester "Add to Home Screen" sur mobile

## Couleurs du thème

- **Primary**: `#1A3D5C` (Bleu foncé)
- **Background**: `#F5F3EF` (Beige clair)
- **Accent**: `#E67E22` (Orange)

Ces couleurs correspondent au design du site et doivent être utilisées pour les backgrounds des favicons sur certains appareils.

## Notes

- Le logo Streaming Radar est très détaillé. Pour les petites tailles (16x16, 32x32), privilégiez une version simplifiée ou juste l'icône du personnage.
- Les favicons carrés fonctionnent mieux. Si besoin, ajoutez du padding.
- Assurez-vous que le texte "STREAMING RADAR" reste lisible aux petites tailles.
