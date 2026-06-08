import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Category extends Model {
  toPublicJSON() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
    };
  }
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['name'], unique: true },
      { fields: ['slug'], unique: true },
    ],
  }
);

export default Category;
