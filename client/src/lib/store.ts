import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MoodEntry {
  date: string;
  mood: string; // emoji
  note?: string;
}

interface Settings {
  theme: 'light' | 'dark';
  eyeClosureSensitivity: number; // 1-100
  yawnSensitivity: number; // 1-100
  notificationsEnabled: boolean;
  webcamEnabled: boolean;
  username: string;
  email: string;
}

interface FatigueMetrics {
  eyeClosure: number;
  yawnCount: number;
  postureStatus: 'Good' | 'Poor';
  focusScore: number;
  isFatigued: boolean;
}

interface AppState {
  settings: Settings;
  moodHistory: MoodEntry[];
  fatigueMetrics: FatigueMetrics;
  isDetectionRunning: boolean;
  
  // Actions
  updateSettings: (settings: Partial<Settings>) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  updateFatigueMetrics: (metrics: Partial<FatigueMetrics>) => void;
  setDetectionRunning: (isRunning: boolean) => void;
  resetFatigueMetrics: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        theme: 'dark',
        eyeClosureSensitivity: 50,
        yawnSensitivity: 50,
        notificationsEnabled: true,
        webcamEnabled: false,
        username: 'Sapphire User',
        email: 'user@example.com',
      },
      moodHistory: [],
      fatigueMetrics: {
        eyeClosure: 0,
        yawnCount: 0,
        postureStatus: 'Good',
        focusScore: 100,
        isFatigued: false,
      },
      isDetectionRunning: false,

      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      
      addMoodEntry: (entry) =>
        set((state) => ({ moodHistory: [...state.moodHistory, entry] })),
      
      updateFatigueMetrics: (newMetrics) =>
        set((state) => ({ fatigueMetrics: { ...state.fatigueMetrics, ...newMetrics } })),
      
      setDetectionRunning: (isRunning) =>
        set({ isDetectionRunning: isRunning }),
        
      resetFatigueMetrics: () => set({
        fatigueMetrics: {
            eyeClosure: 0,
            yawnCount: 0,
            postureStatus: 'Good',
            focusScore: 100,
            isFatigued: false,
        }
      })
    }),
    {
      name: 'sapphire-storage',
      partialize: (state) => ({ settings: state.settings, moodHistory: state.moodHistory }),
    }
  )
);
