import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";

export default function HomeScreen() {
  const DATA = [
    { id: "1", title: "Apple" },
    { id: "2", title: "Banana" },
    { id: "3", title: "Orange" },
    { id: "3", title: "PineApple" },
    { id: "3", title: "PawPaw" },
  ];
  return (
    <View style={styles.titleContainer}>
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
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "green"
  },
  titleText: {
    width: "100%",
    color: "white",
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  hero: {
    height: "100%",
    width: "100%",
  },
  heroOverlay: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#808080",
    // opacity: 0.8,
  },
  heroText: {
    width: "100%",
    color: "white",
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  heroParagraph: {
    width: "100%",
    color: "white",
    padding: 20,
    fontSize: 16,
    textAlign: "center",
  },
  heroButton: {
    backgroundColor: "green",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  heroButtonText: {
    color: 'white',
    fontSize: 20
  }
});
