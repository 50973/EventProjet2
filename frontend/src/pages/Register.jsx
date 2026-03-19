import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  // Validation du mot de passe
  const passwordRequirements = [
    { label: 'Au moins 8 caractères', test: (p) => p.length >= 8 },
    { label: 'Une majuscule', test: (p) => /[A-Z]/.test(p) },
    { label: 'Une minuscule', test: (p) => /[a-z]/.test(p) },
    { label: 'Un chiffre', test: (p) => /\d/.test(p) },
    { label: 'Un caractère spécial', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Le nom doit faire au moins 2 caractères';
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!passwordRequirements.every((req) => req.test(formData.password))) {
      newErrors.password = 'Le mot de passe ne respecte pas les critères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
    setLoading(false);

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Créer un compte
          </h1>
          <p className="text-neutral-400">
            Rejoignez OneLastEvent gratuitement
          </p>
        </div>

        {/* Formulaire */}
        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom complet */}
            <div>
              <label htmlFor="fullName" className="label">
                Nom complet
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`input ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Jean Dupont"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="vous@exemple.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Indicateurs de force du mot de passe */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckIcon
                      className={`w-4 h-4 ${
                        req.test(formData.password)
                          ? 'text-green-500'
                          : 'text-neutral-600'
                      }`}
                    />
                    <span
                      className={
                        req.test(formData.password)
                          ? 'text-green-500'
                          : 'text-neutral-500'
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="label">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Choix du rôle */}
            <div>
              <label className="label">Je souhaite</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: 'USER' }))}
                  className={`p-3 rounded-xl border text-sm transition-all ${
                    formData.role === 'USER'
                      ? 'border-primary-500 bg-primary-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  Participer à des événements
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: 'ORGANIZER' }))}
                  className={`p-3 rounded-xl border text-sm transition-all ${
                    formData.role === 'ORGANIZER'
                      ? 'border-primary-500 bg-primary-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  Organiser des événements
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          {/* Lien vers connexion */}
          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              Déjà un compte ?{' '}
              <Link to="/login" className="link">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;