import { verifyAccessToken } from '../utils/jwt.util.js';
import { isTokenBlacklisted } from '../config/redis.js';
import { User } from '../models/index.js';
import logger from '../config/logger.js';

/**
 * Middleware d'authentification
 * Vérifie le JWT et attache l'utilisateur à la requête
 */
export async function authenticate(req, res, next) {
  try {
    // Extraire le token du header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied. No token provided.',
        code: 'NO_TOKEN',
      });
    }

    // Extraire le token (après "Bearer ")
    const token = authHeader.split(' ')[1];

    // Vérifier si le token est blacklisté
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        error: 'Token has been revoked.',
        code: 'TOKEN_REVOKED',
      });
    }

    // Vérifier et décoder le token
    const decoded = verifyAccessToken(token);

    // Récupérer l'utilisateur en base
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: 'User not found.',
        code: 'USER_NOT_FOUND',
      });
    }

    // Attacher les informations à la requête
    req.user = user;
    req.userId = user.id;
    req.userRole = user.role;
    req.token = token;

    next();
  } catch (error) {
    logger.error('Authentication error:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token has expired.',
        code: 'TOKEN_EXPIRED',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token.',
        code: 'INVALID_TOKEN',
      });
    }

    return res.status(401).json({
      error: 'Authentication failed.',
      code: 'AUTH_FAILED',
    });
  }
}

/**
 * Middleware d'authentification optionnelle
 * Attache l'utilisateur si le token est valide, continue sinon
 */
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Pas de token, on continue sans utilisateur
    }

    const token = authHeader.split(' ')[1];

    // Vérifier si blacklisté
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return next(); // Token révoqué, on continue sans utilisateur
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findByPk(decoded.userId);

    if (user) {
      req.user = user;
      req.userId = user.id;
      req.userRole = user.role;
      req.token = token;
    }

    next();
  } catch {
    // En cas d'erreur, on continue sans utilisateur
    next();
  }
}

export default { authenticate, optionalAuth };