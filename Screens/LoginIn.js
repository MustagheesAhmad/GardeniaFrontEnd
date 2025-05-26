import React, { useState, useRef } from 'react';
import { TextInput, Button } from 'react-native-paper';
import * as Yup from 'yup';
import axios from 'axios';
import backgroundImage from "../assets/backgroundImage.jpeg"
const lock = require('../assets/Lock.png'); // Add lock icon
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import appStyle from '../style/login_start';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/agent';
import { setItem } from '../config/storage';
const screenHeight = Dimensions.get('window').height;
const arrow_back = require('../assets/arrow_back.png');
const blind = require('../assets/Blind.png');
const openEye = require('../assets/openeye.png');
const email = require('../assets/Email.png');

const Index = () => {
  const navigation = useNavigation();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const [state, setState] = useState({
    color: 'black',
    flag: false,
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    number: '',
    passwordVisible: false,
  });

  const handleState = (text, key) => {
    setState({ ...state, [key]: text });
  };

  const handleSubmit = async (values, formikActions) => {
    let data = {
      email: values.email,
      password: values.password,
    };

    const response = await auth.login(data);

    if (response?.success) {
      setItem('auth', `${response?.token}`)
      navigation.navigate('Main', { screen: 'Home' });
    }
    else {
      console.log(response);
      Alert.alert('error', response?.message || 'server error')
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
        <ImageBackground
        source={backgroundImage}
        style={{ flex: 1, width: '100%', height: screenHeight }}
    resizeMode="cover"
        
        >
        <View style={{ flex: 1, backgroundColor: 'rgba(60, 109, 51, 0.5)' }}>
          <View
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(100),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image style={appStyle.arrowbacklogin} source={arrow_back} />
            </TouchableOpacity>
            <Text style={styles.welcomel}>
              Gardenia{'\n'}Login to your {'\n'}Account
            </Text>
            
          </View>

          <View style={styles.container}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Invalid Email')
                  .required('Email is Required'),
                password: Yup.string()
                  .required('Password is required')
                  .min(6, 'Password must be at least 6 characters'),
              })}
              onSubmit={handleSubmit}>
              {props => (
                <View>
                  <TextInput
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    placeholder="Email Address"
                    style={styles.input}
                    ref={emailInput}
                  />
                  <Image source={email} style={styles.emailIcon} />
                  {props.touched.email && props.errors.email ? (
                    <Text style={styles.error}>{props.errors.email}</Text>
                  ) : null}
                  <TextInput
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    placeholder="Password"
                    secureTextEntry={!state.passwordVisible}
                    style={styles.input}
                    ref={passwordInput}
                  />
                  <View style={styles.lockIconContainer}>
                    <Image source={lock} style={styles.lockIcon} />
                  </View>
                  <TouchableOpacity
                    style={styles.eyeIconContainer}
                    onPress={togglePasswordVisibility}>
                    <Image
                      source={state.passwordVisible ? openEye : blind}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        textAlign: 'right',
                        bottom: 20,
                      }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                  {props.touched.password && props.errors.password ? (
                    <Text style={styles.error2}>{props.errors.password}</Text>
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
                    Login
                  </Button>
                </View>
              )}
            </Formik>
          </View>

          <View style={styles.cardContainer3}>
            <Text style={appStyle.signUp}>Don’t have an account? </Text>
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={styles.TextContainer}>
              SignUp
            </Text>
          </View>
          <View style={{ height: responsiveHeight(10) }}></View>
        </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  TextContainer: {
    color: '#1AA260',
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    height: responsiveHeight(40),
    width: responsiveWidth(100),
    // backgroundColor: "black",
    //paddingTop: 1,
    // backgroundColor: "orange",
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
    bottom: 5,
  },
  error2: {
    margin: 1,
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    bottom: 22,
  },
  input: {
    height: 50,
    paddingHorizontal: 40,
    paddingVertical: 2,
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
    bottom: 17,
    // position:'absolute'
  },
  loadingIcon: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  emailIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    marginTop: 20,
    marginLeft: 10, //bottom: 47,
    // justifyContent:'flex-start',
    //alignItems:"flex-start",
    //left: 30,
  },
  lockIcon: {
    width: 18,
    height: 18,
    // position:'absolute'
  },
  lockIconContainer: {
    bottom: 45,
    marginLeft: 10,
    // position:'absolute'
  },
  welcomel: {
    marginTop: verticalScale(40),
    fontSize: 30,

    //alignSelf: "center",
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    fontWeight: '600',
    // marginBottom: 20,
    marginLeft: 25,
    textAlign:'center',
    color:'white',
    height: responsiveHeight(20),
    // backgroundColor:'red'
  },
  cardContainerl: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    //backgroundColor: "green",
    // flexDirection: 'row',
    // marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iContainerl: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    //backgroundColor: "blue",
    flexDirection: 'row',
    // marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer3: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    //  backgroundColor: "red",
    flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
