// RegisterScreen.tsx
import React from 'react';
import { View, Image, TouchableOpacity , Alert, Platform, StyleSheet } from 'react-native';
import { Title } from '@/components/text/Title';
import RegisterForm from '@/components/forms/RegisterForm';

const RegisterScreen: React.FC<{ navigation : any}> = ({ navigation }) => {
  const isWeb = Platform.OS === "web"

  const handleRegister = (values: { email: string; password: string; firstName: string; lastName: string; age: number }) => {
    // Handle register logic here
    Alert.alert('Register', `Email: ${values.email}, Password: ${values.password}, First Name: ${values.firstName}, Last Name: ${values.lastName}, Age: ${values.age}`);
  };

  const handleNavigationLogin = () => {
    // Navigate to the registration screen
    navigation.navigate('Login');
  };

  return (
    <View style={{...styles.container, marginVertical: isWeb ? "0%": "10%"}}>
      <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
      <View style={styles.form}>
      <RegisterForm onSubmit={handleRegister} />
      </View>
      <TouchableOpacity onPress={handleNavigationLogin}>
        <Title style={{fontSize: isWeb ? 30: 12, marginTop: 20}} >Don't have an account? Click here to sign up!</Title>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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

export default RegisterScreen;
