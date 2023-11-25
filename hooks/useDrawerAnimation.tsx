import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export function useDrawerAnimation() {
 const position = useRef(new Animated.Value(-200)).current;
 const [isExtended, setIsExtended] = useState(false);

 const drawerExtend = () => {
  console.log("extended!");
   Animated.timing(position, {
     toValue: 0,
     duration: 350,
     useNativeDriver: false,
   }).start();
   setIsExtended(true);
 }

 const drawerRetract = () => {
   Animated.timing(position, {
     toValue: -200,
     duration: 350,
     useNativeDriver: false,
   }).start();
   setIsExtended(false);
 }

 return {
   position,
   isExtended,
   drawerExtend,
   drawerRetract,
 };
}
