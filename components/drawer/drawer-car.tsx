import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native';

export const DrawerCar = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '80%'}}>
        <View style={{padding: 10, margin: 10}}>
          <Image
            source={require('./../../assets/car.png')}
            style={{ width: 130, height: 40 }}
          />
        </View>
        <View style={styles.box}>
          <Text> K777АИ </Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text> Parking spot </Text>
        <Text> Avaibable places </Text>
        <Text> Address </Text>
      </View>
      <View style={styles.box}>
        <Text> Parking spot </Text>
        <Text> Avaibable places </Text>
        <Text> Address </Text>
      </View>
    </View>
  );
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
  }
});
