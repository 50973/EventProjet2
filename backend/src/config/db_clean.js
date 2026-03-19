import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuration de sequelize pour se connecter à la base de données MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'eventdkc2_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dialect: 'mysql',
        // Afficher les requêtes SQL en développement uniquement
        logging: process.env.NODE_ENV === 'development' ?
        console.log : false,
        // Configuration du pool de connexions
        pool: {
            max: 10,   // Nombre maximum de connexions dans le pool
            min: 0,   // Nombre minimum de connexions dans le pool
            acquire: 30000, // Durée maximale (en ms) pour obtenir une connexion avant de générer une erreur
            idle: 10000 // Durée maximale (en ms) qu'une connexion peut être inactive avant d'être fermée
        },
        // Convention de nommage snake_case
        define: {
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

/**
 * Tester ma connexion à la base de données
 * @returns {Promise<boolean>}
 */
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');
        return true;
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error.message);
        return false;
    }
}

/**
 * Synchroniser les modèles avec la base de données
 * @param {object} options - Option de synchronisation
 */
export async function syncDatabase(options = {}) {
    try {
        await sequelize.sync(options);
        console.log('Base de données synchronisée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
        throw error;
    }
}

export default sequelize;