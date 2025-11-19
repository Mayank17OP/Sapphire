import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink } from 'lucide-react';

export const Chat = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <div className="max-w-lg w-full glass-panel rounded-2xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-10 h-10 text-cyan-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white">Sapphire AI Chat</h2>
        <p className="text-slate-300">
          Connect with our AI assistant to discuss your mental wellness, get tips for reducing burnout, or just to chat.
        </p>
        
        <a 
          href="https://drownie.zapier.app/chat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all clickable group"
        >
          Launch Chat Interface
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <p className="text-xs text-slate-500 mt-4">
          Opens in a new secure window
        </p>
      </div>
    </div>
  );
};
