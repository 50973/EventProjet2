import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout Principal - Structure SaaS moderne
 * - Navbar sticky en haut
 * - Main content centré avec padding
 * - Footer en bas
 */
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      {/* Header/Navbar */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;