import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/agent';
import backgroundImage from "../assets/backgroundImage.jpeg"

const screenHeight = Dimensions.get('window').height;

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    try {

      const response = await auth.forgetPassword(email);
      console.log(response);

      if (response?.success) {
        Alert.alert('Success', response?.message);
        navigation.navigate('LoginIn');
      } else {
        Alert.alert('Error', response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'User does not exist or there was an error in the request',
      );
    }
  };

  return (
    <ImageBackground 
    source={backgroundImage}
            style={{ flex: 1, width: '100%', height: screenHeight }}
        resizeMode="cover">
    <View style={{ flex: 1, backgroundColor: 'rgba(60, 109, 51, 0.5)' ,alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>

      <Button title="Back" color={"#3C6D33"} onPress={() => navigation.navigate('LoginIn')} />
      <Text style={{ fontSize: 34, marginBottom: 40, color: 'white' }}>Forget Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button color={"#3C6D33"}  title="Send Reset Link" onPress={handleSendResetLink} />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default ForgotPassword;
