import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/agent";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";


const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export const UserProvier = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const getUser = async () => {
    const response = await auth.verify();
    if (response?.success) {
      setUser(response?.data)
    }
    else {
      Alert.alert('error', 'User is noy logged In')
      navigation.navigate('LoginIn');
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  )
}