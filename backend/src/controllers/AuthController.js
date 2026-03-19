import AuthService from '../services/AuthService.js';
import logger from '../config/logger.js';

/**
 * Controller d'authentification
 * Gère les requêtes HTTP pour l'auth
 */
class AuthController {
  /**
   * Inscription
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      const { fullName, email, password, role } = req.body;

      const result = await AuthService.register({
        fullName,
        email,
        password,
        role,
      });

      res.status(201).json({
        message: 'Registration successful',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Connexion
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(
        { email, password },
        {
          userAgent: req.headers['user-agent'],
          ipAddress: req.ip,
        }
      );

      res.json({
        message: 'Login successful',
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Rafraîchir le token
   * POST /api/auth/refresh
   */
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const tokens = await AuthService.refresh(refreshToken);

      res.json({
        message: 'Token refreshed',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Déconnexion
   * POST /api/auth/logout
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const accessToken = req.token; // Attaché par le middleware si présent

      await AuthService.logout(refreshToken, accessToken);

      res.json({ message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Déconnexion de tous les appareils
   * POST /api/auth/logout-all
   */
  async logoutAll(req, res, next) {
    try {
      await AuthService.logoutAll(req.userId);
      res.json({ message: 'Logged out from all devices' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtenir l'utilisateur actuel
   * GET /api/auth/me
   */
  async getCurrentUser(req, res, next) {
    try {
      res.json({
        user: req.user.toPublicJSON(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();