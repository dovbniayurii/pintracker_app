import React, { useState, useRef } from 'react';
import { 
  StyleSheet, View, ImageBackground, TextInput, TouchableOpacity 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';

export default function OtpScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];

    // Allow only one character
    if (text.length > 1) return;

    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if text is entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    console.log("Entered OTP:", otpCode);

    if (otpCode.length === 4) {
      navigation.navigate("Scan"); // Proceed to the next screen
    } else {
      alert("Please enter a 4-digit OTP");
    }
  };

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

      <View style={styles.overlayAdjusted}>
        <Text style={styles.title} variant="headlineMedium">OTP Authentication</Text>
        <Text style={styles.subtitle} variant="bodyMedium">A 4-digit code has been sent to your email</Text>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput 
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              style={styles.otpInput}
              // placeholder="-"
              placeholderTextColor="gray"
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(digit, index);
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText} variant="bodyLarge">Submit</Text> 
        </TouchableOpacity>
      </View>
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
  overlayAdjusted: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingTop: 170,
  },
  title: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
    justifyContent: "center",
  },
  otpInput: {
    borderBottomWidth: 2,
    borderColor: 'gray',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 15,
    width: 40,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#3E55C6',
    width: 330,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: 'white',
    fontSize: 21,
    fontWeight: "500",
  },
});

