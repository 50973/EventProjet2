// 1. Import du client HTTP axios (pour GET, POST, etc.)
import axios from 'axios';

// 2. Import du stockage local : on y enregistre le token après le login
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,           // Toutes les requêtes commenceront par cette URL
  headers: {
    'Content-Type': 'application/json',  // Le backend attend du JSON
  },
});

apiClient.interceptors.request.use(async (config) => {
  // 6. On récupère le token stocké au moment du login (clé "token")
  const token = await AsyncStorage.getItem('token');
  // 7. Si un token existe, on l'ajoute dans le header Authorization (exigé par le backend)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 8. On retourne la config modifiée pour que la requête parte avec le bon header
  return config;
});

// 9. On exporte l'instance pour l'utiliser dans les écrans et le contexte (ex: apiClient.get('/events'))
export default apiClient;