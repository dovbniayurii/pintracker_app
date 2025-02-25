import React from "react";
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, ScrollView } from "react-native";

const Boards = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/sky.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Collection</Text>

        {/* My Collection Section */}
        <Text style={styles.sectionTitle}>My Collection</Text>
        <View style={styles.imageGrid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.imageContainer}>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
              <Text style={styles.imageText}>Item {item}</Text>
            </View>
          ))}
        </View>

        {/* My Wishlist Section */}
        <Text style={styles.sectionTitle}>My Wishlist</Text>
        <View style={styles.imageGrid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.imageContainer}>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
              <Text style={styles.imageText}>Item {item}</Text>
            </View>
          ))}
        </View>

        {/* Trading Board Section */}
        <Text style={styles.sectionTitle}>Trading Board</Text>
        <View style={styles.imageGrid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.imageContainer}>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
              <Text style={styles.imageText}>Item {item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
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
  sectionTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
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
});

export default Boards;