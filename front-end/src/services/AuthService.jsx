import AuthAPI from "../apis/AuthAPI";
import * as SecureStore from "expo-secure-store";
// separation de la logique d'Authentification
export const loginUser = async (email, password) => {
  const response = await AuthAPI.post("/auth/login", { email, password });
  console.log(response.data);
  if (!response.data?.token) // equivalent to : response.data ? response.data.token : undefined
    { 
    throw new Error("INVALID_CREDENTIALS");
  }

  await SecureStore.setItemAsync("access_token", response.data.token);

  return response.data;
};