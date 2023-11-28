import { Image, View } from 'react-native';
import { Parking, Location } from "./../models/parkings";
import { LatLng, Marker, MarkerPressEvent, Polygon, Polyline } from "react-native-maps";
import { useDrawerStore } from "../store/drawerState.store";
import { useParkingLot } from "../store/parkingLot.store";

export const ParkingLot = ({ spot }: { spot: Parking }) => {
  const setDrawerState = useDrawerStore(state => state.setDrawerState);
  const setExtended = useDrawerStore(state => state.setExtended);
  const setParkingLotId = useParkingLot(state => state.setParkingPlotId);

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

  const handleParkingClick = async (e: MarkerPressEvent, spot : Parking) => {
    setDrawerState("comment");
    setParkingLotId(spot.id);
    setExtended(false);
  };

  return (
    <View>
      <Marker
        coordinate={{
          latitude: spot.center[1],
          longitude: spot.center[0]
        }}
        onPress={(e) => {
          handleParkingClick(e, spot);
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