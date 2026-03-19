import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Créer une instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// INTERCEPTEUR DE REQUÊTE
// Ajoute automatiquement le token d'authentification
// ==========================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// INTERCEPTEUR DE RÉPONSE
// Gère le refresh automatique du token
// ==========================================
api.interceptors.response.use(
  // Succès : retourner la réponse telle quelle
  (response) => response,
  
  // Erreur : gérer les cas spéciaux
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et qu'on n'a pas encore réessayé
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          // Tenter de rafraîchir le token
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Stocker les nouveaux tokens
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Échec du refresh : déconnecter l'utilisateur
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;