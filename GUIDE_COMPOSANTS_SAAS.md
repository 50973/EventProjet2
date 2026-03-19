# 📖 Guide d'Utilisation - Composants SaaS

## 🎯 Comment utiliser les nouveaux composants

---

## 1️⃣ Container - Centrer du contenu

### Utilisation basique :
```jsx
import Container from './components/Container';

function MaPage() {
  return (
    <Container>
      {/* Votre contenu centré */}
      <h1>Titre</h1>
      <p>Contenu...</p>
    </Container>
  );
}
```

### Avec className personnalisé :
```jsx
<Container className="py-12">
  {/* Padding vertical ajouté */}
  Contenu avec spacing personnalisé
</Container>
```

**Résultat :**
- Contenu centré horizontalement
- Max-width: 1280px (7xl)
- Padding responsive automatique
- Espacement cohérent

---

## 2️⃣ SectionHeading - Titres de section

### Usage standard :
```jsx
import SectionHeading from './components/SectionHeading';

<SectionHeading 
  title="Nos Événements"
  subtitle="Découvrez les meilleurs événements près de chez vous"
/>
```

### Alignement à gauche :
```jsx
<SectionHeading 
  title="Événements récents"
  align="left"
/>
```

### Titre seul :
```jsx
<SectionHeading title="Simple titre" />
```

**Résultat :**
- Titre h2 stylisé automatiquement
- Sous-titre optionnel en gris
- Margin bottom automatique (mb-12)
- Alignement configurable

---

## 3️⃣ Layout - Structure globale

Le Layout est **automatiquement utilisé** via le routing. Pas besoin de l'importer !

```jsx
// Dans App.jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  {/* Vos pages */}
</Route>
```

**Structure appliquée :**
```
Header (sticky)
  ↓
Main Content (flex-1)
  ↓
Footer (bottom)
```

---

## 4️⃣ Header - Navigation

Le Header est **déjà intégré** dans le Layout. 

### Navigation automatique :
- Logo cliquable → Accueil
- Liens de navigation → Pages correspondantes
- Bouton Créer → Formulaire événement
- Menu utilisateur → Dropdown avec options

### Menu mobile :
S'ouvre automatiquement au clic sur le hamburger.

---

## 5️⃣ Footer - Pied de page

Le Footer est **déjà intégré** dans le Layout.

### Sections incluses :
- **Marque** : Logo + description + contact
- **Produit** : Liens vers features, pricing
- **Entreprise** : About, blog, careers
- **Support** : Help, contact, FAQ
- **Légal** : Privacy, terms, cookies

### Personnalisation :
Modifiez le fichier `Footer.jsx` pour changer les liens :

```jsx
const footerLinks = {
  produit: [
    { name: 'Votre Lien', href: '/votre-page' },
    // ...
  ],
};
```

---

## 🎨 Exemple Complet

### Page d'accueil moderne :
```jsx
import Container from './components/Container';
import SectionHeading from './components/SectionHeading';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-950 py-20">
        <Container>
          <SectionHeading 
            title="Bienvenue sur OneLastEvent"
            subtitle="La plateforme moderne pour créer et réserver des événements"
          />
          
          {/* Contenu additionnel */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Cards... */}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <SectionHeading 
            title="Fonctionnalités"
            subtitle="Tout ce dont vous avez besoin"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Features... */}
          </div>
        </Container>
      </section>
    </div>
  );
}
```

---

## 📐 Système de Grid

### Utiliser Tailwind CSS Grid :

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### Responsive automatique :
- Mobile : 1 colonne
- Tablette : 2 colonnes
- Desktop : 3 colonnes

---

## 🎯 Bonnes Pratiques

### 1. Toujours utiliser Container
```jsx
// ✅ BON
<Container>
  <div>Contenu</div>
</Container>

// ❌ MAUVAIS
<div className="max-w-7xl mx-auto px-4">
  <div>Contenu</div>
</div>
```

### 2. Spacing cohérent
```jsx
// ✅ BON
<div className="space-y-6">
  <SectionHeading title="..." />
  <div className="grid gap-6">...</div>
</div>

// ❌ MAUVAIS
<div style={{ marginBottom: '50px' }}>
  <h2>Titre</h2>
  <div style={{ gap: '15px' }}>...</div>
</div>
```

