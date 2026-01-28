// import { Image } from 'expo-image';
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.Container}>
      <Text style={styles.TitleText}>Marketeer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
  },
  TitleText: {
    textAlign: "center",
    color: "white",
    padding: "4%",
    fontSize: 30,
    fontWeight: 600,
  },
});
