import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from './button'

export const DrawerTimer = () => {
  const paymentHandler = () => {
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.time}> осталось 9 : 33 </Text>
      </View>
      {/* <View style={styles.info}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
          <Image 
            style={styles.img}       
            source={require('./../assets/car-icon.png')}
          />
          <Text style={styles.text}> 0 / 0 </Text>
        </View>
        <Text></Text>
      </View> */}
      <Button onPress={ paymentHandler }>Оплатить</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  box: {
    padding: 10,
    margin: 10,
    borderRadius: 13,
    backgroundColor: '#F4F4F4',
  },
  info: {
    paddingTop: 20,
    borderRadius: 13,
    backgroundColor: '#F4F4F4',
  },
  time: {
    textAlign: 'center',
    fontSize: 20,
  },
  img: {
    resizeMode: 'contain',
    width: 100,
    height: 20,
    marginLeft: -20,
  },
  text: {
    fontSize: 20,
  }
});
