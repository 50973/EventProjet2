import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardOrganizer() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard Organisateur</h1>
      <p className="text-gray-500 mb-8">Bonjour {user?.fullName}, gérez vos événements</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/events/create" className="bg-blue-600 text-white rounded-xl shadow p-6 hover:bg-blue-700 transition">
          <h2 className="text-xl font-semibold mb-2">Créer un événement</h2>
          <p className="text-blue-100 text-sm">Organisez un nouvel événement</p>
        </Link>
        <Link to="/events" className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Mes événements</h2>
          <p className="text-gray-500 text-sm">Gérez vos événements existants</p>
        </Link>
      </div>
    </div>
  );
}