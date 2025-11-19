import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Save, Bell, Camera, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const Settings = () => {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (key: keyof typeof settings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(localSettings);
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
             Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Display Name</label>
              <input 
                type="text" 
                value={localSettings.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email</label>
              <input 
                type="email" 
                value={localSettings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Sensitivity Section */}
        <section className="glass-panel p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
             <Camera className="w-5 h-5 text-cyan-400" />
             Detection Sensitivity
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-slate-400">Eye Closure Sensitivity</label>
                <span className="text-sm text-cyan-400">{localSettings.eyeClosureSensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={localSettings.eyeClosureSensitivity}
                onChange={(e) => handleChange('eyeClosureSensitivity', parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-slate-400">Yawn Detection Threshold</label>
                <span className="text-sm text-cyan-400">{localSettings.yawnSensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={localSettings.yawnSensitivity}
                onChange={(e) => handleChange('yawnSensitivity', parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="glass-panel p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
             Preferences
          </h2>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-white">Notifications</p>
                <p className="text-xs text-slate-400">Receive break reminders</p>
              </div>
            </div>
            <div 
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${localSettings.notificationsEnabled ? 'bg-cyan-600' : 'bg-slate-700'}`}
              onClick={() => handleChange('notificationsEnabled', !localSettings.notificationsEnabled)}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${localSettings.notificationsEnabled ? 'left-7' : 'left-1'}`} />
            </div>
          </div>
          
           <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              {localSettings.theme === 'dark' ? <Moon className="w-5 h-5 text-slate-400" /> : <Sun className="w-5 h-5 text-slate-400" />}
              <div>
                <p className="font-medium text-white">Theme Mode</p>
                <p className="text-xs text-slate-400">Currently set to Dark (Cyberpunk)</p>
              </div>
            </div>
            {/* Theme toggle is fake for now as we enforce dark mode per prompt design, but we show UI */}
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Locked</div>
          </div>
        </section>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 clickable disabled:opacity-50"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
