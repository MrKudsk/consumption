import { create } from 'zustand';

interface usePropertyModalProperty {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePropertyModal = create<usePropertyModalProperty>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));