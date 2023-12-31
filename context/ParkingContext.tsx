import { createContext } from "react";
import { Parking } from "../models/parkings";

export interface ParkingLotContext {
  parking: Parking | null,
  setParking: (parking : Parking) => void,
}

export const ParkingContext = createContext<ParkingLotContext>({
  parking: null,
  setParking: (parking : Parking) => {}
});