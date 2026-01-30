import { DataTypess, Model} from 'sequelize';
import sequelize from '../config/dbjs';

class Inscription extends Model {
    isConfirmed() {
        return this.status === 'CONFIRMED';
    }

    isPending() {
        return this.status === 'PENDING';
    }

    toPublicJSON() {
        return {
            id: this.id,
            eventId: this.event_id,
            userId: this.user_id,
            status: this.status,
            notes: this.notes,
            created
        };
    }
}

Inscription.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        event_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'events',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'CONFIRMED',
                'CANCELLED'),
                defaultValue: 'PENDING',
                allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Inscription',
        tableName: 'inscriptions',
        underscored: true,
        timestamps: true,
        indexes: [
            { fields: ['event_id'] },
            { fields: ['user_id'] },
            { fields: ['status'] },
            { fields: ['event_id', 'user_id'], unique:
                true },
            ],
        }
);