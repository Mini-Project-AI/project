import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegisterScreen from './register';
import AuthScreen from './index'; // New screen for Auth tab

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthLayout