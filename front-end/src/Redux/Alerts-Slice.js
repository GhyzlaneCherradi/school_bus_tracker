import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.list = Array.isArray(action.payload) ? action.payload : state.list;
    },
    addAlert: (state, action) => {
      state.list.unshift(action.payload);
    },
    markAlertRead: (state, action) => {
      const alert = state.list.find((item) => item.id === action.payload);
      if (alert) alert.read = true;
    },
    markAllAlertsRead: (state) => {
      state.list = state.list.map((item) => ({ ...item, read: true }));
    },
  },
});

export const { setAlerts, addAlert, markAlertRead, markAllAlertsRead } = alertsSlice.actions;
export default alertsSlice.reducer;
