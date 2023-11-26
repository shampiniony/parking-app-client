import React from 'react'
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface IButton {
  children: string; 
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<IButton> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      <Text style={styles.time }> { children } </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  time: {
    textAlign: 'center',
    fontSize: 15,
    color: '#F4F4F4',
  }
})
