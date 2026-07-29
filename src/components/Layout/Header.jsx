import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, User, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-[#1a1a2e]/80 backdrop-blur-xl border-b border-gray-700/50 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold text-lg">EpanChat</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari percakapan..."
              className="w-full bg-gray-700/30 text-white rounded-xl pl-10 pr-4 py-2 border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl hover:bg-gray-700/30 transition text-gray-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-700/30 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a2e] rounded-xl border border-gray-700/50 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="p-3 border-b border-gray-700/50">
                  <p className="text-sm text-white font-medium">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 transition"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => {
                      navigate('/plans');
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 transition"
                  >
                    Langganan
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/30 transition"
                  >
                    Pengaturan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
