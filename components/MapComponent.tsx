import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import { Parking } from "./../models/parkings";

export default function MapComponent() {
  const [parkings, setParkings] = useState<Parking[]>();
  const mapViewRef = useRef<MapView>(null);

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
      <MapView
        ref={mapViewRef}
        initialRegion={{
          latitude: 56.8431,
          longitude: 60.6454,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={styles.map}
        showsCompass={false}
        showsPointsOfInterest={false}
      >
        {parkings?.map((spot, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: spot.center.coordinates[1],
              longitude: spot.center.coordinates[0]
            }}
            onPress={(e) => handleParkingClick(e, mapViewRef)}
          >
            <Image
              source={require('./../assets/spot.png')}
              style={{ width: 20, height: 20 }}
            />
          </Marker>
        ))}
      </MapView>
  )
}

const handleParkingClick = async (e: MarkerPressEvent, mapViewRef: RefObject<MapView>) => {
  mapViewRef.current?.animateToRegion({
    latitude: e.nativeEvent.coordinate.latitude,
    longitude: e.nativeEvent.coordinate.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  }, 500);
  console.log(e.nativeEvent.coordinate);
};


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});