import { MessageSquare, ExternalLink, Maximize2 } from 'lucide-react';

export const Chat = () => {
  const openChatPopup = () => {
    const width = 500;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      'https://drownie.zapier.app/chat',
      'SapphireChat',
      `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars,status=1`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <div className="max-w-lg w-full glass-panel rounded-2xl p-8 text-center space-y-6 relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          <MessageSquare className="w-10 h-10 text-cyan-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Sapphire AI Chat</h2>
          <p className="text-slate-300 leading-relaxed">
            Your personal mental wellness companion is ready to help.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-sm text-slate-400">
          <p>Due to security restrictions, the chat opens in a dedicated secure window.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={openChatPopup}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:scale-[1.02] transition-all clickable group"
          >
            <Maximize2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            Open Chat Window
          </button>
          
          <p className="text-xs text-slate-500 mt-2">
            If the window doesn't appear, please allow pop-ups for this site.
          </p>
        </div>
      </div>
    </div>
  );
};
