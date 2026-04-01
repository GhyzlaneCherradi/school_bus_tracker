import * as SecureStore from "expo-secure-store";
import AuthAPI from "../apis/AuthAPI";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("access_token");
  if (!token) return {};
  return { Authorization: `bearer ${token}` };
};

export const getParentProfile = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await AuthAPI.get("/parent/profile", { headers });
    return response.data;
  } catch {
    return null;
  }
};

export const getParentChildren = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await AuthAPI.get("/parent/children", { headers });
    return Array.isArray(response.data) ? response.data : [];
  } catch {
    return [];
  }
};

export const getParentAlerts = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await AuthAPI.get("/alerts", { headers });
    return Array.isArray(response.data) ? response.data : [];
  } catch {
    return [];
  }
};

export const getParentSettings = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await AuthAPI.get("/parent/settings", { headers });
    return response.data;
  } catch {
    return null;
  }
};

export const updateParentSettings = async (payload) => {
  try {
    const headers = await getAuthHeaders();
    const response = await AuthAPI.patch("/parent/settings", payload, { headers });
    return response.data;
  } catch {
    return null;
  }
};
