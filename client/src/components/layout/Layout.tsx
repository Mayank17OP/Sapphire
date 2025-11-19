import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { ParticlesBackground } from '../ui/ParticlesBackground';
import { CustomCursor } from '../ui/CustomCursor';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0F1A30] text-white selection:bg-cyan-500/30">
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      
      <main className="pt-20 pb-12 min-h-screen flex flex-col relative z-10">
        {children}
      </main>
      
      <Toaster />
      
      <footer className="border-t border-white/5 py-8 bg-[#0F1A30]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>
            © 2025 Sapphire BurnoutGuard. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors clickable">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors clickable">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors clickable">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
