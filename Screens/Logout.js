import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { removeItem } from '../config/storage';

const Logout = () => {
  const navigation = useNavigation();
  const isFcoused = useIsFocused();


  const logoutAcion = async () => {
    await removeItem('auth')
    navigation.navigate('LoginIn');
  }

  useEffect(() => {
    // Perform any logout logic here, such as clearing tokens or user data
    logoutAcion();
    // Navigate to the LoginIn screen
  }, [navigation, isFcoused]);


  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
};

export default Logout;
