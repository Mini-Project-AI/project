import React, { useState } from 'react';
import { View, TextInput as RNTextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useField } from 'formik';
import { Ionicons } from '@expo/vector-icons';

interface TextInputProps {
  name: string;
  numeric?: boolean;
  placeholder?: string;
  password?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ name, numeric, password, placeholder }) => {
  const [field, meta] = useField(name);
  const [secureTextEntry, setSecureTextEntry] = useState(password);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.input}>
      <View style={styles.inputContainer}>
        <RNTextInput
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
          value={field.value}
          placeholder={placeholder}
          keyboardType={numeric ? 'numeric' : 'default'}
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        {password && (
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecureEntry}>
            <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {meta.touched && meta.error ? <Text style={styles.error}>{meta.error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      marginVertical: 10,
      width: "auto"

    },
    input: {
      paddingVertical: 20,
      width: "100%",
    },
    iconContainer: {
      marginLeft: 10,
      padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width: "100%"
      },
      eyeIcon: {
        padding: 10,
      },
      error: {
        color: 'red',
      },
  });

export default TextInput;