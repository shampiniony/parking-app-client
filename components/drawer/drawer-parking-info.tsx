import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { Comment, IComment } from './comment';
import { ScrollView } from 'react-native-gesture-handler';
import AddComment from './add-comment';
import { useParkingPlot } from '../../store/parking-plot.store';
import axios, { AxiosError } from 'axios';

export const DrawerParkingInfo = () => {
  const parkingId = useParkingPlot(state => state.parkingPlotId)
  const [comments, setComments] = useState<IComment[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [isAddedComment, setIsAddedComment] = useState(false);

  const fetchParkings = async(parkingId: number) => {
    try {
      console.log(parkingId);
      const url = `http://172.232.44.175/api/parkings/${parkingId}/comments`;
      const response = await axios.get(url);
      setComments(response.data);

      let curRating = 0;
      for(let i = 0; i < comments.length; i++) {
        curRating += comments[i].rating;
      }

      setRating(curRating / Math.max(comments.length, 1));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios error:', axiosError.message);
        console.error('Response data:', axiosError.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  useEffect(() => {
    fetchParkings(parkingId);
  }, [parkingId, isAddedComment]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}> 
        <Text style={styles.header}>
          Название 
        </Text>
        <View style={styles.rating}>
          <Text>
            Рейтинг: 
          </Text>
          <View> 
            <Text>
              { rating.toFixed(1) } / 5
            </Text>
          </View>
        </View>
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
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',  
    fontSize: 20,
    gap: 10
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  }
});