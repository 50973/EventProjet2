import { Router } from 'express';
import authRoutes from './auth.routes.js';
import eventsRoutes from './events.routes.js';
import usersRoutes from './users.routes.js';
import inscriptionsRoutes from './inscriptions.routes.js';
import categoryRoutes from './category.route.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes de l'API
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/events', eventsRoutes);
router.use('/users', usersRoutes);
router.use('/inscriptions', inscriptionsRoutes);

export default router;
