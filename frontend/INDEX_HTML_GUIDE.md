# 📝 Guide de Personnalisation - index.html

## 🎯 Comment modifier facilement

Le fichier `index.html` est structuré en **sections claires** avec des commentaires explicites.

---

## ✏️ Modifications courantes

### 1. Changer le titre du site

**Section :** `MÉTADONNÉES SEO`

```html
<title>VOTRE_TITRE - Votre slogan</title>
```

**Où :** Ligne ~20  
**Impact :** Titre dans l'onglet, résultats Google, favoris

**Exemples :**
```html
<!-- Exemple 1 -->
<title>EventPro - Événements professionnels</title>

<!-- Exemple 2 -->
<title>FestiEvents - Festivals et concerts près de chez vous</title>
```

---

### 2. Modifier la description SEO

**Section :** `MÉTADONNÉES SEO`

```html
<meta name="description" content="VOTRE_DESCRIPTION" />
```

**Où :** Ligne ~21  
**Conseil :** 150-160 caractères max  
**Impact :** Résumé dans les résultats Google

**Exemple :**
```html
<meta name="description" content="Réservez vos places pour des événements uniques : concerts, conférences, ateliers. Billetterie sécurisée." />
```

---

### 3. Changer les mots-clés

**Section :** `MÉTADONNÉES SEO`

```html
<meta name="keywords" content="mot1, mot2, mot3" />
```

**Où :** Ligne ~22  
**Format :** Séparés par des virgules

**Exemple :**
```html
<meta name="keywords" content="concerts, festivals, musique, billetterie, réservation, événements live" />
```

---

### 4. Personnaliser l'auteur

**Section :** `MÉTADONNÉES SEO`

```html
<meta name="author" content="VOTRE_NOM_OU_ENTREPRISE" />
```

**Où :** Ligne ~23

---

### 5. Modifier les URLs pour les réseaux sociaux

**Section :** `Open Graph / Facebook` et `Twitter`

**Où :** Lignes ~26-38

**À modifier :**
```html
<meta property="og:url" content="https://VOTRE_SITE.com/" />
<meta property="twitter:url" content="https://VOTRE_SITE.com/" />
```

**Important :** Remplacez `https://onelastevent.com/` par votre vrai domaine

---

### 6. Changer l'image de partage social

**Section :** `Open Graph / Facebook` et `Twitter`

**Où :** Lignes ~30 et ~38

```html
<meta property="og:image" content="/CHEMIN/VERS/IMAGE.jpg" />
<meta property="twitter:image" content="/CHEMIN/VERS/IMAGE.jpg" />
```

**Recommandations :**
- Format : JPG ou PNG
- Dimensions : 1200x630px (ratio 1.91:1)
- Taille : < 5MB
- Nom : `og-image.jpg` dans `/public`

---

### 7. Personnaliser les favicons

**Section :** `FAVICONS`

**Où :** Lignes ~43-47

**Fichiers nécessaires :**
```
public/
├── favicon.ico          (32x32 ou 64x64)
├── favicon-32x32.png    (32x32)
├── favicon-16x16.png    (16x16)
├── apple-touch-icon.png (180x180)
├── favicon-192x192.png  (192x192)
└── favicon-512x512.png  (512x512)
```

