import UserRepository from '../repositories/UserRepository.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../config/logger.js';

/**
 * Service pour la logique métier des utilisateurs
 * Contient les règles de gestion et validations métier
 */
class UserService {
  /**
   * Obtenir le profil d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  async getProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND');
    }
    return user.toPublicJSON();
  }

  /**
   * Mettre à jour le profil
   * @param {string} userId - ID de l'utilisateur
   * @param {Object} updates - Données à mettre à jour
   * @returns {Promise<Object>}
   */
  async updateProfile(userId, updates) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND');
    }

    // Vérifier si l'email est modifié et déjà utilisé
    if (updates.email && updates.email !== user.email) {
      const emailExists = await UserRepository.emailExists(updates.email);
      if (emailExists) {
        throw ApiError.conflict('Email already in use', 'EMAIL_EXISTS');
      }
    }

    // Filtrer les champs autorisés pour la mise à jour du profil
    const allowedUpdates = {
      full_name: updates.fullName,
      bio: updates.bio,
      email: updates.email,
    };

    // Supprimer les valeurs undefined
    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    const updatedUser = await UserRepository.update(userId, allowedUpdates);
    
    logger.info(`Profile updated for user: ${userId}`);
    return updatedUser.toPublicJSON();
  }

  /**
   * Changer le mot de passe
   * @param {string} userId - ID de l'utilisateur
   * @param {string} currentPassword - Mot de passe actuel
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise<Object>}
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND');
    }

    // Vérifier le mot de passe actuel
    const isValid = await comparePassword(currentPassword, user.password_hash);
    if (!isValid) {
      throw ApiError.unauthorized('Current password is incorrect', 'INVALID_PASSWORD');
    }

    // Vérifier que le nouveau mot de passe est différent
    if (currentPassword === newPassword) {
      throw ApiError.badRequest(
        'New password must be different from current password',
        'SAME_PASSWORD'
      );
    }

    // Hasher et sauvegarder le nouveau mot de passe
    const passwordHash = await hashPassword(newPassword);
    await UserRepository.update(userId, { password_hash: passwordHash });

    // Révoquer tous les refresh tokens pour forcer la reconnexion
    await UserRepository.revokeAllUserTokens(userId);

    logger.info(`Password changed for user: ${userId}`);
    return { message: 'Password changed successfully' };
  }

  /**
   * Mettre à jour l'avatar
   * @param {string} userId - ID de l'utilisateur
   * @param {string} avatarUrl - URL de l'avatar
   * @returns {Promise<Object>}
   */
  async updateAvatar(userId, avatarUrl) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND');
    }

    await UserRepository.update(userId, { avatar_url: avatarUrl });
    
    logger.info(`Avatar updated for user: ${userId}`);
    return { avatarUrl };
  }

  /**
   * Obtenir les inscriptions d'un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @param {Object} options - Options de pagination
   * @returns {Promise<Object>}
   */
  async getInscriptions(userId, options = {}) {
    const { Inscription, Event } = await import('../models/index.js');
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 20;

    const { count, rows } = await Inscription.findAndCountAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'title', 'start_datetime', 'location', 'price', 'status', 'image_url'],
        },
      ],
    });

    return {
      inscriptions: rows.map((i) => ({
        ...i.toPublicJSON(),
        event: i.event ? i.event.toPublicJSON() : null,
      })),
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  /**
   * Lister les utilisateurs (admin uniquement)
   * @param {Object} options - Options de pagination/filtrage
   * @returns {Promise<Object>}
   */
  async listUsers(options) {
    return UserRepository.findAll(options);
  }

  /**
   * Supprimer un utilisateur (admin uniquement)
   * @param {string} userId - ID de l'utilisateur
   * @param {string} adminId - ID de l'admin effectuant l'action
   * @returns {Promise<Object>}
   */
  async deleteUser(userId, adminId) {
    // Empêcher l'auto-suppression
    if (userId === adminId) {
      throw ApiError.badRequest('Cannot delete your own account', 'SELF_DELETE');
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User not found', 'USER_NOT_FOUND');
    }

    // Empêcher la suppression d'un admin
    if (user.role === 'ADMIN') {
      throw ApiError.forbidden('Cannot delete admin users', 'ADMIN_DELETE');
    }

    await UserRepository.delete(userId);
    
    logger.info(`User deleted: ${userId} by admin: ${adminId}`);
    return { message: 'User deleted successfully' };
  }
}

export default new UserService();