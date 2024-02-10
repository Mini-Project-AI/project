import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Title } from '@/components/text/Title';
import { useNavigation } from '@react-navigation/native';
import { indexStyles } from '@/styles/welcome.styles';

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
    <View style={indexStyles.container}>
      <Title style={indexStyles.title}>Applications</Title>
      <Image source={require('../../assets/images/tictactoe.png')} style={indexStyles.logo} />
      <View style={indexStyles.buttonsContainer}>
        {Games.map(game => {
            return (
                <TouchableOpacity  onPress={()=> handleNavigate(game.navigator.pathname as never)} key={game.id} style={indexStyles.button} > <Text>{game.label}</Text> </TouchableOpacity>
            )
        })}

      </View>

    </View>
  );
};

export default ApplicationScreen;
