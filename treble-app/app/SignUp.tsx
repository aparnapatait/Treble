// app/SignUp.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignUp = () => {
    // Add signup logic here (e.g. validation, API call)
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Navigate to home or login after signup
    navigation.navigate('home');
  };

  return (
    <LinearGradient colors={['#470A4E', '#DBAAE0']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginRedirect}>Already have an account? <Text style={{ textDecorationLine: 'underline' }}>Log In</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6,
    // fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    // fontFamily: 'Poppins_400Regular',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    // fontFamily: 'Poppins_400Regular',
  },
  signupBtn: {
    backgroundColor: '#BB76DA',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    // fontFamily: 'Poppins_600SemiBold',
  },
  loginRedirect: {
    color: '#fff',
    textAlign: 'center',
    // fontFamily: 'Poppins_300Light',
  },
});