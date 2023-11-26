import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
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

  return (
    <ParkingContext.Provider value={parkingValue}>
      <DrawerContext.Provider value={extendedValue}>
        <GestureHandlerRootView style={styles.container}>
          <StatusBar style="auto" />
          <SearchBar />
          {/* <View style={styles.header}>
            <Image style={styles.img} source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
            }}/>
          </View> */}
          <MapComponent />
          <Drawer/>
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