import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * Composant de protection des routes
 * Redirige vers /login si non authentifié
 * Vérifie les rôles si spécifiés
 * 
 * @param {string[]} roles - Rôles autorisés (optionnel)
 */
function ProtectedRoute({ roles = [] }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Attendre le chargement initial
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Rediriger si non authentifié
  if (!isAuthenticated) {
    // Sauvegarder l'URL d'origine pour y revenir après login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (roles.length > 0 && user && !roles.includes(user.role)) {
    // Pas le bon rôle : rediriger vers l'accueil
    return <Navigate to="/" replace />;
  }

  // Tout est OK : afficher le contenu protégé
  return <Outlet />;
}

export default ProtectedRoute;