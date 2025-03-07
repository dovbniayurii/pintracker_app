
import {useNavigation} from '@react-navigation/native';
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
const loveIcon = require('../../assets/images/love.png');
const tradingBoardIcon = require('../../assets/images/Trading_Board.png');

const GameGrid = ({title, items, icons}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Image source={icons} style={{width: 20, height: 20}} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.grid}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.gridItem}>
          <View style={styles.gameIcon}>
            {/* Placeholder for game icons */}
            <View style={styles.placeholderIcon}>
              {item.pin.image_url && (
                <Image
                  source={{uri: item.pin.image_url}}
                  style={{width: 200, height: 200}} // Ensure width & height are set
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default function Boards() {
  const navigation = useNavigation();
  const dummyItems = Array(4).fill({});
  const [myboard, setMyboard] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [trading, setTrading] = useState([]);

  useEffect(() => {
    myBoardData();
    myWishList();
    Trading();
  }, []);
  const myBoardData = async () => {
    try {
      const response = await axiosClient.get('/api/pins/user-collection/');
      //console.log(response.data);
      setMyboard(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const myWishList = async () => {
    try {
      const response = await axiosClient.get('/api/pins/wishlist/');
      //console.log(response.data);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const Trading = async () => {
    try {
      const response = await axiosClient.get('/api/pins/trading-board/');
      //console.log(response.data);
      setTrading(response.data);
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
              <GameGrid
                title="My Board"
                items={myboard}
                icons={myCollectionIcon}
              />
            </TouchableOpacity>

            <GameGrid title="My Wishlist" items={wishlist} icons={loveIcon} />
            <GameGrid
              title="Trading Board"
              items={trading}
              icons={tradingBoardIcon}
            />
          </ScrollView>
        </SafeAreaView>
      </View>

      <LinearGradient
        colors={['rgba(0, 28, 92, 0)', '#000000']}
        style={styles.bottomGradient}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}
        onPress={() => navigation.navigate('Scanning')}
        >
        
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
    marginTop: '20%',
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
    borderRadius: 12,
    padding: 12,
    width:380,
    height:180,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridItem: {
    width: '23%',
    aspectRatio: 1,
    marginBottom: 8,
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

