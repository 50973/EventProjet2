import { Router } from 'express';
import InscriptionController from '../controllers/InscriptionController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { cancelInscriptionSchema } from '../validators/inscription.validator.js';

const router = Router();

router.patch(
  '/:id/cancel',
  authenticate,
  validate(cancelInscriptionSchema),
  InscriptionController.cancel
);

export default router;
