import { create } from 'zustand';
import { Parking } from "../models/parkings";
import axios from "axios";

interface IParkingPlot {
  parking: Parking | undefined;
  setParkingPlotId: (id: number) => void;
}

export const useParkingLot = create<IParkingPlot>((set) => ({
  parking: undefined,
  setParkingPlotId: async (id) => {
    const url = `http://172.232.44.175/api/parkings/${id}`;
    const response = await axios.get(url);

    set({ parking: response.data })
  },
}));
