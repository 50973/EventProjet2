import { DataTypes, Model} from 'sequelize'; 
import sequelize from '../congig/db.js';

class Event extends Model {
    /**
     * Vérifier si l'événement est gratuit 
     */
    isFree() {
        return parseFloat(this.price) === 0;
    }

    /**
     * vérifier s'il reste de la place
     */
    hasCapacity() {
        return this.cerrent_participants < this.capacity;
    }

   /**
    * Vérifier si l'événement est publié
    */
   isPublished() {
    return this.status === 'PUBLISHED';
   }

   /**
    * Obtenir le nombre de places restantes
    */
   getRemainingSpots() {
    return Math.max(0, this.capacity - this.
        current_participants)
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
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            defaultValue: 'EUR',
        },
        status: {
      type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'CANCELLED'),
      defaultValue: 'DRAFT',
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['organizer_id'] },
      { fields: ['status'] },
      { fields: ['start_datetime'] },
      { fields: ['price'] },
    ],
 }
);
}