// RegisterScreen.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity , Alert, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const RegisterScreen: React.FC = () => {
  const handleRegister = (values: { email: string; password: string; firstName: string; lastName: string; age: string }) => {
    // Handle register logic here
    Alert.alert('Register', `Email: ${values.email}, Password: ${values.password}, First Name: ${values.firstName}, Last Name: ${values.lastName}, Age: ${values.age}`);
  };

  const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
  });

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '', age: '' }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={registerSchema}
      >
        {({ handleChange, handleBlur, values, errors }) => (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text>{errors.email}</Text>}
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && <Text>{errors.password}</Text>}
            <TextInput
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {errors.firstName && <Text>{errors.firstName}</Text>}
            <TextInput
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {errors.lastName && <Text>{errors.lastName}</Text>}
            <TextInput
              placeholder="Age"
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              keyboardType="numeric"
            />
            {errors.age && <Text>{errors.age}</Text>}
            <TouchableOpacity onPress={()=> handleRegister(values)}>
                <Text>
                Register
                </Text>
                </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;
