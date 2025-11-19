import { motion } from 'framer-motion';

export const Chat = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative">
        <iframe
          src="https://drownie.zapier.app/chat"
          className="w-full h-full border-0"
          title="Sapphire AI Chat"
          allow="clipboard-read; clipboard-write; microphone"
        />
      </div>
    </div>
  );
};
