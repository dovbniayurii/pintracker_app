import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import {AuthProvider} from './src/Screens/Auth/AuthContext';
import {navigationRef} from './src/Navigation/NavigationService';

import {Alert, AndroidImportance} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosPublic from './axiosPublic';

export default function MainApp({ someProp = 'defaultValue' }) {
  async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Notification permission granted.');
      getDeviceToken();
    } else {
      Alert.alert('Permission Denied', 'You need to enable notifications');
    }
  }

  // Function to get and save FCM token
  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      const storedToken = await AsyncStorage.getItem('fcm_token');
      if (storedToken !== token) {
        // Send token to backend only if it's new
        await axiosPublic.post('/api/users/save-fcm-token/', {
          token,
        });

        console.log('New token sent to backend');
        await AsyncStorage.setItem('fcm_token', token);
      }
    } catch (error) {
      console.error('Error getting/saving FCM token:', error);
    }
  };

  // Function to listen for token updates
  const onTokenRefresh = async () => {
    messaging().onTokenRefresh(async newToken => {
      console.log('FCM Token refreshed:', newToken);
      await axiosPublic.post('/api/users/save-fcm-token/', {
        token: newToken,
      });
      await AsyncStorage.setItem('fcm_token', newToken);
    });
  };

  useEffect(() => {
    requestPermission();
    onTokenRefresh(); // Listen for token updates
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);

      // Request notification permissions if not granted
      await notifee.requestPermission();

      // Create a notification channel (required for Android)
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Display the notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Message',
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // Ensure you have an icon in android/app/src/main/res
        },
      });
    });

    //messaging().setBackgroundMessageHandler

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
