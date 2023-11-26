import React, { useState } from 'react'
import { View, StyleSheet, Linking, Text } from 'react-native'
import { Button } from './button'
import axios, { AxiosError } from 'axios'
import { TextInput } from 'react-native-gesture-handler'
import { useParkingPlot } from '../../store/parking-plot.store'
import { useCarStore } from '../../store/carNumber.store'

const carNumberRegex = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui

export const DrawerTimer = () => {
  const [carNumber, setCarNumber] = useState<string>('');
  const [isValid, setIsValid] = useState(true);
  const parkingId = useParkingPlot(state => state.parkingPlotId);
  const setNumber = useCarStore(state => state.setNumber)

  const paymentHandler = async () => {
    setIsValid(carNumberRegex.test(carNumber));

    setNumber(carNumber);
    try {
      const url = `http://172.232.44.175/api/parkings/${parkingId}/reserve`;
      const response = await axios.post(url, { 'credentials': carNumber });
      Linking.openURL(response.data["payment_link"]);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios error:', axiosError.message);
        console.error('Response data:', axiosError.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  const textHandler = (value: string) => {
    setCarNumber(value.toUpperCase())
    setIsValid(carNumberRegex.test(value))
  }

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Номер машины'
        style={[styles.box, { textTransform: 'uppercase' }]}
        onChangeText={textHandler}
      />
      <Button style={buttonStyle.button} onPress={ paymentHandler }>Оплатить</Button>
      { isValid ? null : <Text style={{color: '#CD5C5C', fontSize: 16, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center'}}> Неправильный номер автомобиля </Text> }
    </View>
  )
}

const buttonStyle = {
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 13,
    backgroundColor: '#99CC66',
  }
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
  img: {
    resizeMode: 'contain',
    width: 100,
    height: 20,
    marginLeft: -20,
  },
});
