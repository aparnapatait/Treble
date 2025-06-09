// app/AppNavigator.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './home';
import RecordInAppScreen from './record';
import LoginScreen from './Login';
import SignUpScreen from './SignUp';

export type RootStackParamList = {
  home: undefined;
  record: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="record" component={RecordInAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

