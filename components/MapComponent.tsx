import { useContext } from "react";
import { StyleSheet } from 'react-native';
import MapView from "react-native-maps";
import ParkingLot from "./ParkingLot";
import React from 'react';
import { useParkingData } from "../hooks/useParkingData";
import { MapContext } from "../context/MapContext";
import MapViewDirections from 'react-native-maps-directions';

export default function MapComponent() {
  const parkings = useParkingData();
  const mapViewRef = useContext(MapContext);

  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};

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
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={'AIzaSyCx3n09Zpghadz7-CH2BP3wW-yq9UcH5M8'}
      />
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
