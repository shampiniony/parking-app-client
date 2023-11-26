import { create } from 'zustand';

export type boxStateType = 'car' | 'comment' | 'booking';

interface IDrawerState {
  boxState: boxStateType;
  setDrawerState: (state: boxStateType) => void;
}

export const useDrawerStore = create<IDrawerState>((set) => ({
  boxState: 'car',
  setDrawerState: (state) => {
    console.log(state)
    set({ boxState: state })
  },
}));
