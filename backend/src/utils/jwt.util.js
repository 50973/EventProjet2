import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Configuration des secrets et durées d'expiration
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const ACCESS_EXP = process.env.JWT_ACCESS_EXP || '15m';
const REFRESH_EXP = process.env.JWT_REFRESH_EXP || '30d';

/**
 * Générer un Access Token
 * @param {Object} payload - Données à inclure dans le token
 * @returns {string} JWT Access Token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXP,
    issuer: 'eventopia',
    audience: 'eventopia-users',
  });
}

/**
 * Générer un Refresh Token
 * @param {Object} payload - Données minimales (userId uniquement)
 * @returns {string} JWT Refresh Token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXP,
    issuer: 'eventopia',
    audience: 'eventopia-users',
  });
}

/**
 * Vérifier un Access Token
 * @param {string} token - JWT Access Token
 * @returns {Object} Payload décodé
 * @throws {Error} Si le token est invalide ou expiré
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET, {
    issuer: 'eventopia',
    audience: 'eventopia-users',
  });
}

/**
 * Vérifier un Refresh Token
 * @param {string} token - JWT Refresh Token
 * @returns {Object} Payload décodé
 * @throws {Error} Si le token est invalide ou expiré
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET, {
    issuer: 'eventopia',
    audience: 'eventopia-users',
  });
}

/**
 * Générer une paire de tokens (access + refresh)
 * @param {Object} user - Objet utilisateur
 * @returns {Object} { accessToken, refreshToken }
 */
export function generateTokenPair(user) {
  // L'access token contient plus d'informations pour éviter les requêtes DB
  const accessPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // Le refresh token ne contient que l'userId pour minimiser les risques
  const refreshPayload = {
    userId: user.id,
  };

  return {
    accessToken: generateAccessToken(accessPayload),
    refreshToken: generateRefreshToken(refreshPayload),
  };
}

/**
 * Hasher un token pour le stockage sécurisé
 * @param {string} token - Token à hasher
 * @returns {string} Hash du token
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Générer un token aléatoire (pour vérification email, reset password)
 * @returns {string} Token aléatoire de 64 caractères hex
 */
export function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Convertir une chaîne d'expiration en secondes
 * @param {string} expString - Ex: '15m', '30d', '1h'
 * @returns {number} Durée en secondes
 */
export function getExpirationInSeconds(expString) {
  const match = expString.match(/^(\d+)([smhd])$/);
  if (!match) return 900; // Défaut : 15 minutes

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 24 * 60 * 60;
    default: return 900;
  }
}

/**
 * Obtenir la date d'expiration du refresh token
 * @returns {Date} Date d'expiration
 */
export function getRefreshTokenExpiration() {
  const seconds = getExpirationInSeconds(REFRESH_EXP);
  return new Date(Date.now() + seconds * 1000);
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair,
  hashToken,
  generateRandomToken,
  getExpirationInSeconds,
  getRefreshTokenExpiration,
};