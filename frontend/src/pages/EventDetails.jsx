import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyEuroIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import eventsService from '../services/events';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EventDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsService.getEvent(id),
  });

  const event = data?.event;

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (error || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <CalendarIcon className="w-16 h-16 text-neutral-700 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Événement introuvable</h2>
        <p className="text-neutral-400 mb-6">Cet événement n'existe pas ou a été supprimé.</p>
        <Link to="/events" className="btn-primary">Voir tous les événements</Link>
      </div>
    );
  }

  const isFree = parseFloat(event.price) === 0;
  const spotsLeft = event.remainingSpots ?? (event.capacity - (event.currentParticipants || 0));
  const isFull = spotsLeft <= 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/events" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
        <ArrowLeftIcon className="w-4 h-4" />
        Retour aux événements
      </Link>

      {event.imageUrl && (
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="glass p-8 rounded-2xl">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {isFree ? (
            <span className="badge badge-primary">Gratuit</span>
          ) : (
            <span className="badge badge-primary">{event.price}€</span>
          )}
          <span className={`badge ${event.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-700 text-neutral-300'}`}>
            {event.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>

        {event.description && (
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">{event.description}</p>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-neutral-400">Date</p>
              <p className="text-white">
                {event.startDatetime
                  ? format(new Date(event.startDatetime), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })
                  : 'Non définie'}
              </p>
              {event.endDatetime && (
                <p className="text-neutral-400 text-sm">
                  Fin : {format(new Date(event.endDatetime), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              )}
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-400">Lieu</p>
                <p className="text-white">{event.location}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <UserGroupIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-neutral-400">Places</p>
              <p className={`${isFull ? 'text-red-400' : 'text-white'}`}>
                {isFull ? 'Complet' : `${spotsLeft} places restantes sur ${event.capacity}`}
              </p>
            </div>
          </div>

          {!isFree && (
            <div className="flex items-start gap-3">
              <CurrencyEuroIcon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-400">Prix</p>
                <p className="text-white">{event.price} {event.currency}</p>
              </div>
            </div>
          )}
        </div>

        {event.organizer && (
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-neutral-400 mb-2">Organisé par</p>
            <div className="flex items-center gap-3">
              {event.organizer.avatarUrl ? (
                <img src={event.organizer.avatarUrl} alt={event.organizer.fullName} className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-700" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center ring-2 ring-neutral-700">
                  <span className="text-sm font-bold text-white">{event.organizer.fullName?.charAt(0)}</span>
                </div>
              )}
              <span className="text-white font-medium">{event.organizer.fullName}</span>
            </div>
          </div>
        )}

        {event.tags?.length > 0 && (
          <div className="pt-6 border-t border-white/10 mt-6">
            <p className="text-sm text-neutral-400 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
