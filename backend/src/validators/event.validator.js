import Joi from 'joi';

/**
 * Schéma pour créer un événement
 */
export const createEventSchema = {
  body: Joi.object({
    title: Joi.string()
      .min(3)
      .max(255)
      .required()
      .messages({
        'string.min': 'Title must be at least 3 characters',
        'any.required': 'Title is required',
      }),
    description: Joi.string()
      .max(5000)
      .allow('', null),
    location: Joi.string()
      .max(500)
      .allow('', null),
    startDatetime: Joi.date()
      .iso()
      .greater('now')
      .required()
      .messages({
        'date.greater': 'Start date must be in the future',
        'any.required': 'Start date is required',
      }),
    endDatetime: Joi.date()
      .iso()
      .greater(Joi.ref('startDatetime'))
      .allow(null)
      .messages({
        'date.greater': 'End date must be after start date',
      }),
    capacity: Joi.number()
      .integer()
      .min(1)
      .max(100000)
      .default(100),
    price: Joi.number()
      .min(0)
      .max(99999.99)
      .default(0),
    currency: Joi.string()
      .length(3)
      .uppercase()
      .default('EUR'),
    tags: Joi.array()
      .items(Joi.string().max(50))
      .max(10)
      .default([]),
    status: Joi.string()
      .valid('DRAFT', 'PUBLISHED')
      .default('DRAFT'),
  }),
};

/**
 * Schéma pour mettre à jour un événement
 */
export const updateEventSchema = {
  params: Joi.object({
    id: Joi.string()
      .uuid()
      .required(),
  }),
  body: Joi.object({
    title: Joi.string().min(3).max(255),
    description: Joi.string().max(5000).allow('', null),
    location: Joi.string().max(500).allow('', null),
    startDatetime: Joi.date().iso(),
    endDatetime: Joi.date().iso().allow(null),
    capacity: Joi.number().integer().min(1).max(100000),
    price: Joi.number().min(0).max(99999.99),
    currency: Joi.string().length(3).uppercase(),
    tags: Joi.array().items(Joi.string().max(50)).max(10),
  }),
};

/**
 * Schéma pour obtenir un événement par ID
 */
export const getEventSchema = {
  params: Joi.object({
    id: Joi.string()
      .uuid()
      .required()
      .messages({
        'string.guid': 'Invalid event ID format',
      }),
  }),
};

/**
 * Schéma pour lister les événements
 */
export const listEventsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid('DRAFT', 'PUBLISHED', 'CANCELLED'),
    search: Joi.string().max(100),
    location: Joi.string().max(100),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    organizerId: Joi.string().uuid(),
    sortBy: Joi.string().valid('start_datetime', 'price', 'created_at').default('start_datetime'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};

/**
 * Schéma pour publier/dépublier
 */
export const publishEventSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

/**
 * Schéma pour supprimer
 */
export const deleteEventSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
};

export default {
  createEventSchema,
  updateEventSchema,
  getEventSchema,
  listEventsSchema,
  publishEventSchema,
  deleteEventSchema,
};