/**
 * ============================================
 * GUIDE D'UTILISATION DU CSS - EVENTDKC2
 * Palette: Noir & Vert Professionnel
 * ============================================
 * 
 * Ce document présente les principales classes CSS disponibles
 * pour une utilisation cohérente dans tout le projet.
 */

/* ============================================
   1. BOUTONS
   ============================================ */

// Bouton principal (vert)
<button className="btn-primary">Action</button>

// Bouton secondaire (neutre)
<button className="btn-secondary">Annuler</button>

// Bouton fantôme (transparent)
<button className="btn-ghost">Voir plus</button>

// Bouton avec contour
<button className="btn-outline">Détails</button>

// Bouton succès (vert)
<button className="btn-success">Confirmer</button>

// Bouton danger (rouge)
<button className="btn-danger">Supprimer</button>

// Tailles
<button className="btn-primary btn-sm">Petit</button>
<button className="btn-primary btn-lg">Grand</button>


/* ============================================
   2. CHAMPS DE FORMULAIRE
   ============================================ */

// Input standard
<input type="text" className="input" placeholder="Votre nom" />

// Input avec erreur
<input type="email" className="input input-error" placeholder="Email invalide" />

// Input avec succès
<input type="text" className="input input-success" placeholder="Valide" />

// Label
<label className="label">Nom complet</label>
<label className="label label-required">Email</label>

// Texte d'aide
<p className="helper-text">Minimum 8 caractères</p>

// Texte d'erreur
<p className="error-text">Ce champ est requis</p>


/* ============================================
   3. CARTES
   ============================================ */

// Carte standard
<div className="card">
  <div className="p-6">Contenu</div>
</div>

// Carte avec effet hover
<div className="card-hover">
  <div className="p-6">Contenu interactif</div>
</div>

// Carte cliquable
<div className="card-interactive">
  <div className="p-6">Lien vers détails</div>
</div>

// Effet verre dépoli
<div className="glass">
  <div className="p-6">Contenu translucide</div>
</div>


/* ============================================
   4. BADGES & ÉTIQUETTES
   ============================================ */

// Badge primaire (vert)
<span className="badge badge-primary">Nouveau</span>

// Badge succès
<span className="badge badge-success">Confirmé</span>

// Badge avertissement
<span className="badge badge-warning">En attente</span>

// Badge danger
<span className="badge badge-danger">Annulé</span>

// Badge neutre
<span className="badge badge-neutral">Information</span>


/* ============================================
   5. TYPOGRAPHIE
   ============================================ */

// Titre de section
<h1 className="section-title">Bienvenue</h1>
<p className="section-subtitle">Sous-titre descriptif</p>

// Titres hiérarchiques
<h2 className="heading-1">Titre principal</h2>
<h3 className="heading-2">Titre secondaire</h3>
<h4 className="heading-3">Titre tertiaire</h4>

// Texte
<p className="body-text">Paragraphe de texte</p>
<p className="body-text-small">Petit texte</p>
<p className="caption">Légende ou note</p>

// Texte avec dégradé
<h2 className="gradient-text">Titre coloré</h2>

// Lien
<a href="#" className="link">En savoir plus</a>


/* ============================================
   6. COMPOSANTS UI
   ============================================ */

// Avatar
<img src="url" alt="User" className="avatar" />
<img src="url" alt="User" className="avatar avatar-sm" />
<img src="url" alt="User" className="avatar avatar-lg" />

// Placeholder avatar
<div className="avatar-placeholder">JD</div>

// Séparateur
<hr className="divider" />
<div className="divider-vertical"></div>

// Skeleton loader
<div className="skeleton h-32 w-full"></div>

// État vide
<div className="empty-state">
  <div className="empty-state-icon">📭</div>
  <h3 className="empty-state-title">Aucun événement</h3>
  <p className="empty-state-description">Commencez par créer votre premier événement</p>
</div>

// Spinner de chargement
<div className="spinner"></div>
<div className="spinner spinner-sm"></div>
<div className="spinner spinner-lg"></div>


/* ============================================
   7. ALERTES
   ============================================ */

// Alerte information
<div className="alert alert-info">
  <span>Information importante</span>
</div>

// Alerte succès
<div className="alert alert-success">
  <span>Opération réussie</span>
</div>

// Alerte avertissement
<div className="alert alert-warning">
  <span>Attention aux modifications</span>
</div>

// Alerte erreur
<div className="alert alert-error">
  <span>Une erreur est survenue</span>
</div>


/* ============================================
   8. TABLEAUX
   ============================================ */

<div className="table-container">
  <table className="table">
    <thead>
      <tr className="table-header">
        <th className="table-header-cell">Nom</th>
        <th className="table-header-cell">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr className="table-row">
        <td className="table-cell">Événement 1</td>
        <td className="table-cell">01/01/2024</td>
      </tr>
    </tbody>
  </table>
</div>


/* ============================================
   9. PAGINATION
   ============================================ */

<div className="pagination">
  <button className="pagination-button">Précédent</button>
  <button className="pagination-button pagination-button-active">1</button>
  <button className="pagination-button">2</button>
  <button className="pagination-button">Suivant</button>
</div>


/* ============================================
   10. BARRE DE PROGRESSION
   ============================================ */

<div className="progress-bar">
  <div className="progress-bar-fill" style={{ width: '75%' }}></div>
</div>


/* ============================================
   11. ONGLETS
   ============================================ */

