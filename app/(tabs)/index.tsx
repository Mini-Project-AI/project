import {useState} from "react"
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View} from '@/components/Themed';
import { MonoText } from '@/components/StyledText';
import webService from '@/server/useService';

export default function TabOneScreen() {
  const [message, setMessage]= useState("")
  async function handleTest() {
    try {
      const response = await webService().testHealthCare()
      if (response.status) {
        setMessage(response.message)
      }
    } catch (error) {
      console.error(error, "error")
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTest} >
        <Text>
        {message || "try to connect to the server"}
        </Text>
      </TouchableOpacity>
      <MonoText style={styles.title}>Tab One</MonoText>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
