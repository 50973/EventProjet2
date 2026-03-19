import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

// Créer le Context
const AuthContext = createContext(null);

/**
 * Provider d'authentification
 * Enveloppe l'application et fournit l'état d'auth
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ==========================================
  // INITIALISATION - Vérifier la session existante
  // ==========================================
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        try {
          // Tenter de récupérer l'utilisateur courant
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          // Si le token est expiré, essayer de le rafraîchir
          try {
            const refreshResponse = await api.post('/auth/refresh', { refreshToken });
            localStorage.setItem('accessToken', refreshResponse.data.accessToken);
            localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
            
            // Réessayer de récupérer l'utilisateur
            const response = await api.get('/auth/me');
            setUser(response.data.user);
          } catch {
            // Échec total : nettoyer les tokens
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // ==========================================
  // CONNEXION
  // ==========================================
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, accessToken, refreshToken } = response.data;

      // Stocker les tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Mettre à jour l'état
      setUser(user);

      toast.success(`Bienvenue, ${user.fullName} !`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Échec de la connexion';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // ==========================================
  // INSCRIPTION
  // ==========================================
  const register = useCallback(async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);

      toast.success('Inscription réussie ! Bienvenue sur OneLastEvent !');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Échec de l\'inscription';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // ==========================================
  // DÉCONNEXION
  // ==========================================
  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch {
      // Ignorer les erreurs de logout
    } finally {
      // Toujours nettoyer côté client
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      toast.success('Déconnexion réussie');
      navigate('/');
    }
  }, [navigate]);

  // ==========================================
  // MISE À JOUR LOCALE DE L'UTILISATEUR
  // ==========================================
  const updateUser = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  // Valeur du Context
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isOrganizer: user?.role === 'ORGANIZER' || user?.role === 'ADMIN',
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au Context d'auth
 * @returns {Object} État et actions d'authentification
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;