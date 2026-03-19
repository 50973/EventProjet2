import rateLimit from 'express-rate-limit';

/**
 * Rate limiter par défaut pour l'API
 * 100 requêtes par 15 minutes
 */
export const defaultLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  message: {
    error: 'Too many requests, please try again later.',
    code: 'RATE_LIMITED',
  },
  standardHeaders: true, // Ajoute les headers RateLimit-*
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
      code: 'RATE_LIMITED',
    });
  },
});

/**
 * Rate limiter strict pour l'authentification
 * 10 tentatives par 15 minutes
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'Too many authentication attempts, please try again later.',
    code: 'AUTH_RATE_LIMITED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many authentication attempts, please try again later.',
      code: 'AUTH_RATE_LIMITED',
    });
  },
});

/**
 * Rate limiter pour la création d'événements
 * 20 événements par heure
 */
export const eventCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    error: 'Event creation limit reached, please try again later.',
    code: 'EVENT_RATE_LIMITED',
  },
  standardHeaders: true,
  legacyHeaders: false,
   keyGenerator: (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.ip;
    return req.userId || ipKeyGenerator(req);
  }, // Limiter par utilisateur
  handler: (req, res) => {
    res.status(429).json({
      error: 'Event creation limit reached, please try again later.',
      code: 'EVENT_RATE_LIMITED',
    });
  },
});

export default {
  defaultLimiter,
  authLimiter,
  eventCreationLimiter,
};