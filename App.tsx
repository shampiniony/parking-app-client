import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet } from 'react-native';
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Drawer from "./components/drawer/Drawer";
import { DrawerContext } from "./context/DrawerContext";
import { ParkingContext } from "./context/ParkingContext";
import { useState } from "react";
import { Parking } from "./models/parkings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [parking, setParking] = useState<Parking | null>(null);
  const parkingValue = { parking, setParking };

  const [extended, setExtended] = useState<boolean>(false);
  const extendedValue = { extended, setExtended };

  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <ParkingContext.Provider value={parkingValue}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto"/>
        <DrawerContext.Provider value={extendedValue}>
          <SearchBar/>
          <MapComponent/>
        </DrawerContext.Provider>
        <Drawer/>
      </GestureHandlerRootView>
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
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 32,
    height: 32,
  }
});