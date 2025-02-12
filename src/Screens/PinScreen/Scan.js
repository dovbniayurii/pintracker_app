import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function OnboardingScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />

      <ImageBackground
        source={require('../../assets/images/sky.png')} // Replace with your actual sky image path
        style={styles.topHalf}
        resizeMode="cover">
        <View style={styles.scanContainer}>
          <Image
            source={require('../../assets/images/scan.png')} // Replace with your actual scan image path
            style={styles.scanImage}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.6)', 'black']} // Spread black color upwards
          locations={[0, 0.4, 0.7, 1]} // Control the spread of the gradient
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <View style={styles.bottomHalf}>
        <View style={styles.topContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Scan the pin to add it {'\n'} your collection
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Scanning')}>
            <Text style={styles.buttonText}>Scan Now</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.myCollectionButton}
          onPress={() => navigation.navigate('MyCollectionScreen')}>
          <Image
            source={require('../../assets/images/mycollection.png')} // Replace with your actual icon path
            style={styles.myCollectionIcon}
            resizeMode="contain"
          />
          <Text style={styles.myCollectionText}>My Collection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    width: '100%',
    justifyContent: 'center', // Centers scan image
    alignItems: 'center',
  },
  scanContainer: {
    position: 'absolute',
    top: 30, // Adjust this value to move the scan image up or down
  },
  scanImage: {
    width: 230, // Increased size
    height: 355, // Increased size
    marginTop: 50,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%', // Adjust the height to control how far the black spreads
  },
  bottomHalf: {
    flex: 0.7, // Keep the same height for the bottom half
    backgroundColor: 'black',
    justifyContent: 'space-between', // Push content to top and bottom
    alignItems: 'center', // Centers content horizontally
  },
  topContent: {
    alignItems: 'center', // Centers text and button horizontally
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -20, // Move text up using negative margin
  },
  text: {
    color: 'white', // Set text color to white
    fontSize: 35, // Set font size
    fontWeight: '500', // Set font weight
    textAlign: 'center',
  },
  button: {
    marginTop: 30, // Move button up using negative margin
    width: 330,
    height: 48,
    backgroundColor: '#3E55C6', // Button color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  myCollectionButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 20, // Add space from the bottom
  },
  myCollectionIcon: {
    width: 31, // Adjust icon size
    height: 32, // Adjust icon size
    marginRight: 10, // Add space between icon and text
  },
  myCollectionText: {
    color: 'white', // Set text color to white
    fontSize: 21, // Set font size
    fontWeight: '500', // Set font weight
  },
});