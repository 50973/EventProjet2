import EventService from '../services/EventService.js';
import logger from '../config/logger.js';

/**
 * Controller des événements
 * Gère les requêtes HTTP pour la ressource `Event`
 */
class EventController {
  // GET /api/events
  async listEvents(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        status: req.query.status,
        search: req.query.search,
        location: req.query.location,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        organizerId: req.query.organizerId,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      };

      // inclure les brouillons pour l'organisateur connecté
      if (req.userId) {
        options.includeUnpublished = true;
      }

      const result = await EventService.listEvents(options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/events/my-events
  async getMyEvents(req, res, next) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };
      const result = await EventService.getOrganizerEvents(req.userId, options);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/events
  async createEvent(req, res, next) {
    try {
      const eventData = req.body;
      const event = await EventService.createEvent(eventData, req.userId);
      res.status(201).json({ event });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/events/:id
  async getEvent(req, res, next) {
    try {
      const event = await EventService.getEvent(req.params.id, req.userId);
      res.json({ event });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/events/:id
  async updateEvent(req, res, next) {
    try {
      const updated = await EventService.updateEvent(
        req.params.id,
        req.body,
        req.userId
      );
      res.json({ event: updated });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/events/:id
  async deleteEvent(req, res, next) {
    try {
      const result = await EventService.deleteEvent(req.params.id, req.userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/events/:id/publish
  async publishEvent(req, res, next) {
    try {
      const event = await EventService.publishEvent(req.params.id, req.userId);
      res.json({ event });
    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
