import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Import configurations
import { testConnection, syncDatabase } from './config/db.js';
import logger, { requestLogger } from './config/logger.js';

// Import middlewares
import { defaultLimiter } from './middlewares/rateLimiter.middleware.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

// Import routes
import routes from './routes/index.js';

// Import models pour initialiser les associations
import './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy (pour rate limiting derrière un reverse proxy)
app.set('trust proxy', 1);

// Middlewares de sécurité
app.use(helmet());

// Configuration CORS
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Servir les fichiers uploadés
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate limiting global
app.use('/api', defaultLimiter);

// Routes de l'API
app.use('/api', routes);

// Handler 404
app.use(notFoundHandler);

// Handler global des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = parseInt(process.env.PORT, 10) || 4000;
const HOST = '0.0.0.0';

async function startServer() {
  try {
    const dbConnected = await testConnection();
    if (!dbConnected) {
      logger.error('Failed to connect to database. Exiting...');
      process.exit(1);
    }

    await syncDatabase({ alter: process.env.NODE_ENV === 'development' });

    app.listen(PORT, HOST, () => {
      logger.info(`🚀 Server running on http://${HOST}:${PORT}`);
      logger.info(`📚 API available at http://${HOST}:${PORT}/api`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;