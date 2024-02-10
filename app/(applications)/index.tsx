import React from 'react';
import { View, StyleSheet, Image, Pressable, TouchableOpacity, Text } from 'react-native';
import { Title } from '@/components/text/Title';
import { useNavigation } from '@react-navigation/native';

interface GamesType {
    name :string;
    navigator: {
        pathname : string;
        params: {param : string}
    };
    label : string;
    id: number
}
const Games: GamesType[] = [
    {
        name : "tictactoe", navigator : {pathname:  "tictactoe", params : {param: "userId"}} , label: "tictactoe", id: 0,
    }
]

const ApplicationScreen = () => {
  const navigation = useNavigation()
  function handleNavigate(_pathName:never) {
    navigation.navigate(_pathName)
  }
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Applications</Title>
      <Image source={require('../../assets/images/tictactoe.png')} style={styles.logo} />
      <View style={styles.buttonsContainer}>
        {Games.map(game => {
            return (
                <TouchableOpacity  onPress={()=> handleNavigate(game.navigator.pathname as never)} key={game.id} style={styles.button} > <Text>{game.label}</Text> </TouchableOpacity>
            )
        })}

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

export default ApplicationScreen;
