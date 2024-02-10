import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Title } from '@/components/text/Title';
import { indexStyles } from '@/styles/welcome.styles';


type AuthScreenProps = {
    navigation: NavigationProp<{}>;
  };

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const handleLoginPress = () => {
    navigation.navigate('Login' as never);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <View style={indexStyles.container}>
      <Title style={indexStyles.title}>tic tac toe</Title>
      <Image source={require('../../assets/images/logo.jpg')} style={indexStyles.logo} />
      <View style={indexStyles.buttonsContainer}>
        <TouchableOpacity style={indexStyles.button} onPress={handleLoginPress}>
          <Text style={indexStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={indexStyles.button} onPress={handleRegisterPress}>
          <Text style={indexStyles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default AuthScreen;
