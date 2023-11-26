import { RefObject, createContext } from "react";
import MapView from "react-native-maps";
// import MapView from 'react-native-map-clustering';

export const MapContext = createContext<RefObject<MapView> | undefined>(undefined);