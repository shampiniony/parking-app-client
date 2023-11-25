import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native' 
import { styles } from './personal-account.style'
import { QrCode } from './qr-code'

export const PersonalAccount = () => {
  const [qrState, setQrState] = useState(false);

  const qrCodePressHandler = () => {
    setQrState(!qrState);
  } 

  return (
      qrState ? <QrCode qrState={qrState} setQrState={setQrState}/> : <View style={styles.container}>
      <View style={styles.panel}>
        <TouchableOpacity onPress={qrCodePressHandler}>
          <Image style={styles.icon} source={{
            uri:'https://www.imgonline.com.ua/examples/qr-code.png'
          }}/>
        </TouchableOpacity>
      </View>
      <Image
        style={ styles.img }
        source={{
          uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />
      <TextInput style={styles.fio} placeholder='Фамилия Имя Отчество'/>
    </View>
  )
}
