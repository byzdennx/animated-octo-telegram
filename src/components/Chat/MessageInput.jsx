import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Smile } from 'lucide-react';

const MessageInput = ({ onSend, loading, placeholder = "Tanyakan sesuatu..." }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSend(message.trim());
      setMessage('');
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-gray-700/30 text-white rounded-2xl px-4 py-3 pr-12 border border-gray-600/50 focus:border-blue-500/50 focus:outline-none transition resize-none placeholder-gray-400"
          style={{ minHeight: '52px', maxHeight: '120px' }}
          disabled={loading}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-600/30 transition"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-600/30 transition"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!message.trim() || loading}
        className={`p-3 rounded-2xl transition flex items-center justify-center min-w-[52px] ${
          message.trim() && !loading
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
            : 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
