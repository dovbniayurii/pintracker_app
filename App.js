import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import {AuthProvider} from './src/Screens/Auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
