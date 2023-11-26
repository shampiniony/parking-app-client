import { RefObject, useContext, useEffect, useState } from "react";
import { Image, View } from 'react-native';
import { MapContext } from "../context/MapContext";
import { Parking, Location } from "./../models/parkings";
import { ParkingContext, ParkingLotContext } from "../context/ParkingContext";
import MapView, { LatLng, Marker, MarkerPressEvent, Polygon, Polyline } from "react-native-maps";
import { useDrawerStore } from "../store/box-state.store";
import { useParkingPlot } from "../store/parking-plot.store";

export default function ParkingLot({ spot }: { spot: Parking }) {
  const { setParking } = useContext<ParkingLotContext>(ParkingContext);
  const setDrawerState = useDrawerStore(state => state.setDrawerState);
  const setParkingPlotId = useParkingPlot(state => state.setParkingPlotId)
  
  const mapContext = useContext<RefObject<MapView> | undefined>(MapContext);
  const [mapRef, setMapRef] = useState<RefObject<MapView> | undefined>();

  useEffect(() => {
    setMapRef(mapContext);
  }, [mapContext]);

  const drawParkingLot = (lot: Location) => {
    switch (lot.type) {
      case 'LineString':
        return <Polyline
          coordinates={
            lot.coordinates.map<LatLng>((coords) => {
              return {
                longitude: coords[0],
                latitude: coords[1]
              }
            })
          }
          strokeColor="#4F89A6"
          strokeWidth={5}
        />
      case 'Polygon':
        return <Polygon
          coordinates={
            lot.coordinates.map<LatLng>((coords) => {
              return {
                longitude: coords[0],
                latitude: coords[1]
              }
            })
          }
          fillColor="rgba(79,137,166,0.3)"
          strokeColor="rgba(0,0,0,0)"
        />
    }
  }

  const handleParkingClick = async (e: MarkerPressEvent, mapViewRef: RefObject<MapView> | undefined, spot : Parking) => {
    setDrawerState("comment");
    setParkingPlotId(spot.id);

    setParking(spot);
    mapViewRef?.current?.fitToCoordinates(spot.location.coordinates.map( (coords) => {
      return {
        latitude: coords[1],
        longitude: coords[0],
      }
    }), {
      animated: true,
      edgePadding: {
        top: 200,
        right: 40,
        bottom: 200,
        left: 40,
      }
    })
  };

  return (
    <View>
      <Marker
        coordinate={{
          latitude: spot.center[1],
          longitude: spot.center[0]
        }}
        onPress={(e) => {
          handleParkingClick(e, mapRef, spot);
        }}
      >
        <Image
          source={require('./../assets/spot.png')}
          style={{ width: 20, height: 20 }}
        />
      </Marker>
      {drawParkingLot(spot.location)}
  </View>
  )
}