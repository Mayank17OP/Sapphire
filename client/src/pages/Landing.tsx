import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, Zap, Download } from 'lucide-react';
import { WebcamDemo } from '@/components/ui/WebcamDemo';
import { FatigueMeter } from '@/components/ui/FatigueMeter';
import { useStore } from '@/lib/store';

export const Landing = () => {
  const { fatigueMetrics } = useStore();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-cyan-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AI-Powered Burnout Prevention
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">Burnout</span> <br />
              Before It Starts.
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sapphire uses computer vision to detect early signs of digital fatigue, reminding you to take smarter breaks exactly when you need them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2 clickable group">
                Try Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2 clickable">
                <Download className="w-4 h-4" />
                Download for Mac
              </button>
            </div>
          </motion.div>

          {/* Right Demo Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-2xl -z-10" />
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <WebcamDemo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 bg-black/20 rounded-xl p-6">
                  <h3 className="text-slate-400 font-medium uppercase tracking-wider text-xs">Current Status</h3>
                  <FatigueMeter level={fatigueMetrics.focusScore} />
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-bold text-white">{fatigueMetrics.focusScore > 70 ? "High Focus" : "Fatigue Detected"}</p>
                    <p className="text-sm text-slate-400">Real-time analysis active</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Intelligent Protection</h2>
            <p className="text-slate-400">Sapphire runs quietly in the background, analyzing subtle cues to protect your mental energy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Smart Metrics",
                desc: "Tracks blink rate, posture, and yawn frequency to calculate your real-time energy levels."
              },
              {
                icon: Shield,
                title: "Privacy First",
                desc: "All processing happens locally on your device. No video feed ever leaves your computer."
              },
              {
                icon: Zap,
                title: "Micro-Interventions",
                desc: "Suggests scientific 20-second breaks to restore focus without breaking your flow."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:bg-white/5"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
