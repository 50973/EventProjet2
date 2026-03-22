import InscriptionRepository from '../repositories/InscriptionRepository.js';
import EventRepository from '../repositories/EventRepository.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../config/logger.js';

class InscriptionService {
  async registerForEvent(userId, eventId) {
    const event = await EventRepository.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found', 'EVENT_NOT_FOUND');
    }

    if (event.status !== 'PUBLISHED') {
      throw ApiError.badRequest('Event is not open for registration', 'EVENT_NOT_PUBLISHED');
    }

    if (!event.hasCapacity()) {
      throw ApiError.badRequest('Event is full', 'EVENT_FULL');
    }

    if (event.organizer_id === userId) {
      throw ApiError.badRequest('Cannot register for your own event', 'OWN_EVENT');
    }

    const existing = await InscriptionRepository.findByUserAndEvent(userId, eventId);
    if (existing) {
      if (existing.status === 'CANCELLED') {
        await InscriptionRepository.update(existing.id, { status: 'CONFIRMED' });
        await EventRepository.incrementParticipants(eventId);
        logger.info(`User ${userId} re-registered for event ${eventId}`);
        return existing.toPublicJSON();
      }
      throw ApiError.conflict('Already registered for this event', 'ALREADY_REGISTERED');
    }

    const inscription = await InscriptionRepository.create({
      userId,
      eventId,
      status: event.isFree() ? 'CONFIRMED' : 'PENDING',
    });

    await EventRepository.incrementParticipants(eventId);
    logger.info(`User ${userId} registered for event ${eventId}`);

    return inscription.toPublicJSON();
  }

  async cancelInscription(inscriptionId, userId) {
    const inscription = await InscriptionRepository.findById(inscriptionId);
    if (!inscription) {
      throw ApiError.notFound('Inscription not found', 'INSCRIPTION_NOT_FOUND');
    }

    if (inscription.user_id !== userId) {
      throw ApiError.forbidden('Not your inscription', 'NOT_OWNER');
    }

    if (inscription.status === 'CANCELLED') {
      throw ApiError.badRequest('Inscription already cancelled', 'ALREADY_CANCELLED');
    }

    await InscriptionRepository.update(inscriptionId, { status: 'CANCELLED' });
    await EventRepository.decrementParticipants(inscription.event_id);

    logger.info(`Inscription ${inscriptionId} cancelled by user ${userId}`);
    return { message: 'Inscription cancelled successfully' };
  }
}

export default new InscriptionService();