**Générateurs gratuits :**
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon Generator](https://www.favicon-generator.org/)

---

### 8. Changer la police de caractères

**Section :** `POLICES & ICONES`

**Où :** Lignes ~52-54

**Actuellement :** Inter (moderne, lisible)

**Autres polices Google Fonts :**

```html
<!-- Poppins (plus géométrique) -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

<!-- Montserrat (élégante) -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

<!-- Roboto (classique) -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
```

**Puis dans `tailwind.config.js` :**
```javascript
fontFamily: {
  body: ['Poppins', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'system-ui', 'sans-serif'],
},
```

---

### 9. Modifier les couleurs du thème

**Section :** `COULEUR DU THÈME`

**Où :** Lignes ~63-64

```html
<meta name="theme-color" content="#0a0a0a" />
<meta name="msapplication-TileColor" content="#22c55e" />
```

**Couleurs suggérées :**
```html
<!-- Noir & Vert (actuel) -->
<meta name="theme-color" content="#0a0a0a" />
<meta name="msapplication-TileColor" content="#22c55e" />

<!-- Bleu -->
<meta name="theme-color" content="#0f172a" />
<meta name="msapplication-TileColor" content="#3b82f6" />

<!-- Violet -->
<meta name="theme-color" content="#0f0a1f" />
<meta name="msapplication-TileColor" content="#8b5cf6" />

<!-- Orange -->
<meta name="theme-color" content="#1a0f0a" />
<meta name="msapplication-TileColor" content="#f97316" />
```

---

### 10. Ajouter des scripts externes

**Section :** `SCRIPTS OPTIONNELS`

**Où :** Lignes ~77-85

**Exemples :**

#### Google Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Plausible Analytics (alternatif RGPD-friendly)
```html
<script defer data-domain="VOTRE_SITE.com" src="https://plausible.io/js/script.js"></script>
```

#### Hotjar (heatmaps)
```html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

#### Crisp Chat
```html
<script>
  window.$crisp=[];
  window.CRISP_WEBSITE_ID="VOTRE_ID";
  (function(){
    d=document;s=d.createElement("script");
    s.src="https://client.crisp.chat/l.js";
    s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
  })();
</script>
```

---

## 🔧 Structure complète du HTML

```
index.html
├── CONFIGURATION GÉNÉRALE
│   ├── charset, viewport, IE-edge
│   
├── MÉTADONNÉES SEO
│   ├── title (titre page)
│   ├── description (résumé Google)
│   ├── keywords (mots-clés)
│   └── author (auteur)
│   
├── OPEN GRAPH (Facebook/LinkedIn)
│   ├── type, url, title, description, image
│   
├── TWITTER CARDS
│   ├── card, url, title, description, image
│   
├── FAVICONS
│   ├── favicon.ico, png, apple-touch-icon
│   └── site.webmanifest (PWA)
│   
├── POLICES & ICONES
│   └── Google Fonts (Inter)
│   
├── STYLES PRÉCHARGÉS
│   └── preload CSS
│   
├── COULEUR DU THÈME
│   ├── theme-color (barre mobile)
│   └── msapplication-TileColor (Windows)
│   
├── ACCESSIBILITÉ
│   └── color-scheme (dark/light)
│   
└── BODY
    ├── #root (app React)
    ├── main.jsx (entry point)
    └── scripts optionnels
```

---

## 📋 Checklist avant mise en ligne

### SEO
- [ ] Titre personnalisé (< 60 caractères)
- [ ] Description personnalisée (150-160 caractères)
- [ ] Mots-clés pertinents
- [ ] Auteur renseigné

### Réseaux sociaux
- [ ] URL du site modifiée
- [ ] Image OG personnalisée (1200x630px)
- [ ] Titre et description accrocheurs

### Favicons
- [ ] Tous les fichiers favicon générés
- [ ] Placés dans `/public`
- [ ] Testés sur navigateur et mobile

### Performance
- [ ] Police Google Fonts préchargée
- [ ] CSS préchargé
- [ ] Scripts analytics optimisés

### Accessibilité
- [ ] Langue définie (`lang="fr"`)
- [ ] Contrastes vérifiés
- [ ] Meta viewport configurée

---

## 🚀 Déploiement rapide

### 1. Modifications minimales requises

```html
<!-- Ligne 20 -->
<title>VOTRE_SITE - Votre slogan</title>

<!-- Ligne 21 -->
<meta name="description" content="Votre description" />

<!-- Ligne 26 -->
<meta property="og:url" content="https://votre-site.com/" />

<!-- Ligne 30 -->
<meta property="og:image" content="/og-image.jpg" />
```

### 2. Optionnel mais recommandé

- [ ] Ajouter Google Analytics
- [ ] Personnaliser favicons
- [ ] Ajouter chat widget
- [ ] Configurer PWA manifest

---

## 💡 Astuces

### 1. Tester les métadonnées

**Facebook Debugger :**  
https://developers.facebook.com/tools/debug/

**Twitter Card Validator :**  
https://cards-dev.twitter.com/validator

**Google Rich Results :**  
https://search.google.com/test/rich-results

### 2. Générer les favicons

**Outil recommandé :**  
https://realfavicongenerator.net/

Upload une image 512x512 → Télécharge tous les formats + code tout fait

### 3. Optimiser les performances

Utilisez ces outils :
- **PageSpeed Insights** : https://pagespeed.web.dev/
- **GTmetrix** : https://gtmetrix.com/
- **WebPageTest** : https://www.webpagetest.org/

### 4. Vérifier le SEO

- **Google Search Console** : https://search.google.com/search-console
- **Ahrefs Webmaster Tools** : https://ahrefs.com/webmaster-tools
- **SEObility** : https://en.seobility.net/

---

## 🎨 Exemple complet personnalisé

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <!-- Configuration -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO -->
    <title>FestiLive - Concerts et festivals near you</title>
    <meta name="description" content="Réservez vos places de concerts et festivals. Billetterie sécurisée, artistes confirmés et émergents." />
    <meta name="keywords" content="concerts, festivals, musique, billetterie, live, rock, pop, electro" />
    <meta name="author" content="FestiLive SAS" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://festilive.fr/" />
    <meta property="og:title" content="FestiLive - Vivez la musique" />
    <meta property="og:description" content="Concerts et festivals à réserver maintenant" />
    <meta property="og:image" content="/og-festival.jpg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://festilive.fr/" />
    <meta property="twitter:title" content="FestiLive - Vivez la musique" />
    <meta property="twitter:description" content="Concerts et festivals à réserver" />
    <meta property="twitter:image" content="/og-festival.jpg" />
    
    <!-- Favicons -->
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Polices -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    
    <!-- Thème -->
    <meta name="theme-color" content="#0f0a1f" />
    <meta name="msapplication-TileColor" content="#8b5cf6" />
  </head>
  
  <body class="antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    
    <!-- Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_XXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_XXX');
    </script>
  </body>
</html>
```

---

## ❓ FAQ

### Q: Puis-je supprimer les métadonnées Twitter si je ne l'utilise pas ?
**R :** Oui, mais gardez-les car elles sont utilisées même sans compte Twitter (partages de liens).

### Q: Doit-on absolument mettre un fichier `site.webmanifest` ?
**R :** Non, c'est optionnel. Utile seulement si vous voulez une PWA installable.

### Q: Comment tester en local avant déploiement ?
**R :** Utilisez l'extension "Meta Tag Inspector" sur Chrome/Firefox.

### Q: Les commentaires dans le HTML ralentissent-ils le site ?
**R :** Non, ils sont ignorés par le navigateur. Gardez-les pour la maintenance.

### Q: Puis-je ajouter du CSS inline dans le `<head>` ?
**R :** Oui, dans une balise `<style>`, mais préférez les fichiers externes.

---

## 📞 Besoin d'aide ?

Consultez ces ressources :

- **MDN Web Docs** : https://developer.mozilla.org/fr/
- **HTML5 Boilerplate** : https://html5boilerplate.com/
- **W3C Validator** : https://validator.w3.org/

---

**Votre index.html est maintenant optimisé et facile à personnaliser !** 🎉

Modifiez les sections commentées selon vos besoins, tout est prêt.
