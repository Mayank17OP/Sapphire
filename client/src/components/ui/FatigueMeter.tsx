import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FatigueMeterProps {
  level: number; // 0 to 100
  className?: string;
}

export const FatigueMeter = ({ level, className }: FatigueMeterProps) => {
  // Determine color based on fatigue level
  // Low (0-30) -> Cyan (Good)
  // Medium (31-70) -> Lavender (Warning)
  // High (71-100) -> Red/Pink (Danger)
  
  const getColor = (lvl: number) => {
    if (lvl < 30) return 'text-cyan-400';
    if (lvl < 70) return 'text-lavender-400';
    return 'text-red-400';
  };

  const getStrokeColor = (lvl: number) => {
    if (lvl < 30) return '#00F5FF';
    if (lvl < 70) return '#B19FFF';
    return '#FF4D4D';
  };

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)}>
      <div className="relative w-40 h-40">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke={getStrokeColor(level)}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 440" }}
            animate={{ 
              strokeDasharray: `${(level / 100) * 440} 440`
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={cn("text-4xl font-bold tabular-nums", getColor(level))}
            key={level}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {Math.round(level)}%
          </motion.span>
          <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">Fatigue</span>
        </div>
      </div>
      
      {/* Animated Pulse Ring if High Fatigue */}
      {level > 70 && (
        <div className="absolute inset-0 rounded-full animate-ping bg-red-500/20 -z-10 pointer-events-none" />
      )}
    </div>
  );
};
