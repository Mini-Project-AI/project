import React from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

const LoginScreen: React.FC = () => {
  const handleLogin = (values: { email: string; password: string }) => {
    // Handle login logic here
    Alert.alert('Login', `Email: ${values.email}, Password: ${values.password}`);
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={loginSchema}
      >
        {(formikProps: FormikProps<{ email: string; password: string }>) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={formikProps.handleChange('email')}
              onBlur={formikProps.handleBlur('email')}
              value={formikProps.values.email}
            />
            {formikProps.touched.email && formikProps.errors.email && (
              <Text style={styles.errorText}>{formikProps.errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={formikProps.handleChange('password')}
              onBlur={formikProps.handleBlur('password')}
              value={formikProps.values.password}
              secureTextEntry
            />
            {formikProps.touched.password && formikProps.errors.password && (
              <Text style={styles.errorText}>{formikProps.errors.password}</Text>
            )}
            <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
