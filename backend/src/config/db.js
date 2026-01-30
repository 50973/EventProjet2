import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuration de sequelize pour se connecter à la base de données MySQL
const sequelize=new Sequelize(
    process.env.DB_NAME || 'EVENTDKC2',
    process.env.DB_USER || 'admin',
    process.env.DB_PASS || 'destin',

{host: process.env.DB_HOST || 'localhost',
port: parseInt(process.env.DB_PORT, 10) || 4000,
dialect: 'mysql',
// Afficher les requêtes SQL en développement uniquement
logging: process.env.NODE_ENV === 'development' ? 
console.log : false,
// Configuration du pool de connexions
pool: {
    max: 10,   // Nombre maximum de connexions dans le pool
    min: 0,   // Nombre minimum de connexions dans le pool
    accquire: 30000, // Durée maximale (en ms) pour obtenir une connexion avant de générer une erreur
    idle: 10000 // Durée maximale (en ms) qu'une connexion peut être inactive avant d'être fermée
},
// Convention de nommage snake_case
define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updateAt: 'update_at',
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
export async funtion syncDatabase(options = {}) {
    try {
        await sequelize.sync(options);
        consome.log('Base de données synchronisée avec succès.');
    }
}

export default sequelize;

```

> 💡 **Explication** :
> - `pool` : Gère un pool de connexions pour de meilleures performances
> - `underscored: true` : Convertit automatiquement `createdAt` en `created_at`
 */


```javascript
import { DataTypes, Model} from 'sequelize'; 
import sequelize from '../config/db.js'; 

class User extends Model {
    /**
     * Vérifier si l'utilisateur a un rôle spécifique
     * @param {string} role - Le rôle à vérifier
     * @returns {boolean}
     */
    hasRole(role) {
        return this.role === role;
    }

    /**
     * Vérifier si l'utilisateur est admin
     * @returns {boolean}
     */
    isAdmin() {
        return this.role === 'admin';
    }

    /**
     * Vérifier si l'utilisateur est organisateur
     * @returns {boolean}
     */
    isOrganizer() {
        return this.role === 'ORGANIZER' || this.role === 'admin';
    }

    /**
     * Retourner les données publiques (sans mot de passe)
     * @returns {Object}
     */
    toPublicJSON() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.full_name,
            role: this.role,
            bio: this.bio,
            avatarUrl: this.avatar_url,
            isVerified: this.is_verified,
            createdAt: this.created_at,
        };
    }
}

// Définition du schéma
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password_hash: {
            types: DataTypes.STRING(255),
            allowNull: false,
        },
        full_name:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('USER', 'ORGANIZER', 'ADMIN'),
            defaultValue: 'USER',
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        avatar_url: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        is_verified:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verification_token: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        reset_password_token: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        reset_password_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestampes: true,
        underscored: true,
        // Index pour optimiser les recherches
        indexes: [
            {fields: ['email'], unique: true},
            {fields: ['role']},
            {fields: ['is_verified']},
        
        ],
    }
);

export default User;

javascriptimport { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Evnent extends Model {
  /**
   * Vérifier si l'événement est gratuit
   */
  isFree() {
    return parseFloat(this.price) === 0;
  }

  /**
   * Vérifier s'il reste de la place
   */
  hasCapacity() {
    return this.current_participant < this.capacity;
  }

  /**
   *  Vérifier si l'événement est publié
   */
  isPublished () {
    return this.status === 'PUBLISHED';
  }

  /**
   * Convertir en JSON public
   */
    toPublicJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            location: this.location,
            startDatetime: this.start_datetime,
            endDatetime: this.end_datetime,
            capacity: this.capacity,
            currentParticipant: this.current_participant,
            remainingSpots: this.getRemainingSpots(),
            price: this.price,
            currency: this.currency,
            status: this.status,
            imageUrl: this.image_url,
            organizerId: this.organizer_id,
            createdAt: this.created_at,
            updateAt: this.update_at,
        };
    }
}

Event.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        organizer_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key:'id',
            },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        location: {
            types: DataTypes.STRING(500),
            allowNull: true,
        },
        start_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_datetime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100,
            validate: {
                min: 1,
            },
        },
        current_paticipants: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
        }

    }
)
        }
        }
        }
        }
        }
        }

    }
)