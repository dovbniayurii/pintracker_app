import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import SignupScreen from '../Screens/Auth/SignupScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import ForgotPasswordScreen from '../Screens/Auth/ForgotPasswordScreen';
import ResetPassword from '../Screens/Auth/ResetPassword';
import OtpCode from '../Screens/Auth/OtpCode';
import Scan from '../Screens/PinScreen/Scan';
import Scanning from '../Screens/PinScreen/Scanning';
import PinAdded from '../Screens/PinCollectionScreen/PinAdded';
import Boards from '../Screens/PinCollectionScreen/Boards';
import MyBoards from '../Screens/PinCollectionScreen/MyBoards';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

      {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OtpCode" component={OtpCode} />
      <Stack.Screen name="Scan" component={Scan} />
      <Stack.Screen name="Scanning" component={Scanning} /> */}
      {/* <Stack.Screen name="PinAdded" component={PinAdded} /> */}
      {/* <Stack.Screen name="Boards" component={Boards} /> */}
      <Stack.Screen name="MyBoards" component={MyBoards} />
      


    </Stack.Navigator>
  );
};

export default MainNavigator;
