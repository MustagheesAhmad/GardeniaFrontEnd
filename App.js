import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUp from './Screens/SignUp';
import LoginIn from './Screens/LoginIn';
import ForgotPassword from './Screens/ForgotPassword';
import Home from './Screens/Home';
import Forum from './Screens/Forum';
import AccountSetting from './Screens/AccountSetting';
import PlantDisDet from './Screens/PlantDisDet';
import PlantCareTips from './Screens/PlantCareTips';
import LivePlantDisDet from './Screens/LivePlantDisDet';
import Logout from './Screens/Logout';
import { AuthProvider } from './AuthContext';
import { UserProvier } from './Components/UserContext';



// Create a Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const AppDrawer = () => {
  return <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home">
      {() => <Home />}
    </Drawer.Screen>

    <Drawer.Screen name="Forum">
      {() => <Forum />}
    </Drawer.Screen>
    <Drawer.Screen
      name="Live Plant Disease Detection"
    >
      {() => <LivePlantDisDet />}
    </Drawer.Screen>
    <Drawer.Screen name="Logout">
      {() => <Logout />}
    </Drawer.Screen>
  </Drawer.Navigator>

}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginIn">
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
        >
          {() => <SignUp />}
        </Stack.Screen>
        <Stack.Screen
          name="LoginIn"
          options={{ headerShown: false }}
        >
          {() => <LoginIn />}
        </Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
        >
          {() => <ForgotPassword />}
        </Stack.Screen>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {() => (
            <UserProvier>
              <AppDrawer />
            </UserProvier>
          )
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
