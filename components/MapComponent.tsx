import { RefObject, useEffect, useRef, useState } from "react";
import { StyleSheet, GestureResponderEvent } from 'react-native';
import MapView from "react-native-maps";
import { Parking, Location } from "./../models/parkings";
import ParkingLot from "./ParkingLot";

export default function MapComponent() {
  const [parkings, setParkings] = useState<Parking[]>();
  const mapViewRef = useRef<MapView>(null);

  const getParkingData = () => {
    fetch('http://172.232.44.175/api/parkings?format=json')
    .then(response => response.json())
    .then((json) => {
        setParkings(json);
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
        <ParkingLot key={index} spot={spot} />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

const handleParkingClick = async (e: GestureResponderEvent, mapViewRef: RefObject<MapView>) => {
  // mapViewRef.current?.animateToRegion({
  //   latitude: e.nativeEvent.coordinate.latitude,
  //   longitude: e.nativeEvent.coordinate.longitude,
  //   latitudeDelta: 0.001,
  //   longitudeDelta: 0.001,
  // }, 500);
  console.log(this);
};