# 🎨 Système de Design EventDKC2

Un système de design professionnel, moderne et élégant avec une palette **Noir & Vert**.

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Palette de couleurs](#palette-de-couleurs)
- [Composants](#composants)
- [Animations](#animations)
- [Utilisation](#utilisation)
- [Exemples](#exemples)

---

## 🎯 Aperçu

Ce système de design fournit:

- ✅ **Simple** - Palette bicolore noir et vert
- ✅ **Complet** - Tous les composants UI nécessaires
- ✅ **Professionnel** - Design moderne et élégant
- ✅ **Accessible** - Contrastes WCAG AA
- ✅ **Responsive** - Adapté à tous les écrans
- ✅ **Animé** - Transitions fluides et effets spéciaux

---

## 🚀 Installation

Le CSS est déjà configuré dans le projet. Aucun package supplémentaire n'est requis.

### Structure des fichiers

```
frontend/src/
├── index.css                    # CSS principal avec tous les composants
├── assets/
│   ├── animations.css          # Animations avancées
│   └── CSS_GUIDE.js            # Guide d'utilisation détaillé
└── components/
    └── CSSShowcase.jsx         # Démo interactive
```

---

## 🎨 Palette de couleurs

### Couleurs principales

```css
/* Vert Principal */
primary-50:  #f0fdf4    /* Très clair */
primary-100: #dcfce7
primary-200: #bbf7d0
primary-300: #86efac
primary-400: #4ade80
primary-500: #22c55e    /* Standard */
primary-600: #16a34a
primary-700: #15803d
primary-800: #166534
primary-900: #14532d
primary-950: #052e16    /* Très foncé */

/* Vert Accent (Néon) */
accent-500: #22dd22     /* Vert néon */
accent-600: #00cc00
accent-700: #00aa00

/* Neutres (Noirs & Gris) */
neutral-950: #0a0a0a    /* Noir profond */
neutral-900: #111111
neutral-850: #1a1a1a
neutral-800: #222222
neutral-700: #333333
neutral-600: #444444
neutral-500: #555555
neutral-400: #666666
neutral-300: #888888
neutral-200: #aaaaaa
neutral-100: #cccccc
```

---

## 🧩 Composants

### 1. Boutons

```jsx
// Principal
<button className="btn-primary">Action</button>

// Secondaire
<button className="btn-secondary">Annuler</button>

// Fantôme
<button className="btn-ghost">Voir plus</button>

// Contour
<button className="btn-outline">Détails</button>

// Succès
<button className="btn-success">Confirmer</button>

// Danger
<button className="btn-danger">Supprimer</button>

// Tailles
<button className="btn-primary btn-sm">Petit</button>
<button className="btn-primary btn-lg">Grand</button>
```

### 2. Champs de formulaire

```jsx
// Input standard
<input type="text" className="input" placeholder="Votre nom" />

// Input avec erreur
<input type="email" className="input input-error" />

// Input avec succès
<input type="text" className="input input-success" />

// Label
<label className="label">Nom</label>
<label className="label label-required">Email *</label>

// Texte d'aide
<p className="helper-text">Minimum 8 caractères</p>

// Texte d'erreur
<p className="error-text">Champ requis</p>
```

### 3. Cartes

```jsx
// Carte standard
<div className="card">Contenu</div>

// Carte avec hover
<div className="card-hover">Contenu interactif</div>

// Carte cliquable
<div className="card-interactive">Lien</div>

// Effet verre
<div className="glass">Contenu translucide</div>
```

### 4. Badges

```jsx
<span className="badge badge-primary">Nouveau</span>
<span className="badge badge-success">Confirmé</span>
<span className="badge badge-warning">En attente</span>
<span className="badge badge-danger">Annulé</span>
<span className="badge badge-neutral">Info</span>
```

### 5. Alertes

```jsx
<div className="alert alert-info">Information</div>
<div className="alert alert-success">Succès</div>
<div className="alert alert-warning">Attention</div>
<div className="alert alert-error">Erreur</div>
```

### 6. Typographie

```jsx
// Titres
<h1 className="section-title">Titre</h1>
<h2 className="heading-1">Titre 1</h2>
<h3 className="heading-2">Titre 2</h3>

// Texte
<p className="body-text">Paragraphe</p>
<p className="body-text-small">Petit texte</p>
<p className="caption">Légende</p>

// Texte avec gradient
<h2 className="gradient-text">Titre coloré</h2>
```

---

## ✨ Animations

### Animations d'apparition

```jsx
<div className="fade-in">Apparaît en douceur</div>
<div className="animate-slide-up">Glisse vers le haut</div>
<div className="zoom-in">Zoom avant</div>
```

### Animations continues

```jsx
<div className="float">Flotte</div>
<div className="pulse-slow">Pulse lentement</div>
<div className="spin-slow">Tourne</div>
<div className="shimmer">Scintille</div>
<div className="glow">Brille</div>
```

### Effets au survol

```jsx
<div className="hover-lift">Se soulève au survol</div>
<div className="card-shine">Brille au survol</div>
<div className="border-draw">Bordure animée</div>
```

---

## 💡 Utilisation

### Importation du CSS

Le CSS est automatiquement importé dans `App.jsx`:

```jsx
import './index.css';
```

### Personnalisation avec Tailwind

```jsx
// Utiliser les couleurs personnalisées
<div className="bg-primary-500 text-white">
  Fond vert, texte blanc
</div>

// Utiliser les ombres personnalisées
<div className="shadow-glow-green">
  Ombre verte lumineuse
</div>

// Utiliser les dégradés personnalisés
<div className="bg-hero-gradient">
  Dégradé héro
</div>
```

---

## 📚 Exemples complets

### Exemple 1: Carte d'événement

```jsx
<article className="card-hover">
  <div className="relative aspect-video overflow-hidden">
    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    <div className="absolute top-3 left-3">
      <span className="badge badge-primary">À venir</span>
    </div>
  </div>
  <div className="p-5">
    <h3 className="heading-4 mb-2">{event.title}</h3>
    <p className="body-text-small text-neutral-400 mb-4">
      {event.description}
    </p>
    <div className="flex items-center justify-between">
      <span className="badge badge-success">{event.price}€</span>
      <button className="btn-primary btn-sm">Réserver</button>
    </div>
  </div>
</article>
```

### Exemple 2: Formulaire de connexion

```jsx
<form className="space-y-6 max-w-md mx-auto">
  <div className="form-group">
    <label className="label label-required">Email</label>
    <input 
      type="email" 
      className="input" 
      placeholder="vous@exemple.com" 
    />
    <p className="helper-text">Nous ne partagerons jamais votre email</p>
  </div>
  
  <div className="form-group">
    <label className="label label-required">Mot de passe</label>
    <input 
      type="password" 
      className="input" 
      placeholder="••••••••" 
    />
  </div>
  
  <button type="submit" className="btn-primary w-full">
    Se connecter
  </button>
</form>
```

### Exemple 3: Dashboard statistiques

```jsx
<div className="dashboard-grid">
  <div className="stat-card">
    <div className="stat-card-value gradient-text">128</div>
    <div className="stat-card-label">Événements créés</div>
  </div>
  <div className="stat-card">
    <div className="stat-card-value gradient-text">1,234</div>
    <div className="stat-card-label">Participants</div>
  </div>
  <div className="stat-card">
    <div className="stat-card-value gradient-text">45.6k€</div>
    <div className="stat-card-label">Revenus</div>
  </div>
</div>
```

---

## 🎯 Voir la démo

Pour voir tous les composants en action, ajoutez cette route dans `App.jsx`:

```jsx
import CSSShowcase from './components/CSSShowcase';

// Dans les routes
<Route path="/demo-css" element={<CSSShowcase />} />
```

Puis visitez: `http://localhost:5173/demo-css`

---

## 📖 Bonnes pratiques

### 1. Espacement

Utilisez les multiples de 4 pour une cohérence visuelle:

```jsx
className="p-4"    // 16px
className="p-6"    // 24px
className="p-8"    // 32px
```

### 2. Rayons de bordure

```jsx
className="rounded-xl"   // 12px - Standard
className="rounded-2xl"  // 16px - Grand
```

### 3. Ombres

Toujours subtiles et progressives:

```jsx
className="shadow-card"        // Normal
className="shadow-card-hover"  // Au survol
className="shadow-glow-green"  // Effet lumineux
```

### 4. Accessibilité

- Les contrastes respectent WCAG AA
- Les états focus sont visibles
- Les animations peuvent être réduites

---

## 🔧 Configuration Tailwind

Le fichier `tailwind.config.js` inclut:

- ✅ Couleurs personnalisées (primary, accent, neutral)
- ✅ Polices (display, body)
- ✅ Animations (fade-in, slide-up, scale-up...)
- ✅ Ombres personnalisées (glow-green, card...)
- ✅ Dégradés personnalisés (hero-gradient, button-gradient...)

---

## 📝 Notes

### Performance

- Les animations utilisent `transform` et `opacity` pour 60fps
- Le `backdrop-blur` est utilisé avec modération
- Les images doivent être optimisées

### Responsive

Tous les composants sont responsive par défaut. Utilisez les préfixes:

```jsx
className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

### Support navigateurs

- Chrome/Edge: ✅ Complet
- Firefox: ✅ Complet
- Safari: ✅ Complet (backdrop-blur partiel)

---

## 📞 Support

Pour toute question ou problème:

1. Consultez le fichier `CSS_GUIDE.js`
2. Vérifiez la démo `/demo-css`
3. Examinez les composants existants

---

**Créé avec ❤️ pour EventDKC2**

*Design simple, complet et professionnel*
