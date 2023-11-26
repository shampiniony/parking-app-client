import { Animated, Keyboard, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { DrawerHoc } from "./drawer.hoc";
import KeyboardListener from 'react-native-keyboard-listener';

const Drawer = () => {
  const [extended, setExtended] = useState(false);
  const position = useRef(new Animated.Value(-200)).current;

  const doubleTap = Gesture.Pan()
    .minDistance(5)
    .onEnd((e) => {
      if (e.velocityY < 0) {
        drawerExtend()
      } else {
        drawerRetract()
      }
    })

  const drawerExtend = () => {
    if (!extended) {
      Animated.timing(position, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
      }).start();
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Light
      )
      setExtended(true);
    }
  }

  const drawerRetract = () => {
    if (extended) {
      Animated.timing(position, {
        toValue: -200,
        duration: 350,
        useNativeDriver: false,
      }).start();
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Light
      )
      setExtended(false);
    }
  }

  return (
    <GestureDetector gesture={doubleTap}>
      <Animated.View style={[styles.drawer, { bottom: position }]}>
        <KeyboardListener
          onWillShow={(e: any) => {
            Animated.timing(position, {
              toValue: e.endCoordinates.height,
              duration: e.duration,
              useNativeDriver: false,
            }).start();
          }}
          onWillHide={(e: any) => {
            Animated.timing(position, {
              toValue: 0,
              duration: e.duration,
              useNativeDriver: false,
            }).start();
          }}
        />
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