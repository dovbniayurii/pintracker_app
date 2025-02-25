import React from "react";
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, ScrollView } from "react-native";

const MyBoards = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/sky.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Collection</Text>

        {/* My Collection Section
        <Text style={styles.sectionTitle}>My Collection</Text>
        <View style={styles.imageGrid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={[styles.imageContainer, styles.borderOpacity]}>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
              <Text style={styles.imageText}>Item {item}</Text>
            </View>
          ))}
        </View> */}

        {/* My Board Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Board</Text>
          <TouchableOpacity>
            <Image source={require("../../assets/images/dots.png")} style={styles.dotsIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageGrid}>
          {Array.from({ length: 20 }, (_, index) => (
            <View key={index} style={[styles.imageContainer, styles.borderOpacity]}>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
              <Text style={styles.imageText}>Item {index + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, styles.borderOpacity]}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require("../../assets/images/image.png")} style={styles.footerImage} />
          <Text style={styles.footerText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require("../../assets/images/image.png")} style={styles.footerImage} />
          <Text style={styles.footerText}>My Collection</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  dotsIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    width: "23%", // Adjust based on your design needs
  },
  image: {
    width: 60,
    height: 60,
  },
  imageText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  footerButton: {
    alignItems: "center",
  },
  footerImage: {
    width: 24,
    height: 24,
  },
  footerText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  borderOpacity: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default MyBoards;