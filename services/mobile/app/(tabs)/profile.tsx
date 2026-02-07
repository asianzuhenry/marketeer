import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function Profile() {

  const imageSource: string = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>Profile</Text>

      <View style={styles.profileContainer}>
        <Image source={{ uri: imageSource }} style={styles.profileImage} />
        <Text style={styles.profileName}>Henry</Text>
        <Text style={styles.profileEmail}>henry@gmail.com</Text>
      </View>

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
  profileContainer: {
    width: "100%",
    height: "100%", // fixed height
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 120,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 900, 
    color: "white"
  },
  profileEmail: {
    fontSize: 16,
    color: "white"
  }
});
