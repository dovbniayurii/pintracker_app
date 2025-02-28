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

const GameGrid = ({title, items, icons, conponents, navigate}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Image source={icons} style={{width: 20, height: 20}} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.grid}>
      {items.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigate(item.id)}
          key={index}
          style={styles.gridItem}>
          <View style={styles.gameIcon}>
            {/* <View style={styles.placeholderIcon} /> Placeholder for game icons */}
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
    {conponents}
  </View>
);

export default function MyBoards() {
  const navigation = useNavigation();
  const dummyItems = Array(20).fill({});
  const itemsPerPage = 16; // Number of items to show per page
  const totalPages = Math.ceil(dummyItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [pins, setPin] = useState([]);
  useEffect(() => {
    pinData();
  }, []);
  const pinData = async () => {
    try {
      const response = await axiosClient.get('/api/pins/user-collection/');
      //console.log(response.data);
      setPin(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return pins.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const renderPaginationDots = () => {
    const dots = [];
    for (let i = 1; i <= totalPages; i++) {
      dots.push(
        <TouchableOpacity
          key={i}
          style={[styles.dot, currentPage === i && styles.activeDot]}
          onPress={() => handlePageChange(i)}
        />,
      );
    }
    return dots;
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
            <GameGrid
              title="My Board"
              items={getPaginatedItems()}
              icons={myCollectionIcon}
              conponents={
                <View style={styles.pagination}>{renderPaginationDots()}</View>
              }
              navigate={id => navigation.navigate('BoardDetails', {itemId: id})}
            />
          </ScrollView>
        </SafeAreaView>
        {/* Pagination Dots */}
      </View>

      <LinearGradient
        colors={['rgba(0, 28, 92, 0)', '#000000']}
        style={styles.bottomGradient}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
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
    // height: '60%',
  },
  section: {
    height: 500,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
    borderRadius: 12,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'rgba(62, 85, 198, 1)',
  },
});
