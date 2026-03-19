import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12; // Plus c'est élevé, plus c'est sécurisé (mais lent)

/**
 * Hasher un mot de passe
 * @param {string} password - Mot de passe en clair
 * @returns {Promise<string>} - Hash du mot de passe
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Comparer un mot de passe avec son hash
 * @param {string} password - Mot de passe en clair
 * @param {string} hash - Hash stocké
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  comparePassword,
};