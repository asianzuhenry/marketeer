// src/components/ProductCard.tsx
import { View, Text, StyleSheet, Image } from "react-native";
import type { Product } from "../types/basetypes";

interface Props {
  title: string;
}

export default function ProductCard({
  _id,
  name,
  image,
  description,
  price,
  category,
}: Product) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text2}>{_id}</Text>
      <Text style={styles.text}>UGX: {price}</Text>
      <Text style={styles.text2}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 400,
    height: 500,
    padding: 16,
    backgroundColor: "white",
    marginVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    width: "100%",
    color: "black",
    fontSize: 24,
    padding: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 8,
  },
  text2: {
    width: "100%",
    color: "gray",
    fontSize: 16,
    paddingLeft: 16,
    textAlign: "left",
  },
    text3: {
    width: "100%",
    color: "black",
    fontSize: 16,
    paddingLeft: 16,
    textAlign: "left",
  },
});
