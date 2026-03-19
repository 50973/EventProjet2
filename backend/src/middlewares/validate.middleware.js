import { ApiError } from './error.middleware.js';

/**
 * Middleware de validation avec Joi
 * Valide body, params et query selon le schéma fourni
 * 
 * @param {Object} schema - Schéma Joi { body, params, query }
 */
export function validate(schema) {
  return (req, res, next) => {
    const errors = [];

    // Valider le body
    if (schema.body) {
      const { error, value } = schema.body.validate(req.body, {
        abortEarly: false, // Collecter toutes les erreurs
        stripUnknown: true, // Supprimer les champs non définis
      });

      if (error) {
        errors.push(
          ...error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
            location: 'body',
          }))
        );
      } else {
        req.body = value; // Remplacer par les valeurs validées/transformées
      }
    }

    // Valider les paramètres d'URL
    if (schema.params) {
      const { error, value } = schema.params.validate(req.params, {
        abortEarly: false,
      });

      if (error) {
        errors.push(
          ...error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
            location: 'params',
          }))
        );
      } else {
        req.params = value;
      }
    }

    // Valider les query strings
    if (schema.query) {
      const { error, value } = schema.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        errors.push(
          ...error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
            location: 'query',
          }))
        );
      } else {
        // Certaines versions / frameworks exposent `req.query` comme une propriété en lecture seule.
        // Dans ce cas, on merge les valeurs validées dans l'objet existant (si possible),
        // sinon on stocke la version validée dans `req.validatedQuery`.
        try {
          if (req.query && typeof req.query === 'object') {
            Object.assign(req.query, value);
          } else {
            req.query = value;
          }
        } catch {
          req.validatedQuery = value;
        }
      }
    }

    // S'il y a des erreurs, renvoyer une erreur 400
    if (errors.length > 0) {
      throw ApiError.badRequest('Validation failed', 'VALIDATION_ERROR', errors);
    }

    next();
  };
}

export default { validate };