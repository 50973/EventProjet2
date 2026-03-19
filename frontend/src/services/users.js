import api from './api';

export const usersService = {
  /**
   * Récupérer le profil de l'utilisateur courant
   */
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  /**
   * Mettre à jour le profil
   * @param {Object} data - Données à modifier
   */
  updateProfile: async (data) => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },

  /**
   * Changer le mot de passe
   * @param {string} currentPassword - Mot de passe actuel
   * @param {string} newPassword - Nouveau mot de passe
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/me/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Récupérer mes inscriptions
   * @param {Object} params - Paramètres de pagination
   */
  getInscriptions: async (params = {}) => {
    const response = await api.get('/users/me/inscriptions', { params });
    return response.data;
  },

  /**
   * Annuler une inscription
   * @param {string} inscriptionId - ID de l'inscription
   */
  cancelInscription: async (inscriptionId) => {
    const response = await api.patch(`/inscriptions/${inscriptionId}/cancel`);
    return response.data;
  },
};

export default usersService;