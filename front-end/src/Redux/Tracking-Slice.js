import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
  path: [],
  status: 'REDUX_LOADED',
  error: null,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      // action.payload to have latitude and longitude
      state.location = action.payload;
      state.path.push(action.payload);
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

export const { updateLocation, setConnectionStatus, setConnectionError } = trackingSlice.actions;

export default trackingSlice.reducer;
