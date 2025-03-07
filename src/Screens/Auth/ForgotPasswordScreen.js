import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  // State for email and phone number
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async () => {
    // Require that at least one of email or phone number is provided.
    if (!email && !phoneNumber) {
      Alert.alert('Error', 'Please enter your email or phone number.');
      return;
    }

    try {
      // Build request body based on provided fields
      const requestBody = {};
      if (email) {
        requestBody.email = email;
      }
      if (phoneNumber) {
        requestBody.phone_number = phoneNumber;
      }

      const response = await axios.post(
        'http://10.0.2.2:8000/api/users/forgot-password/',
        requestBody,
      );

      // Pass the provided email or phone number to the OTP screen.
      navigation.navigate('OtpCode', {email, phoneNumber});
    } catch (err) {
      console.log(err);
      Alert.alert('Error', err.message || 'Something went wrong.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/signupsky.png')}
      style={styles.background}
      resizeMode="cover">
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.shadowOverlay}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.overlay}>
            {/* Title & Subtitle */}
            <View style={styles.headerMovedUp}>
              <Text style={styles.title} variant="headlineMedium">
                Forgot Password?
              </Text>
              <Text style={styles.subtitle} variant="bodyMedium">
                Enter your email or phone number to recover your password.
              </Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label} variant="bodyMedium">
                Email Address
              </Text>
              <View
                style={[
                  styles.spacedInputContainer,
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

            {/* Phone Number Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label} variant="bodyMedium">
                Phone Number
              </Text>
              <View
                style={[
                  styles.spacedInputContainer,
                  {borderColor: focusedInput === 'phone' ? '#3E55C6' : 'gray'},
                ]}>
                <Icon
                  source="phone-outline"
                  size={20}
                  color="grey"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="gray"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleSubmit}>
              <Text style={styles.resetText} variant="bodyLarge">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerMovedUp: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
  },
  inputWrapper: {
    width: 330,
    marginBottom: 30,
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  spacedInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'gray',
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
  resetButton: {
    backgroundColor: '#3E55C6',
    width: 330,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resetText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
  },
});
