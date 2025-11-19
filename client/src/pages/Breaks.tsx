import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Wind, Timer, Eye, Dumbbell, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Components for specific interventions
const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2'>('inhale');
  
  useEffect(() => {
    if (!isActive) return;
    
    const cycle = [
      { phase: 'inhale', duration: 4000 },
      { phase: 'hold', duration: 4000 },
      { phase: 'exhale', duration: 4000 },
      { phase: 'hold2', duration: 4000 },
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cycle.length;
      setPhase(cycle[currentIndex].phase as any);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 1 : 1.5,
            rotate: isActive ? 360 : 0,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-md"
        >
          <span className="text-xl font-bold text-white capitalize">{isActive ? phase : "Ready"}</span>
        </motion.div>
        {/* Expanding rings */}
        <motion.div
          animate={{
            scale: phase === 'inhale' ? 1.8 : phase === 'exhale' ? 0.8 : 1.8,
            opacity: phase === 'inhale' ? 0 : 0.5,
          }}
          transition={{ duration: 4, ease: "easeOut", repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-cyan-400/20 -z-10"
        />
      </div>
      
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-6 py-2 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30 transition-all clickable"
      >
        {isActive ? "Stop Exercise" : "Start Breathing"}
      </button>
    </div>
  );
};

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="text-6xl font-mono font-bold text-white mb-8 tracking-wider tabular-nums">
        {formatTime(time)}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all clickable"
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={() => { setIsActive(false); setTime(25 * 60); }}
          className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all clickable"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export const Breaks = () => {
  const [activeTab, setActiveTab] = useState<'breathing' | '202020' | 'stretch' | 'focus'>('breathing');

  const tabs = [
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: '202020', label: '20-20-20', icon: Eye },
    { id: 'stretch', label: 'Stretch', icon: Dumbbell },
    { id: 'focus', label: 'Focus Timer', icon: Timer },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Interventions</h1>
        <p className="text-slate-400">Scientifically proven methods to restore your mental energy.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "p-4 rounded-xl border transition-all flex flex-col items-center gap-2 clickable",
                activeTab === tab.id 
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.2)]" 
                  : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              <tab.icon className="w-6 h-6" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'breathing' && (
                <div className="text-center h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Box Breathing</h2>
                    <p className="text-slate-400">Inhale for 4s, Hold for 4s, Exhale for 4s, Hold for 4s.</p>
                  </div>
                  <BreathingExercise />
                </div>
              )}

              {activeTab === 'focus' && (
                <div className="text-center h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Focus Session</h2>
                    <p className="text-slate-400">25 minutes of deep work followed by a 5 minute break.</p>
                  </div>
                  <PomodoroTimer />
                </div>
              )}

              {activeTab === '202020' && (
                <div className="text-center h-full flex flex-col justify-center items-center space-y-8">
                  <div className="p-6 rounded-full bg-purple-500/20 text-purple-400 mb-4">
                    <Eye className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">The 20-20-20 Rule</h2>
                    <p className="text-slate-300 max-w-md mx-auto leading-relaxed">
                      Every <span className="text-cyan-400 font-bold">20 minutes</span>, look at something <span className="text-cyan-400 font-bold">20 feet away</span> for at least <span className="text-cyan-400 font-bold">20 seconds</span>.
                    </p>
                  </div>
                  <button className="px-8 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all clickable">
                    Start 20min Timer
                  </button>
                </div>
              )}
              
              {activeTab === 'stretch' && (
                <div className="text-center h-full flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold mb-8">Quick Relief Stretches</h2>
                  <div className="grid md:grid-cols-3 gap-6 w-full">
                     {[
                       { title: "Neck Roll", time: "30s" },
                       { title: "Shoulder Shrug", time: "30s" },
                       { title: "Wrist Flex", time: "45s" }
                     ].map((stretch, i) => (
                       <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all group">
                         <div className="w-12 h-12 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                           <Dumbbell className="w-6 h-6" />
                         </div>
                         <h3 className="font-bold text-white">{stretch.title}</h3>
                         <span className="text-xs text-slate-400">{stretch.time}</span>
                       </div>
                     ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
