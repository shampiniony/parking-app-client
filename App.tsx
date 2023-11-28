import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet } from 'react-native';
import { SearchBar } from "./components/SearchBar";
import { MapComponent } from "./components/MapComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "./components/drawer/Drawer";

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <SearchBar />
      <MapComponent />
      <Drawer />
    </GestureHandlerRootView>
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