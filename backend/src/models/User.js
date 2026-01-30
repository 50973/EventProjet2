import { DataTypes, Model} from 'sequelize'; 
import sequelize from '../config/db.js';

class User extends Model {
    /**
     * Vérifier si l'utilisateur a un rôle spécifique
     * @param {string} role - Rôle à vérifier
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
        return this.role === 'ADMIN';
    }

    /**
     * Vérifier si l'utilisateur est organisateur
     * @returns {boolean}
     */
    isOrganizer() {
        return this.role === 'ORGANIZER' || this.role === 'ADMIN';
    }

    /**
     * Retourner les données publiques (sans mot de passe)
     * @returns {objet}
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
