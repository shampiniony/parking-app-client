import { useState } from "react";
import { Image, View } from 'react-native';
import { LatLng, Marker, Polygon, Polyline } from "react-native-maps";
import { Parking, Location } from "./../models/parkings";

export default function ParkingLot({ spot }: { spot: Parking }) {
  const [active, setActive] = useState<boolean>(true);

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

  return (
    <View>
      <Marker
        coordinate={{
          latitude: spot.center[1],
          longitude: spot.center[0]
        }}
        onPress={() => {
          console.log(active)
          setActive(!active)
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