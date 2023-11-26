import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export interface IComment {
  text: string;
  fio: string;
  rating: number;
}

export const Comment: React.FC<IComment> = (comment) => {
  return (
    <View style={styles.box}>
      <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image 
          source={{
            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }}
          style={styles.img}
        />
        <Text style={{fontSize: 16}}>{ comment.fio }</Text>
      </View>
      <Text style={styles.paragraph}>{ comment.text }</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  box: {
    padding: 10,
    margin: 10,
    borderRadius: 13,
    backgroundColor: '#F4F4F4',
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 300,
  },
  paragraph: {
    paddingTop: 10,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
