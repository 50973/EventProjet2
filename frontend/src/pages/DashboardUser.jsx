import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardUser() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Bonjour, {user?.fullName} 👋</h1>
      <p className="text-gray-500 mb-8">Bienvenue sur votre tableau de bord</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/events" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Explorer les événements</h2>
          <p className="text-gray-500 text-sm">Découvrez les événements disponibles</p>
        </Link>
        <Link to="/profile" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Mon profil</h2>
          <p className="text-gray-500 text-sm">Gérez vos informations personnelles</p>
        </Link>
      </div>
    </div>
  );
}