import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} from '../validators/auth.validator.js';

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Inscription d'un nouvel utilisateur
 * @access Public
 */
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  AuthController.register
);

/**
 * @route POST /api/auth/login
 * @desc Connexion
 * @access Public
 */
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  AuthController.login
);

/**
 * @route POST /api/auth/refresh
 * @desc Rafraîchir le token d'accès
 * @access Public
 */
router.post(
  '/refresh',
  validate(refreshSchema),
  AuthController.refresh
);

/**
 * @route POST /api/auth/logout
 * @desc Déconnexion
 * @access Public
 */
router.post(
  '/logout',
  validate(logoutSchema),
  AuthController.logout
);

/**
 * @route POST /api/auth/logout-all
 * @desc Déconnexion de tous les appareils
 * @access Private
 */
router.post(
  '/logout-all',
  authenticate,
  AuthController.logoutAll
);

/**
 * @route GET /api/auth/me
 * @desc Obtenir l'utilisateur courant
 * @access Private
 */
router.get(
  '/me',
  authenticate,
  AuthController.getCurrentUser
);

export default router;