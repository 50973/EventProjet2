import logger from '../config/logger.js';

/**
 * Classe d'erreur personnalisée pour l'API
 */
export class ApiError extends Error {
  constructor(statusCode, message, code = 'ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true; // Distingue les erreurs opérationnelles des bugs

    Error.captureStackTrace(this, this.constructor);
  }

  // Méthodes statiques pour créer des erreurs courantes
  static badRequest(message, code = 'BAD_REQUEST', details = null) {
    return new ApiError(400, message, code, details);
  }

  static unauthorized(message = 'Unauthorized', code = 'UNAUTHORIZED') {
    return new ApiError(401, message, code);
  }

  static forbidden(message = 'Forbidden', code = 'FORBIDDEN') {
    return new ApiError(403, message, code);
  }

  static notFound(message = 'Resource not found', code = 'NOT_FOUND') {
    return new ApiError(404, message, code);
  }

  static conflict(message, code = 'CONFLICT') {
    return new ApiError(409, message, code);
  }

  static tooMany(message = 'Too many requests', code = 'RATE_LIMITED') {
    return new ApiError(429, message, code);
  }

  static internal(message = 'Internal server error', code = 'INTERNAL_ERROR') {
    return new ApiError(500, message, code);
  }
}

/**
 * Middleware pour gérer les routes non trouvées
 */
export function notFoundHandler(req, res, next) {
  const error = ApiError.notFound(`Route ${req.originalUrl} not found`);
  next(error);
}

/**
 * Middleware global de gestion des erreurs
 * Doit être le DERNIER middleware enregistré
 */
export function errorHandler(err, req, res, next) {
  // Logger l'erreur
  if (err.statusCode >= 500 || !err.isOperational) {
    logger.error(`${err.message}\n${err.stack}`);
  } else {
    logger.warn(`${err.code}: ${err.message}`);
  }

  // Gérer les erreurs Sequelize
  if (err.name === 'SequelizeValidationError') {
    const details = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      error: 'Validation error',
      code: 'VALIDATION_ERROR',
      details,
    });
  }

  // Erreur de contrainte unique (email déjà existant, etc.)
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    return res.status(409).json({
      error: `${field} already exists`,
      code: 'DUPLICATE_ENTRY',
    });
  }

  // Erreur de clé étrangère
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Invalid reference to related resource',
      code: 'FOREIGN_KEY_ERROR',
    });
  }

  // Erreurs JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
      code: 'INVALID_TOKEN',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token has expired',
      code: 'TOKEN_EXPIRED',
    });
  }

  // Erreurs opérationnelles (ApiError)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      ...(err.details && { details: err.details }),
    });
  }

  // Erreurs inattendues (bugs)
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message;

  res.status(statusCode).json({
    error: message,
    code: 'INTERNAL_ERROR',
    // Afficher la stack trace en développement uniquement
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

export default {
  ApiError,
  notFoundHandler,
  errorHandler,
};