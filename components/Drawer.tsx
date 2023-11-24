import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { DrawerContext } from "./DrawerContext";

export default function Drawer() {

  const position = useRef<Animated.Value>(new Animated.Value(-200)).current;
  const [extended, setExtended] = useState<boolean>(false)
  
  const animateOut = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  const animateIn = () => {
    Animated.timing(position, {
      toValue: -200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  const toggleDrawer = () => {
    if (extended) {
      animateIn();
    } else {
      animateOut();
    }
    setExtended(!extended);
  }

  return (
    <DrawerContext.Provider value={{ extended, toggleDrawer }}>
      <Animated.View style={[styles.drawer, {bottom: position}]}>
        <View style={styles.container} onTouchStart={toggleDrawer}>
          <Text>Hello!</Text>
        </View>
      </Animated.View>
    </DrawerContext.Provider>
  )
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    zIndex: 10,
    height: 400,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});