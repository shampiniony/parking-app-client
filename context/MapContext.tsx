import { RefObject, createContext } from "react";
import MapView from "react-native-maps";

export const MapContext = createContext<RefObject<MapView> | undefined>(undefined);