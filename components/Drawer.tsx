import { Animated, StyleSheet, Text, View, Image } from "react-native";
import { useContext, useRef, useState } from "react";
import { ParkingContext, ParkingLotContext } from "../context/ParkingContext";
import { DrawerContext } from "../context/DrawerContext";
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function Drawer() {

  const { extended, setExtended } = useContext<DrawerContext>(DrawerContext);
  
  const position = useRef(new Animated.Value(-200)).current;

  const doubleTap = Gesture.Pan()
  .minDistance(5)
  .onEnd((e) => {
    if(e.velocityY < 0) {
      drawerExtend()
    } else {
      drawerRetract()
    }
  })

  const drawerExtend = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
    Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    )
  }

  const drawerRetract = () => {
    Animated.timing(position, {
      toValue: -200,
      duration: 350,
      useNativeDriver: false,
    }).start();
    Haptics.impactAsync(
      Haptics.ImpactFeedbackStyle.Light
    )
  }
  
  // const toggleDrawer = () => {
  //   if (extended) {

  //   } else {

  //   }
  //   Haptics.impactAsync(
  //     Haptics.ImpactFeedbackStyle.Light
  //   )
  //   setExtended(!extended);
  // }

  const { parking } = useContext<ParkingLotContext>(ParkingContext);

  return (
    <GestureDetector gesture={doubleTap}>
      <Animated.View style={[styles.drawer, { bottom: position }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
          <View style={{ width: 50, height: 3, backgroundColor: '#CBCBCB', borderRadius: 20 }} />
        </View>
        <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: '80%'}}>
          <View style={{padding: 10, margin: 10}}>
            <Image
              source={require('./../assets/car.png')}
              style={{ width: 130, height: 40 }}
            />
          </View>
          <View style={styles.box}>
            <Text> Parking spot </Text>
          </View>
        </View>
          <View style={styles.box}>
            <Text> Parking spot </Text>
            <Text> Avaibable places </Text>
            <Text> Address </Text>
          </View>
          <View style={styles.box}>
            <Text> Parking spot </Text>
            <Text> Avaibable places </Text>
            <Text> Address </Text>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}


const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    zIndex: 10,
    height: 350,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    backgroundColor: 'white'
  },
  container: {
    margin: 25,
  },
  box: {
    padding: 10,
    margin: 10,
    borderRadius: 13,
    backgroundColor: '#F4F4F4',
  }
});