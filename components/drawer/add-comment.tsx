import React, { useEffect, useState } from 'react'
import { styles } from './comment'
import { TextInput, TouchableOpacity, View, Image } from 'react-native'
import axios, { AxiosError } from 'axios';
import { useParkingLot } from '../../store/parkingLot.store';

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

const AddComment = ({isAddedComment, setIsAddedComment}: {isAddedComment: boolean, setIsAddedComment: (value: boolean) => void}) => {
  const [comment, setComment] = useState('');
  const parkingId = useParkingLot(state => state.parking?.id); 

  const addComment = async (parkingId: number, comment: string, name: string, rating: number) => {
    const url = `http://172.232.44.175/api/parkings/${parkingId}/comments/add`;
  
    try {
      await axios.put(url, {
        text: comment,
        fio: name,
        rating: rating,
      }).then(() => { setIsAddedComment(!isAddedComment) });
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios error:', axiosError.message);
        console.error('Response data:', axiosError.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const changeCommentHandler = (text: string) => {
    setComment(text);
  };

  const pressHandle = () => {
    addComment(parkingId ?? 0, comment, "Иванов Иван Иванович", getRandomRating())
    setComment("");
  }

  return (
    <View style={[styles.box, { flexDirection: 'row', justifyContent: 'space-between'}]}>
      <TextInput
        style={{
          maxWidth: '80%'
        }}
        value={comment}
        onChangeText={changeCommentHandler}
        placeholder='добавить комментарий'
      />
      <TouchableOpacity
        onPress={pressHandle}
      >
        <Image 
          style={{
            width: 32,
            height: 32,
            opacity: .3
          }}
          source={{
            uri: 'https://cdn3.iconfinder.com/data/icons/mail-1-glyph/512/45-Send-1024.png'
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default AddComment