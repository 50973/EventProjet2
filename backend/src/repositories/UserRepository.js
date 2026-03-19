import { User, RefreshToken } from '../models/index.js';
import { Op } from 'sequelize';

/**
 * Repository pour l'accès aux données utilisateurs
 * Centralise toutes les requêtes à la base de données
 */
class UserRepository {
  /**
   * Trouver un utilisateur par son ID
   * @param {string} id - UUID de l'utilisateur
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    return User.findByPk(id);
  }

  /**
   * Trouver un utilisateur par son email
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    return User.findOne({ 
      where: { email: email.toLowerCase() } 
    });
  }

  /**
   * Trouver par token de vérification d'email
   * @param {string} token - Token de vérification
   * @returns {Promise<User|null>}
   */
  async findByVerificationToken(token) {
    return User.findOne({ 
      where: { verification_token: token } 
    });
  }

  /**
   * Trouver par token de reset de mot de passe
   * @param {string} token - Token de reset
   * @returns {Promise<User|null>}
   */
  async findByResetToken(token) {
    return User.findOne({
      where: {
        reset_password_token: token,
        // Vérifier que le token n'est pas expiré
        reset_password_expires: { [Op.gt]: new Date() },
      },
    });
  }

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<User>}
   */
  async create(userData) {
    return User.create({
      email: userData.email.toLowerCase(),
      password_hash: userData.passwordHash,
      full_name: userData.fullName,
      role: userData.role || 'USER',
      verification_token: userData.verificationToken,
      is_verified: userData.isVerified || false,
    });
  }

  /**
   * Mettre à jour un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @param {Object} updates - Données à mettre à jour
   * @returns {Promise<User|null>}
   */
  async update(id, updates) {
    const user = await User.findByPk(id);
    if (!user) return null;

    // Liste des champs autorisés à être modifiés
    const allowedUpdates = [
      'full_name',
      'bio',
      'avatar_url',
      'email',
      'password_hash',
      'role',
      'is_verified',
      'verification_token',
      'reset_password_token',
      'reset_password_expires',
    ];

    // Filtrer les updates pour ne garder que les champs autorisés
    const filteredUpdates = {};
    for (const key of Object.keys(updates)) {
      // Convertir camelCase en snake_case si nécessaire
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      if (allowedUpdates.includes(snakeKey)) {
        filteredUpdates[snakeKey] = updates[key];
      } else if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    }

    await user.update(filteredUpdates);
    return user;
  }

  /**
   * Supprimer un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  /**
   * Lister les utilisateurs avec pagination et filtres
   * @param {Object} options - Options de requête
   * @returns {Promise<Object>}
   */
  async findAll(options = {}) {
    const {
      page = 1,
      limit = 20,
      role,
      search,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = options;

    const where = {};

    // Filtre par rôle
    if (role) {
      where.role = role;
    }

    // Recherche textuelle
    if (search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit,
      offset: (page - 1) * limit,
      // Exclure les données sensibles
      attributes: { 
        exclude: ['password_hash', 'verification_token', 'reset_password_token'] 
      },
    });

    return {
      users: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  /**
   * Vérifier si un email existe déjà
   * @param {string} email - Email à vérifier
   * @returns {Promise<boolean>}
   */
  async emailExists(email) {
    const count = await User.count({ 
      where: { email: email.toLowerCase() } 
    });
    return count > 0;
  }

  // ==========================================
  // GESTION DES REFRESH TOKENS
  // ==========================================

  /**
   * Stocker un refresh token
   * @param {Object} tokenData - Données du token
   * @returns {Promise<RefreshToken>}
   */
  async storeRefreshToken(tokenData) {
    return RefreshToken.create({
      user_id: tokenData.userId,
      token_hash: tokenData.tokenHash,
      expires_at: tokenData.expiresAt,
      user_agent: tokenData.userAgent,
      ip_address: tokenData.ipAddress,
    });
  }

  /**
   * Trouver un refresh token par son hash
   * @param {string} tokenHash - Hash du token
   * @returns {Promise<RefreshToken|null>}
   */
  async findRefreshToken(tokenHash) {
    return RefreshToken.findOne({
      where: {
        token_hash: tokenHash,
        revoked: false,
        expires_at: { [Op.gt]: new Date() },
      },
    });
  }

  /**
   * Révoquer un refresh token
   * @param {string} tokenHash - Hash du token
   * @returns {Promise<RefreshToken|null>}
   */
  async revokeRefreshToken(tokenHash) {
    const token = await RefreshToken.findOne({ 
      where: { token_hash: tokenHash } 
    });
    if (token) {
      await token.update({ revoked: true });
    }
    return token;
  }

  /**
   * Révoquer tous les tokens d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<number>} Nombre de tokens révoqués
   */
  async revokeAllUserTokens(userId) {
    const [affectedCount] = await RefreshToken.update(
      { revoked: true },
      { where: { user_id: userId } }
    );
    return affectedCount;
  }

  /**
   * Nettoyer les tokens expirés
   * @returns {Promise<number>} Nombre de tokens supprimés
   */
  async cleanupExpiredTokens() {
    return RefreshToken.destroy({
      where: {
        [Op.or]: [
          { expires_at: { [Op.lt]: new Date() } },
          { revoked: true },
        ],
      },
    });
  }
}

// Exporter une instance unique (Singleton)
export default new UserRepository();