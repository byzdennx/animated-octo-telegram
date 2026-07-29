import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Settings, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    theme: 'dark',
    language: 'id',
    twoFactor: false
  });

  const handleSave = async () => {
    try {
      await updateProfile({ preferences: settings });
      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan pengaturan');
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Pengaturan</h3>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifikasi
          </h4>
          <label className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Notifikasi chat</span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Email update</span>
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={(e) => setSettings({...settings, emailUpdates: e.target.checked})}
              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Appearance */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Tampilan
          </h4>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({...settings, theme: e.target.value})}
            className="w-full bg-white/5 text-white rounded-lg px-4 py-2 border border-white/10 focus:border-blue-500/50 focus:outline-none"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">Sistem</option>
          </select>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Bahasa
          </h4>
          <select
            value={settings.language}
            onChange={(e) => setSettings({...settings, language: e.target.value})}
            className="w-full bg-white/5 text-white rounded-lg px-4 py-2 border border-white/10 focus:border-blue-500/50 focus:outline-none"
          >
            <option value="id">Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Security */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Keamanan
          </h4>
          <label className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Two-factor authentication</span>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={(e) => setSettings({...settings, twoFactor: e.target.checked})}
              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-xl transition text-white"
        >
          <Save className="w-4 h-4" />
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
