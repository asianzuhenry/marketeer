import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import ProductCard from "../../components/ProductCard"; // Uppercase P
import { products } from "@/data/products";

interface Product {
  _id?: string; // ❌ optional
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

export default function HomeScreen() {
  const DATA = [
    { id: "1", title: "Apple" },
    { id: "2", title: "Banana" },
    { id: "3", title: "Orange" },
    { id: "4", title: "PineApple" },
    { id: "5", title: "PawPaw" },
    { id: "1", title: "Apple" },
    { id: "2", title: "Banana" },
    { id: "3", title: "Orange" },
    { id: "4", title: "PineApple" },
    { id: "5", title: "PawPaw" },
  ];

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>Marketeer</Text>

      <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-photo/medium-shot-man-holding-vegetables_23-2148761604.jpg",
        }}
        resizeMode="cover"
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroText}>Welcome to Marketeer!</Text>
          <Text style={styles.heroParagraph}>
            Discover our range of products that you can trust. From electronics
            to apparel, we have it all and more.
          </Text>
          <Pressable style={styles.heroButton} onPress={() => {}}>
            <Text style={styles.heroButtonText}>Shop Now</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <FlatList
        data={products}
        scrollEnabled={false} // outer ScrollView handles scrolling
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ProductCard
            _id={item._id}
            name={item.name}
            image={item.image}
            description={item.description}
            price={item.price}
            category={item.category}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "green",
  },
  contentContainer: {
    alignItems: "center",
    // padding: 16,
  },
  titleText: {
    width: "100%",
    color: "white",
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    textAlign: "center",
  },
  hero: {
    width: "100%",
    height: 250, // fixed height
    marginVertical: 16,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // overlay for readability
    padding: 16,
  },
  heroText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  heroParagraph: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: "#1f7a1f",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  heroButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
