import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Smile, Frown, Meh } from 'lucide-react';
import { useStore } from '@/lib/store';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi there! I'm Sapphire. How are you feeling today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addMoodEntry } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response Delay
    setTimeout(() => {
      const botResponses = [
        "I understand. Taking regular breaks can really help with that.",
        "Have you tried the breathing exercise in the Breaks tab?",
        "That sounds intense. Remember to drink water!",
        "I'm tracking your fatigue levels, and you're doing great so far.",
        "Let's focus on one thing at a time.",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMoodLog = (mood: string) => {
    addMoodEntry({
      date: new Date().toISOString(),
      mood,
    });
    
    const userMsg: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood}`,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Thanks for sharing. I've logged that in your history.",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 relative">
            <Bot className="w-6 h-6 text-cyan-400" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_5px_rgba(0,255,0,0.5)]"></span>
          </div>
          <div>
            <h2 className="font-bold text-white">Sapphire AI</h2>
            <p className="text-xs text-slate-400">Always here to listen</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.sender === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-sm' 
                  : 'bg-white/10 text-slate-200 rounded-tl-sm backdrop-blur-sm border border-white/5'
              }`}>
                <p>{msg.text}</p>
                <p className="text-[10px] opacity-50 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 rounded-2xl p-4 rounded-tl-sm border border-white/5 flex gap-2 items-center h-12">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/10 space-y-4">
          {/* Mood Quick Select */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { label: 'Great', icon: Smile, color: 'text-green-400', hover: 'hover:bg-green-500/20' },
              { label: 'Okay', icon: Meh, color: 'text-yellow-400', hover: 'hover:bg-yellow-500/20' },
              { label: 'Tired', icon: Frown, color: 'text-red-400', hover: 'hover:bg-red-500/20' },
            ].map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodLog(mood.label)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 transition-colors ${mood.hover} clickable`}
              >
                <mood.icon className={`w-4 h-4 ${mood.color}`} />
                <span className="text-sm text-slate-300">{mood.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
              data-testid="input-chat"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-4 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors clickable"
              data-testid="btn-send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
