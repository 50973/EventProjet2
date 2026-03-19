import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import eventsService from '../services/events';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

function EventList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Récupérer les paramètres de l'URL
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const location = searchParams.get('location') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sortBy') || 'start_datetime';

  // États locaux
  const [searchInput, setSearchInput] = useState(search);
  const [locationInput, setLocationInput] = useState(location);
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

  // Requête API
  const { data, isLoading, error } = useQuery({
    queryKey: ['events', { page, search, location, minPrice, maxPrice, sortBy }],
    queryFn: () =>
      eventsService.getEvents({
        page,
        limit: 12,
        search: search || undefined,
        location: location || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sortBy,
        sortOrder: 'asc',
      }),
  });

  // Mettre à jour les paramètres
  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    if (!updates.page) {
      newParams.set('page', '1');
    }
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({
      search: searchInput,
      location: locationInput,
      minPrice: minPriceInput,
      maxPrice: maxPriceInput,
    });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchInput('');
    setLocationInput('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setSearchParams({});
  };

  const hasActiveFilters = search || location || minPrice || maxPrice;

  return (
    <div className="min-h-screen relative">
      {/* Background avec motif */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* HERO HEADER */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up">
            Découvrez votre prochaine
            <br />
            <span className="gradient-text-animated">expérience</span>
          </h1>
          
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Des événements uniques vous attendent
          </p>

          {/* Barre de recherche principale */}
          <div className="max-w-3xl mx-auto animate-scale-up animation-delay-300">
            <form onSubmit={handleSearch} className="glass p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un événement, un lieu..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-lg"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn-secondary px-6 hidden md:flex items-center gap-2 ${
                    hasActiveFilters ? 'border-primary-500 text-primary-400 glow-sm' : ''
                  }`}
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <span>Filtres</span>
                </button>

                <button 
                  type="submit" 
                  className="btn-primary px-8 py-4 text-base shadow-glow-green"
                >
                  Rechercher
                </button>
              </div>

              {/* Filtres avancés */}
              {showFilters && (
                <div className="mt-4 pt-6 border-t border-white/10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="label text-sm">Lieu</label>
                    <input
                      type="text"
                      placeholder="Ville ou lieu"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label text-sm">Prix min (€)</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label text-sm">Prix max (€)</label>
                    <input
                      type="number"
                      placeholder="Illimité"
                      min="0"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label text-sm">Trier par</label>
                    <select
                      value={sortBy}
                      onChange={(e) => updateParams({ sortBy: e.target.value })}
                      className="input"
                    >
                      <option value="start_datetime">Date</option>
                      <option value="price">Prix</option>
                      <option value="created_at">Récemment ajouté</option>
                    </select>
                  </div>
                  
                  {hasActiveFilters && (
                    <div className="sm:col-span-2 lg:col-span-4 flex justify-center">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-sm text-neutral-400 hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Effacer les filtres
                      </button>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Tags de filtres actifs */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
                {search && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Recherche: {search}
                    <button onClick={() => { setSearchInput(''); updateParams({ search: '' }); }}>
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {location && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Lieu: {location}
                    <button onClick={() => { setLocationInput(''); updateParams({ location: '' }); }}>
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="badge badge-primary flex items-center gap-2">
                    Prix: {minPrice || 0}€ - {maxPrice || '∞'}€
                    <button onClick={() => { setMinPriceInput(''); setMaxPriceInput(''); updateParams({ minPrice: '', maxPrice: '' }); }}>
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="relative pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Compteur */}
          {!isLoading && data?.events?.length > 0 && (
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <p className="text-neutral-400">
                <span className="text-white font-semibold">{data.total}</span> événement{data.total > 1 ? 's' : ''} trouvé{data.total > 1 ? 's' : ''}
              </p>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden btn-secondary flex items-center gap-2"
              >
                <FunnelIcon className="w-4 h-4" />
                <span>Filtres</span>
              </button>
            </div>
          )}

          {/* Grille d'événements */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-red-400 mb-2">Oups!</p>
              <p className="text-neutral-400 text-sm">{error.message}</p>
            </div>
          ) : data?.events?.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-up">
                {data.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={(newPage) => updateParams({ page: newPage.toString() })}
                />
              )}
            </>
          ) : (
            <div className="text-center py-20 glass rounded-2xl animate-scale-up">
              <MagnifyingGlassIcon className="w-20 h-20 text-neutral-700 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucun événement trouvé</h3>
              <p className="text-neutral-400 mb-6">
                Essayez de modifier vos filtres de recherche
              </p>
              <button onClick={clearFilters} className="btn-primary">
                Voir tous les événements
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default EventList;
