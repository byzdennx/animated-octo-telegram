import React, { useState, useEffect } from 'react';
import { History, Trash2, MessageSquare, Clock, Search } from 'lucide-react';
import { memory } from '../../utils/memoryManager';
import { useAuth } from '../../hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const ChatHistory = ({ onSelectChat, selectedId }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadChats();
  }, [user]);

  const loadChats = () => {
    // Get all chat histories from memory
    const allChats = [];
    const keys = [...memory.memory.keys()];
    
    keys.forEach(key => {
      if (key.startsWith(`chat_${user?.uid}_`)) {
        const data = memory.get(key);
        if (data && data.length > 0) {
          const chatId = key.replace(`chat_${user?.uid}_`, '');
          allChats.push({
            id: chatId,
            messages: data,
            preview: data[0]?.content?.slice(0, 50) || 'Percakapan baru',
            timestamp: data[data.length - 1]?.timestamp || new Date(),
            count: data.length
          });
        }
      }
    });
    
    setChats(allChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const deleteChat = (chatId) => {
    memory.delete(`chat_${user?.uid}_${chatId}`);
    loadChats();
    if (selectedId === chatId) {
      onSelectChat(null);
    }
  };

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });
    } catch {
      return 'Baru saja';
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition border border-gray-600/30"
      >
        <History className="w-4 h-4" />
        <span className="text-sm">Riwayat</span>
        <span className="text-xs bg-gray-600/30 px-2 py-0.5 rounded-full">
          {chats.length}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-[#1a1a2e] rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari percakapan..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Belum ada riwayat percakapan</p>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 hover:bg-gray-700/20 cursor-pointer transition border-b border-gray-700/30 ${
                    selectedId === chat.id ? 'bg-blue-500/10' : ''
                  }`}
                  onClick={() => {
                    onSelectChat(chat);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {chat.preview}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {formatTime(chat.timestamp)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {chat.count} pesan
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-700/50">
            <button
              onClick={() => {
                if (filteredChats.length > 0) {
                  const confirm = window.confirm('Hapus semua riwayat?');
                  if (confirm) {
                    filteredChats.forEach(chat => deleteChat(chat.id));
                  }
                }
              }}
              className="w-full text-center text-sm text-red-400 hover:text-red-300 transition py-1"
            >
              Hapus semua riwayat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
