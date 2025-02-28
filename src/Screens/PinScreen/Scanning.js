/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axiosClient from '../../../apiClient';
import RNFS from 'react-native-fs'; // React Native File System
import base64 from 'react-native-base64'; // Import react-native-base64
const DisneyPinScanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    initializeCamera();
  }, []);

  const initializeCamera = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'granted') {
        setHasPermission(true);
      } else {
        const newCameraPermission = await Camera.requestCameraPermission();
        setHasPermission(newCameraPermission === 'granted');
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Camera initialization error:', error);
      setIsInitialized(true);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        setCapturedImage(photo.path);
        console.log('Captured Image Path:', photo.path);

        // Send the image to the backend
        await uploadImage(photo.path);
      } catch (error) {
        console.error('Error taking photo:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to convert base64 string to Blob using react-native-base64
  const base64ToBlob = (base64String, mimeType) => {
    const byteCharacters = base64.decode(base64String); // Decode base64 using react-native-base64
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      byteArrays.push(
        new Uint8Array(slice.split('').map(char => char.charCodeAt(0))),
      );
    }

    return new Blob(byteArrays, {type: mimeType});
  };

  const uploadImage = async (imageUri) => {
    try {
      // Determine MIME type based on file extension or default to JPEG
      const fileExtension = imageUri.split('.').pop().toLowerCase();
      const mimeType = `image/${fileExtension === 'png' ? 'png' : 'jpeg'}`;
      
      const base64Image = `data:${mimeType};base64,${await RNFS.readFile(imageUri, 'base64')}`;
      
      const response = await axiosClient.post(
        '/api/pins/create-pin/',
        { image: base64Image },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Upload successful:', response.data);
    } catch (error) {
      // Enhanced error logging
      console.error('Upload error:', error.response?.data?.error || error.message);
    }
  };
  
  

  if (!isInitialized || !device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {!isInitialized
            ? 'Initializing camera...'
            : !hasPermission
            ? 'Camera permission required'
            : 'No camera found'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <View
          style={{
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isLoading && (
            <View style={{flexDirection: 'row'}}>
              <ActivityIndicator style={{marginRight: 10}} color={'#fff'} />
              <Text style={{color: '#fff'}}>Searching pin</Text>
            </View>
          )}
        </View>

        <View style={styles.cameraContainer}>
          {isFocused && (
            <Camera
              ref={cameraRef} // Attach ref to Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isScanning}
              enableZoomGesture
              photo={true}
            />
          )}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={styles.scanCorner} />
              <View style={[styles.scanCorner, styles.topRight]} />
              <View style={[styles.scanCorner, styles.bottomLeft]} />
              <View style={[styles.scanCorner, styles.bottomRight]} />
            </View>
          </View>
        </View>

        <View style={{height: '20%'}}>
          {!isLoading ? (
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true); // Set loading state
                takePhoto(); // Capture image
              }}
              style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => setIsLoading(!isLoading)}>
              <Text style={styles.signupText}>AI Scanning</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/scanner.png')}
                style={styles.footerIcon}
              />
              <Text style={styles.footerText}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/images/mycollection.png')}
                style={styles.footerIcon}
              />
              <Text style={[styles.footerText, {color: 'grey'}]}>
                My Collection
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  scanContainer: {
    position: 'absolute',
    top: 30,
  },
  signupText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#3E55C6',
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  scanImage: {
    width: 230,
    height: 355,
    marginTop: 50,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
  logo: {
    width: '100%',
    height: 40,
    marginTop: 20,
  },
  cameraContainer: {
    height: '60%',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHalf: {
    flex: 1,
    width: '100%',
    justifyContent: 'center', // Centers scan image
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
    borderWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 45,
  },
  footerButton: {
    alignItems: 'center',
    display: 'flex',
  },
  footerIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  footerText: {
    color: 'white',
    fontSize: 21,
    margrinRight: '5%',
    fontWeight: '500',
    marginHorizontal: 15,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 3,
  },
  captureButtonInner: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DisneyPinScanner;
