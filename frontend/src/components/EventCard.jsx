import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

function EventCard({ event }) {
  const isFree = parseFloat(event.price) === 0;
  const spotsLeft = event.remainingSpots || event.capacity - (event.currentParticipants || 0);
  const isFull = spotsLeft <= 0;
  const hasSpotsWarning = spotsLeft > 0 && spotsLeft <= 10;

  return (
    <Link to={`/events/${event.id}`} className="group block h-full">
      <article className="glass-strong h-full flex flex-col overflow-hidden rounded-3xl hover-lift hover-glow transition-all duration-500 border border-white/10 group-hover:border-emerald-500/30">
        {/* Image avec effets ultra-modernes */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {event.imageUrl ? (
            <>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-green-600/15 to-teal-700/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <CalendarIcon className="w-24 h-24 text-white/20 drop-shadow-lg" />
              {/* Particules animées */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
            </div>
          )}

          {/* Badge prix ultra-moderne */}
          <div className="absolute top-4 left-4 z-10">
            {isFree ? (
              <span className="inline-flex px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-2xl shadow-xl shadow-emerald-500/40 backdrop-blur-sm border border-emerald-300/20 pulse-glow">
                ✨ GRATUIT
              </span>
            ) : (
              <span className="inline-flex px-5 py-2.5 text-sm font-bold bg-white/95 text-neutral-900 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 font-mono">
                {event.price}€
              </span>
            )}
          </div>

          {/* Badge statut avec effets */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {isFull && (
              <span className="inline-flex px-3 py-1.5 text-xs font-bold bg-red-500/90 text-white rounded-xl shadow-lg backdrop-blur-sm border border-red-400/30">
                COMPLET
              </span>
            )}
            {hasSpotsWarning && !isFull && (
              <span className="inline-flex px-3 py-1.5 text-xs font-bold bg-orange-500/90 text-white rounded-xl shadow-lg backdrop-blur-sm border border-orange-400/30 animate-pulse">
                {spotsLeft} places
              </span>
            )}
          </div>

          {/* Overlay avec shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer"></div>
        </div>

        {/* Contenu */}
        <div className="p-5 flex-1 flex flex-col bg-neutral-900/80 backdrop-blur-xl">
          {/* Titre - Plus grand et en gras */}
          <h3 className="font-display font-bold text-xl text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-3 leading-tight">
            {event.title}
          </h3>

          {/* Lieu */}
          {event.location && (
            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-4">
              <MapPinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer avec infos */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              {/* Places */}
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <UserGroupIcon className="w-4 h-4" />
                <span className={isFull ? 'text-red-400' : hasSpotsWarning ? 'text-orange-400' : ''}>
                  {isFull ? 'Complet' : `${spotsLeft} places`}
                </span>
              </div>

              {/* Organisateur avatar */}
              {event.organizer && (
                <div className="flex items-center gap-2">
                  {event.organizer.avatarUrl ? (
                    <img
                      src={event.organizer.avatarUrl}
                      alt={event.organizer.fullName}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-neutral-800"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center ring-2 ring-neutral-800">
                      <span className="text-xs font-bold text-white">
                        {event.organizer.fullName?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-xs text-neutral-500 max-w-[100px] truncate hidden sm:inline">
                    {event.organizer.fullName}
                  </span>
                </div>
              )}
            </div>

            {/* Bouton voir détails - Apparaît au hover */}
            <div className="overflow-hidden">
              <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center justify-center gap-2 text-primary-400 text-sm font-medium">
                  <span>Voir les détails</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default EventCard;
