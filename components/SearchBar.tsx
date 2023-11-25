import { StyleSheet, View } from "react-native"
import useDrawer from "../hooks/useDrawer";

export default function SearchBar() {
  const { toggleDrawer, position } = useDrawer();
  return (
    <View style={styles.searchbar} onTouchStart={toggleDrawer}/>
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