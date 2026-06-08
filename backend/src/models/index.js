
import sequelize from '../config/db.js';
import User from './User.js';
import Event from './Event.js';
import Inscription from './Inscription.js';
import Payment from './Payment.js';
import RefreshToken from './RefreshToken.js';
import Category from './Category.js';

// ========================================
// DÉFINITION DES ASSOCIATIONS
// ========================================

// User → Events (Un utilisateur organise plusieurs événements)
User.hasMany(Event, {
  foreignKey: 'organizer_id',
  as: 'organizedEvents',
});
Event.belongsTo(User, {
  foreignKey: 'organizer_id',
  as: 'organizer',
});

// User → Inscriptions
User.hasMany(Inscription, {
  foreignKey: 'user_id',
  as: 'inscriptions',
});
Inscription.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Event → Inscriptions
Event.hasMany(Inscription, {
  foreignKey: 'event_id',
  as: 'inscriptions',
});
Inscription.belongsTo(Event, {
  foreignKey: 'event_id',
  as: 'event',
});

// User → Payments
User.hasMany(Payment, {
  foreignKey: 'user_id',
  as: 'payments',
});
Payment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

// Event → Payments
Event.hasMany(Payment, {
  foreignKey: 'event_id',
  as: 'payments',
});
Payment.belongsTo(Event, {
  foreignKey: 'event_id',
  as: 'event',
});

// Inscription → Payment (One-to-One)
Inscription.hasOne(Payment, {
  foreignKey: 'inscription_id',
  as: 'payment',
});
Payment.belongsTo(Inscription, {
  foreignKey: 'inscription_id',
  as: 'inscription',
});

// User → RefreshTokens
User.hasMany(RefreshToken, {
  foreignKey: 'user_id',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Category.hasMany(Event, {
  foreignKey: 'category_id',
  as: 'events',
  onDelete: 'SET NULL',
});
Event.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

// Many-to-Many : User participe à Events via Inscriptions
User.belongsToMany(Event, {
  through: Inscription,
  foreignKey: 'user_id',
  otherKey: 'event_id',
  as: 'participatingEvents',
});
Event.belongsToMany(User, {
  through: Inscription,
  foreignKey: 'event_id',
  otherKey: 'user_id',
  as: 'participants',
});

// Export
export {
  sequelize,
  User,
  Event,
  Inscription,
  Payment,
  RefreshToken,
  Category,
};

export default {
  sequelize,
  User,
  Event,
  Inscription,
  Payment,
  RefreshToken,
  Category,
};
