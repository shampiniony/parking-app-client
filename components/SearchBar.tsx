import { StyleSheet, View, ScrollView, TextInput, Image, Text, TouchableOpacity } from "react-native"
import { useContext, useState } from "react";
import { FeatureMember } from "../models/yandex";
import { useParkingData } from "../hooks/useParkingData";
import { MapContext } from "../context/MapContext";
import { Parking } from "../models/parkings";
import { useSearchVisible } from "../store/searchVisible.store";

function getNearestParking(parkings: Parking[], longitude: number, latitude: number) {
  if (parkings === undefined) {
    return;
  }

  let indxOfNearestParking = 0;
  let minDistance = Number.MAX_VALUE;
  for (let i = 1; i < parkings.length; i++) {
    const [curLongitude, curLatitude] = parkings[i].center;
    const distance = Math.sqrt(Math.pow(curLatitude - latitude, 2) - Math.pow(curLongitude - longitude, 2));

    if (distance < minDistance) {
      minDistance = distance;
      indxOfNearestParking = i;
    }
  }

  return parkings[indxOfNearestParking];
}

export default function SearchBar() {
  const mapViewRef = useContext(MapContext);
  const [value, onChangeText] = useState("");

  const [suggestions, setSuggestions] = useState<FeatureMember[]>();
  const { visible, setVisible } = useSearchVisible()

  const parkings = useParkingData();

  const getTextSuggestions = (text: string) => {
    if (text.length === 0) setSuggestions([]);
    fetch(`https://geocode-maps.yandex.ru/1.x?apikey=17974270-5960-4f72-a053-fbf3df02f340&geocode=${text}&format=json`)
    .then(response => response.json())
    .then((json) => {
      setSuggestions(json.response.GeoObjectCollection.featureMember);
    }).catch((e) => {})
  }

  const pressSearchResultHandle = (value: FeatureMember) => {
    onChangeText("")
    setSuggestions([])

    const [longitude, latitude] = value.GeoObject.Point.pos
    .split(' ')
    .map(coord => Number(coord));
    
    const nearestParking = getNearestParking(parkings!, longitude, latitude);
    if (mapViewRef?.current && nearestParking) {
      const [longitude, latitude] = nearestParking.center;

      const newRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      mapViewRef.current.animateToRegion(newRegion, 1000);
    }
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
          onPressIn={ () => { setVisible(true) }}
          onChangeText={text => {
            onChangeText(text)
            getTextSuggestions(text)
          }}
          value={value}
          style={styles.text_input}
        />
      </View>
      {
      !visible 
      ? 
      null
      :
      <ScrollView
      style={
        {
          maxHeight: 300
        }
      }>
        {suggestions?.map((value, index) => {
          return (
            <TouchableOpacity 
              key={index}
              onPress={ () => pressSearchResultHandle(value) }
            >
              <View 
                style={styles.result}
              >
                <Text>
                  {value.GeoObject.name}
                </Text>
                <Text>
                  {value.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    zIndex: 10,
    top: 60,
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