import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { DrawerHoc } from "./drawer.hoc";
import { useDrawerStore } from "../../store/drawerState.store";

const Drawer = () => {
  const setExtended = useDrawerStore(state => state.setExtended);
  const extended = useDrawerStore(state => state.boxExtended);
  const position = useRef(new Animated.Value(-200)).current;

  const doubleTap = Gesture.Pan()
    .minDistance(5)
    .onEnd((e) => {
      if (e.velocityY < 0) {
        setExtended(false);
      } else {
        setExtended(true);
      }
    })

  useEffect( () => {
    if (extended) {
      drawerRetractAnimation();
    } else {
      drawerExtendAnimation();
    }
  },[extended])

  const drawerExtendAnimation = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }

  const drawerRetractAnimation = () => {
    Animated.timing(position, {
      toValue: -200,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }

  return (
    <GestureDetector gesture={doubleTap}>
      <Animated.View style={[styles.drawer, { bottom: position }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
          <View style={{ width: 50, height: 3, backgroundColor: '#CBCBCB', borderRadius: 20 }} />
        </View>
        {
          <DrawerHoc />
        }
      </Animated.View>
    </GestureDetector>
  );
}

export default Drawer;

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    zIndex: 10,
    height: 350,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    bottom: 0
  },
});