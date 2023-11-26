import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface IButton {
  children: string; 
  onPress?: () => void;
}

export const Button: React.FC<IButton> = ({ children }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.time}> { children } </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 13,
    backgroundColor: '#99CC66',
  },
  time: {
    textAlign: 'center',
    fontSize: 20,
    color: '#F4F4F4',
  }
})
