import React, { useState } from 'react';
import { 
  StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { Icon, Text } from 'react-native-paper'; // Import Text from react-native-paper
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState(null); // Track focused input

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
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value as needed
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // Ensures taps outside the keyboard dismiss it
        >
          <View style={styles.overlay}>
            {/* Title & Subtitle */}
            <View style={styles.headerMovedUp}> 
              <Text style={styles.title} variant="headlineMedium">Forgot Password?</Text> 
              <Text style={styles.subtitle} variant="bodyMedium">Enter your email to recover your password.</Text> 
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label} variant="bodyMedium">Email Address</Text> 
              <View style={[
                styles.spacedInputContainer, 
                { borderColor: focusedInput === 'email' ? '#3E55C6' : 'gray' } // Dynamic border color
              ]}>
                <Icon source="email-outline" size={20} color="grey" style={styles.icon} /> 
                <TextInput 
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')} // Set focused input to 'email'
                  onBlur={() => setFocusedInput(null)} // Reset focused input
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={styles.resetText} variant="bodyLarge">Submit</Text> 
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
    paddingBottom: 20, // Add padding to ensure content is scrollable
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerMovedUp: { // Adjusted to move title higher
    width: '100%',
    marginBottom: 40, // Increased margin to move title higher
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginBottom: 10, // Added margin to separate title and subtitle
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
    borderColor: 'gray', // Default border color when not focused
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
    marginTop: 10, // Moved up (from 20 to 10)
  },
  resetText: {
    color: 'white',
    fontSize:21,
    fontWeight:"500",

  },
  backToLogin: {
    color: '#3E55C6',
    fontWeight: 'bold',
    marginTop: 10,
  },
});