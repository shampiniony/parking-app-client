import { create } from 'zustand';

interface ISearch {
  visible: boolean;
  setVisible: (state: boolean) => void;
}

export const useSearchVisible = create<ISearch>((set) => ({
  visible: true,
  setVisible: (state) => set({ visible: state }),
}));
