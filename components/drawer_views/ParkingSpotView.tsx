import { View, Text, StyleSheet } from "react-native"

export const ParkingSpotView = () => (
  <>
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <View>
          <View style={styles.box}>
            <Text> Parking spot </Text>
            <Text> Parking spot </Text>
            <Text> Parking spot </Text>
          </View>
          <View style={styles.box}>
            <Text> Parking spot </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text> Parking spot </Text>
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
  </>
)

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    zIndex: 10,
    height: 350,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '100%',
    backgroundColor: 'white'
  },
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