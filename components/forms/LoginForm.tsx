import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../text/TextInput';
import webService from '@/server/useService';

const LoginForm: React.FC<{ onSubmit: (values: { email: string; password: string }) => void }> = ({ onSubmit }) => {
  // Define validation schema using yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

    // Function to handle form submission
    const handleFormSubmit = async (values: { email: string; password: string }) => {
      try {
        // Call the login web service function with the form values
        const response = await webService().loginUser(values.email, values.password);
        // Call the onSubmit function passed from the parent component
        console.log(response, "response ....")
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      }
    };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleFormSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" password />
          <View style={styles.buttonContainer}>
            <Button  title="Login" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: "100%",
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width:'100%'
  },
});

export default LoginForm;
