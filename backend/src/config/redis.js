import Redis from 'ioredis';
import { getEnv, logEnv } from './env.js';

// Log Redis-related env vars for observability.
logEnv([
  { key: 'REDIS_HOST', defaultValue: 'localhost', required: true },
  { key: 'REDIS_PORT', defaultValue: '6379', required: true },
  { key: 'REDIS_PASSWORD', secret: true, defaultValue: undefined },
]);

// Configuration Redis
const redisConfig = {
  host: getEnv('REDIS_HOST', { defaultValue: 'localhost' }).value,
  port: parseInt(getEnv('REDIS_PORT', { defaultValue: '6379' }).value, 10),
  password: getEnv('REDIS_PASSWORD', { defaultValue: undefined }).value,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
};

// Créer l'instance Redis
const redis = new Redis(redisConfig);

// Événements de connexion
redis.on('connect', () => {
  console.log('✅ Redis connected successfully.');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err.message);
});

// ==========================================
// GESTION DES REFRESH TOKENS
// ==========================================

/**
 * Stocker un refresh token dans Redis
 * @param {string} userId - ID de l'utilisateur
 * @param {string} tokenHash - Hash du token
 * @param {number} expiresInSeconds - Durée de validité
 */
export async function storeRefreshToken(userId, tokenHash, expiresInSeconds) {
  const key = `refresh_token:${userId}:${tokenHash}`;
  await redis.setex(key, expiresInSeconds, 'valid');
}

/**
 * Vérifier si un refresh token est valide
 * @param {string} userId - ID de l'utilisateur
 * @param {string} tokenHash - Hash du token
 * @returns {Promise<boolean>}
 */
export async function isRefreshTokenValid(userId, tokenHash) {
  const key = `refresh_token:${userId}:${tokenHash}`;
  const result = await redis.get(key);
  return result === 'valid';
}

/**
 * Révoquer un refresh token
 * @param {string} userId - ID de l'utilisateur
 * @param {string} tokenHash - Hash du token
 */
export async function revokeRefreshToken(userId, tokenHash) {
  const key = `refresh_token:${userId}:${tokenHash}`;
  await redis.del(key);
}

/**
 * Révoquer tous les refresh tokens d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 */
export async function revokeAllUserTokens(userId) {
  const pattern = `refresh_token:${userId}:*`;
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

// ==========================================
// BLACKLIST DES ACCESS TOKENS
// ==========================================

/**
 * Ajouter un token à la blacklist
 * @param {string} token - Token à blacklister
 * @param {number} expiresInSeconds - Durée de la blacklist
 */
export async function blacklistToken(token, expiresInSeconds) {
  const key = `blacklist:${token}`;
  await redis.setex(key, expiresInSeconds, 'revoked');
}

/**
 * Vérifier si un token est blacklisté
 * @param {string} token - Token à vérifier
 * @returns {Promise<boolean>}
 */
export async function isTokenBlacklisted(token) {
  const key = `blacklist:${token}`;
  const result = await redis.get(key);
  return result === 'revoked';
}

export default redis;