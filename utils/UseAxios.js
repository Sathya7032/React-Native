import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { decode as base64Decode } from 'base-64';

const decodeJWT = (token) => {
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    throw new Error("Invalid JWT token");
  }
  const base64UrlPayload = tokenParts[1];

  const base64UrlDecode = (base64Url) => {
    base64Url = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64Url.length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error("Invalid base64 string");
      }
      base64Url += new Array(5 - pad).join('=');
    }
    return base64Decode(base64Url);
  }

  const jsonPayload = base64UrlDecode(base64UrlPayload);
  return JSON.parse(jsonPayload);
}

const baseURL = "https://acadamicfolios.pythonanywhere.com/app";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async config => {
    const user = decodeJWT(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return config;

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem("authTokens", JSON.stringify(response.data));

      // Update state with new tokens
      setAuthTokens(response.data);
      setUser(decodeJWT(response.data.access));
      
      config.headers.Authorization = `Bearer ${response.data.access}`;
      return config;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  });

  return axiosInstance;
};

export default useAxios;
