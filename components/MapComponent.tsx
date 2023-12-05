import { useEffect, useRef, useState } from "react";
import { StyleSheet } from 'react-native';
import { Parking } from "./../models/parkings";
import MapView from "react-native-maps";
import { useDrawerStore } from "../store/drawerState.store";
import { useSearchVisible } from "../store/searchVisible.store";
import { ParkingLot } from "./ParkingLot";
import { useParkingLot } from "../store/parkingLot.store";

export const MapComponent = () => {
  const [parkings, setParkings] = useState<Parking[]>();
  const mapViewRef = useRef<MapView>(null);
  const setDrawerState = useDrawerStore(state => state.setDrawerState)
  const parkingLot = useParkingLot(state => state.parking)
  const setVisible = useSearchVisible(state => state.setVisible)

  useEffect( () => {
    if (parkingLot != undefined) {
      mapViewRef?.current?.fitToCoordinates(parkingLot.location.coordinates.map( (coords) => {
        return {
          latitude: coords[1],
          longitude: coords[0],
        }
      }), {
        animated: true,
        edgePadding: {
          top: 200,
          right: 40,
          bottom: 400,
          left: 40,
        }
      })
    }
  }, [parkingLot])

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
      onPress={() => {
        setVisible(false)
      }
      }
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