import { Link, useLocation } from 'react-router-dom';
import { Activity, MessageSquare, Coffee, Settings, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: Activity, label: 'Dashboard' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/breaks', icon: Coffee, label: 'Breaks' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0F1A30]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group clickable" data-testid="link-home">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Sapphire
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 clickable",
                  isActive 
                    ? "text-cyan-400 bg-white/5" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[0_0_10px_rgba(0,245,255,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle could go here - simplifying for desktop first as requested */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all clickable" data-testid="btn-download">
            Get App
          </button>
        </div>
      </div>
    </header>
  );
};
