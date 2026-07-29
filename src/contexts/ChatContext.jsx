import React, { createContext, useState, useContext } from 'react';
import { chatAPI } from '../services/api';
import { memory } from '../utils/memoryManager';
import { useAuth } from '../hooks/useAuth';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim() || !user) return;

    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(text, user.uid);
      
      const aiMessage = {
        role: 'assistant',
        content: response.message || response.text || 'Maaf, saya tidak bisa merespons.',
        timestamp: new Date()
      };

      const updatedMessages = [...messages, userMessage, aiMessage];
      setMessages(updatedMessages);
      
      // Save to memory
      const chatId = currentChatId || Date.now().toString(36);
      memory.set(`chat_${user.uid}_${chatId}`, updatedMessages);
      setCurrentChatId(chatId);

      return aiMessage;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadChat = (chatId) => {
    const saved = memory.get(`chat_${user?.uid}_${chatId}`);
    if (saved) {
      setMessages(saved);
      setCurrentChatId(chatId);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      loading,
      currentChatId,
      sendMessage,
      loadChat,
      clearChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