### 3. Couleurs standardisées
```jsx
// ✅ BON
<h1 className="text-white">Titre</h1>
<p className="text-neutral-400">Texte</p>

// ❌ MAUVAIS
<h1 style={{ color: '#ffffff' }}>Titre</h1>
<p style={{ color: '#666666' }}>Texte</p>
```

### 4. Responsive systématique
```jsx
// ✅ BON
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  ...
</div>

// ❌ MAUVAIS
<div className="grid grid-cols-3">
  ...
</div>
```

---

## 🔧 Personnalisation

### Changer les couleurs du thème :

Dans `tailwind.config.js` :
```javascript
colors: {
  primary: {
    500: '#VOTRE_COULEUR',
    // ...
  },
}
```

### Modifier le Container :

Dans `components/Container.jsx` :
```jsx
<div className={`mx-auto max-w-5xl px-4 ${className}`}>
  // Changez max-w-7xl → max-w-5xl pour plus étroit
</div>
```

### Ajuster le Header :

Dans `components/Header.jsx`, modifiez `navLinks` :
```jsx
const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Nouveau Lien', href: '/nouvelle-page' },
];
```

---

## 📱 Responsive Design

### Mobile First :
```jsx
// Commencez par mobile, puis adaptez
<div className="
  text-sm        // Mobile
  md:text-base   // Tablette
  lg:text-lg     // Desktop
">
  Texte responsive
</div>
```

### Images responsive :
```jsx
<img 
  src="image.jpg" 
  alt="Description"
  className="w-full h-auto object-cover"
/>
```

---

## ✅ Checklist avant déploiement

### Structure :
- [ ] Toutes les pages utilisent `<Container>`
- [ ] Les titres utilisent `<SectionHeading>`
- [ ] Le Layout est correctement appliqué
- [ ] Header et Footer visibles partout

### Responsive :
- [ ] Testé sur mobile (< 640px)
- [ ] Testé sur tablette (640-1024px)
- [ ] Testé sur desktop (> 1024px)
- [ ] Menu mobile fonctionne

### Accessibilité :
- [ ] Contrastes suffisants
- [ ] Focus visibles
- [ ] Labels aria présents
- [ ] Navigation clavier OK

### Performance :
- [ ] Images optimisées
- [ ] Components lazy-loaded
- [ ] CSS minifié
- [ ] Pas de inline styles

---

## 🎨 Exemples de Patterns

### Pattern 1: Page avec sections multiples
```jsx
<Container>
  <SectionHeading title="Section 1" />
  <div className="grid gap-6">...</div>
</Container>

<Container className="py-12">
  <SectionHeading title="Section 2" />
  <div className="grid gap-6">...</div>
</Container>
```

### Pattern 2: Hero + Features
```jsx
<section className="bg-neutral-900 py-20">
  <Container>
    <SectionHeading 
      title="Hero Section"
      subtitle="Description accrocheuse"
    />
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {/* Features */}
    </div>
  </Container>
</section>
```

### Pattern 3: Dashboard layout
```jsx
<Container>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Sidebar */}
    <aside className="lg:col-span-1">
      {/* Menu */}
    </aside>
    
    {/* Main content */}
    <main className="lg:col-span-3">
      {/* Contenu */}
    </main>
  </div>
</Container>
```

---

## 🚀 Astuces Pro

### 1. Utiliser space-y pour le vertical spacing
```jsx
<div className="space-y-6">
  <Element1 />
  <Element2 />
  <Element3 />
</div>
```

### 2. Combiner gap et padding
```jsx
<div className="grid gap-6 p-6 bg-neutral-900 rounded-xl">
  {/* Cards espacées */}
</div>
```

### 3. Hover effects systématiques
```jsx
<button className="
  bg-primary-500 
  hover:bg-primary-600 
  transition-colors
">
  Bouton
</button>
```

### 4. Shadows subtiles
```jsx
<div className="
  bg-neutral-900 
  shadow-lg 
  hover:shadow-xl 
  transition-shadow
">
  Card
</div>
```

---

## 📚 Ressources

### Documentation Tailwind :
- Layout: https://tailwindcss.com/docs/layout
- Spacing: https://tailwindcss.com/docs/spacing
- Colors: https://tailwindcss.com/docs/customizing-colors

### Inspirations :
- Stripe: https://stripe.com
- Airbnb: https://airbnb.com
- Vercel: https://vercel.com

---

**Votre interface est maintenant structurée comme un vrai SaaS !** 🚀✨

Utilisez ces composants dans toutes vos pages pour une cohérence totale.
