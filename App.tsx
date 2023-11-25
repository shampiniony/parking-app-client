import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Drawer from "./components/Drawer";
import { ParkingContext } from "./context/ParkingContext";
import { useState } from "react";
import { Parking } from "./models/parkings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [parking, setParking] = useState<Parking | null>(null);
  const parkingValue = { parking, setParking };

  return (
    <ParkingContext.Provider value={parkingValue}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto" />
        <SearchBar />
        <MapComponent />
        <Drawer />
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
});