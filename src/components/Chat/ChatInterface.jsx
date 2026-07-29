import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { chatAPI } from '../../services/api';
import { memory } from '../../utils/memoryManager';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load chat history from memory
    const saved = memory.get(`chat_${user?.uid}`);
    if (saved) {
      setMessages(saved);
    }
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(input, user.uid);
      
      const aiMessage = {
        role: 'assistant',
        content: response.message || response.text || 'Maaf, saya tidak bisa merespons.',
        timestamp: new Date()
      };
      
      const updatedMessages = [...messages, userMessage, aiMessage];
      setMessages(updatedMessages);
      
      // Save to memory
      memory.set(`chat_${user.uid}`, updatedMessages);
      
    } catch (error) {
      toast.error('Gagal mengirim pesan');
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#1a1a2e]/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <span className="text-white text-xl font-semibold">EpanChat</span>
          <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
            v1.0
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">{user?.email}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-blue-500/20 text-white border border-blue-500/30'
                : 'bg-gray-700/30 text-gray-200 border border-gray-600/30'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#1a1a2e]/80 backdrop-blur-xl border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Tanyakan sesuatu..."
            className="flex-1 bg-gray-700/30 text-white rounded-xl px-4 py-3 border border-gray-600/50 focus:outline-none focus:border-blue-500/50 transition"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl px-6 py-3 transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
