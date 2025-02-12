import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import SignupScreen from '../Screens/Auth/SignupScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import ForgotPasswordScreen from '../Screens/Auth/ForgotPasswordScreen';
import ResetPassword from '../Screens/Auth/ResetPassword';
import OtpCode from '../Screens/Auth/OtpCode';
import Scan from '../Screens/PinScreen/Scan';
import Scanning from '../Screens/PinScreen/Scanning';
// import LoginScreen from '../screens/Auth/LoginScreen';
// import SignupScreen from '../screens/Auth/SignupScreen';
// import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
// import PinScreen from '../screens/Auth/PinScreen';

const Stack = createNativeStackNavigator(); // ✅ Correct import

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
     <Stack.Screen name="LoginScreen" component={LoginScreen} />
     <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
     <Stack.Screen name="ResetPassword" component={ResetPassword} />
     <Stack.Screen name="OtpCode" component={OtpCode} />
     <Stack.Screen name="Scan" component={Scan} />
     <Stack.Screen name="Scanning" component={Scanning} />







      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Pin" component={PinScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
