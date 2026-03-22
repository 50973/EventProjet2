import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  updateProfileSchema,
  changePasswordSchema,
  getInscriptionsSchema,
} from '../validators/user.validator.js';

const router = Router();

router.get(
  '/me',
  authenticate,
  UserController.getProfile
);

router.patch(
  '/me',
  authenticate,
  validate(updateProfileSchema),
  UserController.updateProfile
);

router.post(
  '/me/change-password',
  authenticate,
  validate(changePasswordSchema),
  UserController.changePassword
);

router.get(
  '/me/inscriptions',
  authenticate,
  validate(getInscriptionsSchema),
  UserController.getInscriptions
);

export default router;
