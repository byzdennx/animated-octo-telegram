import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/firebase';
import { User, Mail, Calendar, Edit2, Save, X, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    preferences: {
      theme: 'dark',
      language: 'id'
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        bio: user.bio || 'Pengguna EpanChat',
        preferences: user.preferences || { theme: 'dark', language: 'id' }
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui profil');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logout berhasil');
    } catch (error) {
      toast.error('Gagal logout');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Profil</h1>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition text-gray-300"
          >
            Kembali ke Chat
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-4 border-[#1a1a2e]">
                <span className="text-3xl font-bold text-white">
                  {formData.displayName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-16 p-8">
            {isEditing ? (
              // Edit Mode
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 border border-white/10 focus:border-blue-500/50 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Bahasa
                  </label>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, language: e.target.value}
                    })}
                    className="w-full bg-white/5 text-white rounded-lg px-4 py-2.5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
                  >
                    <option value="id">Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl transition text-white"
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition text-gray-300"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {formData.displayName}
                  </h2>
                  <p className="text-gray-400 mt-1">{formData.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm text-white">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Bergabung</p>
                      <p className="text-sm text-white">
                        {user?.metadata?.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString('id-ID')
                          : 'Baru-baru ini'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition text-blue-400"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Status Langganan</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Paket saat ini</p>
              <p className="text-white font-medium">Gratis</p>
            </div>
            <button
              onClick={() => navigate('/plans')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl transition text-white text-sm"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
