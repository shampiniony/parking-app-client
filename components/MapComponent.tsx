import { useContext, useRef} from "react";
import { StyleSheet } from 'react-native';
import MapView from "react-native-maps";
import ParkingLot from "./ParkingLot";
import React from 'react';
import { useParkingData } from "../hooks/useParkingData";
import { MapContext } from "../context/MapContext";

export default function MapComponent() {
  const parkings = useParkingData();
  const mapViewRef = useContext(MapContext);

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
