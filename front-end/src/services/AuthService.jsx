import AuthAPI from "../apis/AuthAPI";
import * as SecureStore from "expo-secure-store";
// separation de la logique d'Authentification
export const loginUser = async (email, password) => {
  // Envoi de la requête de connexion au backend
  const response = await AuthAPI.post("/auth/login", { email, password });
  console.log(response.data);
  if (!response.data?.token) // equivalent to : response.data ? response.data.token : undefined
  {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Stockage sécurisé du token sur le téléphone
  await SecureStore.setItemAsync("access_token", response.data.token);

  return response.data;
};

export const registerPushToken = async (pushPushToken) => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    if (!token) return null;

    const response = await AuthAPI.patch("/user/push-token",
      { pushToken: pushPushToken },
      { headers: { Authorization: `bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log("Erreur lors de l'enregistrement du push token:", error);
    return null;
  }
};