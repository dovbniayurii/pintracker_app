/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import messaging from '@react-native-firebase/messaging';

import '@react-native-firebase/app';
// Background & Quit State Handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
// Register app component
AppRegistry.registerComponent(appName, () => App);
