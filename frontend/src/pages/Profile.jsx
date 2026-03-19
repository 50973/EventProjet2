import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import usersService from '../services/users';

function Profile() {
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
  });

  const updateMutation = useMutation({
    mutationFn: usersService.updateProfile,
    onSuccess: (data) => {
      updateUser(data.user);
      toast.success('Profil mis à jour');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Erreur de mise à jour');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-display text-3xl font-bold text-white mb-8">
          Mon profil
        </h1>

        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Nom complet</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                className="input"
              />
            </div>

            <div>
              <label className="label">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(p => ({ ...p, bio: e.target.value }))}
                className="input min-h-[100px]"
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="btn-primary"
            >
              {updateMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;