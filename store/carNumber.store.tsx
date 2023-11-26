import { create } from 'zustand';

export type boxStateType = 'car' | 'comment' | 'booking';

interface ICar {
  number: string;
  setNumber: (state: string) => void;
}

export const useCarStore = create<ICar>((set) => ({
  number: 'Не известно',
  setNumber: (state) => set({ number: state }),
}));
