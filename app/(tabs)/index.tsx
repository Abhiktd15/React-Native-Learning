import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {toggleDarkMode} = useTheme()
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading}>Welcome!! </Text>
      <Text style={styles.text}>This is my first android app by ReactNative. </Text>

      <TouchableOpacity onPress={toggleDarkMode}>
        <Text >Toggle Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    alignItems: "center",
    backgroundColor: "white"
  },
  heading:{
    fontSize:40,
    fontWeight:"bold",
    color:"#333"
  },
  text:{
    fontSize:20,
    color:"#555",
    marginTop:20,
    textAlign:"center"
  },
  link:{
    marginTop:30,
    fontSize:18,
    color:"blue"
  }
})