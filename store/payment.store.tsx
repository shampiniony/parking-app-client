import { create } from 'zustand';

interface IStatus {
  status: string;
  setStatus: (state: string) => void;
}

export const useStatus = create<IStatus>((set) => ({
  status: "Успешно",
  setStatus: (state) => set({ status: state }),
}));
