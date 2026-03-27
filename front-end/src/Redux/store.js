import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_Slice";

const store = configureStore({
  reducer: {
    auth: authSlice, // l'ajout du slice dans le store
  },
});

export default store;