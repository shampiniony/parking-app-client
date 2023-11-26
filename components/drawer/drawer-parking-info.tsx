import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Linking } from 'react-native';
import { Comment, IComment } from './comment';
import { ScrollView } from 'react-native-gesture-handler';
import AddComment from './add-comment';
import { useParkingPlot } from '../../store/parking-plot.store';
import axios from 'axios';
import { Button } from './button';
import { useDrawerStore } from '../../store/box-state.store';
import { Parking } from '../../models/parkings';
import { useStatus } from '../../store/payment.store';

export const DrawerParkingInfo = () => {
  const parkingId = useParkingPlot(state => state.parkingPlotId)
  const [comments, setComments] = useState<IComment[]>([]);
  const [isAddedComment, setIsAddedComment] = useState(false);
  const [parking, setParking] = useState<Parking | null>(null);
  const status = useStatus(state => state.status)

  const serDrawerState = useDrawerStore(state => state.setDrawerState)

  const fetchComments = async() => {
    const url = `http://172.232.44.175/api/parkings/${parkingId}/comments`;
    const response = await axios.get(url);
    setComments(response.data);
  };

  const fetchParking = async() => { 
    const url = `http://172.232.44.175/api/parkings/${parkingId}`;
    const response = await axios.get(url);
    setParking(response.data);
  }

  useEffect(() => {
    fetchComments();
    fetchParking();
  }, [parkingId, isAddedComment]);

  // const paymentHandler = async () => {
  //   try {
  //     const url = `http://172.232.44.175/api/parkings/${parkingId}/reserve`;
  //     const response = await axios.post(url, { 'credentials': 'К192ВА' });
  //     setUrl(response.data["payment_link"]);
  //   } catch (error: any) {
  //     if (axios.isAxiosError(error)) {
  //       const axiosError = error as AxiosError;
  //       console.error('Axios error:', axiosError.message);
  //       console.error('Response data:', axiosError.response?.data);
  //     } else {
  //       console.error('Unexpected error:', error);
  //     }
  //   }
  // }

  const reserveHandler = () => {
    serDrawerState("booking");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}> 
        <Text style={styles.header}>
           Парковка#{ parking?.id } 
        </Text>
        <View style={styles.rating}>
          <Text style={{ textAlign: 'center' }}>
            Количество мест: { parking?.empty_spots } / { parking?.total_spots }
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Инвалидные места: { parking?.handicapped_spots }
          </Text>
          <Text style={{ textAlign: 'center', color: status === "success" ? "green" : "red" }}>
            Статус: { status === "success" ? "Оплачено" : "Не оплачено" }
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
        <Button onPress={reserveHandler} style={styles.payButton}> Оплатить </Button>
        <Button onPress={reserveHandler} style={styles.reserveButton}> Забронировать </Button>
      </View>
      <Text style={styles.header}>Отзывы</Text>
      <View>
        { comments.map((comment, indx) => <Comment key={indx} {...comment}/>)  }
      </View>
      <AddComment isAddedComment={isAddedComment} setIsAddedComment={setIsAddedComment}/>
    </ScrollView>
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
  rating: {
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 'auto',  
    fontSize: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  payButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 13,
    width: '46%',
    backgroundColor: '#99CC66',
  },
  reserveButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '46%',
    borderRadius: 13,
    backgroundColor: '#CD5C5C',
  }
});