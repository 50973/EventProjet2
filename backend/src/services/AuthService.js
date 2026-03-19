import UserRepository from '../repositories/UserRepository.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';
import {
  generateTokenPair,
  verifyRefreshToken,
  hashToken,
  generateRandomToken,
  getRefreshTokenExpiration,
  getExpirationInSeconds,
} from '../utils/jwt.util.js';
import {
  storeRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  isRefreshTokenValid,
  blacklistToken,
} from '../config/redis.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../config/logger.js';

/**
 * Service d'authentification
 * Gère inscription, connexion, tokens et sécurité
 */
class AuthService {
  /**
   * Inscrire un nouvel utilisateur
   * @param {Object} userData - Données d'inscription
   * @returns {Promise<Object>} User et tokens
   */
  async register(userData) {
    const { fullName, email, password, role } = userData;

    // Vérifier si l'email existe déjà
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict('Email already registered', 'EMAIL_EXISTS');
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password);

    // Générer un token de vérification d'email
    const verificationToken = generateRandomToken();

    // Créer l'utilisateur
    const user = await UserRepository.create({
      fullName,
      email,
      passwordHash,
      role: role || 'USER',
      verificationToken,
      isVerified: false,
    });

    // Générer les tokens JWT
    const tokens = generateTokenPair(user);

    // Stocker le refresh token
    const tokenHash = hashToken(tokens.refreshToken);
    await storeRefreshToken(
      user.id,
      tokenHash,
      getExpirationInSeconds(process.env.JWT_REFRESH_EXP || '30d')
    );

    // Stocker aussi en base de données (pour la rotation)
    await UserRepository.storeRefreshToken({
      userId: user.id,
      tokenHash,
      expiresAt: getRefreshTokenExpiration(),
    });

    logger.info(`User registered: ${email}`);

    return {
      user: user.toPublicJSON(),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Connecter un utilisateur
   * @param {Object} credentials - Email et mot de passe
   * @param {Object} requestInfo - Métadonnées de la requête
   * @returns {Promise<Object>} User et tokens
   */
  async login(credentials, requestInfo = {}) {
    const { email, password } = credentials;

    // Trouver l'utilisateur
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    // Vérifier le mot de passe
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw ApiError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    // Générer les tokens
    const tokens = generateTokenPair(user);

    // Stocker le refresh token
    const tokenHash = hashToken(tokens.refreshToken);
    await storeRefreshToken(
      user.id,
      tokenHash,
      getExpirationInSeconds(process.env.JWT_REFRESH_EXP || '30d')
    );

    // Stocker en base avec métadonnées
    await UserRepository.storeRefreshToken({
      userId: user.id,
      tokenHash,
      expiresAt: getRefreshTokenExpiration(),
      userAgent: requestInfo.userAgent,
      ipAddress: requestInfo.ipAddress,
    });

    logger.info(`User logged in: ${email}`);

    return {
      user: user.toPublicJSON(),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Rafraîchir les tokens
   * @param {string} refreshToken - Refresh token actuel
   * @returns {Promise<Object>} Nouveaux tokens
   */
  async refresh(refreshToken) {
    try {
      // Vérifier le refresh token
      const decoded = verifyRefreshToken(refreshToken);
      const tokenHash = hashToken(refreshToken);

      // Vérifier si le token est valide dans Redis
      const isValid = await isRefreshTokenValid(decoded.userId, tokenHash);
      if (!isValid) {
        // Vérifier aussi en base de données
        const dbToken = await UserRepository.findRefreshToken(tokenHash);
        if (!dbToken || dbToken.revoked) {
          throw ApiError.unauthorized('Invalid refresh token', 'INVALID_REFRESH_TOKEN');
        }
      }

      // Récupérer l'utilisateur
      const user = await UserRepository.findById(decoded.userId);
      if (!user) {
        throw ApiError.unauthorized('User not found', 'USER_NOT_FOUND');
      }

      // ROTATION : Révoquer l'ancien token
      await revokeRefreshToken(decoded.userId, tokenHash);
      await UserRepository.revokeRefreshToken(tokenHash);

      // Générer de nouveaux tokens
      const tokens = generateTokenPair(user);
      const newTokenHash = hashToken(tokens.refreshToken);

      // Stocker le nouveau refresh token
      await storeRefreshToken(
        user.id,
        newTokenHash,
        getExpirationInSeconds(process.env.JWT_REFRESH_EXP || '30d')
      );

      await UserRepository.storeRefreshToken({
        userId: user.id,
        tokenHash: newTokenHash,
        expiresAt: getRefreshTokenExpiration(),
      });

      logger.info(`Token refreshed for user: ${user.email}`);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      if (error.isOperational) throw error;
      throw ApiError.unauthorized('Invalid refresh token', 'INVALID_REFRESH_TOKEN');
    }
  }

  /**
   * Déconnecter un utilisateur
   * @param {string} refreshToken - Refresh token à révoquer
   * @param {string} accessToken - Access token à blacklister
   */
  async logout(refreshToken, accessToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const tokenHash = hashToken(refreshToken);

      // Révoquer le refresh token
      await revokeRefreshToken(decoded.userId, tokenHash);
      await UserRepository.revokeRefreshToken(tokenHash);

      // Blacklister l'access token (jusqu'à son expiration naturelle)
      if (accessToken) {
        await blacklistToken(
          accessToken,
          getExpirationInSeconds(process.env.JWT_ACCESS_EXP || '15m')
        );
      }

      logger.info(`User logged out: ${decoded.userId}`);
      return true;
    } catch (error) {
      // Même si le token est invalide, on considère le logout réussi
      logger.warn('Logout with invalid token');
      return true;
    }
  }

  /**
   * Déconnecter de tous les appareils
   * @param {string} userId - ID de l'utilisateur
   */
  async logoutAll(userId) {
    await revokeAllUserTokens(userId);
    await UserRepository.revokeAllUserTokens(userId);
    logger.info(`User logged out from all devices: ${userId}`);
    return true;
  }
}

export default new AuthService();