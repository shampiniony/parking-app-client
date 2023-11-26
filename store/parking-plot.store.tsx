import { create } from 'zustand';

interface IParkingPlot {
  parkingPlotId: number;
  setParkingPlotId: (state: number) => void;
}

export const useParkingPlot = create<IParkingPlot>((set) => ({
  parkingPlotId: 0,
  setParkingPlotId: (state) => set({ parkingPlotId: state }),
}));
