import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

// Lazy loading des pages pour optimiser le chargement
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const EventList = lazy(() => import('./pages/EventList'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const DashboardUser = lazy(() => import('./pages/DashboardUser'));
const DashboardOrganizer = lazy(() => import('./pages/DashboardOrganizer'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-body">
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Routes publiques */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:id" element={<EventDetails />} />

            {/* Routes protégées - tout utilisateur authentifié */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<DashboardUser />} />
            </Route>

            {/* Routes protégées - organisateurs uniquement */}
            <Route element={<ProtectedRoute roles={['ORGANIZER', 'ADMIN']} />}>
              <Route path="organizer" element={<DashboardOrganizer />} />
              <Route path="events/create" element={<CreateEvent />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;