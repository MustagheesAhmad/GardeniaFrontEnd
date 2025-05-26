import React, { useState, useRef } from 'react';
import { TextInput, Button } from 'react-native-paper';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { API_BASE_URL, AUTH_TOKEN } from '../config/constants';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import appStyle from '../style/login_start';
import signUpStyle from '../style/SignUp';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/agent';

const SignUp = () => {
  const navigation = useNavigation();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [state, setState] = useState({
    color: 'black',
    flag: false,
    fullName: '',
    email: '',
    password: '',
    confirm_password: '',
    number: '',
    passwordVisible: false, // State variable to track password visibility
  });

  const handleState = (text, key) => {
    setState({ ...state, [key]: text });
  };

  const handleSubmit = async (values, formikActions) => {

    const data = {
      fullName: values.name,
      email: values.email,
      password: values.password,
    }

    const response = await auth.signUp(data);
    console.log(response);
    if (response?.success) {
      Alert.alert('Success', response?.message)
      navigation.navigate('LoginIn');
    }
    else {
      Alert.alert('Error', response?.message)
    }
    formikActions.setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setState(prevState => ({
      ...prevState,
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={appStyle.body}>
          <View
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(100),
            }}>
            <Text style={signUpStyle.welcome}>
              Gardenia
            </Text>
            <Text style={{ textAlign:'center', color:'white', fontSize:20}}>
              Sign up
            </Text>
          </View>

          <View style={styles.container}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={Yup.object({
                name: Yup.string().required('Name is Required'),
                email: Yup.string()
                  .email('Invalid Email')
                  .required('Email is Required'),
                password: Yup.string()
                  .required('Password is required')
                  .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
              })}
              onSubmit={handleSubmit}>
              {props => (
                <View >
                  <TextInput
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                    autoFocus
                    placeholder="Your Name"
                    style={styles.input}
                  />
                  {props.touched.name && props.errors.name ? (
                    <Text style={styles.error}>{props.errors.name}</Text>
                  ) : null}
                  <TextInput
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    placeholder="Email Address"
                    style={styles.input}
                    ref={emailInput}
                  />
                  {props.touched.email && props.errors.email ? (
                    <Text style={styles.error}>{props.errors.email}</Text>
                  ) : null}
                  <TextInput
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    ref={passwordInput}
                  />
                  {props.touched.password && props.errors.password ? (
                    <Text style={styles.error}>{props.errors.password}</Text>
                  ) : null}
                  <TextInput
                    onChangeText={props.handleChange('confirmPassword')}
                    onBlur={props.handleBlur('confirmPassword')}
                    value={props.values.confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                    style={styles.input}
                    ref={confirmPasswordInput}
                  />
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword ? (
                    <Text style={styles.error}>
                      {props.errors.confirmPassword}
                    </Text>
                  ) : null}
                  <Button
                    onPress={props.handleSubmit}
                    mode="contained"
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                    style={{
                      marginTop: 6,
                      backgroundColor: '#1AA260',
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    Sign Up
                  </Button>
                </View>
              )}
            </Formik>
          </View>

          <View style={appStyle.cardContainer2}>
            <Text style={appStyle.signUp}>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginIn')}>
              <Text style={styles.TextContainer}>Sign in </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  TextContainer: {
    color: '#1AA260',
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    height: responsiveHeight(55),
    width: responsiveWidth(100),
    // backgroundColor: "black",
    paddingTop: 1,
    backgroundColor: '#3C6D33',
    padding: 18,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 1,
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#1AA260',
    borderWidth: 2,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderRadius: 10,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%', // Center the eye icon vertically within the password input field
    transform: [{ translateY: -10 }], // Adjust to vertically center the icon
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  loadingIcon: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
});
