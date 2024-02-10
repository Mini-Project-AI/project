import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../text/TextInput';
import webService from '@/server/useService';

const RegisterForm: React.FC<{ onSubmit: (values: { email: string; password: string, age: number, lastName: string, firstName: string }) => void }> = ({ onSubmit }) => {
  // Define validation schema using yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
  });

    // Function to handle form submission
    const handleFormSubmit = async (values: { email: string; password: string, firstName: string, lastName: string, age: number }) => {
       onSubmit(values)
      const {email, password, age, firstName, lastName} = values
      try {
        // Call the login web service function with the form values
        const response = await webService().registerUser(email, password, firstName, lastName, age);
        console.log(response, "response")
        // Call the onSubmit function passed from the parent component
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      }
    };

  return (
    <Formik
      initialValues={{ email: '', password: '', age: 0, firstName:"", lastName:"" }}
      onSubmit={handleFormSubmit} 
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="firstName" placeholder="firstName"  />
          <TextInput name="lastName" placeholder="lastName"  />
          <TextInput name="age" placeholder="age" numeric />
          <TextInput name="password" placeholder="Password" password />

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={()=> handleSubmit()} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: "100%",
  },
  buttonContainer: {
    alignSelf: 'center',
    width:'100%'
  },
});

export default RegisterForm;
