import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js'; // Assurez-vous d'importer le modèle User

class RefreshToken extends Model {
    isValid() {
        return !this.revoked && new Date(this.expires_at).getTime() > Date.now();
    }
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        token_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true, // si chaque token doit être unique
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_agent: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'RefreshToken',
        tableName: 'refresh_tokens',
        underscored: true,
        timestamps: true,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['token_hash'] },
            { fields: ['expires_at'] },
        ],
    }
);

// Association
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

export default RefreshToken;
