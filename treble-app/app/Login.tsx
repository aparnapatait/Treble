import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    // handle auth logic here
    navigation.navigate('home'); // navigate to home screen after login
  };

  return (
    <LinearGradient colors={['#470A4E', '#DBAAE0']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

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

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signup}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text></Text>
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
  loginBtn: {
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
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    // fontFamily: 'Poppins_600SemiBold',
  },
  forgot: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    // fontFamily: 'Poppins_300Light',
  },
  signup: {
    color: '#fff',
    textAlign: 'center',
    // fontFamily: 'Poppins_300Light',
  },
});
