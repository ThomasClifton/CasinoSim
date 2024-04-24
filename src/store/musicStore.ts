import { create } from 'zustand';

type MusicStore = {
    isPlaying: boolean;
    toggleMusic: () => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));