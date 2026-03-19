import EventRepository from '../repositories/EventRepository.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../config/logger.js';

/**
 * Service pour la logique métier des événements
 */
class EventService {
  /**
   * Créer un nouvel événement
   * @param {Object} eventData - Données de l'événement
   * @param {string} organizerId - ID de l'organisateur
   * @returns {Promise<Object>}
   */
  async createEvent(eventData, organizerId) {
    const event = await EventRepository.create({
      ...eventData,
      organizerId,
      status: eventData.status || 'DRAFT',
    });

    logger.info(`Event created: ${event.id} by organizer ${organizerId}`);
    return event.toPublicJSON();
  }

  /**
   * Obtenir un événement par ID
   * @param {string} eventId - ID de l'événement
   * @param {string} userId - ID de l'utilisateur demandeur (optionnel)
   * @returns {Promise<Object>}
   */
  async getEvent(eventId, userId = null) {
    const event = await EventRepository.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
    }

    // Si l'événement n'est pas publié, seul l'organisateur peut le voir
    if (event.status !== 'PUBLISHED') {
      if (!userId || event.organizer_id !== userId) {
        throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
      }
    }

    const result = event.toPublicJSON();

    // Ajouter les infos de l'organisateur
    if (event.organizer) {
      result.organizer = {
        id: event.organizer.id,
        fullName: event.organizer.full_name,
        avatarUrl: event.organizer.avatar_url,
      };
    }

    return result;
  }

  /**
   * Lister les événements
   * @param {Object} options - Options de filtrage/pagination
   * @returns {Promise<Object>}
   */
  async listEvents(options = {}) {
    // Par défaut, ne montrer que les événements publiés
    if (!options.includeUnpublished) {
      options.status = 'PUBLISHED';
    }

    const result = await EventRepository.findAll(options);

    return {
      events: result.events.map((e) => e.toPublicJSON()),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  /**
   * Mettre à jour un événement
   * @param {string} eventId - ID de l'événement
   * @param {Object} updates - Données à mettre à jour
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  async updateEvent(eventId, updates, userId) {
    const event = await EventRepository.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (event.organizer_id !== userId) {
      throw ApiError.forbidden('You do not own this event', 'NOT_OWNER');
    }

    // Empêcher la modification d'un événement annulé
    if (event.status === 'CANCELLED') {
      throw ApiError.badRequest('Cannot update cancelled event', 'EVENT_CANCELLED');
    }

    // Mapper les updates (camelCase → snake_case)
    const mappedUpdates = {};
    if (updates.title) mappedUpdates.title = updates.title;
    if (updates.description !== undefined) mappedUpdates.description = updates.description;
    if (updates.location !== undefined) mappedUpdates.location = updates.location;
    if (updates.startDatetime) mappedUpdates.start_datetime = updates.startDatetime;
    if (updates.endDatetime) mappedUpdates.end_datetime = updates.endDatetime;
    if (updates.capacity) mappedUpdates.capacity = updates.capacity;
    if (updates.price !== undefined) mappedUpdates.price = updates.price;
    if (updates.currency) mappedUpdates.currency = updates.currency;
    if (updates.tags) mappedUpdates.tags = updates.tags;

    const updatedEvent = await EventRepository.update(eventId, mappedUpdates);
    
    logger.info(`Event updated: ${eventId}`);
    return updatedEvent.toPublicJSON();
  }

  /**
   * Supprimer un événement
   * @param {string} eventId - ID de l'événement
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  async deleteEvent(eventId, userId) {
    const event = await EventRepository.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
    }

    if (event.organizer_id !== userId) {
      throw ApiError.forbidden('You do not own this event', 'NOT_OWNER');
    }

    await EventRepository.delete(eventId);
    
    logger.info(`Event deleted: ${eventId}`);
    return { message: 'Event deleted successfully' };
  }

  /**
   * Publier un événement
   * @param {string} eventId - ID de l'événement
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  async publishEvent(eventId, userId) {
    const event = await EventRepository.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
    }

    if (event.organizer_id !== userId) {
      throw ApiError.forbidden('You do not own this event', 'NOT_OWNER');
    }

    if (event.status === 'CANCELLED') {
      throw ApiError.badRequest('Cannot publish cancelled event', 'EVENT_CANCELLED');
    }

    if (event.status === 'PUBLISHED') {
      throw ApiError.badRequest('Event is already published', 'ALREADY_PUBLISHED');
    }

    // Vérifier que l'événement a les champs requis
    if (!event.title || !event.start_datetime) {
      throw ApiError.badRequest(
        'Event must have title and start date to publish',
        'INCOMPLETE_EVENT'
      );
    }

    const updatedEvent = await EventRepository.update(eventId, { status: 'PUBLISHED' });
    
    logger.info(`Event published: ${eventId}`);
    return updatedEvent.toPublicJSON();
  }

  /**
   * Obtenir les événements d'un organisateur
   * @param {string} organizerId - ID de l'organisateur
   * @param {Object} options - Options de pagination
   * @returns {Promise<Object>}
   */
  async getOrganizerEvents(organizerId, options = {}) {
    return EventRepository.findAll({
      ...options,
      organizerId,
      includeUnpublished: true, // L'organisateur voit tous ses événements
    });
  }
}

export default new EventService();