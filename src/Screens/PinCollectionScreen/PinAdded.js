
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';


const PinCollectionScreen = () => {
    const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/realsky.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>My Collection</Text>

        <View style={styles.pinContainer}>
          <Text style={styles.pinTitle}>New Pin Added</Text>
          <View style={styles.pinBox}>
            <View style={styles.glowContainer}>
              <Image
                source={require('../../assets/images/desney.png')}
                style={styles.pinImage}
                resizeMode="contain"
              />
            </View>

          </View>
          
          <Text style={styles.pinName}>Stitch - 2002</Text>
          <Text style={styles.pinDescription}>Attacks Snacks Mystery Pin</Text>
        </View>

        {/* Board Options */}
        <Text style={styles.dragText}>Drag It to a Board</Text>
        <View style={styles.boardOptions}>
          <TouchableOpacity style={styles.boardButton}>
            <Image 
              source={require("../../assets/images/layers.png")} 
              style={styles.boardIcon} 
            />
            <Text style={styles.boardText}>My{"\n"}Board</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boardButton}>
            <Image 
              source={require("../../assets/images/heart.png")} 
              style={styles.boardIcon} 
            />
            <Text style={styles.boardText}>My{"\n"}Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boardButton}>
            <Image 
              source={require("../../assets/images/cycle.png")} 
              style={styles.boardIcon} 
            />
            <Text style={styles.boardText}>Trading{"\n"}Board</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>

        <TouchableOpacity style={styles.footerButton}
        onPress={() => navigation.navigate('Scanning')}>
          <Image source={require('../../assets/images/scanner.png')} style={styles.footerIcon} />

          <Text style={styles.footerText}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>

          <Image source={require('../../assets/images/mycollection.png')} style={styles.footerIcon} />
          <Text onPress={navigation.navigate('Boards')} style={[styles.footerText, { color: 'grey' }]}>My Collection</Text>

        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,

    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  title: {

    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pinContainer: {
    alignItems: 'center',
  },
  pinTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  glowContainer: {
    width: 328,
    height: 488,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 50, // More blur for softness
    elevation: 20,
    marginBottom: 10,

  },
  pinImage: {
    width: "100%",
    height: "100%",
  },
  pinName: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  pinDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  dragText: {
    fontSize: 18,
    color: "white",
    marginTop: 30,
    marginBottom: 20,
  },

  shadowEffect: {
    width: '100%',
    height: 140, // Increase this to make it spread more
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -20 }, // Negative value for bottom effect
    shadowOpacity: 1,

  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 8,
  },
  footerText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',

  },
});

export default PinCollectionScreen;