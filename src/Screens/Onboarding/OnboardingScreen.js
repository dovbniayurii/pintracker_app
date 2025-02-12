import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, ImageBackground, View, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function OnboardingScreen({ navigation }) {  // ✅ Receive navigation prop
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />

      <ImageBackground
        source={require('../../assets/images/sky.png')} // Replace with your actual sky image path
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.scanContainer}>
          <Image
            source={require('../../assets/images/scan.png')} // Replace with your actual scan image path
            style={styles.scanImage}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)', 'black']} // Increased shadow intensity
          style={styles.shadowOverlay}
        />
      </ImageBackground>

      <View style={styles.bottomHalf}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Welcome to{'\n'} the Disney Pin Tracker</Text>
          <Text style={styles.subText}>
            Start scanning and collecting{'\n'}
            Disney pins. Unlock exclusive{'\n'}
            features and track your collection!
          </Text>
        </View>

        <TouchableOpacity style={styles.button}
        onPress={()=>navigation.navigate("SignupScreen")
        }
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    width: 250, // Increased size
    height: 250, // Increased size
    marginTop: 50,
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200, // Increased height for smoother blending
  },
  bottomHalf: {
    flex: 1, // Takes up remaining space
    backgroundColor: 'black',
    justifyContent: 'center', // Centers text vertically
    alignItems: 'center', // Centers text horizontally
    paddingBottom: 50, // Adds space from the bottom
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: 'white', // Set text color to white
    fontSize: 34, // Set font size
    fontWeight: 'bold', // Set font weight
    textAlign: 'center',
  },
  subText: {
    color: 'white', // Set text color to white
    fontSize: 23, // Set font size
    marginTop: 10, // Add margin to separate from the main text
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    width:330,
    height:48,
    backgroundColor: '#3E55C6', // Bright yellow to stand out
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignContent:"center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
