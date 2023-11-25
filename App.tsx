import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import Drawer from "./components/Drawer";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SearchBar/>
      <MapComponent/>
      <Drawer/>
    </View>
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