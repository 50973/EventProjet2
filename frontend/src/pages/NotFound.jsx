import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold gradient-text mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Page non trouvée
        </h2>
        <p className="text-neutral-400 mb-8 max-w-md">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <HomeIcon className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;