<div className="tabs">
  <button className="tab tab-active">Général</button>
  <button className="tab">Paramètres</button>
  <button className="tab">Notifications</button>
</div>


/* ============================================
   12. ACCORDÉON
   ============================================ */

<div className="accordion-item">
  <button className="accordion-header">
    <span>Titre de la section</span>
    <span>▼</span>
  </button>
  <div className="accordion-content">
    Contenu détaillé de l'accordéon
  </div>
</div>


/* ============================================
   13. MODALES
   ============================================ */

<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h3 className="modal-title">Titre</h3>
      <button>✕</button>
    </div>
    <div className="modal-body">
      Contenu de la modale
    </div>
    <div className="modal-footer">
      <button className="btn-secondary">Annuler</button>
      <button className="btn-primary">Confirmer</button>
    </div>
  </div>
</div>


/* ============================================
   14. ANIMATIONS
   ============================================ */

// Apparition
<div className="fade-in">Contenu</div>
<div className="animate-fade-in">Contenu</div>

// Glissement
<div className="animate-slide-up">Contenu</div>
<div className="slide-in-left">Contenu</div>

// Zoom
<div className="zoom-in">Contenu</div>

// Flottement
<div className="float">Élément flottant</div>

// Rotation
<div className="spin-slow">Chargement</div>

// Effet de brillance
<div className="shimmer">Texte brillant</div>

// Effet de lueur
<div className="glow">Élément lumineux</div>


/* ============================================
   15. UTILITAIRES SPÉCIAUX
   ============================================ */

// Limiter le nombre de lignes
<p className="line-clamp-2">Texte long...</p>
<p className="line-clamp-3">Texte très long...</p>

// Motifs d'arrière-plan
<div className="bg-dot-pattern">Motif points</div>
<div className="bg-grid-pattern">Motif grille</div>

// Effet de brillance au survol
<div className="card-shine">Carte brillante</div>

// Bordure animée
<div className="border-draw">Texte souligné au survol</div>

// Gradient animé
<h2 className="gradient-text-animated">Titre animé</h2>


/* ============================================
   16. CLASSES TAILWIND PERSONNALISÉES
   ============================================ */

// Couleurs
className="bg-primary-500"      // Vert principal
className="bg-accent-500"       // Vert néon
className="bg-neutral-900"      // Noir profond

// Ombres
className="shadow-glow-green"   // Lueur verte
className="shadow-card"         // Ombre de carte
className="shadow-card-hover"   // Ombre au survol

// Dégradés
className="bg-hero-gradient"    // Dégradé héro
className="bg-card-gradient"    // Dégradé carte
className="bg-button-gradient"  // Dégradé bouton

// Animations
className="animate-pulse-slow"  // Pulsation lente
className="animate-shimmer"     // Scintillement


/* ============================================
   17. EXEMPLES D'UTILISATION COMPLÈTE
   ============================================ */

// Exemple 1: Carte d'événement
<article className="card-hover">
  <div className="relative aspect-video overflow-hidden">
    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    <div className="absolute top-3 left-3">
      <span className="badge badge-primary">À venir</span>
    </div>
  </div>
  <div className="p-5">
    <h3 className="heading-4 mb-2">{event.title}</h3>
    <p className="body-text-small text-neutral-400 mb-4">{event.description}</p>
    <div className="flex items-center justify-between">
      <span className="badge badge-success">{event.price}€</span>
      <button className="btn-primary btn-sm">Réserver</button>
    </div>
  </div>
</article>

// Exemple 2: Formulaire de connexion
<form className="space-y-6">
  <div className="form-group">
    <label className="label label-required">Email</label>
    <input type="email" className="input" placeholder="vous@exemple.com" />
    <p className="helper-text">Nous ne partagerons jamais votre email</p>
  </div>
  
  <div className="form-group">
    <label className="label label-required">Mot de passe</label>
    <input type="password" className="input" placeholder="••••••••" />
    <p className="error-text">Mot de passe incorrect</p>
  </div>
  
  <button type="submit" className="btn-primary w-full">
    Se connecter
  </button>
</form>

// Exemple 3: Statistiques
<div className="dashboard-grid">
  <div className="stat-card">
    <div className="stat-card-value gradient-text">128</div>
    <div className="stat-card-label">Événements créés</div>
  </div>
  <div className="stat-card">
    <div className="stat-card-value gradient-text">1,234</div>
    <div className="stat-card-label">Participants totaux</div>
  </div>
  <div className="stat-card">
    <div className="stat-card-value gradient-text">45.6k€</div>
    <div className="stat-card-label">Revenus générés</div>
  </div>
</div>


/* ============================================
   NOTES IMPORTANTES
   ============================================ */

/**
 * 1. Accessibilité:
 *    - Toutes les interactions ont des états focus visibles
 *    - Les contrastes de couleurs respectent WCAG AA
 *    - Les animations peuvent être réduites via prefers-reduced-motion
 * 
 * 2. Responsive:
 *    - Toutes les composantes sont responsive par défaut
 *    - Utiliser les préfixes md:, lg:, xl: pour adapter
 * 
 * 3. Performance:
 *    - Les animations utilisent transform et opacity pour 60fps
 *    - Le backdrop-blur est utilisé avec modération
 * 
 * 4. Cohérence:
 *    - Espacement: utiliser les multiples de 4 (py-2, py-3, py-4...)
 *    - Rayons: rounded-xl (12px), rounded-2xl (16px)
 *    - Ombres: toujours subtiles et progressives
 */
