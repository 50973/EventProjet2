/**
 * ============================================
 * EXEMPLES DE PAGES - EVENTDKC2
 * Modèles prêts à l'emploi avec le nouveau CSS
 * ============================================ */

/* ============================================
   EXEMPLE 1: Page d'accueil moderne
   ============================================ */

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title mb-6 animate-fade-in">
            Créez des <span className="gradient-text">événements</span> inoubliables
          </h1>
          <p className="section-subtitle mb-8 max-w-2xl mx-auto">
            La plateforme complète pour organiser, promouvoir et gérer vos événements professionnels et personnels
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary btn-lg">
              Créer un événement
            </button>
            <button className="btn-secondary btn-lg">
              Découvrir les événements
            </button>
          </div>

          {/* Stats */}
          <div className="dashboard-grid mt-16">
            <div className="stat-card glass">
              <div className="stat-card-value gradient-text">500+</div>
              <div className="stat-card-label">Événements créés</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-card-value gradient-text">10k+</div>
              <div className="stat-card-label">Participants</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-card-value gradient-text">98%</div>
              <div className="stat-card-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-4">
            Fonctionnalités <span className="gradient-text">principales</span>
          </h2>
          <p className="section-subtitle text-center mb-12">
            Tout ce dont vous avez besoin pour réussir vos événements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-hover p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="heading-4 mb-2">Gestion simplifiée</h3>
              <p className="body-text-small text-neutral-400">
                Créez et gérez vos événements en quelques clics seulement
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover p-6">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                <UserGroupIcon className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="heading-4 mb-2">Inscriptions faciles</h3>
              <p className="body-text-small text-neutral-400">
                Système d'inscription intégré avec suivi des participants
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover p-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <CreditCardIcon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="heading-4 mb-2">Paiements sécurisés</h3>
              <p className="body-text-small text-neutral-400">
                Acceptez les paiements en toute sécurité
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================
   EXEMPLE 2: Formulaire de connexion élégant
   ============================================ */

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Titre */}
        <div className="text-center mb-8">
          <h1 className="heading-1 mb-2">Bon retour</h1>
          <p className="body-text-small">Connectez-vous à votre compte</p>
        </div>

        {/* Carte de formulaire */}
        <div className="card p-8">
          <form className="space-y-6">
            {/* Email */}
            <div className="form-group">
              <label className="label label-required">Email</label>
              <input
                type="email"
                className="input"
                placeholder="vous@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <label className="label label-required">Mot de passe</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                  />
                  <span className="text-sm text-neutral-400">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm link">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Bouton */}
            <button type="submit" className="btn-primary w-full">
              Se connecter
            </button>

            {/* Séparateur */}
            <div className="relative my-6">
              <div className="divider"></div>
              <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4 text-xs text-neutral-500 bg-neutral-900">
                ou continuer avec
              </span>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="btn-secondary">
                <GoogleIcon className="w-5 h-5 mr-2" />
                Google
              </button>
              <button type="button" className="btn-secondary">
                <GitHubIcon className="w-5 h-5 mr-2" />
                GitHub
              </button>
            </div>
          </form>
        </div>

        {/* Lien inscription */}
        <p className="text-center mt-6 text-neutral-400">
          Pas encore de compte ?{' '}
          <a href="/register" className="link">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
}

/* ============================================
   EXEMPLE 3: Liste d'événements professionnelle
   ============================================ */

