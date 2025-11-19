import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Play, Pause, Zap, Eye, Activity, AlertTriangle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { WebcamDemo } from '@/components/ui/WebcamDemo';
import { FatigueMeter } from '@/components/ui/FatigueMeter';
import { Link } from 'react-router-dom';

const generateMockData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    time: i,
    energy: 80 + Math.random() * 15 - Math.random() * 10,
    focus: 70 + Math.random() * 20 - Math.random() * 5,
  }));
};

export const Dashboard = () => {
  const { fatigueMetrics, isDetectionRunning } = useStore();
  const [chartData, setChartData] = useState(generateMockData(20));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setChartData(prev => {
        const newTime = prev[prev.length - 1].time + 1;
        const newPoint = {
          time: newTime,
          energy: Math.max(20, Math.min(100, prev[prev.length - 1].energy + (Math.random() * 10 - 5))),
          focus: Math.max(20, Math.min(100, prev[prev.length - 1].focus + (Math.random() * 10 - 5))),
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const metrics = [
    { label: 'Eye Closure', value: `${Math.round(fatigueMetrics.eyeClosure)}%`, icon: Eye, color: 'text-cyan-400' },
    { label: 'Yawn Count', value: fatigueMetrics.yawnCount, icon: Activity, color: 'text-purple-400' },
    { label: 'Posture', value: fatigueMetrics.postureStatus, icon: Zap, color: fatigueMetrics.postureStatus === 'Good' ? 'text-green-400' : 'text-red-400' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Focus Dashboard</h1>
          <p className="text-slate-400">Real-time fatigue monitoring & analytics</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 clickable"
          >
            {isPaused ? <Play className="w-5 h-5 text-green-400" /> : <Pause className="w-5 h-5 text-yellow-400" />}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Graph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl h-[400px]"
          >
            <h3 className="text-lg font-semibold mb-6">Focus Energy Trend</h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B19FFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#B19FFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="rgba(255,255,255,0.3)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1A30', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="energy" stroke="#00F5FF" fillOpacity={1} fill="url(#colorEnergy)" strokeWidth={2} />
                <Area type="monotone" dataKey="focus" stroke="#B19FFF" fillOpacity={1} fill="url(#colorFocus)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Break Recommendations */}
          {fatigueMetrics.focusScore < 60 && (
             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-red-500/20 text-red-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white">High Fatigue Detected</h4>
                  <p className="text-sm text-slate-300">Your focus levels are dropping. Time for a intervention?</p>
                </div>
              </div>
              <Link to="/breaks" className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors clickable">
                Take a Break
              </Link>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Webcam Feed */}
          <WebcamDemo />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/5 ${metric.color}`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-300 font-medium">{metric.label}</span>
                </div>
                <span className="text-xl font-bold text-white">{metric.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Overall Score */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="font-semibold text-slate-400">Real-time Focus Score</h3>
            <FatigueMeter level={fatigueMetrics.focusScore} />
          </div>
        </div>
      </div>
    </div>
  );
};
