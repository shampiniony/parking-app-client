import { create } from 'zustand';

export type boxStateType = 'car' | 'comment' | 'booking';

interface IDrawerState {
  boxExtended: boolean;
  boxState: boxStateType;
  setDrawerState: (state: boxStateType) => void;
  setExtended: (state: boolean) => void;
}

export const useDrawerStore = create<IDrawerState>((set) => ({
  boxExtended: false,
  boxState: 'car',
  setDrawerState: (state) => {
    set({ boxState: state })
  },
  setExtended: (state) => {
    set({ boxExtended: state })
  },
}));
