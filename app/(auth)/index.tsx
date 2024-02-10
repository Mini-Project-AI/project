import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Title } from '@/components/text/Title';


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
    <View style={styles.container}>
      <Title style={styles.title}>tic tac toe</Title>
      <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginTop: 50,
    fontSize: 60,
    alignSelf: 'center'

  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 50,
    borderRadius: 25
  },
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AuthScreen;
