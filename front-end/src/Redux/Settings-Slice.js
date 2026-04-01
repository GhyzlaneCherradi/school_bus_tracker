import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsEnabled: true,
  delayThresholdMinutes: 10,
  vibrationEnabled: true,
  language: "English",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = !!action.payload;
    },
    setDelayThresholdMinutes: (state, action) => {
      state.delayThresholdMinutes = Number(action.payload) || 10;
    },
    setVibrationEnabled: (state, action) => {
      state.vibrationEnabled = !!action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload || "English";
    },
  },
});

export const {
  setNotificationsEnabled,
  setDelayThresholdMinutes,
  setVibrationEnabled,
  setLanguage,
} = settingsSlice.actions;
export default settingsSlice.reducer;
