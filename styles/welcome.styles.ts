import {StyleSheet} from "react-native"

export const indexStyles = StyleSheet.create({
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
  