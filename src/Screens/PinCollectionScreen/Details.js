import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axiosClient from '../../../apiClient';

// Import images statically
const myCollectionIcon = require('../../assets/images/mycollection.png');
export default function BoardDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {itemId} = route.params; // Get the passed item ID

  const [pin, setPin] = useState();

  useEffect(() => {
    getPin();
  }, []);

  const getPin = async () => {
    try {
      const response = await axiosClient.get(`/api/pins/pin-details/${itemId}`);
      console.log(response.data);
      setPin(response.data);
      // console.log(pin['image_url']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/images/realsky.png')}
      style={styles.background}>
      <LinearGradient
        colors={['#000000', 'rgba(0, 28, 92, 0)']}
        style={styles.topGradient}
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>My Collection</Text>

          <ScrollView style={styles.scrollView}>
            <TouchableOpacity onPress={() => navigation.navigate('MyBoards')}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Image
                    source={myCollectionIcon}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={styles.sectionTitle}>My Board</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.gridItem}>
                    <View style={styles.gameIcon}>
                      <View style={styles.placeholderIcon}>
                        {pin && pin.image_url && (
                          <Image
                            source={{uri: pin.image_url}}
                            style={{width: '100%', height: '100%'}} // Ensure width & height are set
                            resizeMode="cover"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  {pin && pin.description && (
                    <Text
                      style={{color: 'white'}} // Ensure width & height are set
                    >
                      {pin.description}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>

      <LinearGradient
        colors={['rgba(0, 28, 92, 0)', '#000000']}
        style={styles.bottomGradient}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}
        onPress={() => navigation.navigate('Scanning')}>
          <Image
            source={require('../../assets/images/scanner.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Boards')}>
          <Image
            source={require('../../assets/images/mycollection.png')}
            style={styles.footerIcon}
          />
          <Text style={[styles.footerText, {color: 'grey'}]}>
            My Collection
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: '30%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%', // Adjust the height of the gradient overlay
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%', // Adjust the height of the gradient overlay
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
    borderRadius: 25,
    padding: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  gridItem: {
    width: '100%',
    aspectRatio: 1,
    padding: 20,
  },
  gameIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholderIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#3B82F6',
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
