import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Drawer from "./components/Drawer";
import { ParkingContext } from "./context/ParkingContext";
import { useRef, useState } from "react";
import { Parking } from "./models/parkings";
import MapView from 'react-native-maps';
import { MapContext } from './context/MapContext';
import { PersonalAccount } from './modules/personal-account/personal-account';

export default function App() {
  const [parking, setParking] = useState<Parking | null>(null);
  const value = {parking, setParking};
  
  const mapViewRef = useRef<MapView>(null);

  return (
    <ParkingContext.Provider value={value}>
      {/* <PersonalAccount/> */}
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <MapContext.Provider value={mapViewRef}>
          <SearchBar/>
          <MapComponent/>
        </MapContext.Provider>
        <Drawer/>
      </View>
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