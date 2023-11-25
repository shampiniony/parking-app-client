import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { styles } from './qr-code.style'

export const QrCode = ({ qrState, setQrState }: { qrState: boolean, setQrState: (qrState: boolean) => void }) => {
  const qrPressHandler = () => {
    setQrState(!qrState);
  }
  
  return (
    <TouchableOpacity onPress={qrPressHandler}>
      <View style={styles.container}>
        <Image style={styles.qr} source={{uri:'https://www.imgonline.com.ua/examples/qr-code.png'}}/>
      </View>
    </TouchableOpacity>
  )
}
