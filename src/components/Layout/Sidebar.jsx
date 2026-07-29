import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, User, CreditCard, Settings, LogOut, Sparkles } from 'lucide-react';
import { logout } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: User, label: 'Profil', path: '/profile' },
    { icon: CreditCard, label: 'Langganan', path: '/plans' },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
  ];

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
    <div className="w-20 bg-[#1a1a2e]/80 backdrop-blur-xl border-r border-gray-700/50 flex flex-col items-center py-6 h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`p-3 rounded-xl transition relative group ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/20 transition"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Sidebar;
