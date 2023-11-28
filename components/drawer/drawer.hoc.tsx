import React from 'react'
import { View } from 'react-native'
import { useDrawerStore } from "../../store/drawerState.store";
import { DrawerCar } from './drawer-car';
import { DrawerParkingInfo } from './drawer-parking-info';
import { DrawerTimer } from './drawer-timer';

export const DrawerHoc = () => {
  const drawerState = useDrawerStore(state => state.boxState)

  let componentToRender;

  switch (drawerState) {
    case 'car':
      componentToRender = <DrawerCar/>;
      break;
    case 'comment':
      componentToRender = <DrawerParkingInfo/>;
      break;
    case 'booking':
      componentToRender = <DrawerTimer/>;
      break;
    default:
      componentToRender = <DrawerCar/>;
  }

  return <View>{componentToRender}</View>;
};
