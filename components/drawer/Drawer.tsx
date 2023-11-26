import { Animated, StyleSheet, View } from "react-native";
import { useRef } from "react";
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { DrawerHoc } from "./drawer.hoc";
import { useSearchVisible } from "../../store/searchVisible.store";

const Drawer = () => {
  const position = useRef(new Animated.Value(-200)).current;
  const {visible, setVisible} = useSearchVisible()

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

  return (
    <GestureDetector gesture={doubleTap}>
      <Animated.View style={[styles.drawer, { bottom: position }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
          <View style={{ width: 50, height: 3, backgroundColor: '#CBCBCB', borderRadius: 20 }} />
        </View>
        {
          // !visible
          // ? 
          // null
          // :
          <DrawerHoc/>
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
    backgroundColor: 'white'
  },
});