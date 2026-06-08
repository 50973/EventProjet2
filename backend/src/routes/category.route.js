import { Router } from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema
} from '../validators/category.validator.js';

const router = Router();

// GET /api/categories — public
router.get(
  '/',
  CategoryController.listCategories
);

// GET /api/categories/:id — public
router.get(
  '/:id',
  validate(getCategorySchema),
  CategoryController.getCategory
);

// POST /api/categories — ADMIN uniquement
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createCategorySchema),
  CategoryController.createCategory
);

// PATCH /api/categories/:id — ADMIN uniquement
router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateCategorySchema),
  CategoryController.updateCategory
);

// DELETE /api/categories/:id — ADMIN uniquement
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate(deleteCategorySchema),
  CategoryController.deleteCategory
);

export default router;