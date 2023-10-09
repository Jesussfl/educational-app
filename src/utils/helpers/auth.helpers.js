import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN = process.env.EXPO_PUBLIC_AUTH_TOKEN;
export const getToken = async () => {
   try {
      return await AsyncStorage.getItem(AUTH_TOKEN);
   } catch (e) {
      console.log(e);
   }
};

export const setToken = async (token) => {
   try {
      if (token) {
         await AsyncStorage.setItem(AUTH_TOKEN, token);
      }
   } catch (error) {
      console.log(error);
   }
};

export const removeToken = async () => {
   await AsyncStorage.removeItem(AUTH_TOKEN);
};
