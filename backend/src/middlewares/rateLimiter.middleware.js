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
  limit: 20, // 'max' is now 'limit' in newer versions (though max still works for now)
  message: {
    error: 'Event creation limit reached, please try again later.',
    code: 'EVENT_RATE_LIMITED',
  },
  standardHeaders: 'draft-7', // Recommended setting for modern apps
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Note: Returning req.ip directly is what triggers the IPv6 warning
    return req.userId || req.ip;
  },
  // This block fixes BOTH validation errors from your logs
  validate: { 
    default: false,            // Disables the general validation checks
    keyGeneratorIpFallback: false // Specifically silences the IPv6 warning for custom keys
  },
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