import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import Container from './Container';

/**
 * Header Moderne - Style Stripe/Airbnb
 * - Navigation claire avec dropdowns
 * - CTA buttons bien visibles
 * - Mobile responsive
 * - Effet glassmorphism
 */
function Header() {
  const { user, isAuthenticated, isOrganizer, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Événements', href: '/events' },
    { name: 'Catégories', href: '/categories', dropdown: ['Musique', 'Sport', 'Arts', 'Business'] },
    { name: 'Comment ça marche', href: '/how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/10 hover-lift">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo & Navigation Gauche */}
          <div className="flex items-center gap-8">
            {/* Logo Ultra-Moderne */}
            <Link
              to="/"
              className="flex items-center gap-3 group hover-lift"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-emerald-500/25">
                <CalendarIcon className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <span className="text-xl font-bold gradient-text-animated group-hover:scale-105 transition-transform">
                OneLastEvent
              </span>
            </Link>

            {/* Navigation Desktop avec effets avancés */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <div key={link.name} className="relative">
                  <button
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                    onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 hover-glow fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </button>

                  {/* Dropdown Menu Ultra-Moderne */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 glass-strong border border-white/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in scale-in">
                      {link.dropdown.map((item, itemIndex) => (
                        <Link
                          key={item}
                          to={`/events?category=${item.toLowerCase()}`}
                          className="block px-5 py-3 text-sm text-neutral-300 hover:text-white hover:bg-emerald-500/10 transition-all duration-200 border-b border-white/5 last:border-b-0 hover:border-emerald-500/20"
                          style={{ animationDelay: `${itemIndex * 50}ms` }}
                        >
                          <span className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-60"></div>
                            {item}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions Droite */}
          <div className="flex items-center gap-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Bouton Créer */}
                  {isOrganizer && (
                    <Link
                      to="/events/create"
                      className="btn-primary btn-sm flex items-center gap-2"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Créer</span>
                    </Link>
                  )}

                  {/* Menu Utilisateur */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-800 transition-colors">
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.fullName}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-neutral-700"
                        />
                      ) : (
                        <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                      )}
                      <span className="text-sm text-neutral-300 hidden lg:block">{user?.fullName}</span>
                      <ChevronDownIcon className="w-4 h-4 text-neutral-500 hidden lg:block" />
                    </Menu.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden p-2">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                                active ? 'bg-neutral-800' : ''
                              }`}
                            >
                              <UserCircleIcon className="w-5 h-5" />
                              Profil
                            </Link>
                          )}
                        </Menu.Item>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                                active ? 'bg-neutral-800' : ''
                              }`}
                            >
                              <CalendarIcon className="w-5 h-5" />
                              Mes réservations
                            </Link>
                          )}
                        </Menu.Item>

                        {isOrganizer && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/organizer"
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                                  active ? 'bg-neutral-800' : ''
                                }`}
                              >
                                <CalendarIcon className="w-5 h-5" />
                                Dashboard organisateur
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        <div className="border-t border-neutral-800 my-2" />

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 ${
                                active ? 'bg-neutral-800' : ''
                              }`}
                            >
                              <ArrowRightOnRectangleIcon className="w-5 h-5" />
                              Déconnexion
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost btn-sm">
                    Connexion
                  </Link>
                  <Link to="/register" className="btn-primary btn-sm">
                    S'inscrire
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800 py-4 animate-slide-down">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-neutral-800">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg"
                    >
                      Profil
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg"
                    >
                      Mes réservations
                    </Link>
                    {isOrganizer && (
                      <>
                        <Link
                          to="/organizer"
                          className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg"
                        >
                          Dashboard organisateur
                        </Link>
                        <Link
                          to="/events/create"
                          className="block px-4 py-2 btn-primary text-center"
                        >
                          Créer un événement
                        </Link>
                      </>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-red-400 hover:bg-neutral-800 rounded-lg"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" className="btn-ghost btn-sm">
                      Connexion
                    </Link>
                    <Link to="/register" className="btn-primary btn-sm">
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
