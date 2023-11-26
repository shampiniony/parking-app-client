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
          <Text>K777АИ</Text>
        </View>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 16 }}>Ближайшие парковки</Text>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontWeight: 'bold'}}> Парковка #144 </Text>
            <Text> Свободных мест: 6 </Text>
          </View>
          <Text>4,4 км</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontWeight: 'bold'}}> Парковка #134 </Text>
            <Text> Свободных мест: 10 </Text>
          </View>
          <Text>4 км</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontWeight: 'bold'}}> Парковка #137 </Text>
            <Text> Свободных мест: 2 </Text>
          </View>
          <Text>4,2 км</Text>
        </View>
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
