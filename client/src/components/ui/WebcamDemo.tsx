import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Eye, AlertCircle, Zap } from 'lucide-react';
import { useStore } from '@/lib/store';

export const WebcamDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const { isDetectionRunning, setDetectionRunning, updateFatigueMetrics } = useStore();
  
  // Mock simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDetectionRunning) {
      interval = setInterval(() => {
        // Simulate fluctuating metrics
        const randomEye = Math.random() * 100;
        const isBlinking = randomEye > 95; // Random blink
        const isYawning = Math.random() > 0.98; // Random yawn
        
        updateFatigueMetrics({
          eyeClosure: isBlinking ? 100 : Math.random() * 20,
          yawnCount: isYawning ? 1 : 0, // This would be additive in real app, but for mock updates just flagging it
          focusScore: Math.max(0, Math.min(100, 100 - (Math.random() * 10) + (Math.random() * 5))),
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isDetectionRunning, updateFatigueMetrics]);

  const handleStartDetection = () => {
    // Redirect to the standalone detection page
    window.location.href = '/detection.html';
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setDetectionRunning(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="glass-card rounded-2xl p-6 overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Camera className="w-5 h-5 text-cyan-400" />
          Live Detection
        </h3>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isDetectionRunning ? (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ACTIVE
              </motion.div>
            ) : (
               <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded"
              >
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                STANDBY
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10 mb-6">
        {stream ? (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-900/50">
            {permissionDenied ? (
              <div className="text-center p-4">
                <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="text-sm mb-2">Camera access denied.</p>
                <p className="text-xs text-slate-600">Running in simulation mode.</p>
              </div>
            ) : (
              <>
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye className="w-8 h-8 opacity-50" />
                  </div>
                </div>
                <p className="text-sm">Camera feed standby</p>
              </>
            )}
          </div>
        )}

        {/* Face Mesh Overlay Mockup */}
        {isDetectionRunning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border border-cyan-500/30 rounded-[3rem] opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan" />
            
            {/* Data points */}
            <div className="absolute top-4 left-4 space-y-1 font-mono text-[10px] text-cyan-400/80">
              <div className="flex gap-2"><span>EAR:</span> <span>{Math.random().toFixed(2)}</span></div>
              <div className="flex gap-2"><span>YAW:</span> <span>{Math.random().toFixed(1)}°</span></div>
              <div className="flex gap-2"><span>PIT:</span> <span>{Math.random().toFixed(1)}°</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!isDetectionRunning ? (
          <button 
            onClick={handleStartDetection}
            className="flex-1 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center justify-center gap-2 transition-all clickable"
          >
            <Zap className="w-4 h-4" /> Start Detection
          </button>
        ) : (
          <button 
            onClick={stopCamera}
            className="flex-1 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 font-bold flex items-center justify-center gap-2 transition-all clickable"
          >
            Stop Detection
          </button>
        )}
      </div>
      
      <div className="mt-4 text-xs text-slate-500 text-center">
        Privacy Note: Video is processed locally and never sent to any server.
      </div>
    </div>
  );
};
