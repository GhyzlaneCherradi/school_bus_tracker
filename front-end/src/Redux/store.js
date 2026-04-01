import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_Slice";
import trackingReducer from "./Tracking-Slice";
import childrenReducer from "./Children-Slice";
import alertsReducer from "./Alerts-Slice";
import settingsReducer from "./Settings-Slice";
import parentReducer from "./Parent-Slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // l'ajout du slice dans le store
    tracking: trackingReducer,
    children: childrenReducer,
    alerts: alertsReducer,
    settings: settingsReducer,
    parent: parentReducer,
  },
});

export default store;