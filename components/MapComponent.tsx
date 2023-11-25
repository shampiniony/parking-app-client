import { useEffect, useRef, useState } from "react";
import { StyleSheet } from 'react-native';
import MapView from "react-native-maps";
import { Parking } from "./../models/parkings";
import ParkingLot from "./ParkingLot";
import { MapContext } from "./MapContext";

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
    <MapContext.Provider value={mapViewRef}>
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
    </MapContext.Provider>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
