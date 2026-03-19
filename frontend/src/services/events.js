import api from './api';

export const eventsService = {
  /**
   * Récupérer la liste des événements
   * @param {Object} params - Paramètres de filtrage/pagination
   */
  getEvents: async (params = {}) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  /**
   * Récupérer un événement par ID
   * @param {string} id - ID de l'événement
   */
  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  /**
   * Créer un événement
   * @param {Object} eventData - Données de l'événement
   */
  createEvent: async (eventData) => {
    // Utiliser FormData pour supporter l'upload d'image
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await api.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Mettre à jour un événement
   * @param {string} id - ID de l'événement
   * @param {Object} eventData - Données à modifier
   */
  updateEvent: async (id, eventData) => {
    const response = await api.patch(`/events/${id}`, eventData);
    return response.data;
  },

  /**
   * Supprimer un événement
   * @param {string} id - ID de l'événement
   */
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  /**
   * Publier un événement
   * @param {string} id - ID de l'événement
   */
  publishEvent: async (id) => {
    const response = await api.post(`/events/${id}/publish`);
    return response.data;
  },

  /**
   * Récupérer mes événements (organisateur)
   * @param {Object} params - Paramètres de pagination
   */
  getMyEvents: async (params = {}) => {
    const response = await api.get('/events/my-events', { params });
    return response.data;
  },

  /**
   * S'inscrire à un événement
   * @param {string} eventId - ID de l'événement
   */
  registerForEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/inscriptions`);
    return response.data;
  },
};

export default eventsService;