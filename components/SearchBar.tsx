import { StyleSheet, View } from "react-native"

export default function SearchBar() {
  return (
    <View style={styles.searchbar} />
  )
}

const styles = StyleSheet.create({
  searchbar: {
    position: 'absolute',
    zIndex: 10,
    top: 50,
    height: 80,
    borderRadius: 20,
    width: '90%',
    backgroundColor: 'white'
  },
});