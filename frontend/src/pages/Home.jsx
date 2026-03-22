import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CalendarIcon,
  SparklesIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  PlusIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import eventsService from '../services/events';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['events', 'home'],
    queryFn: () => eventsService.getEvents({ 
      limit: 6, 
      sortBy: 'start_datetime', 
      sortOrder: 'asc' 
    }),
  });

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* HERO SECTION ULTRA-MODERNE */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          {/* Titre Principal avec effets spectaculaires */}
          <div className="mb-8 fade-in">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6">
              <span className="block gradient-text-animated mb-2">Event</span>
              <span className="block text-white drop-shadow-2xl">opiaea</span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed fade-in-delay-1">
              La plateforme ultime pour découvrir et créer des
              <span className="gradient-text font-semibold"> événements inoubliables</span>
            </p>
          </div>

          {/* Stats impressionnantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 fade-in-delay-2">
            <div className="glass-strong p-6 rounded-2xl hover-lift scale-in">
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-neutral-400 text-sm">Événements</div>
            </div>
            <div className="glass-strong p-6 rounded-2xl hover-lift scale-in" style={{ animationDelay: '100ms' }}>
              <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
              <div className="text-neutral-400 text-sm">Participants</div>
            </div>
            <div className="glass-strong p-6 rounded-2xl hover-lift scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-neutral-400 text-sm">Organisateurs</div>
            </div>
            <div className="glass-strong p-6 rounded-2xl hover-lift scale-in" style={{ animationDelay: '300ms' }}>
              <div className="text-3xl font-bold gradient-text mb-2">4.9★</div>
              <div className="text-neutral-400 text-sm">Note moyenne</div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in-delay-3">
            <Link
              to="/events"
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 hover-lift pulse-glow transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Explorer les événements
                <CalendarIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/register"
              className="group px-8 py-4 glass-strong border border-emerald-500/30 text-emerald-400 hover:text-white hover:border-emerald-400 font-semibold rounded-2xl hover-glow transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Créer un événement
                <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Image Hero avec effets avancés */}
          <div className="relative max-w-5xl mx-auto fade-in-delay-3">
            <div className="glass-strong p-2 rounded-3xl hover-lift">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1400&h=600&fit=crop&crop=center"
                  alt="Événements incroyables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlay avec contenu dynamique */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="badge badge-primary text-sm pulse-glow">🔥 Tendances</span>
                    <span className="text-neutral-200 text-sm flex items-center gap-2">
                      <UserGroupIcon className="w-4 h-4" />
                      2,847 participants
                    </span>
                    <span className="text-neutral-200 text-sm flex items-center gap-2">
                      <HeartIcon className="w-4 h-4" />
                      1,203 intéressés
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Festival International de Musique</h3>
                  <p className="text-neutral-300 text-lg">Une expérience musicale unique avec les meilleurs artistes mondiaux</p>
                </div>

                {/* Particules flottantes */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effets de particules en arrière-plan */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-teal-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* SECTION COMMUNAUTÉ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong p-8 rounded-3xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Rejoignez la communauté
            </h2>
            <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
              Des milliers d'événements vous attendent. Connectez-vous avec des passionnés et créez des souvenirs inoubliables.
            </p>

            {/* Actions sociales */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <button className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors">
                <HeartIcon className="w-6 h-6" />
                <span className="text-sm">J'aime</span>
              </button>
              <button className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                <span className="text-sm">Commenter</span>
              </button>
              <button className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors">
                <ShareIcon className="w-6 h-6" />
                <span className="text-sm">Partager</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="btn-primary px-8 py-3">
                Découvrir les événements
              </Link>
              <Link to="/register" className="btn-secondary px-8 py-3">
                Créer un événement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS RAPIDES */}
      <section className="py-12 px-4 border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Événements', icon: CalendarIcon },
              { value: '10k+', label: 'Membres', icon: UserGroupIcon },
              { value: '50+', label: 'Villes', icon: SparklesIcon },
            ].map((stat, i) => (
              <div key={i} className="glass-strong p-6 rounded-2xl border border-white/10 text-center hover-lift transition-all duration-300">
                <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-neutral-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÉGORIES STYLE STORIES */}
      <section className="py-12 px-4 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Explorer par thème</h2>
            <Link to="/events" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              Voir tout →
            </Link>
          </div>

          {/* Scroll horizontal type stories */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { name: 'Musique', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=300&fit=crop', emoji: '🎵' },
              { name: 'Sport', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop', emoji: '⚽' },
              { name: 'Arts', image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=300&h=300&fit=crop', emoji: '🎨' },
              { name: 'Business', image: 'https://images.unsplash.com/photo-1515187029135-18ee4f6d4294?w=300&h=300&fit=crop', emoji: '💼' },
              { name: 'Food', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop', emoji: '🍕' },
              { name: 'Tech', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop', emoji: '💻' },
            ].map((category, i) => (
              <Link
                key={i}
                to={`/events?category=${category.name.toLowerCase()}`}
                className="group flex-shrink-0 w-28 cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 ring-2 ring-neutral-800 group-hover:ring-primary-500 transition-all">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="text-center">
                  <span className="text-lg">{category.emoji}</span>
                  <p className="text-sm font-medium text-white mt-1">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÉVÉNEMENTS STYLE FEED */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Événements pour vous</h2>
              <p className="text-neutral-400 text-sm mt-1">Sélectionnés selon vos centres d'intérêt</p>
            </div>
            <Link to="/events" className="btn-secondary btn-sm hidden sm:flex items-center gap-2">
              Voir tout
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : data?.events?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-2xl">
              <CalendarIcon className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-400">Bientôt des événements ici</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA STYLE POST SPONSORISÉ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-3xl border border-primary-500/20 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-neutral-900 to-accent-900/20" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-primary-400" />
                <span className="text-primary-400 font-semibold">Organisateur Pro</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Créez votre premier événement
              </h2>
              
              <p className="text-neutral-400 mb-6 max-w-lg mx-auto">
                Rejoignez des milliers d'organisateurs et partagez votre passion avec notre communauté
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/register" className="btn-primary btn-lg px-10 shadow-glow-green">
                  Commencer gratuitement
                </Link>
                <Link to="/events" className="btn-ghost btn-lg px-10">
                  En savoir plus
                </Link>
              </div>
              
              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  10k+ organisateurs
                </span>
                <span className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  98% satisfaits
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
