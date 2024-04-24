import { create } from 'zustand';

type ModalStore = {
    isOpen: boolean;
    toggleModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));