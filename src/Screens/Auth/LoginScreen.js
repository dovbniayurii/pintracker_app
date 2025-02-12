import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Icon, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <ImageBackground
      source={require('../../assets/images/signupsky.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.shadowOverlay}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.overlay}>
            <Text style={styles.title}>Sign In</Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  { borderColor: focusedInput === 'email' ? '#3E55C6' : 'gray' },
                ]}
              >
                <Icon source="email-outline" size={20} color="grey" style={styles.icon} />
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
                  { borderColor: focusedInput === 'password' ? '#3E55C6' : 'gray' },
                ]}
              >
                <Icon source="lock-outline" size={20} color="grey" style={styles.icon} />
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
                <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                  <Icon source={securePassword ? "eye-off-outline" : "eye-outline"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.signupText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInLink}>Sign Up</Text>
            </Text>

            {/* OR Divider */}
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Social Media Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Icon source="google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon source="instagram" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon source="facebook" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  flexContainer: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
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
  signupButton: {
    backgroundColor: '#3E55C6',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    color: 'white',
    marginTop: 15,
  },
  signInLink: {
    color: '#3E55C6',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  orText: {
    color: 'white',
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  forgotPasswordText: {
    color: '#3E55C6',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