function EventListPage() {
  const [events, setEvents] = useState([...]); // vos événements
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title mb-2">Événements</h1>
            <p className="section-subtitle">
              Découvrez et participez à des événements incroyables
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <PlusIcon className="w-5 h-5" />
            Créer un événement
          </button>
        </div>

        {/* Filtres */}
        <div className="tabs mb-8">
          <button
            className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button
            className={`tab ${filter === 'upcoming' ? 'tab-active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            À venir
          </button>
          <button
            className={`tab ${filter === 'past' ? 'tab-active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Passés
          </button>
        </div>

        {/* Grille d'événements */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          /* État vide */
          <div className="empty-state">
            <CalendarIcon className="empty-state-icon" />
            <h3 className="empty-state-title">Aucun événement trouvé</h3>
            <p className="empty-state-description">
              Essayez de modifier vos filtres ou créez votre premier événement
            </p>
            <button className="btn-primary mt-4">
              Créer un événement
            </button>
          </div>
        )}

        {/* Pagination */}
        {events.length > 0 && (
          <div className="pagination justify-center mt-8">
            <button className="pagination-button">Précédent</button>
            <button className="pagination-button pagination-button-active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">Suivant</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   EXEMPLE 4: Dashboard Organisateur
   ============================================ */

function OrganizerDashboard() {
  const stats = {
    totalEvents: 12,
    totalParticipants: 456,
    revenue: 12450,
    upcomingEvents: 3
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="mb-8">
          <h1 className="section-title mb-2">Tableau de bord</h1>
          <p className="section-subtitle">
            Gérez vos événements et suivez vos performances
          </p>
        </div>

        {/* Statistiques */}
        <div className="dashboard-grid mb-8">
          <div className="stat-card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-card-value gradient-text">{stats.totalEvents}</div>
                <div className="stat-card-label">Événements totaux</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary-400" />
              </div>
            </div>
          </div>

          <div className="stat-card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-card-value gradient-text">{stats.totalParticipants}</div>
                <div className="stat-card-label">Participants totaux</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-accent-400" />
              </div>
            </div>
          </div>

          <div className="stat-card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-card-value gradient-text">{stats.revenue.toLocaleString()}€</div>
                <div className="stat-card-label">Revenus générés</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <EuroIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="stat-card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-card-value gradient-text">{stats.upcomingEvents}</div>
                <div className="stat-card-label">Événements à venir</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Événements récents */}
        <div className="card">
          <div className="p-6 border-b border-neutral-800/50 flex items-center justify-between">
            <h2 className="heading-4">Événements récents</h2>
            <button className="btn-ghost btn-sm">Voir tout</button>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr className="table-header">
                  <th className="table-header-cell">Événement</th>
                  <th className="table-header-cell">Date</th>
                  <th className="table-header-cell">Participants</th>
                  <th className="table-header-cell">Statut</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="table-row">
                    <td className="table-cell font-medium">
                      Conférence Tech {item}
                    </td>
                    <td className="table-cell">15 Mar 2024</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="w-4 h-4 text-neutral-500" />
                        <span>128</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-success">Actif</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <button className="btn-ghost btn-sm">Voir</button>
                        <button className="btn-ghost btn-sm">Modifier</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   EXEMPLE 5: Page de détails d'événement
   ============================================ */

function EventDetailsPage({ eventId }) {
  const event = { /* données de l'événement */ };

  return (
    <div className="min-h-screen">
      {/* Image hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-6 left-6">
          <span className="badge badge-primary text-sm">À venir</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2">
            <div className="card p-8 mb-6">
              <h1 className="heading-1 mb-4">{event.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-neutral-400">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{format(event.date, "EEEE d MMMM yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="divider"></div>

              <h2 className="heading-4 mb-3">Description</h2>
              <div className="body-text text-neutral-300 leading-relaxed">
                {event.description}
              </div>
            </div>

            {/* Programme */}
            <div className="card p-8">
              <h2 className="heading-4 mb-6">Programme</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-24 text-sm text-neutral-400 font-mono">
                      {item.time}
                    </div>
                    <div className="flex-1 pb-4 border-b border-neutral-800/30 last:border-0">
                      <h3 className="font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Carte de prix */}
            <div className="card p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  {event.price}€
                </span>
                <span className="text-neutral-400 ml-2">/ personne</span>
              </div>

              <button className="btn-primary w-full mb-4">
                Réserver ma place
              </button>

              <div className="space-y-3 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span>Annulation gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span>E-billet disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span>Support inclus</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-400">Places restantes</span>
                  <span className="text-white font-medium">
                    {event.remainingSpots}/{event.capacity}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(event.remainingSpots / event.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Organisateur */}
            <div className="card p-6">
              <h3 className="heading-4 mb-4">Organisateur</h3>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <img src={event.organizer.avatar} alt={event.organizer.name} />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {event.organizer.name}
                  </div>
                  <div className="text-sm text-neutral-400">
                    Organisateur vérifié ✓
                  </div>
                </div>
              </div>
              <button className="btn-outline w-full mt-4">
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   NOTES D'UTILISATION
   ============================================ */

/**
 * Pour utiliser ces exemples:
 * 
 * 1. Copiez le code dans vos fichiers pages
 * 2. Adaptez les données (events, stats, etc.)
 * 3. Importez les icônes nécessaires:
 *    import { CalendarIcon, UserGroupIcon, ... } from '@heroicons/react/24/solid'
 * 
 * Toutes les classes CSS sont déjà configurées!
 * Profitez du design professionnel noir et vert ✨
 */
