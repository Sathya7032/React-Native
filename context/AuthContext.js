import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthTokens = async () => {
      try {
        const storedTokens = await AsyncStorage.getItem("authTokens");
        if (storedTokens) {
          setAuthTokens(JSON.parse(storedTokens));
        }
      } catch (error) {
        console.error("Error loading auth tokens:", error);
        // Show error message
        showErrorMessage("An error occurred while loading authentication tokens.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthTokens();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("https://acadamicfolios.pythonanywhere.com/app/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        await AsyncStorage.setItem("authTokens", JSON.stringify(data));
        navigation.navigate("Dashboard");
        
        // Show success message
        showSuccessMessage("Login successful");
      } else {
        // Show error message
        showErrorMessage("Username or password does not exist");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Show error message
      showErrorMessage("An error occurred while logging in. Please try again later.");
    }
  };

  const registerUser = async (email, username, password, password2) => {
    try {
      const response = await fetch("https://acadamicfolios.pythonanywhere.com/app/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password2,
        }),
      });

      if (response.status === 201) {
        navigation.navigate("Login");
        // Show success message
        showSuccessMessage("Registration successful. Please login.");
      } else {
        // Show error message
        showErrorMessage("An error occurred while registering. Please try again later.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Show error message
      showErrorMessage("An error occurred while registering. Please try again later.");
    }
  };

  const LogoutUser = async () => {
    try {
      await AsyncStorage.removeItem("authTokens");
      setAuthTokens(null);
      navigation.navigate("Login");
      // Show success message
      showSuccessMessage("You have been logged out");
    } catch (error) {
      console.error("Error logging out:", error);
      // Show error message
      showErrorMessage("An error occurred while logging out. Please try again later.");
    }
  };

  const showSuccessMessage = (message) => {
    Alert.alert("Success", message);
  };

  const showErrorMessage = (message) => {
    Alert.alert("Error", message);
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    LogoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
