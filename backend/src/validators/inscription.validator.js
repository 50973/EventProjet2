import Joi from 'joi';

export const registerForEventSchema = {
  params: Joi.object({
    eventId: Joi.string().uuid().required().messages({
      'string.guid': 'Invalid event ID format',
    }),
  }),
};

export const cancelInscriptionSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required().messages({
      'string.guid': 'Invalid inscription ID format',
    }),
  }),
};

export default {
  registerForEventSchema,
  cancelInscriptionSchema,
};
