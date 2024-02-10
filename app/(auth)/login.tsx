import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import LoginForm from '@/components/forms/LoginForm';
import { Title } from '@/components/text/Title';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const isWeb = Platform.OS === "web"
  const handleLogin = (values: { email: string; password: string }) => {
    // Handle login logic here
    console.log('Login with:', values);
  };
  const handleSignUp = () => {
    // Navigate to the registration screen
    navigation.navigate('Register');
  };

  return (
    <View style={{...styles.container, marginVertical: isWeb ? "0%": "30%"}}>
      <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
      <View style={styles.form}>
      <LoginForm onSubmit={handleLogin} />
      </View>
      <TouchableOpacity onPress={handleSignUp}>
        <Title style={{fontSize: isWeb ? 30: 12}} >Don't have an account? Click here to sign up!</Title>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width:"100%",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 25
  },
  form: {
    marginHorizontal:"20%"
  }
});

export default LoginScreen;
