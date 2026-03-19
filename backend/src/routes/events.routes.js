import { Router } from 'express';
import EventController from '../controllers/EventController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, optionalAuth } from '../middlewares/auth.middleware.js';
import { requireOrganizer } from '../middlewares/role.middleware.js';
import { eventCreationLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  createEventSchema,
  updateEventSchema,
  getEventSchema,
  listEventsSchema,
  publishEventSchema,
  deleteEventSchema,
} from '../validators/event.validator.js';

const router = Router();

/**
 * @route GET /api/events
 * @desc Lister les événements (publics)
 * @access Public
 */
router.get(
  '/',
  optionalAuth,
  validate(listEventsSchema),
  EventController.listEvents
);

/**
 * @route GET /api/events/my-events
 * @desc Obtenir mes événements (organisateur)
 * @access Private/Organizer
 */
router.get(
  '/my-events',
  authenticate,
  requireOrganizer,
  EventController.getMyEvents
);

/**
 * @route POST /api/events
 * @desc Créer un événement
 * @access Private/Organizer
 */
router.post(
  '/',
  authenticate,
  requireOrganizer,
  eventCreationLimiter,
  validate(createEventSchema),
  EventController.createEvent
);

/**
 * @route GET /api/events/:id
 * @desc Obtenir un événement par ID
 * @access Public
 */
router.get(
  '/:id',
  optionalAuth,
  validate(getEventSchema),
  EventController.getEvent
);

/**
 * @route PATCH /api/events/:id
 * @desc Modifier un événement
 * @access Private/Owner
 */
router.patch(
  '/:id',
  authenticate,
  validate(updateEventSchema),
  EventController.updateEvent
);

/**
 * @route DELETE /api/events/:id
 * @desc Supprimer un événement
 * @access Private/Owner
 */
router.delete(
  '/:id',
  authenticate,
  validate(deleteEventSchema),
  EventController.deleteEvent
);

/**
 * @route POST /api/events/:id/publish
 * @desc Publier un événement
 * @access Private/Owner
 */
router.post(
  '/:id/publish',
  authenticate,
  validate(publishEventSchema),
  EventController.publishEvent
);

export default router;