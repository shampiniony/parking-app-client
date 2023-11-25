import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Drawer from "./components/Drawer";
import { ParkingContext } from "./context/ParkingContext";
import { useRef, useState } from "react";
import MapView from 'react-native-maps';
import { MapContext } from './context/MapContext';
import { PersonalAccount } from './modules/personal-account/personal-account';
import { DrawerContext } from "./context/DrawerContext";
import { Parking } from "./models/parkings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const parkingValue = { parking, setParking };

  const [extended, setExtended] = useState<boolean>(false);
  const extendedValue = { extended, setExtended };

  return (
    <ParkingContext.Provider value={parkingValue}>
      <DrawerContext.Provider value={extendedValue}>
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            <SearchBar />
            <MapComponent />
            <Drawer />
        </GestureHandlerRootView>
      </DrawerContext.Provider>
    </ParkingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});