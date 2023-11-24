import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <MapView
          style={styles.map}
          showsCompass={false}
          region={{
            latitude: 59.9311,
            longitude: 30.3609,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsPointsOfInterest={false}
        >
      </MapView>

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
  map: {
    width: '100%',
    height: '100%',
  },
});
