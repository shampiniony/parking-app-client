import { StyleSheet, View, ScrollView, TextInput, Image, Text } from "react-native"
import { useState } from "react";
import { FeatureMember } from "../models/yandex";

export default function SearchBar() {
  const [value, onChangeText] = useState("");

  const [suggestions, setSuggestions] = useState<FeatureMember[]>();

  const getTextSuggestions = (text: string) => {
    if (text.length == 0) setSuggestions([]);
    fetch(`https://geocode-maps.yandex.ru/1.x?apikey=API_KEY&geocode=${text}&format=json`)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        setSuggestions(json.response.GeoObjectCollection.featureMember);
      })
  }

  return (
    <View style={styles.searchbar} >
      <View style={styles.search_field}>
        <Image
          source={require('./../assets/search.png')}
          style={styles.search_icon}
        />
        <TextInput
          editable
          maxLength={40}
          placeholder="Поиск"
          onChangeText={text => {
            onChangeText(text)
            getTextSuggestions(text)
          }}
          onFocus={(e) => console.log(e)}
          value={value}
          style={styles.text_input}
        />
      </View>
      <ScrollView
      style={
        {
          maxHeight: 300
        }
      }>
        {suggestions?.map((value, index) => {
          return (
            <View key={index} style={styles.result}>
              <Text>
                {value.GeoObject.name}
              </Text>
              <Text>
                {value.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    height: 'auto',
    borderRadius: 20,
    width: '90%',
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 13,
  },
  search_field: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  search_icon: {
    height: 25,
    width: 25,
    overlayColor: "rgba(54, 116, 147, 1)",
    marginEnd: 10,
    marginStart: 5
  },
  text_input: {
    height: 40,
    width: "87%",
    paddingHorizontal: 10,
    backgroundColor: 'rgba(237, 237, 239, 1)',
    borderRadius: 10
  },
  result: {
    height: 'auto',
    backgroundColor: 'rgba(237, 237, 239, 0.5)',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  }
});