import React, { useRef, useEffect } from 'react';
import { User, Bot, Clock } from 'lucide-react';

const MessageList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Bot className="w-16 h-16 mb-4 text-blue-400/50" />
          <p className="text-lg font-medium">Mulai percakapan dengan AI</p>
          <p className="text-sm">Tanyakan apapun tentang EpanChat</p>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 animate-fadeIn ${
            msg.role === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            msg.role === 'user' 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : 'bg-gradient-to-br from-purple-500 to-pink-500'
          }`}>
            {msg.role === 'user' 
              ? <User className="w-5 h-5 text-white" /> 
              : <Bot className="w-5 h-5 text-white" />
            }
          </div>
          
          <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
            msg.role === 'user' 
              ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-white border border-blue-500/30'
              : 'bg-gradient-to-br from-gray-700/30 to-gray-800/30 text-gray-200 border border-gray-600/30'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="bg-gray-700/30 rounded-2xl px-4 py-3 border border-gray-600/30">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
