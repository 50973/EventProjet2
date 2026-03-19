import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Payment extends Model {
  isCompleted() {
    return this.status === 'COMPLETED';
  }

  isPending() {
    return this.status === 'PENDING';
  }
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true, // necessary for ON DELETE SET NULL foreign key behavior
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    inscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'EUR',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
      defaultValue: 'PENDING',
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stripe_payment_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['inscription_id'] },
      { fields: ['status'] },
    ],
  }
);

export default Payment;
