import { useRef, useState, useCallback } from 'react';
import { Animated } from 'react-native';

const useDrawer = () => {
  const [extended, setExtended] = useState(false);
  const position = useRef(new Animated.Value(-200)).current;

  const toggleDrawer = useCallback(() => {
    console.log(extended)
    if (extended) {
      Animated.timing(position, {
        toValue: -200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExtended(!extended);
  }, [extended, position]);

  return { extended, toggleDrawer, position };
};

export default useDrawer;
