import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_Slice";
import trackingReducer from "./Tracking-Slice";

const store = configureStore({
  reducer: {
    auth: authSlice, // l'ajout du slice dans le store
    tracking: trackingReducer
  },
});

export default store;