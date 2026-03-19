import { Link } from 'react-router-dom';

/**
 * Container réutilisable pour centrer le contenu
 * Style: max-w-7xl mx-auto px-4
 */
function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
