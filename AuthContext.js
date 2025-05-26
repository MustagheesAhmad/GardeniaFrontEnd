
import { useNavigation, useRoute } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { auth } from "./config/agent";

export const AuthContext = createContext();

const publicRoutes = ['SignUp', 'LoginIn', 'ForgotPassword'];


export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const routeName = navigation.getId();
  const [appStatus, setAppStatus] = useState({
    user: null,
    isAuthenticated: false
  })
  const [loading, setLoading] = useState(true);

  const verify = async () => {
    setLoading(true);
    const response = await auth.verify();
    if (response?.success) {
      setAppStatus({
        isAuthenticated: true,
        user: response?.data,
      })
      if (publicRoutes.includes(routeName)) {
        navigation.navigate('Main', { screen: 'Home' });
      }
    }
    else {
      setAppStatus({
        user: null,
        isAuthenticated: false,
      })
      if (!publicRoutes.includes(routeName)) {
        navigation.navigate(publicRoutes[1]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    verify();
  }, [routeName])

  return <AuthContext.Provider value={{ ...appStatus, loading }}>
    {children}
  </AuthContext.Provider>
}