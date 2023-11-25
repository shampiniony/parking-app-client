import { Animated, StyleSheet, Text, View } from "react-native";
import useDrawer from "../hooks/useDrawer";

export default function Drawer() {
  const { toggleDrawer, position } = useDrawer();

  return (
    <Animated.View style={[styles.drawer, { bottom: position }]}>
      <View style={styles.container} onTouchStart={toggleDrawer}>
        <Text>Hello!</Text>
      </View>
    </Animated.View>
  );
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