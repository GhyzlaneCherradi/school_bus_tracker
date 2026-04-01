import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
  path: [],
  busId: null,
  speed: null,
  lastUpdated: null,
  status: 'REDUX_LOADED',
  error: null,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      const { latitude, longitude, busId, speed, timestamp } = action.payload;
      state.location = { latitude, longitude };
      state.busId = busId ?? state.busId;
      state.speed = typeof speed === 'number' ? speed : state.speed;
      state.lastUpdated = timestamp ?? new Date().toISOString();
      state.path.push({ latitude, longitude });
    },
    setLocationHistory: (state, action) => {
      const history = Array.isArray(action.payload) ? action.payload : [];
      state.path = history.map((item) => ({
        latitude: item.latitude,
        longitude: item.longitude,
      }));

      if (history.length > 0) {
        const latest = history[history.length - 1];
        state.location = {
          latitude: latest.latitude,
          longitude: latest.longitude,
        };
        state.busId = latest.busId ?? state.busId;
        state.speed = typeof latest.speed === 'number' ? latest.speed : state.speed;
        state.lastUpdated = latest.timestamp ?? state.lastUpdated;
      }
    },
    setConnectionStatus: (state, action) => {
      state.status = action.payload;
      if (action.payload === 'connected' || action.payload === 'connecting') {
        state.error = null;
      }
    },
    setConnectionError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  updateLocation,
  setLocationHistory,
  setConnectionStatus,
  setConnectionError,
} = trackingSlice.actions;

export default trackingSlice.reducer;
