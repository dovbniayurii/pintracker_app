import React, { useState } from 'react';
import { 
  StyleSheet, View, ImageBackground, TextInput, TouchableOpacity 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from 'react-native-paper';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

      <View style={styles.overlayAdjusted}>
        <Text style={styles.title} variant="headlineMedium">Reset Password</Text> 
        
        <View style={styles.inputWrapper}>
          <Text style={styles.label} variant="bodyMedium">New Password</Text> 
          <View style={[styles.inputContainer, { borderColor: focusedInput === 'password' ? '#3E55C6' : 'gray' }]}> 
            <Icon source="lock" size={20} color="gray" style={styles.icon} /> 
            <TextInput 
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                source={showPassword ? "eye-off" : "eye"}
                size={20} 
                color="gray" 
                style={styles.icon} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label} variant="bodyMedium">Password Confirmation</Text> 
          <View style={[styles.inputContainer, { borderColor: focusedInput === 'confirmPassword' ? '#3E55C6' : 'gray' }]}> 
            <Icon source="lock" size={20} color="gray" style={styles.icon} /> 
            <TextInput 
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="gray"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon 
                source={showConfirmPassword ? "eye-off" : "eye"}
                size={20} 
                color="gray" 
                style={styles.icon} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => navigation.navigate("OtpCode")}
        >
          <Text style={styles.resetText} variant="bodyLarge">Submit</Text> 
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
    paddingHorizontal: 20,
    paddingTop: 200,
  },
  title: {
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputWrapper: {
    width: 330,
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '100%',
    height: 48,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
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
    fontSize:21,
    fontWeight:"500",
  },
});
