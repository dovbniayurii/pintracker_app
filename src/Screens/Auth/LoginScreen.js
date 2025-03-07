import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post(
        'http://10.0.2.2:8000/api/users/signin/',
        {
          useremail: email, // change from email to useremail
          password,
        },
      );

      const {access, refresh} = response.data;
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      await login(); // Update authentication state
    } catch (err) {
      console.log(err);

      setError('Invalid email or password');
    }
  };

  return (
    <LinearGradient colors={['#121212', '#1E1E1E']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.overlay}>
            <Text style={styles.title}>Login</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: focusedInput === 'email' ? '#3E55C6' : 'gray'},
                ]}>
                <Icon
                  source="email-outline"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor:
                      focusedInput === 'password' ? '#3E55C6' : 'gray',
                  },
                ]}>
                <Icon
                  source="lock-outline"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                  secureTextEntry={securePassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity
                  onPress={() => setSecurePassword(!securePassword)}>
                  <Icon
                    source={securePassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('SignupScreen')}>
                Sign Up
              </Text>
            </Text>
            <Text style={styles.signUpText}>
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                Forgot Password?
              </Text>
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingLeft: 8,
  },
  loginButton: {
    backgroundColor: '#3E55C6',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'white',
    marginTop: 15,
  },
  signUpLink: {
    color: '#3E55C6',
    fontWeight: 'bold',
  },
});
