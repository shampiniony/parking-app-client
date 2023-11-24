import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { Parking } from "./models/parkings";

export default function App() {

  const [parkings, setParkings] = useState<Parking[]>();

  const getParkingData = () => {
    fetch('https://user1698768484916.requestly.tech/parkings')
      .then(response => response.json())
      .then((json) => {
        setParkings(json.parkings);
      })
  }

  useEffect(() => {
    getParkingData();
  }, [])


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        showsCompass={false}
        region={{
          latitude: 56.8431,
          longitude: 60.6454,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        showsPointsOfInterest={false}
      >
        {parkings?.map((spot, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: spot.center.coordinates[1],
              longitude: spot.center.coordinates[0]
            }}
            title={index.toString()}
          >
            <Image
              source={require('./assets/spot.png')}
              style={{ width: 15, height: 15 }}
            />
          </Marker>
        ))}
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
