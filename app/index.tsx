import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import webService from '@/server/useService';


const SplashScreen: React.FC = () => {
    const navigation = useNavigation();
    useEffect(() => {
    // Check if the access token exists
    const checkToken = async () => {
      try {
        const accessToken = await webService().getAccessToken();
        console.log(accessToken, "accessToken")
        if (!accessToken) {
          // Token exists, navigate to the "tabs" screen
          navigation.navigate('(auth)' as never);
        } else {
          // Token does not exist, navigate to the "auth" screen
          navigation.navigate('(applications)' as never);
        }
      } catch (error) {
        console.error('Error checking access token:', error);
        // Handle error, maybe navigate to "auth" screen as fallback
        navigation.navigate('(applications)' as never);
      }
    };

    // Call the function to check the access token
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
      width: 300,
      height: 300,
      marginBottom: 50,
      borderRadius: 25
    },
  });
export default SplashScreen;
